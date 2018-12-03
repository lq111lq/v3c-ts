(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["v3c"] = factory();
	else
		root["v3c"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/core/EventDispatcher.ts":
/*!*************************************!*\
  !*** ./src/core/EventDispatcher.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * EventDispatcher基类，提供事件的监听，和触发功能。
 */
var EventDispatcher = /** @class */ (function () {
    function EventDispatcher() {
        /**
         * 用于存储 event 和 callback 映射关系的对象
         */
        this._events = Object.create(null);
        this._eventErrorHandler = function name(e, message) {
            console.log(message);
        };
    }
    EventDispatcher.prototype.setEventErrorHandler = function (value) {
        this._eventErrorHandler = value;
    };
    /**
     * 监听当前实例上的自定义事件。
     * @param event - 事件名.
     * @param fn - 事件处理函数.
     */
    EventDispatcher.prototype.$on = function (event, fn) {
        if (Array.isArray(event)) {
            for (var i = 0; i < event.length; i++) {
                this.$on(event[i], fn);
            }
        }
        else {
            (this._events[event] || (this._events[event] = [])).push(fn);
        }
    };
    /**
     * 监听一个自定义事件，但是只触发一次，在第一次触发之后移除监听器。
     * @param event - 事件名.
     * @param fn - 事件处理函数.
     */
    EventDispatcher.prototype.$once = function (event, fn) {
        function on() {
            this.$off(event, on);
            fn.apply(this, arguments);
        }
        on.fn = fn;
        this.$on(event, on);
    };
    /**
     * 触发当前实例上的事件。附加参数都会传给监听器回调。。
     * @param event - 事件名.
     * @param args - 附加的参数.
     */
    EventDispatcher.prototype.$emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var cbs = this._events[event];
        if (cbs) {
            for (var i = 0; i < cbs.length; i++) {
                try {
                    cbs[i].apply(this, args);
                }
                catch (e) {
                    this._eventErrorHandler(e, "apply event handler for \"" + event + "\" fail");
                }
            }
        }
    };
    /**
     * 移除当前实例上的自定义事件监听器。
     * 如果没有提供参数，则移除所有的事件监听器。
     * 如果只提供了事件，则移除该事件所有的监听器。
     * 如果同时提供了事件与回调，则只移除这个回调的监听器。
     * @param event - 事件名.
     * @param fn - 事件处理函数.
     */
    EventDispatcher.prototype.$off = function (event, fn) {
        if (!arguments.length) {
            this._events = Object.create(null);
        }
        if (Array.isArray(event)) {
            for (var i = 0; i < event.length; i++) {
                this.$off(event[i], fn);
            }
            return;
        }
        var cbs = this._events[event];
        if (!cbs) {
            return;
        }
        if (fn) {
            var cb = void 0;
            var i = cbs.length;
            while (i--) {
                cb = cbs[i];
                if (cb === fn || cb.fn === fn) {
                    cbs.splice(i, 1);
                    break;
                }
            }
        }
        else {
            this._events[event] = null;
        }
    };
    return EventDispatcher;
}());
exports.default = EventDispatcher;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var EventDispatcher_1 = __webpack_require__(/*! ./core/EventDispatcher */ "./src/core/EventDispatcher.ts");
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.bark = function () {
        this.$emit('bark');
        console.log('Woof! Woof!');
    };
    return Dog;
}(EventDispatcher_1.default));
var dog = new Dog();
dog.$on('bark', function () {
    console.log(dog);
});
dog.bark();
dog.$off;


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92M2Mvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3YzYy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly92M2MvLi9zcmMvY29yZS9FdmVudERpc3BhdGNoZXIudHMiLCJ3ZWJwYWNrOi8vdjNjLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsRkE7O0dBRUc7QUFDSDtJQUFBO1FBQ0U7O1dBRUc7UUFDSyxZQUFPLEdBQVcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDckMsdUJBQWtCLEdBQWEsU0FBUyxJQUFJLENBQUMsQ0FBUSxFQUFFLE9BQWU7WUFDNUUsT0FBTyxD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RUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRTtvQkFDN0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNoQixNQUFLO2lCQUNOO2FBQ0Y7U0FDRjthQUFNO1lBQ0wsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJO1NBQzNCO0lBQ0gsQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0R0QsMkdBQW9EO0FBRXBEO0lBQWtCLHVCQUFlO0lBQWpDOztJQUtBLENBQUM7SUFKQyxrQkFBSSxHQUFKO1FBQ0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7SUFDNUIsQ0FBQztJQUNILFVBQUM7QUFBRCxDQUFDLENBTGlCLHlCQUFlLEdBS2hDO0FBRUQsSUFBTSxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQUU7QUFDckIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUU7SUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztBQUNsQixDQUFDLENBQUM7QUFFRixHQUFHLENBQUMsSUFBSSxFQUFFO0FBQ1YsR0FBRyxDQUFDLElBQUkiLCJmaWxlIjoidjNjLnVtZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInYzY1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJ2M2NcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiLyoqXHJcbiAqIEV2ZW50RGlzcGF0Y2hlcuWfuuexu++8jOaPkOS+m+S6i+S7tueahOebkeWQrO+8jOWSjOinpuWPkeWKn+iDveOAglxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnREaXNwYXRjaGVyIHtcclxuICAvKipcclxuICAgKiDnlKjkuo7lrZjlgqggZXZlbnQg5ZKMIGNhbGxiYWNrIOaYoOWwhOWFs+ezu+eahOWvueixoVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2V2ZW50czogb2JqZWN0ID0gT2JqZWN0LmNyZWF0ZShudWxsKVxyXG4gIHByaXZhdGUgX2V2ZW50RXJyb3JIYW5kbGVyOiBGdW5jdGlvbiA9IGZ1bmN0aW9uIG5hbWUoZTogRXJyb3IsIG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgY29uc29sZS5sb2cobWVzc2FnZSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0RXZlbnRFcnJvckhhbmRsZXIgKHZhbHVlOiBGdW5jdGlvbikge1xyXG4gICAgdGhpcy5fZXZlbnRFcnJvckhhbmRsZXIgPSB2YWx1ZVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog55uR5ZCs5b2T5YmN5a6e5L6L5LiK55qE6Ieq5a6a5LmJ5LqL5Lu244CCXHJcbiAgICogQHBhcmFtIGV2ZW50IC0g5LqL5Lu25ZCNLlxyXG4gICAqIEBwYXJhbSBmbiAtIOS6i+S7tuWkhOeQhuWHveaVsC5cclxuICAgKi9cclxuICAkb24gKGV2ZW50OiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+LCBmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgIGlmIChBcnJheS5pc0FycmF5KGV2ZW50KSkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV2ZW50Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy4kb24oZXZlbnRbaV0sIGZuKVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAodGhpcy5fZXZlbnRzW2V2ZW50XSB8fCAodGhpcy5fZXZlbnRzW2V2ZW50XSA9IFtdKSkucHVzaChmbilcclxuICAgIH1cclxuICB9XHJcbiAgLyoqXHJcbiAgICog55uR5ZCs5LiA5Liq6Ieq5a6a5LmJ5LqL5Lu277yM5L2G5piv5Y+q6Kem5Y+R5LiA5qyh77yM5Zyo56ys5LiA5qyh6Kem5Y+R5LmL5ZCO56e76Zmk55uR5ZCs5Zmo44CCXHJcbiAgICogQHBhcmFtIGV2ZW50IC0g5LqL5Lu25ZCNLlxyXG4gICAqIEBwYXJhbSBmbiAtIOS6i+S7tuWkhOeQhuWHveaVsC5cclxuICAgKi9cclxuICAkb25jZSAoZXZlbnQ6IHN0cmluZywgZm46IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICBmdW5jdGlvbiBvbiAoKSB7XHJcbiAgICAgIHRoaXMuJG9mZihldmVudCwgb24pXHJcbiAgICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcclxuICAgIH1cclxuICAgIG9uLmZuID0gZm5cclxuICAgIHRoaXMuJG9uKGV2ZW50LCBvbilcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOinpuWPkeW9k+WJjeWunuS+i+S4iueahOS6i+S7tuOAgumZhOWKoOWPguaVsOmDveS8muS8oOe7meebkeWQrOWZqOWbnuiwg+OAguOAglxyXG4gICAqIEBwYXJhbSBldmVudCAtIOS6i+S7tuWQjS5cclxuICAgKiBAcGFyYW0gYXJncyAtIOmZhOWKoOeahOWPguaVsC5cclxuICAgKi9cclxuICAkZW1pdCAoZXZlbnQ6IHN0cmluZywgLi4uYXJnczogYW55W10pOiB2b2lkIHtcclxuICAgIGxldCBjYnMgPSB0aGlzLl9ldmVudHNbZXZlbnRdXHJcbiAgICBpZiAoY2JzKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNic1tpXS5hcHBseSh0aGlzLCBhcmdzKVxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgIHRoaXMuX2V2ZW50RXJyb3JIYW5kbGVyKGUsIGBhcHBseSBldmVudCBoYW5kbGVyIGZvciBcIiR7ZXZlbnR9XCIgZmFpbGApXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDnp7vpmaTlvZPliY3lrp7kvovkuIrnmoToh6rlrprkuYnkuovku7bnm5HlkKzlmajjgIJcclxuICAgKiDlpoLmnpzmsqHmnInmj5Dkvpvlj4LmlbDvvIzliJnnp7vpmaTmiYDmnInnmoTkuovku7bnm5HlkKzlmajjgIJcclxuICAgKiDlpoLmnpzlj6rmj5Dkvpvkuobkuovku7bvvIzliJnnp7vpmaTor6Xkuovku7bmiYDmnInnmoTnm5HlkKzlmajjgIJcclxuICAgKiDlpoLmnpzlkIzml7bmj5Dkvpvkuobkuovku7bkuI7lm57osIPvvIzliJnlj6rnp7vpmaTov5nkuKrlm57osIPnmoTnm5HlkKzlmajjgIJcclxuICAgKiBAcGFyYW0gZXZlbnQgLSDkuovku7blkI0uXHJcbiAgICogQHBhcmFtIGZuIC0g5LqL5Lu25aSE55CG5Ye95pWwLlxyXG4gICAqL1xyXG4gICRvZmYgKGV2ZW50Pzogc3RyaW5nIHwgQXJyYXk8c3RyaW5nPiwgZm4/OiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbClcclxuICAgIH1cclxuXHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShldmVudCkpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBldmVudC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRoaXMuJG9mZihldmVudFtpXSwgZm4pXHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2JzID0gdGhpcy5fZXZlbnRzW2V2ZW50XVxyXG5cclxuICAgIGlmICghY2JzKSB7XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIGlmIChmbikge1xyXG4gICAgICBsZXQgY2JcclxuICAgICAgbGV0IGkgPSBjYnMubGVuZ3RoXHJcbiAgICAgIHdoaWxlIChpLS0pIHtcclxuICAgICAgICBjYiA9IGNic1tpXVxyXG4gICAgICAgIGlmIChjYiA9PT0gZm4gfHwgY2IuZm4gPT09IGZuKSB7XHJcbiAgICAgICAgICBjYnMuc3BsaWNlKGksIDEpXHJcbiAgICAgICAgICBicmVha1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fZXZlbnRzW2V2ZW50XSA9IG51bGxcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IEV2ZW50RGlzcGF0Y2hlciBmcm9tICcuL2NvcmUvRXZlbnREaXNwYXRjaGVyJ1xyXG5cclxuY2xhc3MgRG9nIGV4dGVuZHMgRXZlbnREaXNwYXRjaGVyIHtcclxuICBiYXJrICgpIHtcclxuICAgIHRoaXMuJGVtaXQoJ2JhcmsnKVxyXG4gICAgY29uc29sZS5sb2coJ1dvb2YhIFdvb2YhJylcclxuICB9XHJcbn1cclxuXHJcbmNvbnN0IGRvZyA9IG5ldyBEb2coKVxyXG5kb2cuJG9uKCdiYXJrJywgKCkgPT4ge1xyXG4gIGNvbnNvbGUubG9nKGRvZylcclxufSlcclxuXHJcbmRvZy5iYXJrKClcclxuZG9nLiRvZmZcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==