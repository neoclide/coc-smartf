"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const coc_nvim_1 = require("coc.nvim");
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.jump();
        });
    }
    backward() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.jump(false);
        });
    }
    repeat() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.direction)
                return;
            yield this.jump(this.direction == 'forward', true);
        });
    }
    repeatOpposite() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!this.direction)
                return;
            yield this.jump(this.direction == 'backward', true);
        });
    }
    jump(isForward = true, isRepeat = false) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let p = coc_nvim_1.workspace.callAsync('coc#list#getchar', []);
            let finished = false;
            setTimeout(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
//# sourceMappingURL=manager.js.map