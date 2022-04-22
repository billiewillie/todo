/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/tabs */ "./js/components/tabs.js");
/* harmony import */ var _components_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/modal */ "./js/components/modal.js");
/* harmony import */ var _components_accordion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/accordion */ "./js/components/accordion.js");



const tabs = new _components_tabs__WEBPACK_IMPORTED_MODULE_0__["default"]("tab");
const modal = new _components_modal__WEBPACK_IMPORTED_MODULE_1__["default"]();
const accordion = new _components_accordion__WEBPACK_IMPORTED_MODULE_2__["default"](".accordion");

/***/ }),

/***/ "./js/components/accordion.js":
/*!************************************!*\
  !*** ./js/components/accordion.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query */ "./js/components/query.js");


class Accordion {
  constructor(selector) {
    this.selector = selector;
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Accordion);

/***/ }),

/***/ "./js/components/modal.js":
/*!********************************!*\
  !*** ./js/components/modal.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Modal {
  constructor(options) {
    let defaultOptions = {
      isOpen: () => {},
      isClose: () => {}
    };
    this.options = Object.assign(defaultOptions, options);
    this.modal = document.querySelector(".modal");
    this.speed = false;
    this.animation = false;
    this.isOpen = false;
    this.modalContainer = false;
    this.previousActiveElement = false;
    this.fixBlocks = document.querySelectorAll(".fix-block");
    this.focusElements = ["a[href]", "input", "button", "select", "textarea", "[tabindex]"];
    this.events();
  }

  events() {
    if (this.modal) {
      document.addEventListener("click", function (e) {
        const clickedElement = e.target.closest("[data-path]");

        if (clickedElement) {
          let target = clickedElement.dataset.path;
          let animation = clickedElement.dataset.animation;
          let speed = clickedElement.dataset.speed;
          this.animation = animation ? animation : "fade";
          this.speed = speed ? parseInt(speed) : 300;
          this.modalContainer = document.querySelector(`[data-target="${target}"]`);
          this.open();
          return;
        }

        if (e.target.closest(".modal-close")) {
          this.close();
          return;
        }
      }.bind(this));
      window.addEventListener("keydown", function (e) {
        if (e.keyCode == 27) {
          if (this.isOpen) {
            this.close();
          }
        }

        if (e.keyCode == 9 && this.isOpen) {
          this.focusCatch(e);
          return;
        }
      }.bind(this));
      this.modal.addEventListener("click", function (e) {
        if (!e.target.classList.contains("modal__container") && !e.target.closest(".modal__container") && this.isOpen) {
          this.close();
        }
      }.bind(this));
    }
  }

  open() {
    this.previousActiveElement = document.activeElement;
    this.modal.style.setProperty("--transition-time", `${this.speed / 1000}s`);
    this.modal.classList.add("is-open");
    this.disableScroll();
    this.modalContainer.classList.add("modal-open");
    this.modalContainer.classList.add(this.animation);
    setTimeout(() => {
      this.options.isOpen(this);
      this.modalContainer.classList.add("animate-open");
      this.isOpen = true;
      this.focusTrap();
    }, this.speed);
  }

  close() {
    if (this.modalContainer) {
      this.modalContainer.classList.remove("animate-open");
      this.modalContainer.classList.remove(this.animation);
      this.modal.classList.remove("is-open");
      this.modalContainer.classList.remove("modal-open");
      this.enableScroll();
      this.options.isClose(this);
      this.isOpen = false;
      this.focusTrap();
    }
  }

  focusCatch(e) {
    const focusable = this.modalContainer.querySelectorAll(this.focusElements);
    const focusArray = Array.prototype.slice.call(focusable);
    const focusedIndex = focusArray.indexOf(document.activeElement);

    if (e.shiftKey && focusedIndex === 0) {
      focusArray[focusArray.length - 1].focus();
      e.preventDefault();
    }

    if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
      focusArray[0].focus();
      e.preventDefault();
    }
  }

  focusTrap() {
    const focusable = this.modalContainer.querySelectorAll(this.focusElements);

    if (this.isOpen) {
      focusable[0].focus();
    } else {
      this.previousActiveElement.focus();
    }
  }

  disableScroll() {
    let pagePosition = window.scrollY;
    this.lockPadding();
    document.body.classList.add("disable-scroll");
    document.body.dataset.position = pagePosition;
    document.body.style.top = -pagePosition + "px";
  }

  enableScroll() {
    let pagePosition = parseInt(document.body.dataset.position, 10);
    this.unlockPadding();
    document.body.style.top = "auto";
    document.body.classList.remove("disable-scroll");
    window.scroll({
      top: pagePosition,
      left: 0
    });
    document.body.removeAttribute("data-position");
  }

  lockPadding() {
    let paddingOffset = window.innerWidth - document.body.offsetWidth + "px";
    this.fixBlocks.forEach(el => {
      el.style.paddingRight = paddingOffset;
    });
    document.body.style.paddingRight = paddingOffset;
  }

  unlockPadding() {
    this.fixBlocks.forEach(el => {
      el.style.paddingRight = "0px";
    });
    document.body.style.paddingRight = "0px";
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Modal);

/***/ }),

