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
const preventReactive_1 = __webpack_require__(/*! ./util/preventReactive */ "./src/core/util/preventReactive.ts");
/**
 * EventDispatcher基类，提供事件的监听，和触发功能。
 */
class EventDispatcher {
    constructor() {
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
    setEventErrorHandler(value) {
        this._eventErrorHandler = value;
    }
    /**
     * 监听当前实例上的自定义事件。
     * @param event - 事件名.
     * @param fn - 事件处理函数.
     */
    $on(event, fn) {
        if (Array.isArray(event)) {
            for (let i = 0; i < event.length; i++) {
                this.$on(event[i], fn);
            }
        }
        else {
            (this._events[event] || (this._events[event] = [])).push(fn);
        }
    }
    /**
     * 监听一个自定义事件，但是只触发一次，在第一次触发之后移除监听器。
     * @param event - 事件名.
     * @param fn - 事件处理函数.
     */
    $once(event, fn) {
        function on() {
            this.$off(event, on);
            fn.apply(this, arguments);
        }
        on.fn = fn;
        this.$on(event, on);
    }
    /**
     * 触发当前实例上的事件。附加参数都会传给监听器回调。。
     * @param event - 事件名.
     * @param args - 附加的参数.
     */
    $emit(event, ...args) {
        let cbs = this._events[event];
        if (cbs) {
            for (let i = 0; i < cbs.length; i++) {
                try {
                    cbs[i].apply(this, args);
                }
                catch (e) {
                    this._eventErrorHandler(e, `apply event handler for "${event}" fail`);
                }
            }
        }
    }
    /**
     * 移除当前实例上的自定义事件监听器。
     * 如果没有提供参数，则移除所有的事件监听器。
     * 如果只提供了事件，则移除该事件所有的监听器。
     * 如果同时提供了事件与回调，则只移除这个回调的监听器。
     * @param event - 事件名.
     * @param fn - 事件处理函数.
     */
    $off(event, fn) {
        if (!arguments.length) {
            this._events = Object.create(null);
        }
        if (Array.isArray(event)) {
            for (let i = 0; i < event.length; i++) {
                this.$off(event[i], fn);
            }
            return;
        }
        const cbs = this._events[event];
        if (!cbs) {
            return;
        }
        if (fn) {
            let cb;
            let i = cbs.length;
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
    }
}
exports.default = EventDispatcher;


/***/ }),

/***/ "./src/core/ThreeAssets.ts":
/*!*********************************!*\
  !*** ./src/core/ThreeAssets.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const EventDispatcher_1 = __webpack_require__(/*! ./EventDispatcher */ "./src/core/EventDispatcher.ts");
