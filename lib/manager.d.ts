import { Neovim } from 'coc.nvim';
export default class Manager {
    private nvim;
    private matchIds;
    private positionMap;
    private timeout;
    private changeLines;
    private jumpOnTrigger;
    private character;
    private direction;
    private savedSyntax;
    private savedModified;
    private changeStart;
    private orignalLines;
    constructor(nvim: Neovim);
    forward(): Promise<void>;
    backward(): Promise<void>;
    repeat(): Promise<void>;
    repeatOpposite(): Promise<void>;
    private jump;
    private getCharacter;
    cancel(): Promise<void>;
}
