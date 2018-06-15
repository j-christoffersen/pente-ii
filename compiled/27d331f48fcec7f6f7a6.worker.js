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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/src/workers/getNextMove.worker.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/src/config.js":
/*!******************************!*\
  !*** ./client/src/config.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar N = exports.N = 17;\n\nvar COMPUTER_WAIT_TIME = exports.COMPUTER_WAIT_TIME = 0;\n\nvar DIFFICULTY = exports.DIFFICULTY = 3;\n\n//# sourceURL=webpack:///./client/src/config.js?");

/***/ }),

/***/ "./client/src/helpers/Evaluation.js":
/*!******************************************!*\
  !*** ./client/src/helpers/Evaluation.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _config = __webpack_require__(/*! ../config */ \"./client/src/config.js\");\n\nvar _GameState = __webpack_require__(/*! ./GameState */ \"./client/src/helpers/GameState.js\");\n\nvar _GameState2 = _interopRequireDefault(_GameState);\n\nvar _Trie = __webpack_require__(/*! ../lib/Trie */ \"./client/src/lib/Trie.js\");\n\nvar _Trie2 = _interopRequireDefault(_Trie);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar debugCounter = 0;\n\n/* eslint quote-props: 0 */\n\nvar patterns = {\n  '120': Math.pow(5, 0),\n  '210': -Math.pow(5, 0),\n  '010': Math.pow(5, 1),\n  '020': -Math.pow(5, 1),\n  '2110': -Math.pow(5, 3) + 5, // original: -(5 ** 3)\n  '1220': Math.pow(5, 3) - Math.pow(5, 2), // original: 5 ** 3\n  '0110': Math.pow(5, 2),\n  '0220': -Math.pow(5, 2),\n  '21110': Math.pow(5, 2),\n  '12220': -Math.pow(5, 2),\n  '21010': Math.pow(5, 0),\n  '12020': -Math.pow(5, 0),\n  '01110': Math.pow(5, 3),\n  '02220': -Math.pow(5, 5),\n  '01010': Math.pow(5, 1),\n  '02020': -Math.pow(5, 1),\n  '211110': Math.pow(5, 3),\n  '122220': -Math.pow(5, 7),\n  '210110': Math.pow(5, 2),\n  '120220': -Math.pow(5, 2),\n  '211010': Math.pow(5, 2),\n  '122020': -Math.pow(5, 2),\n  '011110': Math.pow(5, 6),\n  '022220': -Math.pow(5, 7),\n  '010110': Math.pow(5, 3),\n  '020220': -Math.pow(5, 5),\n  '11011': Math.pow(5, 1),\n  '22022': -Math.pow(5, 7),\n  '11101': Math.pow(5, 3),\n  '22202': -Math.pow(5, 7)\n};\n\nvar CAPTURE_VALUE = Math.pow(5, 4);\nvar GAME_OVER_VALUE = Math.pow(5, 8);\n\nvar patternTrie = new _Trie2.default();\n\nvar maxPatternLength = Object.keys(patterns).reduce(function (maxLengthSoFar, pattern) {\n  return pattern.length > maxLengthSoFar ? pattern.length : maxLengthSoFar;\n}, 0);\n\nObject.keys(patterns).forEach(function (key) {\n  var reverseKey = key.split('').reverse().join('');\n  patterns[reverseKey] = patterns[key];\n});\n\nObject.keys(patterns).forEach(function (key) {\n  patternTrie.insert(key, patterns[key]);\n});\n\nvar Evaluation = function () {\n  function Evaluation(parentOrGameState, row, col) {\n    _classCallCheck(this, Evaluation);\n\n    this.bounds = {};\n\n    if (parentOrGameState instanceof _GameState2.default) {\n      this.gameState = parentOrGameState;\n\n      var board = this.gameState.board;\n\n\n      this.bounds.minRow = Math.floor((_config.N - 1) / 2);\n      this.bounds.maxRow = Math.floor(_config.N / 2);\n      this.bounds.minCol = Math.floor((_config.N - 1) / 2);\n      this.bounds.maxCol = Math.floor(_config.N / 2);\n\n      for (var i = 0; i < board.length; i++) {\n        for (var j = 0; j < board[i].length; j++) {\n          if (board[i][j]) {\n            if (i < this.bounds.minRow) this.bounds.minRow = i;\n            if (i > this.bounds.maxRow) this.bounds.maxRow = i;\n            if (j < this.bounds.minCol) this.bounds.minCol = j;\n            if (j > this.bounds.maxCol) this.bounds.maxCol = j;\n          }\n        }\n      }\n\n      // this.bounds.minRow = Math.max(this.bounds.minRow - 2, 0);\n      // this.bounds.maxRow = Math.min(this.bounds.maxRow + 2, N - 1);\n      // this.bounds.minCol = Math.max(this.bounds.minCol - 2, 0);\n      // this.bounds.maxCol = Math.min(this.bounds.maxCol + 2, N - 1);\n    } else {\n      var parent = parentOrGameState;\n      this.gameState = new _GameState2.default(parent.gameState, row, col);\n      this.row = row;\n      this.col = col;\n      this.bounds.minRow = Math.min(parent.bounds.minRow, row);\n      this.bounds.maxRow = Math.max(parent.bounds.maxRow, row);\n      this.bounds.minCol = Math.min(parent.bounds.minCol, col);\n      this.bounds.maxCol = Math.max(parent.bounds.maxCol, col);\n    }\n\n    // console.log(this.bounds.minRow, this.bounds.maxRow, this.bounds.minCol, this.bounds.maxCol);\n  }\n\n  _createClass(Evaluation, [{\n    key: 'alphaBeta',\n    value: function alphaBeta(depth) {\n      var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.NEGATIVE_INFINITY;\n      var beta = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Number.POSITIVE_INFINITY;\n\n      if (depth === 0) {\n        this.v = this.value;\n        return this;\n      }\n\n      // here or in get value redundant\n      if (this.gameState.winner === this.gameState.parentTurn) {\n        this.v = GAME_OVER_VALUE;\n        if (depth % 2 === 1) this.v *= -1;\n        return this;\n      }\n\n      var isMaximizer = depth % 2 === 1;\n\n      var bestEval = {\n        v: isMaximizer ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY\n      };\n\n      var breakFlag = false; // set flag to break out of following loop\n      this.forEachChild(function (evaluation) {\n        if (breakFlag) return;\n\n        var newAlpha = isMaximizer ? Math.max(alpha, bestEval.v) : alpha;\n        var newBeta = isMaximizer ? beta : Math.min(beta, bestEval.v);\n\n        var child = evaluation.alphaBeta(depth - 1, newAlpha, newBeta);\n\n        if (isMaximizer) {\n          if (child.v > bestEval.v) {\n            bestEval.v = child.v;\n            bestEval = child;\n            if (bestEval.v > beta) {\n              breakFlag = true;\n            }\n          }\n        } else {\n          if (child.v < bestEval.v) {\n            bestEval.v = child.v;\n            bestEval = child;\n            if (bestEval.v < alpha) {\n              breakFlag = true;\n            }\n          }\n        }\n      });\n\n      this.v = bestEval.v;\n      this.memBestChild = bestEval;\n      // console.log(bestEval);\n      return this;\n    }\n  }, {\n    key: 'forEachChild',\n    value: function forEachChild(cb) {\n      // console.log(this.bounds.minRow, this.bounds.maxRow, this.bounds.minCol, this.bounds.maxCol);\n\n      var minPlayableRow = Math.max(0, this.bounds.minRow - 2);\n      var maxPlayableRow = Math.min(_config.N - 1, this.bounds.maxRow + 2);\n      var minPlayableCol = Math.max(0, this.bounds.minCol - 2);\n      var maxPlayableCol = Math.min(_config.N - 1, this.bounds.maxCol + 2);\n\n      for (var i = minPlayableRow; i <= maxPlayableRow; i++) {\n        for (var j = minPlayableCol; j <= maxPlayableCol; j++) {\n          if (this.gameState.board[i][j] === 0) {\n            cb(new Evaluation(this, i, j));\n          }\n        }\n      }\n    }\n  }, {\n    key: 'isValidMove',\n    value: function isValidMove(row, col) {\n      return this.gameState.isValidMove(row, col);\n    }\n  }, {\n    key: 'value',\n    get: function get() {\n      if (this.memValue !== undefined) return this.memValue;\n\n      if (this.gameState.winner === this.gameState.turn) {\n        this.memValue = -GAME_OVER_VALUE;\n        return this.memValue;\n      }\n\n      if (this.gameState.winner === this.gameState.parentTurn) {\n        this.memValue = GAME_OVER_VALUE;\n        return this.memValue;\n      }\n\n      this.memValue = 0;\n\n      var minCheckRow = Math.max(0, this.bounds.minRow - maxPatternLength);\n      var maxCheckRow = Math.min(_config.N - 1, this.bounds.maxRow + maxPatternLength);\n      var minCheckCol = Math.max(0, this.bounds.minCol - maxPatternLength);\n      var maxCheckCol = this.bounds.maxCol;\n\n      for (var i = minCheckRow; i <= maxCheckRow; i++) {\n        for (var j = minCheckCol; j <= maxCheckCol; j++) {\n          var dirs = [[1, 1], [1, 0], [0, 1], [1, -1]];\n          for (var k = 0; k < dirs.length; k++) {\n            var _dirs$k = _slicedToArray(dirs[k], 2),\n                drow = _dirs$k[0],\n                dcol = _dirs$k[1];\n\n            var row = i;\n            var col = j;\n\n            var curTrieNode = patternTrie.root;\n            while (curTrieNode) {\n              this.memValue += curTrieNode.val;\n\n              var reversePlayers = {\n                0: 0,\n                1: 2,\n                2: 1\n              };\n\n              var nextChar = this.gameState.parentTurn === 1 ? this.gameState.board[row][col] : reversePlayers[this.gameState.board[row][col]];\n\n              curTrieNode = curTrieNode.children[nextChar];\n\n              row += drow;\n              col += dcol;\n\n              if (!this.gameState.board[row] || this.gameState.board[row][col] === undefined) break;\n            }\n          }\n        }\n      }\n\n      this.memValue += this.gameState.captures[this.gameState.parentTurn] * CAPTURE_VALUE;\n      this.memValue -= this.gameState.captures[this.gameState.turn] * CAPTURE_VALUE;\n\n      return this.memValue;\n    }\n  }, {\n    key: 'bestChild',\n    get: function get() {\n      if (this.memBestChild) return this.memBestChild;\n\n      this.alphaBeta(_config.DIFFICULTY);\n      return this.memBestChild;\n    }\n  }]);\n\n  return Evaluation;\n}();\n\nexports.default = Evaluation;\n\n//# sourceURL=webpack:///./client/src/helpers/Evaluation.js?");