const preventReactive_1 = __webpack_require__(/*! ./util/preventReactive */ "./src/core/util/preventReactive.ts");
let uid = 0;
class ThreeAssets extends EventDispatcher_1.default {
    constructor(threeAssets) {
        super();
        this.id = `assetes: ${++uid}`;
        preventReactive_1.default(this, '_threeAssets');
        this.setThreeAssets(threeAssets);
    }
    setThreeAssets(newAssets) {
        let oldAssets = this._threeAssets;
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
    }
    getThreeAssets() {
        return this._threeAssets;
    }
    dispose() {
        this.$emit('dispose');
    }
}
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
const EventDispatcher_1 = __webpack_require__(/*! ./core/EventDispatcher */ "./src/core/EventDispatcher.ts");
const ThreeAssets_1 = __webpack_require__(/*! ./core/ThreeAssets */ "./src/core/ThreeAssets.ts");
exports.default = {
    EventDispatcher: EventDispatcher_1.default,
    ThreeAssets: ThreeAssets_1.default
};


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly92M2Mvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3YzYy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly92M2MvLi9zcmMvY29yZS9FdmVudERpc3BhdGNoZXIudHMiLCJ3ZWJwYWNrOi8vdjNjLy4vc3JjL2NvcmUvVGhyZWVBc3NldHMudHMiLCJ3ZWJwYWNrOi8vdjNjLy4vc3JjL2NvcmUvdXRpbC9wcmV2ZW50UmVhY3RpdmUudHMiLCJ3ZWJwYWNrOi8vdjNjLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsa0hBQW9EO0FBRXBEOztHQUVHO0FBQ0gsTUFBcUIsZUFBZTtJQVNs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Q0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO0lBQ3ZCLENBQUM7Q0FDRjtBQWpDRCw4QkFpQ0M7Ozs7Ozs7Ozs7Ozs7OztBQ3JDRCxTQUF3QixlQUFlLENBQUUsTUFBVyxFQUFFLFdBQW1CO0lBQ3ZFLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRTtRQUN6QyxZQUFZLEVBQUcsSUFBSTtRQUNuQixRQUFRLEVBQUUsSUFBSTtRQUNkLFVBQVUsRUFBRSxLQUFLO0tBQ2xCLENBQUM7QUFDSixDQUFDO0FBTkQsa0NBTUM7Ozs7Ozs7Ozs7Ozs7OztBQ05ELDZHQUFvRDtBQUNwRCxpR0FBNEM7QUFFNUMsa0JBQWU7SUFDYixlQUFlLEVBQWYseUJBQWU7SUFDZixXQUFXLEVBQVgscUJBQVc7Q0FDWiIsImZpbGUiOiJ2M2MudW1kLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1widjNjXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInYzY1wiXSA9IGZhY3RvcnkoKTtcbn0pKHdpbmRvdywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgcHJldmVudFJlYWN0aXZlIGZyb20gJy4vdXRpbC9wcmV2ZW50UmVhY3RpdmUnXHJcblxyXG4vKipcclxuICogRXZlbnREaXNwYXRjaGVy5Z+657G777yM5o+Q5L6b5LqL5Lu255qE55uR5ZCs77yM5ZKM6Kem5Y+R5Yqf6IO944CCXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFdmVudERpc3BhdGNoZXIge1xyXG4gIC8qKlxyXG4gICAqIOeUqOS6juWtmOWCqCBldmVudCDlkowgY2FsbGJhY2sg5pig5bCE5YWz57O755qE5a+56LGhXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZXZlbnRzOiBvYmplY3QgPSBPYmplY3QuY3JlYXRlKG51bGwpXHJcbiAgcHJpdmF0ZSBfZXZlbnRFcnJvckhhbmRsZXI6IEZ1bmN0aW9uID0gZnVuY3Rpb24gbmFtZSAoZTogRXJyb3IsIG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgY29uc29sZS5sb2cobWVzc2FnZSlcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yICgpIHtcclxuICAgIHByZXZlbnRSZWFjdGl2ZSh0aGlzLCAnX2V2ZW50cycpXHJcbiAgICBwcmV2ZW50UmVhY3RpdmUodGhpcywgJ19ldmVudEVycm9ySGFuZGxlcicpXHJcbiAgfVxyXG4gIHB1YmxpYyBzZXRFdmVudEVycm9ySGFuZGxlciAodmFsdWU6IEZ1bmN0aW9uKSB7XHJcbiAgICB0aGlzLl9ldmVudEVycm9ySGFuZGxlciA9IHZhbHVlXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDnm5HlkKzlvZPliY3lrp7kvovkuIrnmoToh6rlrprkuYnkuovku7bjgIJcclxuICAgKiBAcGFyYW0gZXZlbnQgLSDkuovku7blkI0uXHJcbiAgICogQHBhcmFtIGZuIC0g5LqL5Lu25aSE55CG5Ye95pWwLlxyXG4gICAqL1xyXG4gICRvbiAoZXZlbnQ6IHN0cmluZyB8IEFycmF5PHN0cmluZz4sIGZuOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZXZlbnQpKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXZlbnQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB0aGlzLiRvbihldmVudFtpXSwgZm4pXHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICh0aGlzLl9ldmVudHNbZXZlbnRdIHx8ICh0aGlzLl9ldmVudHNbZXZlbnRdID0gW10pKS5wdXNoKGZuKVxyXG4gICAgfVxyXG4gIH1cclxuICAvKipcclxuICAgKiDnm5HlkKzkuIDkuKroh6rlrprkuYnkuovku7bvvIzkvYbmmK/lj6rop6blj5HkuIDmrKHvvIzlnKjnrKzkuIDmrKHop6blj5HkuYvlkI7np7vpmaTnm5HlkKzlmajjgIJcclxuICAgKiBAcGFyYW0gZXZlbnQgLSDkuovku7blkI0uXHJcbiAgICogQHBhcmFtIGZuIC0g5LqL5Lu25aSE55CG5Ye95pWwLlxyXG4gICAqL1xyXG4gICRvbmNlIChldmVudDogc3RyaW5nLCBmbjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgIGZ1bmN0aW9uIG9uICgpIHtcclxuICAgICAgdGhpcy4kb2ZmKGV2ZW50LCBvbilcclxuICAgICAgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKVxyXG4gICAgfVxyXG4gICAgb24uZm4gPSBmblxyXG4gICAgdGhpcy4kb24oZXZlbnQsIG9uKVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6Kem5Y+R5b2T5YmN5a6e5L6L5LiK55qE5LqL5Lu244CC6ZmE5Yqg5Y+C5pWw6YO95Lya5Lyg57uZ55uR5ZCs5Zmo5Zue6LCD44CC44CCXHJcbiAgICogQHBhcmFtIGV2ZW50IC0g5LqL5Lu25ZCNLlxyXG4gICAqIEBwYXJhbSBhcmdzIC0g6ZmE5Yqg55qE5Y+C5pWwLlxyXG4gICAqL1xyXG4gICRlbWl0IChldmVudDogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgbGV0IGNicyA9IHRoaXMuX2V2ZW50c1tldmVudF1cclxuICAgIGlmIChjYnMpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgY2JzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpXHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgdGhpcy5fZXZlbnRFcnJvckhhbmRsZXIoZSwgYGFwcGx5IGV2ZW50IGhhbmRsZXIgZm9yIFwiJHtldmVudH1cIiBmYWlsYClcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOenu+mZpOW9k+WJjeWunuS+i+S4iueahOiHquWumuS5ieS6i+S7tuebkeWQrOWZqOOAglxyXG4gICAqIOWmguaenOayoeacieaPkOS+m+WPguaVsO+8jOWImeenu+mZpOaJgOacieeahOS6i+S7tuebkeWQrOWZqOOAglxyXG4gICAqIOWmguaenOWPquaPkOS+m+S6huS6i+S7tu+8jOWImeenu+mZpOivpeS6i+S7tuaJgOacieeahOebkeWQrOWZqOOAglxyXG4gICAqIOWmguaenOWQjOaXtuaPkOS+m+S6huS6i+S7tuS4juWbnuiwg++8jOWImeWPquenu+mZpOi/meS4quWbnuiwg+eahOebkeWQrOWZqOOAglxyXG4gICAqIEBwYXJhbSBldmVudCAtIOS6i+S7tuWQjS5cclxuICAgKiBAcGFyYW0gZm4gLSDkuovku7blpITnkIblh73mlbAuXHJcbiAgICovXHJcbiAgJG9mZiAoZXZlbnQ/OiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+LCBmbj86IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcclxuICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChBcnJheS5pc0FycmF5KGV2ZW50KSkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV2ZW50Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy4kb2ZmKGV2ZW50W2ldLCBmbilcclxuICAgICAgfVxyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjYnMgPSB0aGlzLl9ldmVudHNbZXZlbnRdXHJcblxyXG4gICAgaWYgKCFjYnMpIHtcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGZuKSB7XHJcbiAgICAgIGxldCBjYlxyXG4gICAgICBsZXQgaSA9IGNicy5sZW5ndGhcclxuICAgICAgd2hpbGUgKGktLSkge1xyXG4gICAgICAgIGNiID0gY2JzW2ldXHJcbiAgICAgICAgaWYgKGNiID09PSBmbiB8fCBjYi5mbiA9PT0gZm4pIHtcclxuICAgICAgICAgIGNicy5zcGxpY2UoaSwgMSlcclxuICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9ldmVudHNbZXZlbnRdID0gbnVsbFxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgRXZlbnREaXNwYXRjaGVyIGZyb20gJy4vRXZlbnREaXNwYXRjaGVyJ1xyXG5pbXBvcnQgcHJldmVudFJlYWN0aXZlIGZyb20gJy4vdXRpbC9wcmV2ZW50UmVhY3RpdmUnXHJcbmxldCB1aWQgPSAwXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaHJlZUFzc2V0cyBleHRlbmRzIEV2ZW50RGlzcGF0Y2hlciB7XHJcbiAgcHJpdmF0ZSBfdGhyZWVBc3NldHM6IGFueVxyXG4gIHByaXZhdGUgaWQ6IHN0cmluZyA9IGBhc3NldGVzOiAkeyArK3VpZCB9YFxyXG5cclxuICBjb25zdHJ1Y3RvciAodGhyZWVBc3NldHM6IGFueSkge1xyXG4gICAgc3VwZXIoKVxyXG4gICAgcHJldmVudFJlYWN0aXZlKHRoaXMsICdfdGhyZWVBc3NldHMnKVxyXG4gICAgdGhpcy5zZXRUaHJlZUFzc2V0cyh0aHJlZUFzc2V0cylcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRUaHJlZUFzc2V0cyAobmV3QXNzZXRzOiBhbnkpOiB2b2lkIHtcclxuICAgIGxldCBvbGRBc3NldHMgPSB0aGlzLl90aHJlZUFzc2V0c1xyXG4gICAgdGhpcy5fdGhyZWVBc3NldHMgPSBuZXdBc3NldHNcclxuICAgIC8vIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnX3RocmVlQXNzZXRzJywge1xyXG4gICAgLy8gICB2YWx1ZSA6IG5ld0Fzc2V0cyxcclxuICAgIC8vICAgY29uZmlndXJhYmxlIDogdHJ1ZSxcclxuICAgIC8vICAgd3JpdGFibGU6IHRydWUsXHJcbiAgICAvLyAgIGVudW1lcmFibGU6IGZhbHNlXHJcbiAgICAvLyB9KVxyXG5cclxuICAgIHRoaXMuJGVtaXQoJ3VwZGF0ZScsIHtcclxuICAgICAgb2xkQXNzZXRzOiBvbGRBc3NldHMsXHJcbiAgICAgIG5ld0Fzc2V0czogbmV3QXNzZXRzXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFRocmVlQXNzZXRzICgpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3RocmVlQXNzZXRzXHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZGlzcG9zZSAoKTogdm9pZCB7XHJcbiAgICB0aGlzLiRlbWl0KCdkaXNwb3NlJylcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcHJldmVudFJlYWN0aXZlICh0YXJnZXQ6IGFueSwgcHJvcGVydHlLZXk6IHN0cmluZykge1xyXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHByb3BlcnR5S2V5LCB7XHJcbiAgICBjb25maWd1cmFibGUgOiB0cnVlLFxyXG4gICAgd3JpdGFibGU6IHRydWUsXHJcbiAgICBlbnVtZXJhYmxlOiBmYWxzZVxyXG4gIH0pXHJcbn1cclxuIiwiaW1wb3J0IEV2ZW50RGlzcGF0Y2hlciBmcm9tICcuL2NvcmUvRXZlbnREaXNwYXRjaGVyJ1xyXG5pbXBvcnQgVGhyZWVBc3NldHMgZnJvbSAnLi9jb3JlL1RocmVlQXNzZXRzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQge1xyXG4gIEV2ZW50RGlzcGF0Y2hlcixcclxuICBUaHJlZUFzc2V0c1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=