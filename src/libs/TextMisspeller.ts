interface wordChangeResult {
  numberOfChanges : number,
  resultingWord : string
}

export function misspellText(text: string): string {
  let chunks = text.split(/\s+/);
  let missspelledWords = chunks.map(function (chunk) { return misspellWord(chunk); });
  return missspelledWords.join(' ');
}

export function misspellWord(word: string): string {
  let a = word.charAt(0);
  let b = word.charAt(1);
  let remaining = word.substring(2);
  let setOfChanges = switchHomonyms(true, word);
  if (setOfChanges.numberOfChanges === 1){
    return setOfChanges.resultingWord;
  }
  setOfChanges = changeChunksComplex(true, a, b, remaining);
  if (setOfChanges.numberOfChanges === 1){
    return setOfChanges.resultingWord;
  }
  setOfChanges = changeChunksSimple(true, a, b, remaining);
  if (setOfChanges.numberOfChanges === 1){
    return setOfChanges.resultingWord;
  }
  return changeNumberOfRepeatableConsonants(true, a, b, remaining).resultingWord;
}

function switchHomonyms(isFirst : boolean, word : string) : wordChangeResult {
  if(word === "their") return {numberOfChanges: 1, resultingWord: "there"};
  if(word === "there") return {numberOfChanges: 1, resultingWord: "their"};
  if(word === "flare") return {numberOfChanges: 1, resultingWord: "flair"};
  if(word === "flair") return {numberOfChanges: 1, resultingWord: "flare"};
  if(word === "accept") return {numberOfChanges: 1, resultingWord: "except"};
  if(word === "except") return {numberOfChanges: 1, resultingWord: "accept"};
  if(word === "where") return {numberOfChanges: 1, resultingWord: "wear"};
  if(word === "wear") return {numberOfChanges: 1, resultingWord: "where"};
  if(word === "right") return {numberOfChanges: 1, resultingWord: "write"};
  if(word === "write") return {numberOfChanges: 1, resultingWord: "right"};
  return {numberOfChanges: 0, resultingWord: word};
}
function changeChunksComplex(isFirst: boolean, a: string, b: string, remaining: string): wordChangeResult {

  if (b === "") {
    return { numberOfChanges: 0, resultingWord: a + b};
  }
  else if (a === "e" && b === "n" && remaining.charAt(0) === "t") {
    return { numberOfChanges: 1, resultingWord: "an" + remaining};
  }
  else if (a === "a" && b === "n" && remaining.charAt(0) === "c") {
    return { numberOfChanges: 1, resultingWord: "en" + remaining};
  }
  else if (a === "e" && b === "r" && remaining.charAt(0) === "y") {
    return { numberOfChanges: 1, resultingWord: "ar" + remaining};
  }

  let bb = remaining.charAt(0);
  let remaining2 = remaining.substring(1);

  let recurseResult = changeChunksComplex(false, b, bb, remaining2);
  return { numberOfChanges: recurseResult.numberOfChanges,
            resultingWord: a + recurseResult.resultingWord}; 
}

function changeChunksSimple(isFirst: boolean, a: string, b: string, remaining: string): wordChangeResult {

  if (b === "") {
    return { numberOfChanges: 0, resultingWord: a + b};
  }
  else if (a === "e" && b === "i") {
    return { numberOfChanges: 1, resultingWord: "ie" + remaining};
  }
  else if (a === "i" && b === "e") {
    return { numberOfChanges: 1, resultingWord: "ei" + remaining};
  }
  else if (a === "a" && b === "r") {
    return { numberOfChanges: 1, resultingWord: "er" + remaining};
  }

  let bb = remaining.charAt(0);
  let remaining2 = remaining.substring(1);

  let recurseResult = changeChunksSimple(false, b, bb, remaining2);
  return { numberOfChanges: recurseResult.numberOfChanges,
            resultingWord: a + recurseResult.resultingWord}; 
}

function changeNumberOfRepeatableConsonants(isFirst: boolean, a: string, b: string, remaining: string): wordChangeResult {

  let doubleLettersThatCanBeSingled = ["c", "e", "g", "l", "m", "n", "o", "p", "r", "s", "t"];
  let singleLettersThatCanBeDoubled = ["c", "l", "m", "s", "z"];

  if (b === "") {
    return { numberOfChanges: 0, resultingWord: a + b};
  }
  else if (a === b && doubleLettersThatCanBeSingled.indexOf(a) > -1) {
    return { numberOfChanges: 1, resultingWord: a + remaining};
  }
  else if (!isFirst && a !== b && singleLettersThatCanBeDoubled.indexOf(a) > -1) {
    return { numberOfChanges: 1, resultingWord: a + a + b + remaining};
  }

  let bb = remaining.charAt(0);
  let remaining2 = remaining.substring(1);

  let recurseResult = changeNumberOfRepeatableConsonants(false, b, bb, remaining2);
  return { numberOfChanges: recurseResult.numberOfChanges,
            resultingWord: a + recurseResult.resultingWord}; 
}