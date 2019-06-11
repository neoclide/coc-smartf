"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const coc_nvim_1 = require("coc.nvim");
const manager_1 = tslib_1.__importDefault(require("./manager"));
function activate(context) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        let { subscriptions } = context;
        let manager = new manager_1.default(coc_nvim_1.workspace.nvim);
        subscriptions.push(coc_nvim_1.workspace.registerKeymap(['n'], 'smartf-forward', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield manager.forward();
        }), { sync: false, cancel: true, silent: true }));
        subscriptions.push(coc_nvim_1.workspace.registerKeymap(['n'], 'smartf-backward', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield manager.backward();
        }), { sync: false, cancel: true, silent: true }));
        subscriptions.push(coc_nvim_1.workspace.registerKeymap(['n'], 'smartf-repeat', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield manager.repeat();
        }), { sync: false, cancel: true, silent: true }));
        subscriptions.push(coc_nvim_1.workspace.registerKeymap(['n'], 'smartf-repeat-opposite', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield manager.repeatOpposite();
        }), { sync: false, cancel: true, silent: true }));
    });
}
exports.activate = activate;
//# sourceMappingURL=index.js.map