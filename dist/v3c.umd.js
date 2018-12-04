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
var preventReactive_1 = __webpack_require__(/*! ./util/preventReactive */ "./src/core/util/preventReactive.ts");
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
        preventReactive_1.default(this, '_events');
        preventReactive_1.default(this, '_eventErrorHandler');
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

/***/ "./src/core/ThreeAssets.ts":
/*!*********************************!*\
  !*** ./src/core/ThreeAssets.ts ***!
  \*********************************/
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
var EventDispatcher_1 = __webpack_require__(/*! ./EventDispatcher */ "./src/core/EventDispatcher.ts");
var preventReactive_1 = __webpack_require__(/*! ./util/preventReactive */ "./src/core/util/preventReactive.ts");
var uid = 0;
var ThreeAssets = /** @class */ (function (_super) {
    __extends(ThreeAssets, _super);
    function ThreeAssets(threeAssets) {
        var _this = _super.call(this) || this;
        _this.id = "assetes: " + ++uid;
        preventReactive_1.default(_this, '_threeAssets');
        _this.setThreeAssets(threeAssets);
        return _this;
    }
    ThreeAssets.prototype.setThreeAssets = function (newAssets) {
        var oldAssets = this._threeAssets;
        this._threeAssets = newAssets;
        // Object.defineProperty(this, '_threeAssets', {
        //   value : newAssets,
        //   configurable : true,
        //   writable: true,
        //   enumerable: false
        // })
        this.$emit('update', {
            oldAssets: oldAssets,
            newAssets: newAssets
        });
    };
    ThreeAssets.prototype.getThreeAssets = function () {
        return this._threeAssets;
    };
    ThreeAssets.prototype.dispose = function () {
        this.$emit('dispose');
    };
    return ThreeAssets;
}(EventDispatcher_1.default));
exports.default = ThreeAssets;


/***/ }),

