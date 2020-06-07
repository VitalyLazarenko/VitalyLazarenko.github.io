/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return App; });
/* harmony import */ var _Viewer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Viewer */ "./src/Viewer.js");
/* harmony import */ var _DataStorege__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DataStorege */ "./src/DataStorege.js");
/* harmony import */ var _ViewerForm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ViewerForm */ "./src/ViewerForm.js");




class App {
    constructor(viewerContainer) {
        this.viewer = new _Viewer__WEBPACK_IMPORTED_MODULE_0__["default"](viewerContainer);
        this.dataStorage = new _DataStorege__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this.formControl = new _ViewerForm__WEBPACK_IMPORTED_MODULE_2__["default"]();
    }

    init() {
        this.formControl.init();
        this.viewer.init();
        this.setListeners();
    }

    setListeners() {
        this.formControl.subscribe('addFigureEvent', (figureProps) => {
            const newFigure = this.addNewFigureToViewer(figureProps);
            this.dataStorage.saveItem(newFigure);

            this.formControl.addListItem(newFigure);
        });

        this.formControl.subscribe('removeFigureEvent', (item_id) => {
            const figure = this.dataStorage.getItemById(item_id);

            this.viewer.deleteFigure(figure);
            this.dataStorage.removeItem(figure);
            this.dataStorage.getAllItems();
        });
    }

    addNewFigureToViewer({ name, size }) {
        let newFigure = this.viewer.createFigure(name, size);

        return newFigure;
    }
}


/***/ }),

/***/ "./src/DataStorege.js":
/*!****************************!*\
  !*** ./src/DataStorege.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DataStorage; });
class DataStorage {
    constructor() {
        this.figureDataList = [];
    }

    saveItem(data) {
        if (data === '') return alert('No data to add!');

        this.figureDataList.push(data);
    }

    getAllItems() {
        return this.figureDataList;
    }

    getItemById({ item_id }) {
        if (item_id === '') alert('Which item to find? ');

        let findItem = this.figureDataList.find((item) => item.item_id === item_id);

        if (findItem !== '') {
            return findItem;
        } else {
            alert('Such an element does not exist!');
        }
    }

    removeItem({ item_id }) {
        this.figureDataList.forEach((item, index) => {
            item.item_id === item_id ? this.figureDataList.splice(index, 1) : '';
        });
    }
}


/***/ }),

/***/ "./src/Viewer.js":
/*!***********************!*\
  !*** ./src/Viewer.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Viewer; });
class Viewer {
    constructor(viewerContainer) {
        this.viewerContainer = viewerContainer;
        this.renderer = new THREE.WebGLRenderer();
        this.viewerContainer.appendChild(this.renderer.domElement);

        this.renderHeight = this.viewerContainer.offsetHeight;
        this.renderWidth = this.viewerContainer.offsetWidth;

        this.scene = new THREE.Scene();
        this.axesHelper = new THREE.AxesHelper(15);
        this.camera = new THREE.PerspectiveCamera(
            25,
            this.renderWidth / this.renderHeight,
            0.1,
            1000
        );

        this.randomCoordinatesLimits = {
            x: {
                min: -30,
                max: 30,
            },
            y: {
                min: -17,
                max: 17,
            },
            z: {
                min: -30,
                max: 30,
            },
        };
    }

    init() {
        console.log(this.renderHeight + ' ' + this.renderWidth);
        this.scene.add(this.axesHelper);
        this.renderer.setSize(this.renderWidth, this.renderHeight);
        this.camera.position.z = 120;
        this.controls = new THREE.OrbitControls(
            this.camera,
            this.renderer.domElement
        );
        this._animate();
    }

    createFigure(name, size) {
        let geometry;
        let material;
        switch (name) {
            case 'Box':
                geometry = new THREE.BoxGeometry(1, 1, 1);
                material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
                break;
            case 'Sphere':
                geometry = new THREE.SphereGeometry(1, 32, 32);
                material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
                break;
            case 'Pyramid':
                geometry = new THREE.CylinderGeometry(0, 1, 1, 4);
                material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
                break;
            default:
                alert('Something went wrong! :D');
                break;
        }

        const figure = new THREE.Mesh(geometry, material);

        figure.position.x = this.createRandomCordinates('x');
        figure.position.y = this.createRandomCordinates('y');
        figure.position.z = this.createRandomCordinates('z');

        figure.geometry.scale(size, size, size);

        this.scene.add(figure);

        return {
            item_id: String(Date.now()),
            uuid: figure.uuid,
            name: name,
            size: size,
        };
    }

    generateRandomCordinate(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    createRandomCordinates(axis) {
        return this.generateRandomCordinate(
            this.randomCoordinatesLimits[axis].min,
            this.randomCoordinatesLimits[axis].max
        );
    }

    deleteFigure({ uuid }) {
        let removeFigure;

        for (let i = 0; i < this.scene.children.length; i++) {
            if (this.scene.children[i].uuid === uuid) {
                removeFigure = this.scene.children[i];
            }
        }

        this.scene.remove(removeFigure);
    }

    _animate() {
        requestAnimationFrame(() => this._animate());
        this.renderer.render(this.scene, this.camera);
        this.controls.update();
    }
}


/***/ }),

