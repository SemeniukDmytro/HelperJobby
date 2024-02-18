function filterLines(lines: string[]): string[] {
    const wordsToExclude = ['why', 'when', 'who', 'what', 'where', 'how'];

    return lines.filter(line => {
        const lowerCaseLine = line.toLowerCase();
        return !lowerCaseLine.includes("?") &&
            lowerCaseLine.length >= 30 &&
            !lowerCaseLine.includes(':') &&
            !wordsToExclude.some(word => lowerCaseLine.includes(word));
    });
}

function generateSentences(filteredLines: string[]): string[] {
    const sentences: string[] = [];
    const index: number = Math.floor(filteredLines.length / 2);

    const addSentence = (sentence: string) => {
        if (sentence && !sentences.includes(sentence)) {
            sentences.push(sentence);
        }
    };

    addSentence(filteredLines[index]);
    addSentence(filteredLines[(index + 1) % filteredLines.length]);
    if (sentences.length === 2 && sentences[0].length + sentences[1].length > 140) {
        return sentences;
    }

    let thirdSentenceIndex = index * 3 % filteredLines.length;
    let thirdSentence = filteredLines[thirdSentenceIndex];

    let sentencesLeft = filteredLines.length - thirdSentenceIndex - 1;
    while ((thirdSentence === sentences[0] || thirdSentence === sentences[1]) && sentencesLeft > 0) {
        sentencesLeft--;
        thirdSentence = filteredLines[++thirdSentenceIndex];
    }

    if (thirdSentence) {
        addSentence(thirdSentence);
    }

    return sentences;
    return [];
}

function handleLengthConstraint(sentences: string[]): string[] {
    const totalLength = sentences.reduce((acc, sentence) => acc + sentence.length, 0);
    const elementsCount = sentences.length;

    if (totalLength > 200) {
        const remainingLength = 200 - sentences[0].length - sentences[1].length;
        sentences[elementsCount - 1] = sentences[elementsCount - 1].slice(0, remainingLength) + "...";
    }

    return sentences;
}

export function descriptionSplitter(description: string): string[] {
    const lines = description.split(/[\n.]/);
    const filteredLines = filterLines(lines);
    const sentences = generateSentences(filteredLines);
    const result = handleLengthConstraint(sentences);

    return result;
}