/***/ "./js/components/query.js":
/*!********************************!*\
  !*** ./js/components/query.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "query": function() { return /* binding */ query; },
/* harmony export */   "queryAll": function() { return /* binding */ queryAll; },
/* harmony export */   "queryId": function() { return /* binding */ queryId; }
/* harmony export */ });
const queryAll = (el, parent = document) => parent.querySelectorAll(el);
const query = (el, parent = document) => parent.querySelector(el);
const queryId = (el, parent = document) => parent.getElementById(el);

/***/ }),

/***/ "./js/components/tabs.js":
/*!*******************************!*\
  !*** ./js/components/tabs.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query */ "./js/components/query.js");


class Tabs {
  constructor(selector, options) {
    let defaultOptions = {
      isChanged: () => {}
    };
    this.options = Object.assign(defaultOptions, options);
    this.selector = selector;
    this.tabs = (0,_query__WEBPACK_IMPORTED_MODULE_0__.query)(`[data-tabs="${selector}"]`);

    if (this.tabs) {
      this.tabList = (0,_query__WEBPACK_IMPORTED_MODULE_0__.query)(".tabs__nav", this.tabs);
      this.tabsBtns = (0,_query__WEBPACK_IMPORTED_MODULE_0__.queryAll)(".tabs__nav-btn", this.tabList);
      this.tabsPanels = (0,_query__WEBPACK_IMPORTED_MODULE_0__.queryAll)(".tabs__panel", this.tabs);
    } else {
      console.error("Селектор data-tabs не существует!");
      return;
    }

    this.check();
    this.init();
    this.events();
  }

  check() {
    if ((0,_query__WEBPACK_IMPORTED_MODULE_0__.queryAll)(`[data-tabs="${this.selector}"]`).length > 1) {
      console.error("Количество элементов с одинаковым data-tabs больше одного!");
      return;
    }

    if (this.tabsBtns.length !== this.tabsPanels.length) {
      console.error("Количество кнопок и элементов табов не совпадает!");
      return;
    }
  }

  init() {
    this.tabList.setAttribute("role", "tablist");
    this.tabsBtns.forEach((el, i) => {
      el.setAttribute("role", "tab");
      el.setAttribute("tabindex", "-1");
      el.setAttribute("id", `${this.selector}${i + 1}`);
      el.classList.remove("tabs__nav-btn--active");
    });
    this.tabsPanels.forEach((el, i) => {
      el.setAttribute("role", "tabpanel");
      el.setAttribute("tabindex", "-1");
      el.setAttribute("aria-labelledby", this.tabsBtns[i].id);
      el.classList.remove("tabs__panel--active");
    });
    this.tabsBtns[0].classList.add("tabs__nav-btn--active");
    this.tabsBtns[0].removeAttribute("tabindex");
    this.tabsBtns[0].setAttribute("aria-selected", "true");
    this.tabsPanels[0].classList.add("tabs__panel--active");
  }

