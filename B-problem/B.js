function solution(input) {
    
    const [rulesPart, sequencesPart] = input.split('\n\n');
    

    const rules = rulesPart.split('\n').map(rule => {
        const [x, y] = rule.split('|').map(Number);
        return { x, y };
    });
    
    const sequences = sequencesPart.split('\n').map(seq => 
        seq.split(',').map(Number)
    );
    
    function isSequenceValid(sequence) {
        for (const rule of rules) {
            const xIndex = sequence.indexOf(rule.x);
            const yIndex = sequence.indexOf(rule.y);

            if (xIndex !== -1 && yIndex !== -1) {

                if (xIndex > yIndex) {
                    return false;
                }
            }
        }
        return true;
    }

    let validCount = 0;
    for (const sequence of sequences) {
        if (isSequenceValid(sequence)) {
            validCount++;
        }
    }
    
    return validCount;
}

const input = `28|12
5|9
9|2

10, 5, 15, 28, 9, 12
2, 7, 12, 5, 9
4, 8, 16, 32, 64`;

console.log(solution(input));
module.exports = solution;