(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const coc_nvim_1 = __webpack_require__(1);
const manager_1 = __importDefault(__webpack_require__(2));
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        let { subscriptions } = context;
        let manager = new manager_1.default(coc_nvim_1.workspace.nvim);
        subscriptions.push(coc_nvim_1.workspace.registerKeymap(['n'], 'smartf-forward', () => __awaiter(this, void 0, void 0, function* () {
            yield manager.forward();
        }), { sync: false, cancel: true, silent: true }));
        subscriptions.push(coc_nvim_1.workspace.registerKeymap(['n'], 'smartf-backward', () => __awaiter(this, void 0, void 0, function* () {
            yield manager.backward();
        }), { sync: false, cancel: true, silent: true }));
        subscriptions.push(coc_nvim_1.workspace.registerKeymap(['n'], 'smartf-repeat', () => __awaiter(this, void 0, void 0, function* () {
            yield manager.repeat();
        }), { sync: false, cancel: true, silent: true }));
        subscriptions.push(coc_nvim_1.workspace.registerKeymap(['n'], 'smartf-repeat-opposite', () => __awaiter(this, void 0, void 0, function* () {
            yield manager.repeatOpposite();
        }), { sync: false, cancel: true, silent: true }));
    });
}
exports.activate = activate;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("coc.nvim");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const coc_nvim_1 = __webpack_require__(1);
const util_1 = __webpack_require__(3);
const characters = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
    ',', '.'
];
class Manager {
    constructor(nvim) {
        this.nvim = nvim;
        this.matchIds = [];
        this.positionMap = new Map();
        this.isForward = true;
        this.conceallevel = 0;
        let config = coc_nvim_1.workspace.getConfiguration('smartf');
        this.timeout = config.get('timeout', 1000);
        this.jumpOnTrigger = config.get('jumpOnTrigger', true);
        this.wordJump = config.get('wordJump', true);
    }
    forward() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.jump();
        });
    }
    backward() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.jump(false);
        });
    }
    repeat() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.jump(this.isForward, this.character);
        });
    }
    repeatOpposite() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.jump(!this.isForward, this.character);
        });
    }
    jump(isForward = true, character) {
        return __awaiter(this, void 0, void 0, function* () {
            let { nvim } = this;
            this.positionMap.clear();
            nvim.pauseNotification();
            nvim.call('coc#util#cursor', [], true);
            nvim.call('line', ['w0'], true);
            nvim.call('getline', ['.'], true);
            nvim.call('eval', [`getline(line('w0'), line('w$'))`], true);
            nvim.call('eval', ['&conceallevel'], true);
            nvim.command('silent! IndentLinesDisable', true);
            nvim.command(`setl conceallevel=2`, true);
            let [res, err] = yield nvim.resumeNotification();
            if (err) {
                coc_nvim_1.workspace.showMessage(`Error on ${err[0]}: ${err[1]} - ${err[2]}`, 'error');
                return;
            }
            let [cursor, startline, currline, lines, conceallevel] = res;
            this.conceallevel = conceallevel;
            if (!character) {
                character = (yield coc_nvim_1.workspace.callAsync('coc#list#getchar', []));
                this.isForward = isForward;
                this.character = character;
            }
            let offset = 0;
            // create new lines
            if (!isForward) {
                let count = cursor[0] - (startline - 1) + 1;
                lines = lines.slice(0, count);
                lines[lines.length - 1] = currline.slice(0, cursor[1]);
            }
            else {
                offset = cursor[1] + 1;
                lines = lines.slice(cursor[0] - (startline - 1));
            }
            let positions = util_1.getPositions(character, lines, this.wordJump, offset);
            if (positions.length == 0)
                return;
            if (!isForward)
                positions.reverse();
            // jump to first when necessary
            let currpos;
            if (this.jumpOnTrigger) {
                let first = positions.shift();
                let col = byteIndex(lines[first.line], first.character) + 1;
                let line = startline + first.line + (isForward ? cursor[0] + 1 - startline : 0);
                yield nvim.call('cursor', [line, col]);
                currpos = [line, col];
            }
            else {
                let [, line, col] = yield nvim.call('getpos', ['.']);
                currpos = [line, col];
            }
            if (positions.length == 0)
                return;
            this.positionMap.clear();
            let remains = [];
            for (let i = 0; i < positions.length; i++) {
                let pos = positions[i];
                let ch = characters[i];
                let line = startline + pos.line + (isForward ? cursor[0] + 1 - startline : 0);
                let col = byteIndex(lines[pos.line], pos.character) + 1;
                if (ch) {
                    this.positionMap.set(ch, { character: ch, position: [line, col] });
                }
                else {
                    remains.push([line, col]);
                }
            }
            this.repeatPosition = remains[0];
            // parse positions
            nvim.pauseNotification();
            nvim.command('silent doautocmd User SmartfEnter', true);
            for (let val of this.positionMap.values()) {
                let { position, character } = val;
                let pos = [position[0], position[1], 1];
                nvim.call('matchaddpos', ['Conceal', [pos], 99, -1, { conceal: character }], true);
            }
            nvim.call('matchaddpos', ['Cursor', [[currpos[0], currpos[1], 1]], 99], true);
            for (let val of remains) {
                let pos = [val[0], val[1], 1];
                nvim.call('matchaddpos', ['Conceal', [pos], 99, -1, { conceal: ';' }], true);
            }
            let result = yield nvim.resumeNotification();
            if (result[1])
                return;
            this.matchIds = result[0];
            this.getCharacter().catch(e => {
                // tslint:disable-next-line: no-console
                console.error(e);
            });
        });
    }
    getCharacter() {
        return __awaiter(this, void 0, void 0, function* () {
            let p = coc_nvim_1.workspace.callAsync('coc#list#getchar', []);
            let finished = false;
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                if (finished)
                    return;
                this.nvim.command(`call feedkeys("\\<esc>", 'in')`, true);
                yield this.cancel();
            }), this.timeout || 1000);
            let ch = yield p;
            finished = true;
            if (ch == ';' && this.repeatPosition) {
                yield this.cancel();
                this.nvim.call('cursor', this.repeatPosition, true);
                this.jump(this.isForward, this.character).catch(_e => {
                    // noop
                });
            }
            else {
                let val = this.positionMap.get(ch);
                yield this.cancel();
                if (val)
                    this.nvim.call('cursor', val.position, true);
            }
        });
    }
    cancel() {
        return __awaiter(this, void 0, void 0, function* () {
            let { nvim, matchIds, changeStart } = this;
            if (!matchIds.length)
                return;
            nvim.pauseNotification();
            nvim.setVar('coc_smartf_activated', 0, true);
            nvim.command(`setl conceallevel=${this.conceallevel}`, true);
            nvim.command('silent! IndentLinesEnable', true);
            nvim.command('silent doautocmd User SmartfLeave', true);
            nvim.call('coc#util#clearmatches', [this.matchIds], true);
            this.matchIds = [];
            yield nvim.resumeNotification();
        });
    }
}
exports.default = Manager;
function characterIndex(content, byteIndex) {
    let buf = Buffer.from(content, 'utf8');
    return buf.slice(0, byteIndex).toString('utf8').length;
}
function byteIndex(content, index) {
    let s = content.slice(0, index);
    return Buffer.byteLength(s);
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function getPositions(character, lines, matchWord, offset = 0) {
    let positions = [];
    let i = 0;
    let isWordChar = wordChar(character);
    for (let line of lines) {
        let start = i == 0 ? offset : 0;
        for (let j = start; j < line.length; j++) {
            if (line[j] == character) {
                if (!matchWord || !isWordChar || (j == 0 || !wordChar(line[j - 1]))) {
                    positions.push({ line: i, character: j });
                }
            }
        }
        i++;
    }
    return positions;
}
exports.getPositions = getPositions;
function wordChar(ch) {
    let code = ch.charCodeAt(0);
    return (code >= 97 && code <= 122) || (code >= 65 && code <= 90);
}
exports.wordChar = wordChar;


/***/ })
/******/ ])));