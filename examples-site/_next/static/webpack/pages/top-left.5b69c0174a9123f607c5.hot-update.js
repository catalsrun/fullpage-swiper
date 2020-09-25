webpackHotUpdate_N_E("pages/top-left",{

/***/ "./pages/top-left.js":
/*!***************************!*\
  !*** ./pages/top-left.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/classCallCheck */ \"./node_modules/@babel/runtime/helpers/esm/classCallCheck.js\");\n/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/createClass */ \"./node_modules/@babel/runtime/helpers/esm/createClass.js\");\n/* harmony import */ var _babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inherits */ \"./node_modules/@babel/runtime/helpers/esm/inherits.js\");\n/* harmony import */ var _babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/esm/possibleConstructorReturn */ \"./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js\");\n/* harmony import */ var _babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/esm/getPrototypeOf */ \"./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/head */ \"./node_modules/next/dist/next-server/lib/head.js\");\n/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\nvar _jsxFileName = \"/Users/ylee/npm-packages/fullpage-swiper/examples/pages/top-left.js\";\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement;\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = Object(_babel_runtime_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return Object(_babel_runtime_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(this, result); }; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\n\n\n\nvar TopLeft = /*#__PURE__*/function (_React$Component) {\n  Object(_babel_runtime_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(TopLeft, _React$Component);\n\n  var _super = _createSuper(TopLeft);\n\n  function TopLeft() {\n    Object(_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this, TopLeft);\n\n    return _super.apply(this, arguments);\n  }\n\n  Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(TopLeft, [{\n    key: \"componentDidMount\",\n    value: function componentDidMount() {\n      var FullpageSwiper = __webpack_require__(/*! ../../src/index */ \"../src/index.js\")[\"default\"];\n\n      new FullpageSwiper('#fullpage', {\n        debug: true,\n        // debug mode - default false\n        threshold: 10,\n        // touch detection minimum value\n        dragStart: function dragStart() {\n          console.log('DRAG_START: callback');\n        },\n        dragMove: function dragMove(context) {\n          var snapshotPositions = context.snapshotPositions,\n              stackMoveFromTo = context.stackMoveFromTo; // console.log('DRAG_MOVE: callback', snapshotPositions, stackMoveFromTo);\n        },\n        dragEnd: function dragEnd(context) {\n          // const { snapshotPositions, stackMoveFromTo } = context\n          console.log('DRAG_END: callback', context.currentIdx);\n        }\n      });\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      return __jsx(\"div\", {\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 27,\n          columnNumber: 5\n        }\n      }, __jsx(next_head__WEBPACK_IMPORTED_MODULE_6___default.a, {\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 28,\n          columnNumber: 7\n        }\n      }, __jsx(\"title\", {\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 29,\n          columnNumber: 9\n        }\n      }, \"Top-left - Examples\")), __jsx(\"h2\", {\n        style: {\n          position: 'absolute',\n          top: 0,\n          right: 0,\n          marginRight: 10\n        },\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 31,\n          columnNumber: 7\n        }\n      }, \"Top-Left\"), __jsx(\"div\", {\n        id: \"fullpage\",\n        \"data-stack-type\": \"top\",\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 32,\n          columnNumber: 7\n        }\n      }, __jsx(\"section\", {\n        \"data-stack\": true,\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 33,\n          columnNumber: 9\n        }\n      }, __jsx(\"div\", {\n        \"data-stack-type\": \"top\",\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 34,\n          columnNumber: 11\n        }\n      }, __jsx(\"div\", {\n        \"data-stack\": true,\n        style: \"overflow:hidden\",\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 35,\n          columnNumber: 13\n        }\n      }, __jsx(\"h2\", {\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 36,\n          columnNumber: 15\n        }\n      }, \"Group 1 (Child - Top-Down 1)\"), __jsx(\"p\", {\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 37,\n          columnNumber: 15\n        }\n      }, \"hi\"), __jsx(\"p\", {\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 38,\n          columnNumber: 15\n        }\n      }, \"hi\"), __jsx(\"p\", {\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 39,\n          columnNumber: 15\n        }\n      }, \"hi\"), __jsx(\"p\", {\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 40,\n          columnNumber: 15\n        }\n      }, \"hi\"), __jsx(\"p\", {\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 41,\n          columnNumber: 15\n        }\n      }, \"hi\"), __jsx(\"p\", {\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 42,\n          columnNumber: 15\n        }\n      }, \"hi\"), __jsx(\"p\", {\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 43,\n          columnNumber: 15\n        }\n      }, \"hi\"), __jsx(\"p\", {\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 44,\n          columnNumber: 15\n        }\n      }, \"hi\"), __jsx(\"p\", {\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 45,\n          columnNumber: 15\n        }\n      }, \"hi\"), __jsx(\"p\", {\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 46,\n          columnNumber: 15\n        }\n      }, \"hi\"), __jsx(\"p\", {\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 47,\n          columnNumber: 15\n        }\n      }, \"hi\"), __jsx(\"p\", {\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 48,\n          columnNumber: 15\n        }\n      }, \"hi\"), __jsx(\"p\", {\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 49,\n          columnNumber: 15\n        }\n      }, \"hi\"), __jsx(\"p\", {\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 50,\n          columnNumber: 15\n        }\n      }, \"hi\"), __jsx(\"p\", {\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 51,\n          columnNumber: 15\n        }\n      }, \"hi\"), __jsx(\"p\", {\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 52,\n          columnNumber: 15\n        }\n      }, \"hi\"), __jsx(\"p\", {\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 53,\n          columnNumber: 15\n        }\n      }, \"hi\"), __jsx(\"p\", {\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 54,\n          columnNumber: 15\n        }\n      }, \"hi\"), __jsx(\"p\", {\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 55,\n          columnNumber: 15\n        }\n      }, \"hi\")), __jsx(\"div\", {\n        \"data-stack\": true,\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 57,\n          columnNumber: 13\n        }\n      }, \"Group 1 (Child - Top-Down 2)\"), __jsx(\"div\", {\n        \"data-stack\": true,\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 58,\n          columnNumber: 13\n        }\n      }, \"Group 1 (Child - Top-Down 3)\"))), __jsx(\"section\", {\n        \"data-stack\": true,\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 61,\n          columnNumber: 9\n        }\n      }, __jsx(\"div\", {\n        \"data-stack-type\": \"left\",\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 62,\n          columnNumber: 11\n        }\n      }, __jsx(\"div\", {\n        \"data-stack\": true,\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 63,\n          columnNumber: 13\n        }\n      }, \"Group 2 (Child - Left-Right 1)\"), __jsx(\"div\", {\n        \"data-stack\": true,\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 64,\n          columnNumber: 13\n        }\n      }, \"Group 2 (Child - Left-Right 2)\"), __jsx(\"div\", {\n        \"data-stack\": true,\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 65,\n          columnNumber: 13\n        }\n      }, \"Group 2 (Child - Left-Right 3)\"))), __jsx(\"section\", {\n        \"data-stack\": true,\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 68,\n          columnNumber: 9\n        }\n      }, __jsx(\"div\", {\n        \"data-stack-type\": \"top\",\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 69,\n          columnNumber: 11\n        }\n      }, __jsx(\"div\", {\n        \"data-stack\": true,\n        __self: this,\n        __source: {\n          fileName: _jsxFileName,\n          lineNumber: 70,\n          columnNumber: 13\n        }\n      }, \"Group 3 (Child - Top-Down 1)\")))));\n    }\n  }]);\n\n  return TopLeft;\n}(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (TopLeft);\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vcGFnZXMvdG9wLWxlZnQuanM/ZWZmYiJdLCJuYW1lcyI6WyJUb3BMZWZ0IiwiRnVsbHBhZ2VTd2lwZXIiLCJyZXF1aXJlIiwiZGVidWciLCJ0aHJlc2hvbGQiLCJkcmFnU3RhcnQiLCJjb25zb2xlIiwibG9nIiwiZHJhZ01vdmUiLCJjb250ZXh0Iiwic25hcHNob3RQb3NpdGlvbnMiLCJzdGFja01vdmVGcm9tVG8iLCJkcmFnRW5kIiwiY3VycmVudElkeCIsInBvc2l0aW9uIiwidG9wIiwicmlnaHQiLCJtYXJnaW5SaWdodCIsIlJlYWN0IiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTs7SUFFTUEsTzs7Ozs7Ozs7Ozs7Ozt3Q0FDZ0I7QUFDbEIsVUFBTUMsY0FBYyxHQUFHQyxtQkFBTyxDQUFDLHdDQUFELENBQVAsV0FBdkI7O0FBRUEsVUFBSUQsY0FBSixDQUFtQixXQUFuQixFQUFnQztBQUM5QkUsYUFBSyxFQUFFLElBRHVCO0FBQ2pCO0FBQ2JDLGlCQUFTLEVBQUUsRUFGbUI7QUFFZjtBQUNmQyxpQkFIOEIsdUJBR2xCO0FBQ1ZDLGlCQUFPLENBQUNDLEdBQVIsQ0FBWSxzQkFBWjtBQUNELFNBTDZCO0FBTTlCQyxnQkFOOEIsb0JBTXJCQyxPQU5xQixFQU1aO0FBQUEsY0FDUkMsaUJBRFEsR0FDK0JELE9BRC9CLENBQ1JDLGlCQURRO0FBQUEsY0FDV0MsZUFEWCxHQUMrQkYsT0FEL0IsQ0FDV0UsZUFEWCxFQUVoQjtBQUNELFNBVDZCO0FBVTlCQyxlQVY4QixtQkFVdEJILE9BVnNCLEVBVWI7QUFDZjtBQUNBSCxpQkFBTyxDQUFDQyxHQUFSLENBQVksb0JBQVosRUFBa0NFLE9BQU8sQ0FBQ0ksVUFBMUM7QUFDRDtBQWI2QixPQUFoQztBQWVEOzs7NkJBRVE7QUFDUCxhQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FDRSxNQUFDLGdEQUFE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O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwwQ0FIRixDQURGLENBN0JGLEVBb0NFO0FBQVMsMEJBQVQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUNFO0FBQUssMkJBQWdCLEtBQXJCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FDRTtBQUFLLDBCQUFMO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsd0NBREYsQ0FERixDQXBDRixDQUxGLENBREE7QUFrREQ7Ozs7RUF4RW1CQyw0Q0FBSyxDQUFDQyxTOztBQTJFYm5CLHNFQUFmIiwiZmlsZSI6Ii4vcGFnZXMvdG9wLWxlZnQuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJ1xuXG5jbGFzcyBUb3BMZWZ0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3QgRnVsbHBhZ2VTd2lwZXIgPSByZXF1aXJlKCcuLi8uLi9zcmMvaW5kZXgnKS5kZWZhdWx0O1xuICAgIFxuICAgIG5ldyBGdWxscGFnZVN3aXBlcignI2Z1bGxwYWdlJywge1xuICAgICAgZGVidWc6IHRydWUsIC8vIGRlYnVnIG1vZGUgLSBkZWZhdWx0IGZhbHNlXG4gICAgICB0aHJlc2hvbGQ6IDEwLCAvLyB0b3VjaCBkZXRlY3Rpb24gbWluaW11bSB2YWx1ZVxuICAgICAgZHJhZ1N0YXJ0KCkge1xuICAgICAgICBjb25zb2xlLmxvZygnRFJBR19TVEFSVDogY2FsbGJhY2snKTtcbiAgICAgIH0sXG4gICAgICBkcmFnTW92ZShjb250ZXh0KSB7XG4gICAgICAgIGNvbnN0IHsgc25hcHNob3RQb3NpdGlvbnMsIHN0YWNrTW92ZUZyb21UbyB9ID0gY29udGV4dFxuICAgICAgICAvLyBjb25zb2xlLmxvZygnRFJBR19NT1ZFOiBjYWxsYmFjaycsIHNuYXBzaG90UG9zaXRpb25zLCBzdGFja01vdmVGcm9tVG8pO1xuICAgICAgfSxcbiAgICAgIGRyYWdFbmQoY29udGV4dCkge1xuICAgICAgICAvLyBjb25zdCB7IHNuYXBzaG90UG9zaXRpb25zLCBzdGFja01vdmVGcm9tVG8gfSA9IGNvbnRleHRcbiAgICAgICAgY29uc29sZS5sb2coJ0RSQUdfRU5EOiBjYWxsYmFjaycsIGNvbnRleHQuY3VycmVudElkeCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPEhlYWQ+XG4gICAgICAgIDx0aXRsZT5Ub3AtbGVmdCAtIEV4YW1wbGVzPC90aXRsZT5cbiAgICAgIDwvSGVhZD5cbiAgICAgIDxoMiBzdHlsZT17e3Bvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6IDAsIHJpZ2h0OiAwLCBtYXJnaW5SaWdodDogMTB9fT5Ub3AtTGVmdDwvaDI+XG4gICAgICA8ZGl2IGlkPVwiZnVsbHBhZ2VcIiBkYXRhLXN0YWNrLXR5cGU9XCJ0b3BcIj5cbiAgICAgICAgPHNlY3Rpb24gZGF0YS1zdGFjaz5cbiAgICAgICAgICA8ZGl2IGRhdGEtc3RhY2stdHlwZT1cInRvcFwiPlxuICAgICAgICAgICAgPGRpdiBkYXRhLXN0YWNrIHN0eWxlPVwib3ZlcmZsb3c6aGlkZGVuXCI+XG4gICAgICAgICAgICAgIDxoMj5Hcm91cCAxIChDaGlsZCAtIFRvcC1Eb3duIDEpPC9oMj5cbiAgICAgICAgICAgICAgPHA+aGk8L3A+XG4gICAgICAgICAgICAgIDxwPmhpPC9wPlxuICAgICAgICAgICAgICA8cD5oaTwvcD5cbiAgICAgICAgICAgICAgPHA+aGk8L3A+XG4gICAgICAgICAgICAgIDxwPmhpPC9wPlxuICAgICAgICAgICAgICA8cD5oaTwvcD5cbiAgICAgICAgICAgICAgPHA+aGk8L3A+XG4gICAgICAgICAgICAgIDxwPmhpPC9wPlxuICAgICAgICAgICAgICA8cD5oaTwvcD5cbiAgICAgICAgICAgICAgPHA+aGk8L3A+XG4gICAgICAgICAgICAgIDxwPmhpPC9wPlxuICAgICAgICAgICAgICA8cD5oaTwvcD5cbiAgICAgICAgICAgICAgPHA+aGk8L3A+XG4gICAgICAgICAgICAgIDxwPmhpPC9wPlxuICAgICAgICAgICAgICA8cD5oaTwvcD5cbiAgICAgICAgICAgICAgPHA+aGk8L3A+XG4gICAgICAgICAgICAgIDxwPmhpPC9wPlxuICAgICAgICAgICAgICA8cD5oaTwvcD5cbiAgICAgICAgICAgICAgPHA+aGk8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgZGF0YS1zdGFjaz5Hcm91cCAxIChDaGlsZCAtIFRvcC1Eb3duIDIpPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc3RhY2s+R3JvdXAgMSAoQ2hpbGQgLSBUb3AtRG93biAzKTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgIDxzZWN0aW9uIGRhdGEtc3RhY2s+XG4gICAgICAgICAgPGRpdiBkYXRhLXN0YWNrLXR5cGU9XCJsZWZ0XCI+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc3RhY2s+R3JvdXAgMiAoQ2hpbGQgLSBMZWZ0LVJpZ2h0IDEpPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc3RhY2s+R3JvdXAgMiAoQ2hpbGQgLSBMZWZ0LVJpZ2h0IDIpPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGRhdGEtc3RhY2s+R3JvdXAgMiAoQ2hpbGQgLSBMZWZ0LVJpZ2h0IDMpPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgPHNlY3Rpb24gZGF0YS1zdGFjaz5cbiAgICAgICAgICA8ZGl2IGRhdGEtc3RhY2stdHlwZT1cInRvcFwiPlxuICAgICAgICAgICAgPGRpdiBkYXRhLXN0YWNrPkdyb3VwIDMgKENoaWxkIC0gVG9wLURvd24gMSk8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRvcExlZnQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pages/top-left.js\n");

/***/ })

})