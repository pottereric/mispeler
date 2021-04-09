import { misspellWord, misspellText } from "./TextMisspeller";

describe("misspellWord", () =>{
  test("at should reamin at", () => {
    let misspelledWord = misspellWord("at");
    expect(misspelledWord).toBe("at")
  })

  test("I should reamin I", () => {
    let misspelledWord = misspellWord("I");
    expect(misspelledWord).toBe("I")
  })
  test("weird should become wierd", () => {
      let misspelledWord = misspellWord("weird");
      expect(misspelledWord).toBe("wierd")
  })

  test("foreign should become foriegn", () => {
    let misspelledWord = misspellWord("foreign");
    expect(misspelledWord).toBe("foriegn")
  })

  test("friend should become freind", () => {
    let misspelledWord = misspellWord("friend");
    expect(misspelledWord).toBe("freind")
  })

  test("calendar should become calender", () => {
    let misspelledWord = misspellWord("calendar");
    expect(misspelledWord).toBe("calender")
  })

  test("independent should become independant", () => {
    let misspelledWord = misspellWord("independent");
    expect(misspelledWord).toBe("independant")
  })

  test("aggressive should become agressive", () => {
    let misspelledWord = misspellWord("aggressive");
    expect(misspelledWord).toBe("agressive")
  })
  
  test("finally should become finaly", () => {
    let misspelledWord = misspellWord("finally");
    expect(misspelledWord).toBe("finaly")
  })
  
  test("across should become sisster - double the s", () => {
    let misspelledWord = misspellWord("sister");
    expect(misspelledWord).toBe("sisster")
  })

  test("their should become there - switch homophones", () => {
    let misspelledWord = misspellWord("their");
    expect(misspelledWord).toBe("there")
  })

//   test("across should not become accross - don't double the last s", () => {
//     let misspelledWord = misspellWord("across");
//     expect(misspelledWord).toBe("accross")
//   })

});

describe("missspellinging a sentance", () => {
    test("Punctuation should be retained", () =>{
      expect(misspellText("Lets, eat grandma!")).toBe("Letss, eat grandmma!")
    })
  });

// TODO: look at https://www.dailywritingtips.com/7-types-of-misspellings/
// TODO: look at https://www.englishclub.com/spelling/misspellings.htm
