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
const characters = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
    '[', ']', ";", "'", '"', ',', '.', '/', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];
class Manager {
    constructor(nvim) {
        this.nvim = nvim;
        this.matchIds = [];
        this.positionMap = new Map();
        this.direction = null;
        let config = coc_nvim_1.workspace.getConfiguration('smartf');
        this.timeout = config.get('timeout', 1000);
        this.changeLines = config.get('changeLines', false);
        this.jumpOnTrigger = config.get('jumpOnTrigger', true);
        if (this.changeLines) {
            nvim.call('hlexists', ['Smartf']).then(res => {
                if (res == 0) {
                    nvim.command(`hi Smartf ctermfg=220 guifg=#fabd2f`, true);
                }
            }).catch(_e => {
                // noop
            });
        }
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
            if (!this.direction)
                return;
            yield this.jump(this.direction == 'forward', true);
        });
    }
    repeatOpposite() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.direction)
                return;
            yield this.jump(this.direction == 'backward', true);
        });
    }
    jump(isForward = true, isRepeat = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let { nvim } = this;
            this.positionMap.clear();
            nvim.pauseNotification();
            nvim.call('coc#util#cursor', [], true);
            nvim.call('line', ['w0'], true);
            nvim.call('getline', ['.'], true);
            nvim.call('eval', [`getline(line('w0'), line('w$'))`], true);
            nvim.call('eval', '&syntax', true);
            nvim.call('eval', '&modified', true);
            if (!this.changeLines) {
                nvim.command(`setl conceallevel=2`, true);
            }
            let [res, err] = yield nvim.resumeNotification();
            if (err) {
                coc_nvim_1.workspace.showMessage(`Error on ${err[0]}: ${err[1]} - ${err[2]}`, 'error');
                return;
            }
            let [cursor, startline, currline, lines] = res;
            if (this.changeLines) {
                this.savedSyntax = res[4];
                this.savedModified = res[5];
            }
            if (!isRepeat) {
                let character = yield coc_nvim_1.workspace.callAsync('coc#list#getchar', []);
                this.direction = isForward ? 'forward' : 'backward';
                this.character = character;
            }
            let { character } = this;
            if (lines.join('').indexOf(character) == -1) {
                // character not found
                return;
            }
            if (this.jumpOnTrigger && currline.indexOf(character) !== -1) {
                if (isForward) {
                    for (let i = cursor[1] + 1; i < currline.length; i++) {
                        if (currline[i] == character) {
                            let col = Buffer.byteLength(currline.slice(0, i)) + 1;
                            cursor[1] = i;
                            yield nvim.call('cursor', [cursor[0] + 1, col]);
                            break;
                        }
                    }
                }
                else {
                    for (let i = cursor[1] - 1; i >= 0; i--) {
                        if (currline[i] == character) {
                            let col = Buffer.byteLength(currline.slice(0, i)) + 1;
                            cursor[1] = i;
                            yield nvim.call('cursor', [cursor[0] + 1, col]);
                            break;
                        }
                    }
                }
            }
            // parse positions
            let index = 0;
            let newLines = [];
            let orignalLines = [];
            let start;
            if (isForward) {
                start = cursor[0];
                let lineCount = startline + lines.length - cursor[0] - 1;
                let arr = lines.slice(-lineCount);
                for (let i = 0; i < arr.length; i++) {
                    let lnum = cursor[0] + i;
                    let line = arr[i];
                    orignalLines.push(line);
                    let startIndex = i == 0 ? characterIndex(line, cursor[1]) + 1 : 0;
                    let newLine = startIndex == 0 ? '' : line.slice(0, startIndex);
                    for (let j = startIndex; j < line.length; j++) {
                        let ch = characters[index];
                        if (line[j] == character && ch) {
                            this.positionMap.set(ch, {
                                character: ch,
                                position: [lnum + 1, byteIndex(line, j) + 1]
                            });
                            newLine += ch;
                            index = index + 1;
                        }
                        else {
                            newLine += line[j];
                        }
                    }
                    newLines.push(newLine);
                }
            }
            else {
                start = startline - 1;
                let lineCount = cursor[0] + 1 - startline + 1;
                let arr = lines.slice(0, lineCount);
                for (let i = arr.length - 1; i >= 0; i--) {
                    let lnum = startline + i - 1;
                    let line = arr[i];
                    orignalLines.unshift(line);
                    let startIndex = i == arr.length - 1 ? characterIndex(line, cursor[1]) - 1 : line.length - 1;
                    let newLine = startIndex == line.length - 1 ? '' : line.slice(startIndex + 1);
                    for (let j = startIndex; j >= 0; j--) {
                        let ch = characters[index];
                        if (line[j] == character && ch) {
                            this.positionMap.set(ch, {
                                character: ch,
                                position: [lnum + 1, byteIndex(line, j) + 1]
                            });
                            index = index + 1;
                            newLine = ch + newLine;
                        }
                        else {
                            newLine = line[j] + newLine;
                        }
                    }
                    newLines.unshift(newLine);
                }
            }
            if (!this.positionMap.size)
                return;
            this.orignalLines = orignalLines;
            nvim.pauseNotification();
            nvim.command('silent doautocmd User SmartfEnter', true);
            if (this.changeLines) {
                this.changeStart = start + 1;
                nvim.setVar('coc_smartf_activated', 1, true);
                nvim.call('smartf#undo#save', [], true);
                nvim.call('coc#util#setline', [start + 1, newLines], true);
                nvim.command('set syntax=', true);
            }
            for (let val of this.positionMap.values()) {
                let { position, character } = val;
                let pos = [position[0], position[1], 1];
                if (this.changeLines) {
                    nvim.call('matchaddpos', ['Smartf', [pos], 99, -1], true);
                }
                else {
                    nvim.call('matchaddpos', ['Conceal', [pos], 99, -1, { conceal: character }], true);
                }
                nvim.call('matchaddpos', ['Cursor', [[cursor[0] + 1, cursor[1] + 1, 1]], 99], true);
            }
            let result = yield nvim.resumeNotification();
            if (result[1])
                return;
            this.matchIds = result[0].slice(this.changeLines ? 4 : 0);
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
            let val = this.positionMap.get(ch);
            yield this.cancel();
            if (!val)
                return;
            this.nvim.call('cursor', val.position, true);
        });
    }
    cancel() {
        return __awaiter(this, void 0, void 0, function* () {
            let { nvim, matchIds, changeStart } = this;
            if (!matchIds.length)
                return;
            nvim.pauseNotification();
            if (this.orignalLines) {
                nvim.call('coc#util#setline', [changeStart, this.orignalLines], true);
                nvim.call('smartf#undo#restore', [], true);
            }
            if (this.savedSyntax) {
                nvim.command(`set syntax=${this.savedSyntax}`, true);
                nvim.command(`let &modified=${this.savedModified}`, true);
            }
            nvim.setVar('coc_smartf_activated', 0, true);
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


/***/ })
/******/ ])));