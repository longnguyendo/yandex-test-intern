export function getCompressedString(text) {

    const tokens = text.match(/\w+|\W+/g) || [];


    const wordFrequency = new Map();

    const uniqueWords = [];

    // Проходим по всем токенам
    for (const token of tokens) {
        // Если токен является словом (содержит буквы)
        if (/\w+/.test(token)) {
            const word = token.toLowerCase();
            if (!wordFrequency.has(word)) {
                wordFrequency.set(word, 0);
                uniqueWords.push(word);
            }
            wordFrequency.set(word, wordFrequency.get(word) + 1);
        }
    }

    // Сортируем слова по частоте встречаемости и порядку появления
    uniqueWords.sort((a, b) => {
        const freqA = wordFrequency.get(a);
        const freqB = wordFrequency.get(b);
        if (freqA !== freqB) {
            return freqB - freqA; // Сначала слова с большей частотой
        } else {
            return uniqueWords.indexOf(a) - uniqueWords.indexOf(b); // Если частоты равны, сортируем по порядку появления
        }
    });

    const wordToIndex = new Map();
    for (let i = 0; i < uniqueWords.length; i++) {
        wordToIndex.set(uniqueWords[i], i);
    }

    const compressedTokens = tokens.map(token => {
        if (/\w+/.test(token)) {
            return wordToIndex.get(token.toLowerCase());
        } else {
            return token;
        }
    });

    return compressedTokens.join('');
}


let text = `Привет, как у тебя дела?
Да, вроде, хорошо, а у тебя?`;
console.log(getCompressedString(text));
