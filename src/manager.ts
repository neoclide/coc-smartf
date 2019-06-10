import { Neovim, workspace } from 'coc.nvim'

const characters = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
  's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
  '[', ']', ";", "'", '"', ',', '.', '/', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
  'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]

interface Character {
  position: [number, number]
  character: string
}

export default class Manager {
  private matchIds: number[] = []
  private positionMap: Map<string, Character> = new Map()
  private timeout: number
  private character: string
  private direction: 'forward' | 'backward' | null = null
  constructor(private nvim: Neovim) {
    let config = workspace.getConfiguration('smartf')
    this.timeout = config.get<number>('timeout', 1000)
  }

  public async forward(): Promise<void> {
    await this.jump()
  }

  public async backward(): Promise<void> {
    await this.jump(false)
  }

  public async repeat(): Promise<void> {
    if (!this.direction) return
    await this.jump(this.direction == 'forward', true)
  }

  public async repeatOpposite(): Promise<void> {
    if (!this.direction) return
    await this.jump(this.direction == 'backward', true)
  }

  private async jump(isForward = true, isRepeat = false): Promise<void> {
    let { nvim } = this
    this.positionMap.clear()
    nvim.pauseNotification()
    nvim.call('coc#util#cursor', [], true)
    nvim.call('line', ['w0'], true)
    nvim.call('getline', ['.'], true)
    nvim.call('eval', [`getline(line('w0'), line('w$'))`], true)
    nvim.command(`setl conceallevel=2`, true)
    let [res, err] = await nvim.resumeNotification()
    if (err) {
      workspace.showMessage(`Error on ${err[0]}: ${err[1]} - ${err[2]}`, 'error')
      return
    }
    let [cursor, startline, currline, lines] = res as [[number, number], number, string, string[]]
    if (!isRepeat) {
      let character = await workspace.callAsync('coc#list#getchar', []) as string
      this.direction = isForward ? 'forward' : 'backward'
      this.character = character
    }
    let { character } = this
    if (lines.join('').indexOf(character) == -1) {
      // character not found
      return
    }
    if (currline.indexOf(character) !== -1) {
      if (isForward) {
        for (let i = cursor[1] + 1; i < currline.length; i++) {
          if (currline[i] == character) {
            let col = Buffer.byteLength(currline.slice(0, i)) + 1
            cursor[1] = i
            await nvim.call('cursor', [cursor[0] + 1, col])
            break
          }
        }
      } else {
        for (let i = cursor[1] - 1; i >= 0; i--) {
          if (currline[i] == character) {
            let col = Buffer.byteLength(currline.slice(0, i)) + 1
            cursor[1] = i
            await nvim.call('cursor', [cursor[0] + 1, col])
            break
          }
        }
      }
    }
    // parse positions
    let index = 0
    if (isForward) {
      let lineCount = startline + lines.length - cursor[0] - 1
      let arr = lines.slice(-lineCount)
      for (let i = 0; i < arr.length; i++) {
        let lnum = cursor[0] + i
        let line = arr[i]
        let startIndex = i == 0 ? characterIndex(line, cursor[1]) + 1 : 0
        for (let j = startIndex; j < line.length; j++) {
          if (line[j] == character) {
            let ch = characters[index]
            if (!ch) break
            this.positionMap.set(ch, {
              character: ch,
              position: [lnum + 1, byteIndex(line, j) + 1]
            })
            index = index + 1
          }
        }
      }
    } else {
      let lineCount = cursor[0] + 1 - startline + 1
      let arr = lines.slice(0, lineCount)
      for (let i = arr.length - 1; i >= 0; i--) {
        let lnum = startline + i - 1
        let line = arr[i]
        let startIndex = i == arr.length - 1 ? characterIndex(line, cursor[1]) - 1 : line.length - 1
        for (let j = startIndex; j >= 0; j--) {
          if (line[j] == character) {
            let ch = characters[index]
            if (!ch) break
            this.positionMap.set(ch, {
              character: ch,
              position: [lnum + 1, byteIndex(line, j) + 1]
            })
            index = index + 1
          }
        }
      }
    }
    // call matchaddpos('Conceal', [[3,2,1]], 10, 99,{'conceal': 'a'})
    if (!this.positionMap.size) return
    nvim.pauseNotification()
    nvim.command('silent doautocmd User SmartfEnter', true)
    for (let val of this.positionMap.values()) {
      let { position, character } = val
      let pos = [position[0], position[1], 1]
      nvim.call('matchaddpos', ['Conceal', [pos], 99, -1, { conceal: character }], true)
    }
    let result = await nvim.resumeNotification()
    if (result[1]) return
    this.matchIds = result[0]
    this.getCharacter().catch(e => {
      // tslint:disable-next-line: no-console
      console.error(e)
    })
  }

  private async getCharacter(): Promise<void> {
    let p = workspace.callAsync('coc#list#getchar', [])
    let finished = false
    setTimeout(async () => {
      if (finished) return
      this.nvim.command(`call feedkeys("\\<esc>", 'in')`, true)
      await this.cancel()
    }, this.timeout || 1000)
    let ch = await p as string
    finished = true
    let val = this.positionMap.get(ch)
    await this.cancel()
    if (!val) return
    this.nvim.call('cursor', val.position, true)
  }

  public async cancel(): Promise<void> {
    let { nvim, matchIds } = this
    if (!matchIds.length) return
    nvim.pauseNotification()
    nvim.command('silent doautocmd User SmartfLeave', true)
    nvim.call('coc#util#clearmatches', [this.matchIds], true)
    this.matchIds = []
    await nvim.resumeNotification()
  }
}

function characterIndex(content: string, byteIndex: number): number {
  let buf = Buffer.from(content, 'utf8')
  return buf.slice(0, byteIndex).toString('utf8').length
}

function byteIndex(content: string, index: number): number {
  let s = content.slice(0, index)
  return Buffer.byteLength(s)
}
