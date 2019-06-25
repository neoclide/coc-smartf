interface Position {
  line: number
  character: number
}

export function getPositions(character: string, lines: string[], matchWord: boolean, offset = 0): Position[] {
  let positions: Position[] = []
  let i = 0
  for (let line of lines) {
    let start = i == 0 ? offset : 0
    for (let j = start; j < line.length; j++) {
      if (line[j] == character) {
        if (!matchWord || (j == 0 || !wordChar(line[j - 1]))) {
          positions.push({line: i, character: j})
        }
      }
    }
    i++
  }
  return positions
}

export function wordChar(ch: string): boolean {
  let code = ch.charCodeAt(0)
  return (code >= 97 && code <= 122) || (code >= 65 && code <= 90)
}
