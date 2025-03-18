function solution(input) {

    const lines = input.split('\n');
    const emptyLineIndex = lines.indexOf('');


    const rules = [];
    if (emptyLineIndex !== -1) {
        const rulesPart = lines.slice(0, emptyLineIndex).filter(line => line.trim() !== '');
        for (const line of rulesPart) {
            const [x, y] = line.split('|');
            rules.push({ x: parseInt(x, 10), y: parseInt(y, 10) });
        }
    }

    const sequences = [];
    const sequencesPart = emptyLineIndex !== -1 
        ? lines.slice(emptyLineIndex + 1).filter(line => line.trim() !== '')
        : lines.filter(line => line.trim() !== '');

    for (const line of sequencesPart) {
        const nums = line.split(/,\s*/).map(num => parseInt(num, 10));
        sequences.push(nums);
    }

    let count = 0;

    for (const sequence of sequences) {
        const numIndices = new Map();
        for (let i = 0; i < sequence.length; i++) {
            numIndices.set(sequence[i], i);
        }

        let isValid = true;
        for (const rule of rules) {
            const x = rule.x;
            const y = rule.y;
            if (numIndices.has(x) && numIndices.has(y)) {
                if (numIndices.get(x) >= numIndices.get(y)) {
                    isValid = false;
                    break;
                }
            }
        }

        if (isValid) {
            count++;
        }
    }

    return count;
}

const input = `28|12
0|3
10|2

10, 5, 15, 28, 9, 12
2, 7, 12, 5, 9
4, 8, 16, 32, 64`;

console.log(solution(input));
module.exports = solution;