/***/ "./src/core/util/preventReactive.ts":
/*!******************************************!*\
  !*** ./src/core/util/preventReactive.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function preventReactive(target, propertyKey) {
    Object.defineProperty(target, propertyKey, {
        configurable: true,
        writable: true,
        enumerable: false
    });
}
exports.default = preventReactive;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventDispatcher_1 = __webpack_require__(/*! ./core/EventDispatcher */ "./src/core/EventDispatcher.ts");
var ThreeAssets_1 = __webpack_require__(/*! ./core/ThreeAssets */ "./src/core/ThreeAssets.ts");
exports.default = {
    EventDispatcher: EventDispatcher_1.default,
    ThreeAssets: ThreeAssets_1.default
};


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92M2Mvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3YzYy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly92M2MvLi9zcmMvY29yZS9FdmVudERpc3BhdGNoZXIudHMiLCJ3ZWJwYWNrOi8vdjNjLy4vc3JjL2NvcmUvVGhyZWVBc3NldHMudHMiLCJ3ZWJwYWNrOi8vdjNjLy4vc3JjL2NvcmUvdXRpbC9wcmV2ZW50UmVhY3RpdmUudHMiLCJ3ZWJwYWNrOi8vdjNjLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsZ0hBQW9EO0FBRXBEOztHQUVHO0FBQ0g7SUFTRTtRQVJBOztXQUVH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Q0osQ0FBQztJQUVNLG9DQUFjLEdBQXJCO1FBQ0UsT0FBTyxJQUFJLENBQUMsWUFBWTtJQUMxQixDQUFDO0lBRU0sNkJBQU8sR0FBZDtRQUNFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO0lBQ3ZCLENBQUM7SUFDSCxrQkFBQztBQUFELENBQUMsQ0FqQ3dDLHlCQUFlLEdBaUN2RDs7Ozs7Ozs7Ozs7Ozs7OztBQ3JDRCxTQUF3QixlQUFlLENBQUUsTUFBVyxFQUFFLFdBQW1CO0lBQ3ZFLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRTtRQUN6QyxZQUFZLEVBQUcsSUFBSTtRQUNuQixRQUFRLEVBQUUsSUFBSTtRQUNkLFVBQVUsRUFBRSxLQUFLO0tBQ2xCLENBQUM7QUFDSixDQUFDO0FBTkQsa0NBTUM7Ozs7Ozs7Ozs7Ozs7OztBQ05ELDJHQUFvRDtBQUNwRCwrRkFBNEM7QUFFNUMsa0JBQWU7SUFDYixlQUFlO0lBQ2YsV0FBVztDQUNaIiwiZmlsZSI6InYzYy51bWQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJ2M2NcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1widjNjXCJdID0gZmFjdG9yeSgpO1xufSkod2luZG93LCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImltcG9ydCBwcmV2ZW50UmVhY3RpdmUgZnJvbSAnLi91dGlsL3ByZXZlbnRSZWFjdGl2ZSdcclxuXHJcbi8qKlxyXG4gKiBFdmVudERpc3BhdGNoZXLln7rnsbvvvIzmj5Dkvpvkuovku7bnmoTnm5HlkKzvvIzlkozop6blj5Hlip/og73jgIJcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50RGlzcGF0Y2hlciB7XHJcbiAgLyoqXHJcbiAgICog55So5LqO5a2Y5YKoIGV2ZW50IOWSjCBjYWxsYmFjayDmmKDlsITlhbPns7vnmoTlr7nosaFcclxuICAgKi9cclxuICBwcml2YXRlIF9ldmVudHM6IG9iamVjdCA9IE9iamVjdC5jcmVhdGUobnVsbClcclxuICBwcml2YXRlIF9ldmVudEVycm9ySGFuZGxlcjogRnVuY3Rpb24gPSBmdW5jdGlvbiBuYW1lIChlOiBFcnJvciwgbWVzc2FnZTogc3RyaW5nKSB7XHJcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlKVxyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgcHJldmVudFJlYWN0aXZlKHRoaXMsICdfZXZlbnRzJylcclxuICAgIHByZXZlbnRSZWFjdGl2ZSh0aGlzLCAnX2V2ZW50RXJyb3JIYW5kbGVyJylcclxuICB9XHJcbiAgcHVibGljIHNldEV2ZW50RXJyb3JIYW5kbGVyICh2YWx1ZTogRnVuY3Rpb24pIHtcclxuICAgIHRoaXMuX2V2ZW50RXJyb3JIYW5kbGVyID0gdmFsdWVcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOebkeWQrOW9k+WJjeWunuS+i+S4iueahOiHquWumuS5ieS6i+S7tuOAglxyXG4gICAqIEBwYXJhbSBldmVudCAtIOS6i+S7tuWQjS5cclxuICAgKiBAcGFyYW0gZm4gLSDkuovku7blpITnkIblh73mlbAuXHJcbiAgICovXHJcbiAgJG9uIChldmVudDogc3RyaW5nIHwgQXJyYXk8c3RyaW5nPiwgZm46IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheShldmVudCkpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBldmVudC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRoaXMuJG9uKGV2ZW50W2ldLCBmbilcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgKHRoaXMuX2V2ZW50c1tldmVudF0gfHwgKHRoaXMuX2V2ZW50c1tldmVudF0gPSBbXSkpLnB1c2goZm4pXHJcbiAgICB9XHJcbiAgfVxyXG4gIC8qKlxyXG4gICAqIOebkeWQrOS4gOS4quiHquWumuS5ieS6i+S7tu+8jOS9huaYr+WPquinpuWPkeS4gOasoe+8jOWcqOesrOS4gOasoeinpuWPkeS5i+WQjuenu+mZpOebkeWQrOWZqOOAglxyXG4gICAqIEBwYXJhbSBldmVudCAtIOS6i+S7tuWQjS5cclxuICAgKiBAcGFyYW0gZm4gLSDkuovku7blpITnkIblh73mlbAuXHJcbiAgICovXHJcbiAgJG9uY2UgKGV2ZW50OiBzdHJpbmcsIGZuOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgZnVuY3Rpb24gb24gKCkge1xyXG4gICAgICB0aGlzLiRvZmYoZXZlbnQsIG9uKVxyXG4gICAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpXHJcbiAgICB9XHJcbiAgICBvbi5mbiA9IGZuXHJcbiAgICB0aGlzLiRvbihldmVudCwgb24pXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDop6blj5HlvZPliY3lrp7kvovkuIrnmoTkuovku7bjgILpmYTliqDlj4LmlbDpg73kvJrkvKDnu5nnm5HlkKzlmajlm57osIPjgILjgIJcclxuICAgKiBAcGFyYW0gZXZlbnQgLSDkuovku7blkI0uXHJcbiAgICogQHBhcmFtIGFyZ3MgLSDpmYTliqDnmoTlj4LmlbAuXHJcbiAgICovXHJcbiAgJGVtaXQgKGV2ZW50OiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKTogdm9pZCB7XHJcbiAgICBsZXQgY2JzID0gdGhpcy5fZXZlbnRzW2V2ZW50XVxyXG4gICAgaWYgKGNicykge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNicy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBjYnNbaV0uYXBwbHkodGhpcywgYXJncylcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICB0aGlzLl9ldmVudEVycm9ySGFuZGxlcihlLCBgYXBwbHkgZXZlbnQgaGFuZGxlciBmb3IgXCIke2V2ZW50fVwiIGZhaWxgKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog56e76Zmk5b2T5YmN5a6e5L6L5LiK55qE6Ieq5a6a5LmJ5LqL5Lu255uR5ZCs5Zmo44CCXHJcbiAgICog5aaC5p6c5rKh5pyJ5o+Q5L6b5Y+C5pWw77yM5YiZ56e76Zmk5omA5pyJ55qE5LqL5Lu255uR5ZCs5Zmo44CCXHJcbiAgICog5aaC5p6c5Y+q5o+Q5L6b5LqG5LqL5Lu277yM5YiZ56e76Zmk6K+l5LqL5Lu25omA5pyJ55qE55uR5ZCs5Zmo44CCXHJcbiAgICog5aaC5p6c5ZCM5pe25o+Q5L6b5LqG5LqL5Lu25LiO5Zue6LCD77yM5YiZ5Y+q56e76Zmk6L+Z5Liq5Zue6LCD55qE55uR5ZCs5Zmo44CCXHJcbiAgICogQHBhcmFtIGV2ZW50IC0g5LqL5Lu25ZCNLlxyXG4gICAqIEBwYXJhbSBmbiAtIOS6i+S7tuWkhOeQhuWHveaVsC5cclxuICAgKi9cclxuICAkb2ZmIChldmVudD86IHN0cmluZyB8IEFycmF5PHN0cmluZz4sIGZuPzogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZXZlbnQpKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB0aGlzLiRvZmYoZXZlbnRbaV0sIGZuKVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNicyA9IHRoaXMuX2V2ZW50c1tldmVudF1cclxuXHJcbiAgICBpZiAoIWNicykge1xyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICBpZiAoZm4pIHtcclxuICAgICAgbGV0IGNiXHJcbiAgICAgIGxldCBpID0gY2JzLmxlbmd0aFxyXG4gICAgICB3aGlsZSAoaS0tKSB7XHJcbiAgICAgICAgY2IgPSBjYnNbaV1cclxuICAgICAgICBpZiAoY2IgPT09IGZuIHx8IGNiLmZuID09PSBmbikge1xyXG4gICAgICAgICAgY2JzLnNwbGljZShpLCAxKVxyXG4gICAgICAgICAgYnJlYWtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2V2ZW50c1tldmVudF0gPSBudWxsXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBFdmVudERpc3BhdGNoZXIgZnJvbSAnLi9FdmVudERpc3BhdGNoZXInXHJcbmltcG9ydCBwcmV2ZW50UmVhY3RpdmUgZnJvbSAnLi91dGlsL3ByZXZlbnRSZWFjdGl2ZSdcclxubGV0IHVpZCA9IDBcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRocmVlQXNzZXRzIGV4dGVuZHMgRXZlbnREaXNwYXRjaGVyIHtcclxuICBwcml2YXRlIF90aHJlZUFzc2V0czogYW55XHJcbiAgcHJpdmF0ZSBpZDogc3RyaW5nID0gYGFzc2V0ZXM6ICR7ICsrdWlkIH1gXHJcblxyXG4gIGNvbnN0cnVjdG9yICh0aHJlZUFzc2V0czogYW55KSB7XHJcbiAgICBzdXBlcigpXHJcbiAgICBwcmV2ZW50UmVhY3RpdmUodGhpcywgJ190aHJlZUFzc2V0cycpXHJcbiAgICB0aGlzLnNldFRocmVlQXNzZXRzKHRocmVlQXNzZXRzKVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldFRocmVlQXNzZXRzIChuZXdBc3NldHM6IGFueSk6IHZvaWQge1xyXG4gICAgbGV0IG9sZEFzc2V0cyA9IHRoaXMuX3RocmVlQXNzZXRzXHJcbiAgICB0aGlzLl90aHJlZUFzc2V0cyA9IG5ld0Fzc2V0c1xyXG4gICAgLy8gT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdfdGhyZWVBc3NldHMnLCB7XHJcbiAgICAvLyAgIHZhbHVlIDogbmV3QXNzZXRzLFxyXG4gICAgLy8gICBjb25maWd1cmFibGUgOiB0cnVlLFxyXG4gICAgLy8gICB3cml0YWJsZTogdHJ1ZSxcclxuICAgIC8vICAgZW51bWVyYWJsZTogZmFsc2VcclxuICAgIC8vIH0pXHJcblxyXG4gICAgdGhpcy4kZW1pdCgndXBkYXRlJywge1xyXG4gICAgICBvbGRBc3NldHM6IG9sZEFzc2V0cyxcclxuICAgICAgbmV3QXNzZXRzOiBuZXdBc3NldHNcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0VGhyZWVBc3NldHMgKCk6IGFueSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdGhyZWVBc3NldHNcclxuICB9XHJcblxyXG4gIHB1YmxpYyBkaXNwb3NlICgpOiB2b2lkIHtcclxuICAgIHRoaXMuJGVtaXQoJ2Rpc3Bvc2UnKVxyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwcmV2ZW50UmVhY3RpdmUgKHRhcmdldDogYW55LCBwcm9wZXJ0eUtleTogc3RyaW5nKSB7XHJcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgcHJvcGVydHlLZXksIHtcclxuICAgIGNvbmZpZ3VyYWJsZSA6IHRydWUsXHJcbiAgICB3cml0YWJsZTogdHJ1ZSxcclxuICAgIGVudW1lcmFibGU6IGZhbHNlXHJcbiAgfSlcclxufVxyXG4iLCJpbXBvcnQgRXZlbnREaXNwYXRjaGVyIGZyb20gJy4vY29yZS9FdmVudERpc3BhdGNoZXInXHJcbmltcG9ydCBUaHJlZUFzc2V0cyBmcm9tICcuL2NvcmUvVGhyZWVBc3NldHMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgRXZlbnREaXNwYXRjaGVyLFxyXG4gIFRocmVlQXNzZXRzXHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==