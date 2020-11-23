export function misspellText(text : string) : string {
    let chunks = text.split(/\s+/);
    let missspelledWords = chunks.map(function(chunk) { return misspellWord(chunk);});
    return missspelledWords.join(' ');
  }
  
  function misspellWord(word : string) : string {
    let a = word.charAt(0);
    let b = word.charAt(1);
    let remaining = word.substring(2);
    return changeChunks(true, a, b, remaining);
  }
  
  function changeChunks(isFirst : boolean, a : string, b : string, remaining : string) : string {
  
    let doubleLettersThatCanBeSingled = ["c", "e", "g", "l", "m", "n", "o", "p", "r", "s", "t"];
    let singleLettersThatCanBeDoubled = ["c", "l", "m", "s", "z"];
  
    if(b === ""){
      return a + b;
    }
    else if (a === "e" && b === "i"){
      return "ie" + remaining;
    }
    else if (a === "i" && b === "e"){
      return "ei" + remaining;
    }
    else if (a === "a" && b === "r"){
      return "er" + remaining;
    }
    else if (a === "e" && b === "n" && remaining.charAt(0) === "t"){
      return "an" + remaining;
    }
    else if (a === b && doubleLettersThatCanBeSingled.indexOf(a) > -1){
      return a + remaining;
    }
    else if (!isFirst && a !== b && singleLettersThatCanBeDoubled.indexOf(a) > -1){
      return a + a + b + remaining;
    }
  
    let bb = remaining.charAt(0);
    let remaining2 = remaining.substring(1);
    return a + changeChunks(false, b, bb, remaining2);
  }