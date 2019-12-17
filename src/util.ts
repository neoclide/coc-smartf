interface Position {
    line: number;
    character: number;
}

export function getPositions(
    character: string,
    lines: string[],
    matchWord: boolean,
    offset = 0,
    isFind = 0,
): Position[] {
    const positions: Position[] = [];
    const isWordChar = wordChar(character);

    lines.forEach((line, idx) => {
        const start = idx === 0 ? offset : 0;

        line.split('').forEach((char, cidx) => {
            if (cidx < start) {
                return;
            }

            if (char === character) {
                if (
                    !matchWord ||
                    !isWordChar ||
                    cidx === 0 ||
                    !wordChar(line[cidx - 1])
                ) {
                    positions.push({
                        line: idx,
                        character: cidx,
                    });
                }
            }
        });
    });

    return positions;
}

export function wordChar(ch: string): boolean {
    const code = ch.charCodeAt(0);
    return (code >= 97 && code <= 122) || (code >= 65 && code <= 90);
}
