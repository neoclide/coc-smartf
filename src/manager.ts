/* eslint-global nvim */

import { Neovim, workspace } from 'coc.nvim';
import { getPositions } from './util.ts';

const characters = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    ',',
    '.',
];

interface Character {
    position: [number, number];
    ch: string;
}

export default class Manager {
    private matchIds: number[] = [];
    private activated = false;
    private hasIndentLine = false;
    private positionMap: Map<string, Character> = new Map();
    private timeout: number;
    private character: string;
    private characters: string[];
    private isForward = true;
    private isFind = 1;
    private conceallevel = 0;
    private concealcursor = '';
    private jumpOnTrigger: boolean;
    private wordJump: boolean;
    private repeatPosition: [number, number];
    private charsIgnoreByNavigator: string[] = [];

    constructor(private nvim: Neovim) {
        const config = workspace.getConfiguration('smartf');

        this.charsIgnoreByNavigator = config.get<string[]>(
            'charactersIgnoreByNavigator',
            [],
        );

        this.nvim = nvim;

        this.timeout = config.get<number>('timeout', 1000);
        this.jumpOnTrigger = config.get<boolean>('jumpOnTrigger', true);
        this.wordJump = config.get<boolean>('wordJump', true);
        this.characters = config.get<string[]>(
            'characters',
            characters.filter(
                (c) => this.charsIgnoreByNavigator.indexOf(c) === -1,
            ),
        );
    }

    private async jump(
        isForward = true,
        isFind = 1,
        character?: string,
    ): Promise<void> {
        const { nvim } = this;
        const ids = await nvim.eval('get(w:,"indentLine_indentLineId",0)');

        this.positionMap.clear();
        this.hasIndentLine = Array.isArray(ids) && ids.length > 0;

        nvim.pauseNotification();
        nvim.call('coc#util#cursor', [], true);
        nvim.call('line', ['w0'], true);
        nvim.call('getline', ['.'], true);
        nvim.call('eval', ['getline(line("w0"), line("w$"))'], true);
        nvim.call('eval', ['&conceallevel'], true);
        nvim.call('eval', ['&concealcursor'], true);
        nvim.command("normal! m'", true); // eslint-disable-line quotes

        if (this.hasIndentLine) {
            nvim.command('silent! IndentLinesDisable', true);
        }

        nvim.command('setl conceallevel=2', true);
        nvim.command('setl concealcursor=n', true);

        const [res, err] = await nvim.resumeNotification();
        if (err) {
            workspace.showMessage(
                `Error on ${err[0]}: ${err[1]} - ${err[2]}`,
                'error',
            );
            return;
        }

        this.activated = true;
        const [
            cursor,
            startline,
            currline,
            lines,
            conceallevel,
            concealcursor,
        ] = res as [[number, number], number, string, string[], number, string];

        this.conceallevel = conceallevel;
        this.concealcursor = concealcursor;

        let lcharacter = character;
        let llines = lines;

        if (!character) {
            lcharacter = (await workspace.callAsync(
                'coc#list#getchar',
                [],
            )) as string;

            this.isForward = isForward;
            this.isFind = isFind ? 1 : 0;
            this.character = lcharacter;
        }

        let offset = 0;
        // create new lines
        if (!isForward) {
            const count = cursor[0] - (startline - 1) + 1;
            llines = llines.slice(0, count);
            llines[llines.length - 1] = currline.slice(0, cursor[1]);
        } else {
            offset = cursor[1] + 1;
            llines = llines.slice(cursor[0] - (startline - 1));
        }

        const positions = getPositions(
            lcharacter,
            llines,
            this.wordJump,
            offset,
        );

        if (positions.length === 0) {
            await this.reset();
            return;
        }

        if (!isForward) {
            positions.reverse();
        }

        // jump to first when necessary
        let currpos: [number, number];
        if (this.jumpOnTrigger) {
            const first = positions.shift();
            const col =
                byteIndex(llines[first.line], first.character) + this.isFind;

            const line =
                startline +
                first.line +
                (isForward ? cursor[0] + 1 - startline : 0);

            await nvim.call('cursor', [line, col]);
            currpos = [line, col];
        } else {
            const [, line, col] = (await nvim.call('getpos', [
                '.',
            ])) as number[];
            currpos = [line, col];
        }

        if (positions.length === 0) {
            await this.reset();
            return;
        }

        this.positionMap.clear();

        const remains: [number, number][] = [];

        positions.forEach((pos, idx) => {
            const ch = this.characters[idx];
            const line =
                startline +
                pos.line +
                (isForward ? cursor[0] + 1 - startline : 0);

            const col = byteIndex(llines[pos.line], pos.character) + this.isFind;

            if (ch) {
                this.positionMap[ch] = {
                    ch,
                    position: [line, col],
                };
            } else {
                remains.push([line, col]);
            }
        });

        [this.repeatPosition] = remains;
        await nvim.call('coc#util#do_autocmd', ['SmartfEnter']);
        // parse positions
        nvim.pauseNotification();

        Object.values(this.positionMap).forEach((val) => {
            const { position, ch } = val;
            const pos = [position[0], position[1], 1];
            nvim.call(
                'matchaddpos',
                ['Conceal', [pos], 999, -1, { conceal: ch }],
                true,
            );
        });

        nvim.call(
            'matchaddpos',
            ['Cursor', [[currpos[0], currpos[1], 1]], 99],
            true,
        );

        remains.forEach((val) => {
            const pos = [val[0], val[1], 1];
            nvim.call(
                'matchaddpos',
                ['Conceal', [pos], 999, -1, { conceal: ';' }],
                true,
            );
        });

        const result = await nvim.resumeNotification();
        if (result[1]) {
            const rerr = result[1];
            // tslint:disable-next-line: no-console
            console.error(
                `Error on activate smartf, ${rerr[0]}: ${rerr[1]} - ${rerr[2]}`,
            );
            return;
        }

        [this.matchIds] = result;
        this.getCharacter().catch((e) => {
            // tslint:disable-next-line: no-console
            console.error(e);
        });
    }

