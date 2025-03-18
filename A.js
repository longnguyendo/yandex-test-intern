export function getCompressedString(text) {

    const tokens = text.match(/(\p{L}+)|([^\p{L}]+)/gu) || [];
    
    const wordStats = new Map();
    let order = 0;
    for (const token of tokens) {
        if (/^\p{L}+$/ui.test(token)) {
            const lowerWord = token.toLowerCase();
            if (!wordStats.has(lowerWord)) {
                wordStats.set(lowerWord, { count: 0, firstIndex: order++ });
            }
            const entry = wordStats.get(lowerWord);
            entry.count++;
        }
    }
    
    const sortedWords = Array.from(wordStats.entries())
        .sort((a, b) => {
            const countDifferent = b[1].count - a[1].count;
            return countDifferent !== 0 ? countDifferent : a[1].firstIndex - b[1].firstIndex;
        })
        .map(entry => entry[0]);
    
    const compressed = tokens.map(token => {
        if (/^\p{L}+$/ui.test(token)) {
            const lowerWord = token.toLowerCase();
            return sortedWords.indexOf(lowerWord).toString();
        } else {
            return token;
        }
    }).join('');
    
    return compressed;
}

// module.exports = getCompressedString;

let text = `Привет, как у тебя дела?
Да, вроде, хорошо, а у тебя?`;
console.log(text);
console.log(getCompressedString(text))