/***/ }),

/***/ "./client/src/helpers/GameState.js":
/*!*****************************************!*\
  !*** ./client/src/helpers/GameState.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _generateBoard = __webpack_require__(/*! ./generateBoard */ \"./client/src/helpers/generateBoard.js\");\n\nvar _generateBoard2 = _interopRequireDefault(_generateBoard);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar GameState = function () {\n  function GameState(parent, row, col) {\n    _classCallCheck(this, GameState);\n\n    if (!parent) {\n      this.board = (0, _generateBoard2.default)();\n      this.captures = {\n        1: 0,\n        2: 0\n      };\n      this.turn = 1;\n    } else {\n      this.board = JSON.parse(JSON.stringify(parent.board));\n      this.captures = JSON.parse(JSON.stringify(parent.captures));\n      this.parentTurn = parent.turn;\n      this.turn = parent.turn === 1 ? 2 : 1;\n      this.updateBoard(row, col);\n    }\n  }\n\n  _createClass(GameState, [{\n    key: 'updateBoard',\n    value: function updateBoard(row, col) {\n      this.board[row][col] = this.parentTurn;\n\n      this.checkforCaptures(row, col);\n\n      if (this.checkForWinner(row, col)) {\n        this.winner = this.parentTurn;\n      }\n    }\n  }, {\n    key: 'checkforCaptures',\n    value: function checkforCaptures(row, col) {\n      var dirs = [{ drow: -1, dcol: -1 }, { drow: -1, dcol: 0 }, { drow: -1, dcol: 1 }, { drow: 0, dcol: -1 }, { drow: 0, dcol: 1 }, { drow: 1, dcol: -1 }, { drow: 1, dcol: 0 }, { drow: 1, dcol: 1 }];\n\n      for (var i = 0; i < dirs.length; i++) {\n        var _dirs$i = dirs[i],\n            drow = _dirs$i.drow,\n            dcol = _dirs$i.dcol;\n\n\n        if (this.board[row + 3 * drow] && this.board[row + drow][col + dcol] === this.turn && this.board[row + 2 * drow][col + 2 * dcol] === this.turn && this.board[row + 3 * drow][col + 3 * dcol] === this.parentTurn) {\n          this.captures[this.parentTurn] += 1;\n          this.board[row + drow][col + dcol] = 0;\n          this.board[row + 2 * drow][col + 2 * dcol] = 0;\n        }\n      }\n    }\n  }, {\n    key: 'checkForWinner',\n    value: function checkForWinner(row, col) {\n      if (this.captures[this.parentTurn] >= 5) return true;\n\n      var dirs = [{ drow: 1, dcol: 0 }, { drow: 0, dcol: 1 }, { drow: 1, dcol: 1 }, { drow: 1, dcol: -1 }];\n\n      for (var i = 0; i < dirs.length; i++) {\n        var _dirs$i2 = dirs[i],\n            drow = _dirs$i2.drow,\n            dcol = _dirs$i2.dcol;\n\n\n        var piecesInARow = 1;\n        var currentCoords = {\n          row: row + drow,\n          col: col + dcol\n        };\n\n        while (this.board[currentCoords.row] && this.board[currentCoords.row][currentCoords.col] === this.parentTurn) {\n          piecesInARow++;\n          currentCoords.row += drow;\n          currentCoords.col += dcol;\n        }\n\n        currentCoords.row = row - drow;\n        currentCoords.col = col - dcol;\n\n        while (this.board[currentCoords.row] && this.board[currentCoords.row][currentCoords.col] === this.parentTurn) {\n          piecesInARow++;\n          currentCoords.row -= drow;\n          currentCoords.col -= dcol;\n        }\n\n        if (piecesInARow >= 5) return true;\n      }\n\n      return false;\n    }\n  }, {\n    key: 'isValidMove',\n    value: function isValidMove(row, col) {\n      if (this.winner) return false;\n      return this.board[row] && this.board[row][col] === 0;\n    }\n  }]);\n\n  return GameState;\n}();\n\nexports.default = GameState;\n\n//# sourceURL=webpack:///./client/src/helpers/GameState.js?");

