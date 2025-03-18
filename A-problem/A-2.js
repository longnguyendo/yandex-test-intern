export function getCompressedString(text) {

    const tokens = text.match(/\w+|\W+/g) || [];

    const wordFrequency = {};
    const wordOrder = [];
    for (const token of tokens) {
        if (/\w+/.test(token)) {
            const word = token.toLowerCase();
            if (!wordFrequency[word]) {
                wordFrequency[word] = 0;
                wordOrder.push(word);
            }
            wordFrequency[word]++;
        }
    }

    const sortedWords = wordOrder.sort((a, b) => {
        const freqDiff = wordFrequency[b] - wordFrequency[a];
        if (freqDiff !== 0) return freqDiff;
        return wordOrder.indexOf(a) - wordOrder.indexOf(b);
    });

    const wordIndexMap = {};
    sortedWords.forEach((word, index) => {
        wordIndexMap[word] = index;
    });

    const compressedTokens = tokens.map(token => {
        if (/\w+/.test(token)) {
            return wordIndexMap[token.toLowerCase()];
        }
        return token;
    });

    return compressedTokens.join('');
}

let text = "Привет, как у тебя дела? Да, вроде, хорошо, а у тебя?";
console.log(text);
console.log(getCompressedString(text))