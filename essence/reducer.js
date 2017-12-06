function bmmReduce(input) {
  var data = []
  data = input

  //var ss = SpreadsheetApp.getActiveSpreadsheet();
  //var tab = ss.getSheetByName("Sheet1");
  //var data = tab.getRange("A1:A39").getValues();

  Logger.log(data)

  // Flattens arrays within array due to column selection.
  var merged = [].concat.apply([], data);

  // Remove and '+' from the array.
  for (var i = 0; i < merged.length; i++) { merged[i] = merged[i].replace(/\+/g,""); }

  //Converts array to lower case

  merged = merged.map(function(x){ return x.toLowerCase() })

  // Orders array objects by length asc.
  merged.sort(function(a,b){
    return a.length - b.length;})

  // Removes duplicate objects from array.
  var uniqueMerged = merged.filter(function(elem, pos) {
  return merged.indexOf(elem) == pos;});

  // Word count function.
    function countWords(string) {

    //exclude  start and end white-space
    string = string.replace(/(^\s*)|(\s*$)/gi,"");

    //convert 2 or more spaces to 1
    string = string.replace(/[ ]{2,}/gi," ");

    // exclude newline with a start spacing
    string = string.replace(/\n /,"\n");

    return string.split(' ').length;
}

  // Removes single words from array.

  for (var wc=0; wc<uniqueMerged.length; wc++) {


    if (countWords(uniqueMerged[wc])===1) {
      uniqueMerged.splice(wc, 1);
      wc--;
    }
  }


  // Checks if keyword stem already exists and removes excessive longtail KWs.


var reduced =[]

reduced.push(uniqueMerged[0]);

    for (var j=1; j<uniqueMerged.length-1; j++){

      var counter = 0;

      for (var k=0; k<j; k++){

        if (uniqueMerged[j].indexOf(uniqueMerged[k]) > -1) { counter++ }
    }
      if (counter === 0) {
        reduced.push(uniqueMerged[j]);
        counter = 0;
      }
  }

    return reduced;
    Logger.log(reduced[0][1])

 // **********************************************************************************
 // FUNCTION TO COMPARE WORDS WITHIN KEYWORDS
 // **********************************************************************************

  function exaMatch(kw1,kw2) {
  // kw1 and kw2 must each be a single keyword as a single string  in an array.
  // A keyword can contain multiple words.
  var primaryKw = [kw1];
  var compareKw = [kw2];

  // Converts extracted keywords to strings.
  var primStr = primaryKw.toString();
  var compStr = compareKw.toString();

  function kwCleaner(string) {
    // Exclude  start and end white-space.
    string = string.replace(/(^\s*)|(\s*$)/gi,"");

    // Convert 2 or more spaces to 1.
    string = string.replace(/[ ]{2,}/gi," ");

    // Exclude newline with a start spacing.
    string = string.replace(/\n /,"\n");

    return string;
  }

  // Uses kwCleaner to remove excess spaces before converting to an array.
  var primStr = kwCleaner(primStr);
  var compStr = kwCleaner(compStr);

  var primArr = []
  var compArr = []

  // Splits each word in keyword string into individual string and converts to array.
  primStr = primStr.split(" ");
  primArr = [primStr];
  compStr = compStr.split(" ");
  compArr = [compStr];

  // Compares each word in first keyword with each word in second keyword and calculates number of matches.
  // Includes matches where word exists within another word, but is !=.
  // For example, cloud exists within clouds; this returns a match.
  var matchCounter = 0;

  for (var kwWord = 0; kwWord < primArr[0].length; kwWord++) {
    for (var compKwWord = 0; compKwWord < compArr[0].length; compKwWord++) {
      if (primArr[0][kwWord].trim().indexOf(compStr[compKwWord].trim()) > -1) { matchCounter++ }
    }
  }
  var result

  if (matchCounter === primArr[0].length) { result = "match" }
  else { result = "no match" }
}
 // **********************************************************************************

  for (var a = 1; a<reduced.length-1; a++){
    for (var b = 0; b<a; b++){
    exaMatch(reduced[a],reduced[b])
    }
  }
}