/***/ }),

/***/ "./client/src/helpers/generateBoard.js":
/*!*********************************************!*\
  !*** ./client/src/helpers/generateBoard.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _config = __webpack_require__(/*! ../config */ \"./client/src/config.js\");\n\nvar generateBoard = function generateBoard() {\n  var emptyBoard = [];\n  for (var i = 0; i < _config.N; i++) {\n    emptyBoard[i] = [];\n    for (var j = 0; j < _config.N; j++) {\n      emptyBoard[i][j] = 0;\n    }\n  }\n\n  return emptyBoard;\n};\n\nexports.default = generateBoard;\n\n//# sourceURL=webpack:///./client/src/helpers/generateBoard.js?");

/***/ }),

/***/ "./client/src/lib/Trie.js":
/*!********************************!*\
  !*** ./client/src/lib/Trie.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar Node = function Node(val) {\n  _classCallCheck(this, Node);\n\n  this.children = {};\n  this.val = val || 0;\n};\n\nvar Trie = function () {\n  function Trie() {\n    _classCallCheck(this, Trie);\n\n    this.root = new Node();\n  }\n\n  _createClass(Trie, [{\n    key: \"insert\",\n    value: function insert(key, val) {\n      var curNode = this.root;\n\n      for (var i = 0; i < key.length; i++) {\n        curNode.children[key[i]] = curNode.children[key[i]] !== undefined ? curNode.children[key[i]] : new Node();\n\n        curNode = curNode.children[key[i]];\n      }\n\n      curNode.val = val;\n    }\n  }, {\n    key: \"retrieve\",\n    value: function retrieve(key) {\n      var curNode = this.root;\n\n      for (var i = 0; i < key.length; i++) {\n        if (curNode.children[key[i]] !== undefined) {\n          curNode = curNode.children[key[i]];\n        } else {\n          return undefined;\n        }\n      }\n\n      return curNode.val;\n    }\n  }]);\n\n  return Trie;\n}();\n\nexports.default = Trie;\n\n//# sourceURL=webpack:///./client/src/lib/Trie.js?");

/***/ }),

/***/ "./client/src/workers/getNextMove.worker.js":
/*!**************************************************!*\
  !*** ./client/src/workers/getNextMove.worker.js ***!
  \**************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helpers_GameState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers/GameState */ \"./client/src/helpers/GameState.js\");\n/* harmony import */ var _helpers_GameState__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_helpers_GameState__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _helpers_Evaluation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/Evaluation */ \"./client/src/helpers/Evaluation.js\");\n/* harmony import */ var _helpers_Evaluation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_helpers_Evaluation__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nonmessage = (event) => {\n  const gameState = Object.assign(new _helpers_GameState__WEBPACK_IMPORTED_MODULE_0___default.a(), event.data);\n  console.log('ww', gameState);\n\n  const currentEval = new _helpers_Evaluation__WEBPACK_IMPORTED_MODULE_1___default.a(gameState);\n\n  const bestNextEval = currentEval.bestChild;\n\n  postmessage(bestNextEval);\n};\n\n\n//# sourceURL=webpack:///./client/src/workers/getNextMove.worker.js?");

/***/ })

/******/ });