    private async getCharacter(): Promise<void> {
        const p = workspace.callAsync('coc#list#getchar', []);
        let finished = false;

        setTimeout(async () => {
            if (finished) {
                return;
            }

            this.nvim.command('call feedkeys("\\\\<esc>", "in")', true);
            await this.cancel();
        }, this.timeout || 1000);

        const ch = (await p) as string;
        finished = true;

        if (this.charsIgnoreByNavigator.indexOf(ch) !== -1) {
            await this.cancel();
            this.nvim.command(`call feedkeys("${ch}", "in")`, true);
        } else if (ch === ';' && this.repeatPosition) {
            await this.cancel();
            this.nvim.call('cursor', this.repeatPosition, true);
            this.jump(this.isForward, this.isFind, this.character).catch(() => {
                // noop
            });
        } else {
            const val = this.positionMap[ch];
            await this.cancel();

            if (val) {
                this.nvim.call('cursor', val.position, true);
            }
        }
    }

    private async reset(): Promise<void> {
        this.activated = false;
        const { nvim } = this;

        if (this.hasIndentLine) {
            nvim.command('silent! IndentLinesEnable', true);
        }

        nvim.pauseNotification();
        nvim.command(`setl conceallevel=${this.conceallevel}`, true);
        nvim.command(`setl concealcursor=${this.concealcursor}`, true);
        await nvim.resumeNotification();
    }

    public async fforward(): Promise<void> {
        await this.jump();
    }

    public async fbackward(): Promise<void> {
        await this.jump(false);
    }

    public async tforward(): Promise<void> {
        await this.jump(true, 0);
    }

    public async tbackward(): Promise<void> {
        await this.jump(false, 0);
    }

    public async repeat(): Promise<void> {
        await this.jump(this.isForward, this.isFind, this.character);
    }

    public async repeatOpposite(): Promise<void> {
        await this.jump(!this.isForward, this.isFind, this.character);
    }

    public async cancel(): Promise<void> {
        const { nvim, matchIds } = this;
        if (!this.activated) {
            return;
        }

        this.activated = false;
        nvim.pauseNotification();

        if (this.hasIndentLine) {
            nvim.command('silent! IndentLinesEnable', true);
        }

        nvim.command(`setl conceallevel=${this.conceallevel}`, true);
        nvim.command(`setl concealcursor=${this.concealcursor}`, true);
        nvim.call('coc#util#do_autocmd', ['SmartfLeave'], true);

        if (matchIds.length) {
            nvim.call('coc#util#clearmatches', [this.matchIds], true);
        }

        this.matchIds = [];
        await nvim.resumeNotification();
    }
}

function byteIndex(content: string, index: number): number {
    const s = content.slice(0, index);
    return Buffer.byteLength(s);
}
