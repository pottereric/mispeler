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
  let firstSetOfChanges = changeChunks(true, a, b, remaining);
  if (firstSetOfChanges.numberOfChanges === 0){
    return changeNumberOfRepeatableConsonants(true, a, b, remaining).resultingWord;
  }
  return firstSetOfChanges.resultingWord;
}

function changeChunks(isFirst: boolean, a: string, b: string, remaining: string): wordChangeResult {

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
  else if (a === "e" && b === "n" && remaining.charAt(0) === "t") {
    return { numberOfChanges: 1, resultingWord: "an" + remaining};
  }

  let bb = remaining.charAt(0);
  let remaining2 = remaining.substring(1);

  let recurseResult = changeChunks(false, b, bb, remaining2);
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