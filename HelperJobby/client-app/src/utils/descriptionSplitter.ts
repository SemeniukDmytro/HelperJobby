export function descriptionSplitter(description : string) : string[]{
    let lines = description.split('\n');
    let filteredLines: string[] = [];
    for(let line of lines){
        if(line.includes("shift") || line.includes("hour")  || line.includes("?") || line.length < 30 || line.includes(':')) continue;
        const subStrings = line.split(".");
        filteredLines.push(subStrings[0]);
    }
    let index : number = Math.floor(filteredLines.length/2);
    let result : string[] = [];
    const firstSentence = filteredLines[index];
    const secondSentence = filteredLines[(index+1)%filteredLines.length];
    if (firstSentence == secondSentence){
        return [firstSentence];
    }
    result.push(firstSentence);
    result.push(secondSentence);
    if (firstSentence.length + secondSentence.length < 120){
        const thirdSentence = filteredLines[index*3%filteredLines.length];
        if (thirdSentence !== firstSentence && thirdSentence !== secondSentence)
        result.push(thirdSentence);
    }
    const totalLength = result.reduce((acc, sentence) => acc + sentence.length, 0);
    const elementsCount = result.length;
    if (totalLength > 200){
        if (elementsCount === 2){
            result[elementsCount-1]=result[elementsCount - 1].slice(0, 200 - result[0].length)+"...";
        }
        else {
            result[elementsCount-1]=result[elementsCount-1].slice(0, 200-result[0].length - result[1].length)+"...";
        }
    }
    
    return result;
}
