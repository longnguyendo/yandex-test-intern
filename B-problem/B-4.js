function solution(input) {
    const [rulesPart, sequencesPart] = input.split('\n\n');
    const rules = rulesPart.split('\n').filter(rule => rule.trim() !== '');
    const sequences = sequencesPart.split('\n').filter(seq => seq.trim() !== '');

    let validCount = 0;

    sequences.forEach(seq => {
        const numbers = seq.split(/[ ,]+/).map(Number);
        const indexMap = new Map();
        numbers.forEach((num, index) => {
            indexMap.set(num, index);
        });

        let isValid = true;
        for (const rule of rules) {
            const [x, y] = rule.split('|').map(Number);
            if (indexMap.has(x) && indexMap.has(y)) {
                if (indexMap.get(x) > indexMap.get(y)) {
                    isValid = false;
                    break;
                }
            }
        }

        if (isValid) {
            validCount++;
        }
    });

    return validCount;
}

const input = `28|12
9|2
10|2

10, 5, 15, 28, 9, 12
2, 7, 12, 5, 9
4, 8, 16, 32, 64`;

console.log(solution(input));
module.exports = solution;