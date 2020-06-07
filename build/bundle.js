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
        this.scene.add(this.axesHelper);
        this.renderer.setSize(this.renderWidth, this.renderHeight);
        this.camera.position.z = 120;
        this.controls = new THREE.OrbitControls(
            this.camera,
            this.renderer.domElement
        );

        const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
        hemiLight.color.setHSL( 0.095, 1, 0.75 );
        hemiLight.groundColor.setHSL( 0.6, 1, 0.6 );
        hemiLight.position.set( 0, 100, 0 );
        this.scene.add( hemiLight );

        this._animate();
    }

    createFigure(name, size) {
        let geometry;
        let material;
        switch (name) {
            case 'Box':
                geometry = new THREE.BoxGeometry(1, 1, 1);
                material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
                break;
            case 'Sphere':
                geometry = new THREE.SphereGeometry(1, 32, 32);
                material = new THREE.MeshStandardMaterial({ color: 0x0000ff });
                break;
            case 'Pyramid':
                geometry = new THREE.CylinderGeometry(0, 1, 1, 4);
                material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvRGF0YVN0b3JlZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1ZpZXdlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvVmlld2VyRm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQThCO0FBQ1U7QUFDRDs7QUFFeEI7QUFDZjtBQUNBLDBCQUEwQiwrQ0FBTTtBQUNoQywrQkFBK0Isb0RBQVc7QUFDMUMsK0JBQStCLG1EQUFXO0FBQzFDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBLDBCQUEwQixhQUFhO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3ZDQTtBQUFBO0FBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsVUFBVTtBQUMzQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0IsVUFBVTtBQUMxQjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNoQ0E7QUFBQTtBQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQsa0JBQWtCO0FBQzdFO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRCxrQkFBa0I7QUFDN0U7QUFDQTtBQUNBO0FBQ0EsMkRBQTJELGtCQUFrQjtBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixPQUFPO0FBQ3pCOztBQUVBLHVCQUF1QixnQ0FBZ0M7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN2SEE7QUFBQTtBQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSx1QkFBdUIsaURBQWlEO0FBQ3hFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLHdCQUF3QixJQUFJLFVBQVUsS0FBSyxVQUFVO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEMsbUJBQW1COztBQUUvRCxnREFBZ0QsNkJBQTZCOztBQUU3RTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN6R0E7QUFBQTtBQUF3Qjs7QUFFeEI7QUFDQSxnQkFBZ0IsNENBQUc7QUFDbkIiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvYnVpbGQvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiaW1wb3J0IFZpZXdlciBmcm9tICcuL1ZpZXdlcic7XHJcbmltcG9ydCBEYXRhU3RvcmFnZSBmcm9tICcuL0RhdGFTdG9yZWdlJztcclxuaW1wb3J0IEZvcm1Db250cm9sIGZyb20gJy4vVmlld2VyRm9ybSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHAge1xyXG4gICAgY29uc3RydWN0b3Iodmlld2VyQ29udGFpbmVyKSB7XHJcbiAgICAgICAgdGhpcy52aWV3ZXIgPSBuZXcgVmlld2VyKHZpZXdlckNvbnRhaW5lcik7XHJcbiAgICAgICAgdGhpcy5kYXRhU3RvcmFnZSA9IG5ldyBEYXRhU3RvcmFnZSgpO1xyXG4gICAgICAgIHRoaXMuZm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuaW5pdCgpO1xyXG4gICAgICAgIHRoaXMudmlld2VyLmluaXQoKTtcclxuICAgICAgICB0aGlzLnNldExpc3RlbmVycygpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldExpc3RlbmVycygpIHtcclxuICAgICAgICB0aGlzLmZvcm1Db250cm9sLnN1YnNjcmliZSgnYWRkRmlndXJlRXZlbnQnLCAoZmlndXJlUHJvcHMpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbmV3RmlndXJlID0gdGhpcy5hZGROZXdGaWd1cmVUb1ZpZXdlcihmaWd1cmVQcm9wcyk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YVN0b3JhZ2Uuc2F2ZUl0ZW0obmV3RmlndXJlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZm9ybUNvbnRyb2wuYWRkTGlzdEl0ZW0obmV3RmlndXJlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5mb3JtQ29udHJvbC5zdWJzY3JpYmUoJ3JlbW92ZUZpZ3VyZUV2ZW50JywgKGl0ZW1faWQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZmlndXJlID0gdGhpcy5kYXRhU3RvcmFnZS5nZXRJdGVtQnlJZChpdGVtX2lkKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMudmlld2VyLmRlbGV0ZUZpZ3VyZShmaWd1cmUpO1xyXG4gICAgICAgICAgICB0aGlzLmRhdGFTdG9yYWdlLnJlbW92ZUl0ZW0oZmlndXJlKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhU3RvcmFnZS5nZXRBbGxJdGVtcygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZE5ld0ZpZ3VyZVRvVmlld2VyKHsgbmFtZSwgc2l6ZSB9KSB7XHJcbiAgICAgICAgbGV0IG5ld0ZpZ3VyZSA9IHRoaXMudmlld2VyLmNyZWF0ZUZpZ3VyZShuYW1lLCBzaXplKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ld0ZpZ3VyZTtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRhU3RvcmFnZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmZpZ3VyZURhdGFMaXN0ID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZUl0ZW0oZGF0YSkge1xyXG4gICAgICAgIGlmIChkYXRhID09PSAnJykgcmV0dXJuIGFsZXJ0KCdObyBkYXRhIHRvIGFkZCEnKTtcclxuXHJcbiAgICAgICAgdGhpcy5maWd1cmVEYXRhTGlzdC5wdXNoKGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEFsbEl0ZW1zKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZpZ3VyZURhdGFMaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIGdldEl0ZW1CeUlkKHsgaXRlbV9pZCB9KSB7XHJcbiAgICAgICAgaWYgKGl0ZW1faWQgPT09ICcnKSBhbGVydCgnV2hpY2ggaXRlbSB0byBmaW5kPyAnKTtcclxuXHJcbiAgICAgICAgbGV0IGZpbmRJdGVtID0gdGhpcy5maWd1cmVEYXRhTGlzdC5maW5kKChpdGVtKSA9PiBpdGVtLml0ZW1faWQgPT09IGl0ZW1faWQpO1xyXG5cclxuICAgICAgICBpZiAoZmluZEl0ZW0gIT09ICcnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmaW5kSXRlbTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhbGVydCgnU3VjaCBhbiBlbGVtZW50IGRvZXMgbm90IGV4aXN0IScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW1vdmVJdGVtKHsgaXRlbV9pZCB9KSB7XHJcbiAgICAgICAgdGhpcy5maWd1cmVEYXRhTGlzdC5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBpdGVtLml0ZW1faWQgPT09IGl0ZW1faWQgPyB0aGlzLmZpZ3VyZURhdGFMaXN0LnNwbGljZShpbmRleCwgMSkgOiAnJztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3ZXIge1xyXG4gICAgY29uc3RydWN0b3Iodmlld2VyQ29udGFpbmVyKSB7XHJcbiAgICAgICAgdGhpcy52aWV3ZXJDb250YWluZXIgPSB2aWV3ZXJDb250YWluZXI7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBUSFJFRS5XZWJHTFJlbmRlcmVyKCk7XHJcbiAgICAgICAgdGhpcy52aWV3ZXJDb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXJlci5kb21FbGVtZW50KTtcclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJIZWlnaHQgPSB0aGlzLnZpZXdlckNvbnRhaW5lci5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJXaWR0aCA9IHRoaXMudmlld2VyQ29udGFpbmVyLm9mZnNldFdpZHRoO1xyXG5cclxuICAgICAgICB0aGlzLnNjZW5lID0gbmV3IFRIUkVFLlNjZW5lKCk7XHJcbiAgICAgICAgdGhpcy5heGVzSGVscGVyID0gbmV3IFRIUkVFLkF4ZXNIZWxwZXIoMTUpO1xyXG4gICAgICAgIHRoaXMuY2FtZXJhID0gbmV3IFRIUkVFLlBlcnNwZWN0aXZlQ2FtZXJhKFxyXG4gICAgICAgICAgICAyNSxcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJXaWR0aCAvIHRoaXMucmVuZGVySGVpZ2h0LFxyXG4gICAgICAgICAgICAwLjEsXHJcbiAgICAgICAgICAgIDEwMDBcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICB0aGlzLnJhbmRvbUNvb3JkaW5hdGVzTGltaXRzID0ge1xyXG4gICAgICAgICAgICB4OiB7XHJcbiAgICAgICAgICAgICAgICBtaW46IC0zMCxcclxuICAgICAgICAgICAgICAgIG1heDogMzAsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHk6IHtcclxuICAgICAgICAgICAgICAgIG1pbjogLTE3LFxyXG4gICAgICAgICAgICAgICAgbWF4OiAxNyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgejoge1xyXG4gICAgICAgICAgICAgICAgbWluOiAtMzAsXHJcbiAgICAgICAgICAgICAgICBtYXg6IDMwLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmF4ZXNIZWxwZXIpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U2l6ZSh0aGlzLnJlbmRlcldpZHRoLCB0aGlzLnJlbmRlckhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5jYW1lcmEucG9zaXRpb24ueiA9IDEyMDtcclxuICAgICAgICB0aGlzLmNvbnRyb2xzID0gbmV3IFRIUkVFLk9yYml0Q29udHJvbHMoXHJcbiAgICAgICAgICAgIHRoaXMuY2FtZXJhLFxyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnRcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBjb25zdCBoZW1pTGlnaHQgPSBuZXcgVEhSRUUuSGVtaXNwaGVyZUxpZ2h0KCAweGZmZmZmZiwgMHhmZmZmZmYsIDAuNiApO1xyXG4gICAgICAgIGhlbWlMaWdodC5jb2xvci5zZXRIU0woIDAuMDk1LCAxLCAwLjc1ICk7XHJcbiAgICAgICAgaGVtaUxpZ2h0Lmdyb3VuZENvbG9yLnNldEhTTCggMC42LCAxLCAwLjYgKTtcclxuICAgICAgICBoZW1pTGlnaHQucG9zaXRpb24uc2V0KCAwLCAxMDAsIDAgKTtcclxuICAgICAgICB0aGlzLnNjZW5lLmFkZCggaGVtaUxpZ2h0ICk7XHJcblxyXG4gICAgICAgIHRoaXMuX2FuaW1hdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVGaWd1cmUobmFtZSwgc2l6ZSkge1xyXG4gICAgICAgIGxldCBnZW9tZXRyeTtcclxuICAgICAgICBsZXQgbWF0ZXJpYWw7XHJcbiAgICAgICAgc3dpdGNoIChuYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ0JveCc6XHJcbiAgICAgICAgICAgICAgICBnZW9tZXRyeSA9IG5ldyBUSFJFRS5Cb3hHZW9tZXRyeSgxLCAxLCAxKTtcclxuICAgICAgICAgICAgICAgIG1hdGVyaWFsID0gbmV3IFRIUkVFLk1lc2hTdGFuZGFyZE1hdGVyaWFsKHsgY29sb3I6IDB4MDBmZjAwIH0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ1NwaGVyZSc6XHJcbiAgICAgICAgICAgICAgICBnZW9tZXRyeSA9IG5ldyBUSFJFRS5TcGhlcmVHZW9tZXRyeSgxLCAzMiwgMzIpO1xyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoeyBjb2xvcjogMHgwMDAwZmYgfSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnUHlyYW1pZCc6XHJcbiAgICAgICAgICAgICAgICBnZW9tZXRyeSA9IG5ldyBUSFJFRS5DeWxpbmRlckdlb21ldHJ5KDAsIDEsIDEsIDQpO1xyXG4gICAgICAgICAgICAgICAgbWF0ZXJpYWwgPSBuZXcgVEhSRUUuTWVzaFN0YW5kYXJkTWF0ZXJpYWwoeyBjb2xvcjogMHhmZjAwMDAgfSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCdTb21ldGhpbmcgd2VudCB3cm9uZyEgOkQnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZmlndXJlID0gbmV3IFRIUkVFLk1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKTtcclxuXHJcbiAgICAgICAgZmlndXJlLnBvc2l0aW9uLnggPSB0aGlzLmNyZWF0ZVJhbmRvbUNvcmRpbmF0ZXMoJ3gnKTtcclxuICAgICAgICBmaWd1cmUucG9zaXRpb24ueSA9IHRoaXMuY3JlYXRlUmFuZG9tQ29yZGluYXRlcygneScpO1xyXG4gICAgICAgIGZpZ3VyZS5wb3NpdGlvbi56ID0gdGhpcy5jcmVhdGVSYW5kb21Db3JkaW5hdGVzKCd6Jyk7XHJcblxyXG4gICAgICAgIGZpZ3VyZS5nZW9tZXRyeS5zY2FsZShzaXplLCBzaXplLCBzaXplKTtcclxuXHJcbiAgICAgICAgdGhpcy5zY2VuZS5hZGQoZmlndXJlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgaXRlbV9pZDogU3RyaW5nKERhdGUubm93KCkpLFxyXG4gICAgICAgICAgICB1dWlkOiBmaWd1cmUudXVpZCxcclxuICAgICAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICAgICAgc2l6ZTogc2l6ZSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGdlbmVyYXRlUmFuZG9tQ29yZGluYXRlKG1pbiwgbWF4KSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlUmFuZG9tQ29yZGluYXRlcyhheGlzKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVSYW5kb21Db3JkaW5hdGUoXHJcbiAgICAgICAgICAgIHRoaXMucmFuZG9tQ29vcmRpbmF0ZXNMaW1pdHNbYXhpc10ubWluLFxyXG4gICAgICAgICAgICB0aGlzLnJhbmRvbUNvb3JkaW5hdGVzTGltaXRzW2F4aXNdLm1heFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlRmlndXJlKHsgdXVpZCB9KSB7XHJcbiAgICAgICAgbGV0IHJlbW92ZUZpZ3VyZTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNjZW5lLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNjZW5lLmNoaWxkcmVuW2ldLnV1aWQgPT09IHV1aWQpIHtcclxuICAgICAgICAgICAgICAgIHJlbW92ZUZpZ3VyZSA9IHRoaXMuc2NlbmUuY2hpbGRyZW5baV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2NlbmUucmVtb3ZlKHJlbW92ZUZpZ3VyZSk7XHJcbiAgICB9XHJcblxyXG4gICAgX2FuaW1hdGUoKSB7XHJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuX2FuaW1hdGUoKSk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIodGhpcy5zY2VuZSwgdGhpcy5jYW1lcmEpO1xyXG4gICAgICAgIHRoaXMuY29udHJvbHMudXBkYXRlKCk7XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybUNvbnRyb2wge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja3MgPSB7fTtcclxuICAgICAgICB0aGlzLmZpZ3VyZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWd1cmUnKTtcclxuICAgICAgICB0aGlzLnJhbmdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JhbmdlJyk7XHJcbiAgICAgICAgdGhpcy5hZGRGaWd1cmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3JlYXRlLWZpZ3VyZScpO1xyXG4gICAgICAgIHRoaXMubGlzdEl0ZW1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpc3QtZmlndXJlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICB0aGlzLmFkZEZpZ3VyZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuYWRkTmV3RmlndXJlKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZE5ld0ZpZ3VyZSgpIHtcclxuICAgICAgICB0aGlzLmRpc3BhdGNoKCdhZGRGaWd1cmVFdmVudCcsIHtcclxuICAgICAgICAgICAgbmFtZTogdGhpcy5maWd1cmUudmFsdWUsXHJcbiAgICAgICAgICAgIHNpemU6IHRoaXMucmFuZ2UudmFsdWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkTGlzdEl0ZW0oZGF0YSkge1xyXG4gICAgICAgIGNvbnN0IGxhYmVsID0gdGhpcy5jcmVhdGVMaXN0RWxlbWVudCh7XHJcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgIGVsZW1lbnROYW1lOiAnbGFiZWwnLFxyXG4gICAgICAgICAgICBjbGFzc05hbWU6ICd0aXRsZScsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGRlbEJ1dHRvbiA9IHRoaXMuY3JlYXRlTGlzdEVsZW1lbnQoe1xyXG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxyXG4gICAgICAgICAgICBlbGVtZW50TmFtZTogJ2J1dHRvbicsXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2RlbGV0ZScsXHJcbiAgICAgICAgICAgIHRleHQ6ICdkZWxldGUnLFxyXG4gICAgICAgICAgICBpZDogJ2RlbGV0ZScsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGxpc3RJdGVtID0gdGhpcy5jcmVhdGVMaXN0RWxlbWVudCh7XHJcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgICAgIGVsZW1lbnROYW1lOiAnbGknLFxyXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdsaXN0LWl0ZW0nLFxyXG4gICAgICAgICAgICBjaGlsZHM6IFtsYWJlbCwgZGVsQnV0dG9uXSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5iaW5kRXZlbnQobGlzdEl0ZW0pO1xyXG5cclxuICAgICAgICB0aGlzLmxpc3RJdGVtcy5hcHBlbmRDaGlsZChsaXN0SXRlbSk7XHJcblxyXG4gICAgICAgIHJldHVybiBsaXN0SXRlbTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVMaXN0RWxlbWVudCh7IGRhdGEsIGVsZW1lbnROYW1lLCBjbGFzc05hbWUsIHRleHQsIGlkLCBjaGlsZHMgfSkge1xyXG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnROYW1lKTtcclxuICAgICAgICBjbGFzc05hbWUgIT09ICcnID8gKGVsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3NOYW1lKSA6ICcnO1xyXG5cclxuICAgICAgICBpZiAoaWQpIHtcclxuICAgICAgICAgICAgZWxlbWVudC5pZCA9IGlkO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChjbGFzc05hbWUgPT09ICdsaXN0LWl0ZW0nKSB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50LmlkID0gZGF0YS5pdGVtX2lkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlbGVtZW50LnRleHRDb250ZW50ID1cclxuICAgICAgICAgICAgY2xhc3NOYW1lID09PSAndGl0bGUnXHJcbiAgICAgICAgICAgICAgICA/IGAke2RhdGEubmFtZS50b1VwcGVyQ2FzZSgpfTogJHtkYXRhLnNpemV9IDogJHtkYXRhLnV1aWR9YFxyXG4gICAgICAgICAgICAgICAgOiB0ZXh0O1xyXG4gICAgICAgIGlkID09PSAnZGVsZXRlJyA/IGVsZW1lbnQuc2V0QXR0cmlidXRlKGBpdGVtLWlkYCwgZGF0YS5pdGVtX2lkKSA6ICcnO1xyXG5cclxuICAgICAgICBpZiAoY2hpbGRzKSB7XHJcbiAgICAgICAgICAgIGNoaWxkcy5mb3JFYWNoKChjaGlsZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChjaGlsZCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZEV2ZW50KGl0ZW0pIHtcclxuICAgICAgICBjb25zdCBkZWxldGVCdXR0b24gPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbi5kZWxldGUnKTtcclxuXHJcbiAgICAgICAgZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5kZWxMaXN0SXRlbS5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBkZWxMaXN0SXRlbShlKSB7XHJcbiAgICAgICAgY29uc3QgaXRlbV9pZCA9IGUudGFyZ2V0LmF0dHJpYnV0ZXNbMl0udmFsdWU7XHJcbiAgICAgICAgdGhpcy5kaXNwYXRjaCgncmVtb3ZlRmlndXJlRXZlbnQnLCB7IGl0ZW1faWQ6IGl0ZW1faWQgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtlLnRhcmdldC5hdHRyaWJ1dGVzWzJdLnZhbHVlfWApO1xyXG5cclxuICAgICAgICB0aGlzLmxpc3RJdGVtcy5yZW1vdmVDaGlsZChpdGVtKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAtLS0tLS0tLS0tIEVWRU5UIFNZU1RFTSAtLS0tLS0tLS0tXHJcbiAgICBzdWJzY3JpYmUoZXZlbnROYW1lLCBjYikge1xyXG4gICAgICAgIGlmICghdGhpcy5jYWxsYmFja3NbZXZlbnROYW1lXSkge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrc1tldmVudE5hbWVdID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2FsbGJhY2tzW2V2ZW50TmFtZV0ucHVzaChjYik7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcGF0Y2goZXZlbnROYW1lLCBwcm9wcyA9IHt9KSB7XHJcbiAgICAgICAgaWYgKGV2ZW50TmFtZSBpbiB0aGlzLmNhbGxiYWNrcykge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrc1tldmVudE5hbWVdLmZvckVhY2goKGNiKSA9PiBjYihwcm9wcykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIC0tLS0tLS0tLS0gRU5EIE9GIEVWRU5UIFNZU1RFTSAtLS0tLS0tLS0tXHJcbn1cclxuIiwiaW1wb3J0IEFwcCBmcm9tICcuL0FwcCc7XHJcblxyXG5jb25zdCByb290RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWV3ZXInKTtcclxuY29uc3QgYXBwID0gbmV3IEFwcChyb290RWxlbWVudCk7XHJcbmFwcC5pbml0KCk7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=