/***/ "./src/ViewerForm.js":
/*!***************************!*\
  !*** ./src/ViewerForm.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FormControl; });
class FormControl {
    constructor() {
        this.callbacks = {};
        this.figure = document.getElementById('figure');
        this.range = document.getElementById('range');
        this.addFigure = document.getElementById('create-figure');
        this.listItems = document.getElementById('list-figure');
    }

    init() {
        this.addFigure.addEventListener('click', () => this.addNewFigure());
    }

    addNewFigure() {
        this.dispatch('addFigureEvent', {
            name: this.figure.value,
            size: this.range.value,
        });
    }

    addListItem(data) {
        const label = this.createListElement({
            data: data,
            elementName: 'label',
            className: 'title',
        });

        const delButton = this.createListElement({
            data: data,
            elementName: 'button',
            className: 'delete',
            text: 'delete',
            id: 'delete',
        });

        const listItem = this.createListElement({
            data: data,
            elementName: 'li',
            className: 'list-item',
            childs: [label, delButton],
        });

        this.bindEvent(listItem);

        this.listItems.appendChild(listItem);

        return listItem;
    }

    createListElement({ data, elementName, className, text, id, childs }) {
        const element = document.createElement(elementName);
        className !== '' ? (element.className = className) : '';

        if (id) {
            element.id = id;
        } else {
            if (className === 'list-item') {
                element.id = data.item_id;
            }
        }

        element.textContent =
            className === 'title'
                ? `${data.name.toUpperCase()}: ${data.size} : ${data.uuid}`
                : text;
        id === 'delete' ? element.setAttribute(`item-id`, data.item_id) : '';

        if (childs) {
            childs.forEach((child) => {
                element.appendChild(child);
            });
        }

        return element;
    }

    bindEvent(item) {
        const deleteButton = item.querySelector('button.delete');

        deleteButton.addEventListener('click', this.delListItem.bind(this));
    }

    delListItem(e) {
        const item_id = e.target.attributes[2].value;
        this.dispatch('removeFigureEvent', { item_id: item_id });

        const item = document.getElementById(`${e.target.attributes[2].value}`);

        this.listItems.removeChild(item);
    }

    // ---------- EVENT SYSTEM ----------
    subscribe(eventName, cb) {
        if (!this.callbacks[eventName]) {
            this.callbacks[eventName] = [];
        }
        this.callbacks[eventName].push(cb);
    }

    dispatch(eventName, props = {}) {
        if (eventName in this.callbacks) {
            this.callbacks[eventName].forEach((cb) => cb(props));
        }
    }
    // ---------- END OF EVENT SYSTEM ----------
}


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App */ "./src/App.js");