  events() {
    this.tabsBtns.forEach((el, i) => {
      el.addEventListener("click", e => {
        let currentTab = (0,_query__WEBPACK_IMPORTED_MODULE_0__.query)("[aria-selected]", this.tabList);

        if (e.currentTarget !== currentTab) {
          this.switchTabs(e.currentTarget, currentTab);
        }
      });
      el.addEventListener("keydown", e => {
        let index = Array.prototype.indexOf.call(this.tabsBtns, e.currentTarget);
        let dir = null;

        if (e.which === 37) {
          dir = index - 1;
        } else if (e.which === 39) {
          dir = index + 1;
        } else if (e.which === 40) {
          dir = "down";
        } else {
          dir = null;
        }

        if (dir !== null) {
          if (dir === "down") {
            this.tabsPanels[i].focus();
          } else if (this.tabsBtns[dir]) {
            this.switchTabs(this.tabsBtns[dir], e.currentTarget);
          }
        }
      });
    });
  }

  switchTabs(newTab, oldTab = (0,_query__WEBPACK_IMPORTED_MODULE_0__.query)("[aria-selected]", this.tabs)) {
    newTab.focus();
    newTab.removeAttribute("tabindex");
    newTab.setAttribute("aria-selected", "true");
    oldTab.removeAttribute("aria-selected");
    oldTab.setAttribute("tabindex", "-1");
    let index = Array.prototype.indexOf.call(this.tabsBtns, newTab);
    let oldIndex = Array.prototype.indexOf.call(this.tabsBtns, oldTab);
    this.tabsPanels[oldIndex].classList.remove("tabs__panel--active");
    this.tabsPanels[index].classList.add("tabs__panel--active");
    this.tabsBtns[oldIndex].classList.remove("tabs__nav-btn--active");
    this.tabsBtns[index].classList.add("tabs__nav-btn--active");
    this.options.isChanged(this);
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Tabs);

/***/ }),

/***/ "./scss/main.scss":
/*!************************!*\
  !*** ./scss/main.scss ***!
  \************************/
/***/ (function() {

throw new Error("Module build failed (from ../node_modules/mini-css-extract-plugin/dist/loader.js):\nModuleParseError: Module parse failed: Unexpected character '\u0000' (1:4)\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\n(Source code omitted for this binary file)\n    at handleParseError (/Users/macbook/Desktop/web/authgraph-test/node_modules/webpack/lib/NormalModule.js:976:19)\n    at /Users/macbook/Desktop/web/authgraph-test/node_modules/webpack/lib/NormalModule.js:1095:5\n    at processResult (/Users/macbook/Desktop/web/authgraph-test/node_modules/webpack/lib/NormalModule.js:800:11)\n    at /Users/macbook/Desktop/web/authgraph-test/node_modules/webpack/lib/NormalModule.js:860:5\n    at /Users/macbook/Desktop/web/authgraph-test/node_modules/loader-runner/lib/LoaderRunner.js:407:3\n    at iterateNormalLoaders (/Users/macbook/Desktop/web/authgraph-test/node_modules/loader-runner/lib/LoaderRunner.js:233:10)\n    at /Users/macbook/Desktop/web/authgraph-test/node_modules/loader-runner/lib/LoaderRunner.js:224:4\n    at /Users/macbook/Desktop/web/authgraph-test/node_modules/webpack/lib/NormalModule.js:834:15\n    at Array.eval (eval at create (/Users/macbook/Desktop/web/authgraph-test/node_modules/webpack/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:12:1)\n    at runCallbacks (/Users/macbook/Desktop/web/authgraph-test/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:27:15)");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/main.scss */ "./scss/main.scss");
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_main_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app */ "./js/app.js");


}();
/******/ })()
;
//# sourceMappingURL=main.js.map