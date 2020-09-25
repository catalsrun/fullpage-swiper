webpackHotUpdate_N_E("pages/top-left",{

/***/ "./pages/top-left.js":
/*!***************************!*\
  !*** ./pages/top-left.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ \"./node_modules/@babel/runtime/helpers/esm/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ \"./node_modules/@babel/runtime/helpers/esm/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ \"./node_modules/@babel/runtime/helpers/esm/inherits.js\");\n/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ \"./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js\");\n/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/head */ \"./node_modules/next/dist/next-server/lib/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\nvar _jsxFileName = \"/Users/ylee/npm-packages/fullpage-swiper/examples/pages/top-left.js\";\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement;\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return Object(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(this, result); }; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\n\n\n\nvar TopLeft = /*#__PURE__*/function (_React$Component) {\n  Object(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(TopLeft, _React$Component);\n\n  var _super = _createSuper(TopLeft);\n\n  function TopLeft() {\n    Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, TopLeft);\n\n    return _super.apply(this, arguments);\n  }\n\n  Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(TopLeft, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      var FullpageSwiper = __webpack_require__(/*! ../../src/index */ \"../src/index.js\")[\"default\"];\n\n      new FullpageSwiper('#fullpage', {\n        debug: true,\n        // debug mode - default false\n        threshold: 10,\n        // touch detection minimum value\n        dragStart: function dragStart() {\n          console.log('DRAG_START: callback');\n        },\n        dragMove: function dragMove(context) {\n          var snapshotPositions = context.snapshotPositions,\n              stackMoveFromTo = context.stackMoveFromTo; // console.log('DRAG_MOVE: callback', snapshotPositions, stackMoveFromTo);\n        },\n        dragEnd: function dragEnd(context) {\n          // const { snapshotPositions, stackMoveFromTo } = context\n          console.log('DRAG_END: callback', context.currentIdx);\n        }\n      });\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      return __jsx(\"div\", {\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 27,\n          columnNumber: 5\n        }\n      }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_6___default.a, {\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 28,\n          columnNumber: 7\n        }\n      }, __jsx(\"title\", {\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 29,\n          columnNumber: 9\n        }\n      }, \"Top-left - Examples\")), __jsx(\"h2\", {\n        style: {\n          position: 'absolute',\n          top: 0,\n          right: 0,\n          marginRight: 10\n        },\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 31,\n          columnNumber: 7\n        }\n      }, \"Top-Left\"), __jsx(\"div\", {\n        id: \"fullpage\",\n        \"data-stack-type\": \"top\",\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 32,\n          columnNumber: 7\n        }\n      }, __jsx(\"section\", {\n        \"data-stack\": true,\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 33,\n          columnNumber: 9\n        }\n      }, __jsx(\"div\", {\n        \"data-stack-type\": \"top\",\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 34,\n          columnNumber: 11\n        }\n      }, __jsx(\"div\", {\n        \"data-stack\": true,\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 35,\n          columnNumber: 13\n        }\n      }, \"Group 1 (Child - Top-Down 1)\"), __jsx(\"div\", {\n        \"data-stack\": true,\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 36,\n          columnNumber: 13\n        }\n      }, \"Group 1 (Child - Top-Down 2)\"), __jsx(\"div\", {\n        \"data-stack\": true,\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 37,\n          columnNumber: 13\n        }\n      }, \"Group 1 (Child - Top-Down 3)\"))), __jsx(\"section\", {\n        \"data-stack\": true,\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 40,\n          columnNumber: 9\n        }\n      }, __jsx(\"div\", {\n        \"data-stack-type\": \"left\",\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 41,\n          columnNumber: 11\n        }\n      }, __jsx(\"div\", {\n        \"data-stack\": true,\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 42,\n          columnNumber: 13\n        }\n      }, \"Group 2 (Child - Left-Right 1)\"), __jsx(\"div\", {\n        \"data-stack\": true,\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 43,\n          columnNumber: 13\n        }\n      }, \"Group 2 (Child - Left-Right 2)\"), __jsx(\"div\", {\n        \"data-stack\": true,\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 44,\n          columnNumber: 13\n        }\n      }, \"Group 2 (Child - Left-Right 3)\"))), __jsx(\"section\", {\n        \"data-stack\": true,\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 47,\n          columnNumber: 9\n        }\n      }, __jsx(\"div\", {\n        \"data-stack-type\": \"top\",\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 48,\n          columnNumber: 11\n        }\n      }, __jsx(\"div\", {\n        \"data-stack\": true,\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 49,\n          columnNumber: 13\n        }\n      }, \"Group 3 (Child - Top-Down 1)\")))));\n    }\n  }]);\n\n  return TopLeft;\n}(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (TopLeft);\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvdG9wLWxlZnQuanM/ZWZmYiJdLCJuYW1lcyI6WyJUb3BMZWZ0IiwiRnVsbHBhZ2VTd2lwZXIiLCJyZXF1aXJlIiwiZGVidWciLCJ0aHJlc2hvbGQiLCJkcmFnU3RhcnQiLCJjb25zb2xlIiwibG9nIiwiZHJhZ01vdmUiLCJjb250ZXh0Iiwic25hcHNob3RQb3NpdGlvbnMiLCJzdGFja01vdmVGcm9tVG8iLCJkcmFnRW5kIiwiY3VycmVudElkeCIsInBvc2l0aW9uIiwidG9wIiwicmlnaHQiLCJtYXJnaW5SaWdodCIsIlJlYWN0IiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTs7SUFFTUEsTzs7Ozs7Ozs7Ozs7Ozt3Q0FDZ0I7QUFDbEIsVUFBTUMsY0FBYyxHQUFHQyxtQkFBTyxDQUFDLHdDQUFELENBQVAsV0FBdkI7O0FBRUEsVUFBSUQsY0FBSixDQUFtQixXQUFuQixFQUFnQztBQUM5QkUsYUFBSyxFQUFFLElBRHVCO0FBQ2pCO0FBQ2JDLGlCQUFTLEVBQUUsRUFGbUI7QUFFZjtBQUNmQyxpQkFIOEIsdUJBR2xCO0FBQ1ZDLGlCQUFPLENBQUNDLEdBQVIsQ0FBWSxzQkFBWjtBQUNELFNBTDZCO0FBTTlCQyxnQkFOOEIsb0JBTXJCQyxPQU5xQixFQU1aO0FBQUEsY0FDUkMsaUJBRFEsR0FDK0JELE9BRC9CLENBQ1JDLGlCQURRO0FBQUEsY0FDV0MsZUFEWCxHQUMrQkYsT0FEL0IsQ0FDV0UsZUFEWCxFQUVoQjtBQUNELFNBVDZCO0FBVTlCQyxlQVY4QixtQkFVdEJILE9BVnNCLEVBVWI7QUFDZjtBQUNBSCxpQkFBTyxDQUFDQyxHQUFSLENBQVksb0JBQVosRUFBa0NFLE9BQU8sQ0FBQ0ksVUFBMUM7QUFDRDtBQWI2QixPQUFoQztBQWVEOzs7NkJBRVE7QUFDUCxhQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FDRSxNQUFDLGdEQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FDRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLCtCQURGLENBREYsRUFJRTtBQUFJLGFBQUssRUFBRTtBQUFDQyxrQkFBUSxFQUFFLFVBQVg7QUFBdUJDLGFBQUcsRUFBRSxDQUE1QjtBQUErQkMsZUFBSyxFQUFFLENBQXRDO0FBQXlDQyxxQkFBVyxFQUFFO0FBQXRELFNBQVg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxvQkFKRixFQUtFO0FBQUssVUFBRSxFQUFDLFVBQVI7QUFBbUIsMkJBQWdCLEtBQW5DO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FDRTtBQUFTLDBCQUFUO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FDRTtBQUFLLDJCQUFnQixLQUFyQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQ0U7QUFBSywwQkFBTDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdDQURGLEVBRUU7QUFBSywwQkFBTDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdDQUZGLEVBR0U7QUFBSywwQkFBTDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHdDQUhGLENBREYsQ0FERixFQVFFO0FBQVMsMEJBQVQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUNFO0FBQUssMkJBQWdCLE1BQXJCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FDRTtBQUFLLDBCQUFMO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMENBREYsRUFFRTtBQUFLLDBCQUFMO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMENBRkYsRUFHRTtBQUFLLDBCQUFMO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsMENBSEYsQ0FERixDQVJGLEVBZUU7QUFBUywwQkFBVDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBQ0U7QUFBSywyQkFBZ0IsS0FBckI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUNFO0FBQUssMEJBQUw7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx3Q0FERixDQURGLENBZkYsQ0FMRixDQURBO0FBNkJEOzs7O0VBbkRtQkMsNENBQUssQ0FBQ0MsUzs7QUFzRGJuQixzRUFBZiIsImZpbGUiOiIuL3BhZ2VzL3RvcC1sZWZ0LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBIZWFkIGZyb20gJ25leHQvaGVhZCdcblxuY2xhc3MgVG9wTGVmdCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IEZ1bGxwYWdlU3dpcGVyID0gcmVxdWlyZSgnLi4vLi4vc3JjL2luZGV4JykuZGVmYXVsdDtcbiAgICBcbiAgICBuZXcgRnVsbHBhZ2VTd2lwZXIoJyNmdWxscGFnZScsIHtcbiAgICAgIGRlYnVnOiB0cnVlLCAvLyBkZWJ1ZyBtb2RlIC0gZGVmYXVsdCBmYWxzZVxuICAgICAgdGhyZXNob2xkOiAxMCwgLy8gdG91Y2ggZGV0ZWN0aW9uIG1pbmltdW0gdmFsdWVcbiAgICAgIGRyYWdTdGFydCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0RSQUdfU1RBUlQ6IGNhbGxiYWNrJyk7XG4gICAgICB9LFxuICAgICAgZHJhZ01vdmUoY29udGV4dCkge1xuICAgICAgICBjb25zdCB7IHNuYXBzaG90UG9zaXRpb25zLCBzdGFja01vdmVGcm9tVG8gfSA9IGNvbnRleHRcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ0RSQUdfTU9WRTogY2FsbGJhY2snLCBzbmFwc2hvdFBvc2l0aW9ucywgc3RhY2tNb3ZlRnJvbVRvKTtcbiAgICAgIH0sXG4gICAgICBkcmFnRW5kKGNvbnRleHQpIHtcbiAgICAgICAgLy8gY29uc3QgeyBzbmFwc2hvdFBvc2l0aW9ucywgc3RhY2tNb3ZlRnJvbVRvIH0gPSBjb250ZXh0XG4gICAgICAgIGNvbnNvbGUubG9nKCdEUkFHX0VORDogY2FsbGJhY2snLCBjb250ZXh0LmN1cnJlbnRJZHgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIDxIZWFkPlxuICAgICAgICA8dGl0bGU+VG9wLWxlZnQgLSBFeGFtcGxlczwvdGl0bGU+XG4gICAgICA8L0hlYWQ+XG4gICAgICA8aDIgc3R5bGU9e3twb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiAwLCByaWdodDogMCwgbWFyZ2luUmlnaHQ6IDEwfX0+VG9wLUxlZnQ8L2gyPlxuICAgICAgPGRpdiBpZD1cImZ1bGxwYWdlXCIgZGF0YS1zdGFjay10eXBlPVwidG9wXCI+XG4gICAgICAgIDxzZWN0aW9uIGRhdGEtc3RhY2s+XG4gICAgICAgICAgPGRpdiBkYXRhLXN0YWNrLXR5cGU9XCJ0b3BcIj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zdGFjaz5Hcm91cCAxIChDaGlsZCAtIFRvcC1Eb3duIDEpPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc3RhY2s+R3JvdXAgMSAoQ2hpbGQgLSBUb3AtRG93biAyKTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBkYXRhLXN0YWNrPkdyb3VwIDEgKENoaWxkIC0gVG9wLURvd24gMyk8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICA8c2VjdGlvbiBkYXRhLXN0YWNrPlxuICAgICAgICAgIDxkaXYgZGF0YS1zdGFjay10eXBlPVwibGVmdFwiPlxuICAgICAgICAgICAgPGRpdiBkYXRhLXN0YWNrPkdyb3VwIDIgKENoaWxkIC0gTGVmdC1SaWdodCAxKTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBkYXRhLXN0YWNrPkdyb3VwIDIgKENoaWxkIC0gTGVmdC1SaWdodCAyKTwvZGl2PlxuICAgICAgICAgICAgPGRpdiBkYXRhLXN0YWNrPkdyb3VwIDIgKENoaWxkIC0gTGVmdC1SaWdodCAzKTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgIDxzZWN0aW9uIGRhdGEtc3RhY2s+XG4gICAgICAgICAgPGRpdiBkYXRhLXN0YWNrLXR5cGU9XCJ0b3BcIj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zdGFjaz5Hcm91cCAzIChDaGlsZCAtIFRvcC1Eb3duIDEpPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvc2VjdGlvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUb3BMZWZ0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/top-left.js\n");

/***/ })

})