const rootElement = document.getElementById('viewer');
const app = new _App__WEBPACK_IMPORTED_MODULE_0__["default"](rootElement);
app.init();


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRGF0YVN0b3JlZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1ZpZXdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVmlld2VyRm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQThCO0FBQ1U7QUFDRDs7QUFFeEI7QUFDZjtBQUNBLDBCQUEwQiwrQ0FBTTtBQUNoQywrQkFBK0Isb0RBQVc7QUFDMUMsK0JBQStCLG1EQUFXO0FBQzFDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBLDBCQUEwQixhQUFhO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3ZDQTtBQUFBO0FBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsVUFBVTtBQUMzQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0IsVUFBVTtBQUMxQjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNoQ0E7QUFBQTtBQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RCxrQkFBa0I7QUFDMUU7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELGtCQUFrQjtBQUMxRTtBQUNBO0FBQ0E7QUFDQSx3REFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLE9BQU87QUFDekI7O0FBRUEsdUJBQXVCLGdDQUFnQztBQUN2RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2pIQTtBQUFBO0FBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLHVCQUF1QixpREFBaUQ7QUFDeEU7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUIsd0JBQXdCLElBQUksVUFBVSxLQUFLLFVBQVU7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRDQUE0QyxtQkFBbUI7O0FBRS9ELGdEQUFnRCw2QkFBNkI7O0FBRTdFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3pHQTtBQUFBO0FBQXdCOztBQUV4QjtBQUNBLGdCQUFnQiw0Q0FBRztBQUNuQiIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9idWlsZC9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJpbXBvcnQgVmlld2VyIGZyb20gJy4vVmlld2VyJztcclxuaW1wb3J0IERhdGFTdG9yYWdlIGZyb20gJy4vRGF0YVN0b3JlZ2UnO1xyXG5pbXBvcnQgRm9ybUNvbnRyb2wgZnJvbSAnLi9WaWV3ZXJGb3JtJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcCB7XHJcbiAgICBjb25zdHJ1Y3Rvcih2aWV3ZXJDb250YWluZXIpIHtcclxuICAgICAgICB0aGlzLnZpZXdlciA9IG5ldyBWaWV3ZXIodmlld2VyQ29udGFpbmVyKTtcclxuICAgICAgICB0aGlzLmRhdGFTdG9yYWdlID0gbmV3IERhdGFTdG9yYWdlKCk7XHJcbiAgICAgICAgdGhpcy5mb3JtQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5pbml0KCk7XHJcbiAgICAgICAgdGhpcy52aWV3ZXIuaW5pdCgpO1xyXG4gICAgICAgIHRoaXMuc2V0TGlzdGVuZXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TGlzdGVuZXJzKCkge1xyXG4gICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuc3Vic2NyaWJlKCdhZGRGaWd1cmVFdmVudCcsIChmaWd1cmVQcm9wcykgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBuZXdGaWd1cmUgPSB0aGlzLmFkZE5ld0ZpZ3VyZVRvVmlld2VyKGZpZ3VyZVByb3BzKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhU3RvcmFnZS5zYXZlSXRlbShuZXdGaWd1cmUpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5hZGRMaXN0SXRlbShuZXdGaWd1cmUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmZvcm1Db250cm9sLnN1YnNjcmliZSgncmVtb3ZlRmlndXJlRXZlbnQnLCAoaXRlbV9pZCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBmaWd1cmUgPSB0aGlzLmRhdGFTdG9yYWdlLmdldEl0ZW1CeUlkKGl0ZW1faWQpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy52aWV3ZXIuZGVsZXRlRmlndXJlKGZpZ3VyZSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YVN0b3JhZ2UucmVtb3ZlSXRlbShmaWd1cmUpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFTdG9yYWdlLmdldEFsbEl0ZW1zKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkTmV3RmlndXJlVG9WaWV3ZXIoeyBuYW1lLCBzaXplIH0pIHtcclxuICAgICAgICBsZXQgbmV3RmlndXJlID0gdGhpcy52aWV3ZXIuY3JlYXRlRmlndXJlKG5hbWUsIHNpemUpO1xyXG5cclxuICAgICAgICByZXR1cm4gbmV3RmlndXJlO1xyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGFTdG9yYWdlIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZmlndXJlRGF0YUxpc3QgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICBzYXZlSXRlbShkYXRhKSB7XHJcbiAgICAgICAgaWYgKGRhdGEgPT09ICcnKSByZXR1cm4gYWxlcnQoJ05vIGRhdGEgdG8gYWRkIScpO1xyXG5cclxuICAgICAgICB0aGlzLmZpZ3VyZURhdGFMaXN0LnB1c2goZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QWxsSXRlbXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlndXJlRGF0YUxpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SXRlbUJ5SWQoeyBpdGVtX2lkIH0pIHtcclxuICAgICAgICBpZiAoaXRlbV9pZCA9PT0gJycpIGFsZXJ0KCdXaGljaCBpdGVtIHRvIGZpbmQ/ICcpO1xyXG5cclxuICAgICAgICBsZXQgZmluZEl0ZW0gPSB0aGlzLmZpZ3VyZURhdGFMaXN0LmZpbmQoKGl0ZW0pID0+IGl0ZW0uaXRlbV9pZCA9PT0gaXRlbV9pZCk7XHJcblxyXG4gICAgICAgIGlmIChmaW5kSXRlbSAhPT0gJycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZpbmRJdGVtO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KCdTdWNoIGFuIGVsZW1lbnQgZG9lcyBub3QgZXhpc3QhJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUl0ZW0oeyBpdGVtX2lkIH0pIHtcclxuICAgICAgICB0aGlzLmZpZ3VyZURhdGFMaXN0LmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGl0ZW0uaXRlbV9pZCA9PT0gaXRlbV9pZCA/IHRoaXMuZmlndXJlRGF0YUxpc3Quc3BsaWNlKGluZGV4LCAxKSA6ICcnO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcih2aWV3ZXJDb250YWluZXIpIHtcclxuICAgICAgICB0aGlzLnZpZXdlckNvbnRhaW5lciA9IHZpZXdlckNvbnRhaW5lcjtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFRIUkVFLldlYkdMUmVuZGVyZXIoKTtcclxuICAgICAgICB0aGlzLnZpZXdlckNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQpO1xyXG5cclxuICAgICAgICB0aGlzLnJlbmRlckhlaWdodCA9IHRoaXMudmlld2VyQ29udGFpbmVyLm9mZnNldEhlaWdodDtcclxuICAgICAgICB0aGlzLnJlbmRlcldpZHRoID0gdGhpcy52aWV3ZXJDb250YWluZXIub2Zmc2V0V2lkdGg7XHJcblxyXG4gICAgICAgIHRoaXMuc2NlbmUgPSBuZXcgVEhSRUUuU2NlbmUoKTtcclxuICAgICAgICB0aGlzLmF4ZXNIZWxwZXIgPSBuZXcgVEhSRUUuQXhlc0hlbHBlcigxNSk7XHJcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBuZXcgVEhSRUUuUGVyc3BlY3RpdmVDYW1lcmEoXHJcbiAgICAgICAgICAgIDI1LFxyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcldpZHRoIC8gdGhpcy5yZW5kZXJIZWlnaHQsXHJcbiAgICAgICAgICAgIDAuMSxcclxuICAgICAgICAgICAgMTAwMFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHRoaXMucmFuZG9tQ29vcmRpbmF0ZXNMaW1pdHMgPSB7XHJcbiAgICAgICAgICAgIHg6IHtcclxuICAgICAgICAgICAgICAgIG1pbjogLTMwLFxyXG4gICAgICAgICAgICAgICAgbWF4OiAzMCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgeToge1xyXG4gICAgICAgICAgICAgICAgbWluOiAtMTcsXHJcbiAgICAgICAgICAgICAgICBtYXg6IDE3LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB6OiB7XHJcbiAgICAgICAgICAgICAgICBtaW46IC0zMCxcclxuICAgICAgICAgICAgICAgIG1heDogMzAsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMucmVuZGVySGVpZ2h0ICsgJyAnICsgdGhpcy5yZW5kZXJXaWR0aCk7XHJcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQodGhpcy5heGVzSGVscGVyKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFNpemUodGhpcy5yZW5kZXJXaWR0aCwgdGhpcy5yZW5kZXJIZWlnaHQpO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhLnBvc2l0aW9uLnogPSAxMjA7XHJcbiAgICAgICAgdGhpcy5jb250cm9scyA9IG5ldyBUSFJFRS5PcmJpdENvbnRyb2xzKFxyXG4gICAgICAgICAgICB0aGlzLmNhbWVyYSxcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5kb21FbGVtZW50XHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLl9hbmltYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlRmlndXJlKG5hbWUsIHNpemUpIHtcclxuICAgICAgICBsZXQgZ2VvbWV0cnk7XHJcbiAgICAgICAgbGV0IG1hdGVyaWFsO1xyXG4gICAgICAgIHN3aXRjaCAobmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlICdCb3gnOlxyXG4gICAgICAgICAgICAgICAgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQm94R2VvbWV0cnkoMSwgMSwgMSk7XHJcbiAgICAgICAgICAgICAgICBtYXRlcmlhbCA9IG5ldyBUSFJFRS5NZXNoQmFzaWNNYXRlcmlhbCh7IGNvbG9yOiAweDAwZmYwMCB9KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdTcGhlcmUnOlxyXG4gICAgICAgICAgICAgICAgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuU3BoZXJlR2VvbWV0cnkoMSwgMzIsIDMyKTtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgY29sb3I6IDB4MDAwMGZmIH0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ1B5cmFtaWQnOlxyXG4gICAgICAgICAgICAgICAgZ2VvbWV0cnkgPSBuZXcgVEhSRUUuQ3lsaW5kZXJHZW9tZXRyeSgwLCAxLCAxLCA0KTtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hCYXNpY01hdGVyaWFsKHsgY29sb3I6IDB4ZmYwMDAwIH0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBhbGVydCgnU29tZXRoaW5nIHdlbnQgd3JvbmchIDpEJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGZpZ3VyZSA9IG5ldyBUSFJFRS5NZXNoKGdlb21ldHJ5LCBtYXRlcmlhbCk7XHJcblxyXG4gICAgICAgIGZpZ3VyZS5wb3NpdGlvbi54ID0gdGhpcy5jcmVhdGVSYW5kb21Db3JkaW5hdGVzKCd4Jyk7XHJcbiAgICAgICAgZmlndXJlLnBvc2l0aW9uLnkgPSB0aGlzLmNyZWF0ZVJhbmRvbUNvcmRpbmF0ZXMoJ3knKTtcclxuICAgICAgICBmaWd1cmUucG9zaXRpb24ueiA9IHRoaXMuY3JlYXRlUmFuZG9tQ29yZGluYXRlcygneicpO1xyXG5cclxuICAgICAgICBmaWd1cmUuZ2VvbWV0cnkuc2NhbGUoc2l6ZSwgc2l6ZSwgc2l6ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2NlbmUuYWRkKGZpZ3VyZSk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGl0ZW1faWQ6IFN0cmluZyhEYXRlLm5vdygpKSxcclxuICAgICAgICAgICAgdXVpZDogZmlndXJlLnV1aWQsXHJcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgIHNpemU6IHNpemUsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBnZW5lcmF0ZVJhbmRvbUNvcmRpbmF0ZShtaW4sIG1heCkge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluO1xyXG4gICAgfVxyXG5cclxuICAgIGNyZWF0ZVJhbmRvbUNvcmRpbmF0ZXMoYXhpcykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdlbmVyYXRlUmFuZG9tQ29yZGluYXRlKFxyXG4gICAgICAgICAgICB0aGlzLnJhbmRvbUNvb3JkaW5hdGVzTGltaXRzW2F4aXNdLm1pbixcclxuICAgICAgICAgICAgdGhpcy5yYW5kb21Db29yZGluYXRlc0xpbWl0c1theGlzXS5tYXhcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGRlbGV0ZUZpZ3VyZSh7IHV1aWQgfSkge1xyXG4gICAgICAgIGxldCByZW1vdmVGaWd1cmU7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zY2VuZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zY2VuZS5jaGlsZHJlbltpXS51dWlkID09PSB1dWlkKSB7XHJcbiAgICAgICAgICAgICAgICByZW1vdmVGaWd1cmUgPSB0aGlzLnNjZW5lLmNoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNjZW5lLnJlbW92ZShyZW1vdmVGaWd1cmUpO1xyXG4gICAgfVxyXG5cclxuICAgIF9hbmltYXRlKCkge1xyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLl9hbmltYXRlKCkpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhKTtcclxuICAgICAgICB0aGlzLmNvbnRyb2xzLnVwZGF0ZSgpO1xyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1Db250cm9sIHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2tzID0ge307XHJcbiAgICAgICAgdGhpcy5maWd1cmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlndXJlJyk7XHJcbiAgICAgICAgdGhpcy5yYW5nZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyYW5nZScpO1xyXG4gICAgICAgIHRoaXMuYWRkRmlndXJlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyZWF0ZS1maWd1cmUnKTtcclxuICAgICAgICB0aGlzLmxpc3RJdGVtcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaXN0LWZpZ3VyZScpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5hZGRGaWd1cmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLmFkZE5ld0ZpZ3VyZSgpKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGROZXdGaWd1cmUoKSB7XHJcbiAgICAgICAgdGhpcy5kaXNwYXRjaCgnYWRkRmlndXJlRXZlbnQnLCB7XHJcbiAgICAgICAgICAgIG5hbWU6IHRoaXMuZmlndXJlLnZhbHVlLFxyXG4gICAgICAgICAgICBzaXplOiB0aGlzLnJhbmdlLnZhbHVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZExpc3RJdGVtKGRhdGEpIHtcclxuICAgICAgICBjb25zdCBsYWJlbCA9IHRoaXMuY3JlYXRlTGlzdEVsZW1lbnQoe1xyXG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICBlbGVtZW50TmFtZTogJ2xhYmVsJyxcclxuICAgICAgICAgICAgY2xhc3NOYW1lOiAndGl0bGUnLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBkZWxCdXR0b24gPSB0aGlzLmNyZWF0ZUxpc3RFbGVtZW50KHtcclxuICAgICAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICAgICAgZWxlbWVudE5hbWU6ICdidXR0b24nLFxyXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdkZWxldGUnLFxyXG4gICAgICAgICAgICB0ZXh0OiAnZGVsZXRlJyxcclxuICAgICAgICAgICAgaWQ6ICdkZWxldGUnLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBsaXN0SXRlbSA9IHRoaXMuY3JlYXRlTGlzdEVsZW1lbnQoe1xyXG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICBlbGVtZW50TmFtZTogJ2xpJyxcclxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnbGlzdC1pdGVtJyxcclxuICAgICAgICAgICAgY2hpbGRzOiBbbGFiZWwsIGRlbEJ1dHRvbl0sXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuYmluZEV2ZW50KGxpc3RJdGVtKTtcclxuXHJcbiAgICAgICAgdGhpcy5saXN0SXRlbXMuYXBwZW5kQ2hpbGQobGlzdEl0ZW0pO1xyXG5cclxuICAgICAgICByZXR1cm4gbGlzdEl0ZW07XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlTGlzdEVsZW1lbnQoeyBkYXRhLCBlbGVtZW50TmFtZSwgY2xhc3NOYW1lLCB0ZXh0LCBpZCwgY2hpbGRzIH0pIHtcclxuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50TmFtZSk7XHJcbiAgICAgICAgY2xhc3NOYW1lICE9PSAnJyA/IChlbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzTmFtZSkgOiAnJztcclxuXHJcbiAgICAgICAgaWYgKGlkKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuaWQgPSBpZDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoY2xhc3NOYW1lID09PSAnbGlzdC1pdGVtJykge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5pZCA9IGRhdGEuaXRlbV9pZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZWxlbWVudC50ZXh0Q29udGVudCA9XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZSA9PT0gJ3RpdGxlJ1xyXG4gICAgICAgICAgICAgICAgPyBgJHtkYXRhLm5hbWUudG9VcHBlckNhc2UoKX06ICR7ZGF0YS5zaXplfSA6ICR7ZGF0YS51dWlkfWBcclxuICAgICAgICAgICAgICAgIDogdGV4dDtcclxuICAgICAgICBpZCA9PT0gJ2RlbGV0ZScgPyBlbGVtZW50LnNldEF0dHJpYnV0ZShgaXRlbS1pZGAsIGRhdGEuaXRlbV9pZCkgOiAnJztcclxuXHJcbiAgICAgICAgaWYgKGNoaWxkcykge1xyXG4gICAgICAgICAgICBjaGlsZHMuZm9yRWFjaCgoY2hpbGQpID0+IHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoY2hpbGQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRFdmVudChpdGVtKSB7XHJcbiAgICAgICAgY29uc3QgZGVsZXRlQnV0dG9uID0gaXRlbS5xdWVyeVNlbGVjdG9yKCdidXR0b24uZGVsZXRlJyk7XHJcblxyXG4gICAgICAgIGRlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuZGVsTGlzdEl0ZW0uYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsTGlzdEl0ZW0oZSkge1xyXG4gICAgICAgIGNvbnN0IGl0ZW1faWQgPSBlLnRhcmdldC5hdHRyaWJ1dGVzWzJdLnZhbHVlO1xyXG4gICAgICAgIHRoaXMuZGlzcGF0Y2goJ3JlbW92ZUZpZ3VyZUV2ZW50JywgeyBpdGVtX2lkOiBpdGVtX2lkIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBpdGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7ZS50YXJnZXQuYXR0cmlidXRlc1syXS52YWx1ZX1gKTtcclxuXHJcbiAgICAgICAgdGhpcy5saXN0SXRlbXMucmVtb3ZlQ2hpbGQoaXRlbSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLS0tLS0tLS0tLSBFVkVOVCBTWVNURU0gLS0tLS0tLS0tLVxyXG4gICAgc3Vic2NyaWJlKGV2ZW50TmFtZSwgY2IpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2FsbGJhY2tzW2V2ZW50TmFtZV0pIHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsYmFja3NbZXZlbnROYW1lXSA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNhbGxiYWNrc1tldmVudE5hbWVdLnB1c2goY2IpO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3BhdGNoKGV2ZW50TmFtZSwgcHJvcHMgPSB7fSkge1xyXG4gICAgICAgIGlmIChldmVudE5hbWUgaW4gdGhpcy5jYWxsYmFja3MpIHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsYmFja3NbZXZlbnROYW1lXS5mb3JFYWNoKChjYikgPT4gY2IocHJvcHMpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyAtLS0tLS0tLS0tIEVORCBPRiBFVkVOVCBTWVNURU0gLS0tLS0tLS0tLVxyXG59XHJcbiIsImltcG9ydCBBcHAgZnJvbSAnLi9BcHAnO1xyXG5cclxuY29uc3Qgcm9vdEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlld2VyJyk7XHJcbmNvbnN0IGFwcCA9IG5ldyBBcHAocm9vdEVsZW1lbnQpO1xyXG5hcHAuaW5pdCgpO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9