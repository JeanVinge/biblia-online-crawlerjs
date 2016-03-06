var request = require('request');
var cheerio = require('cheerio');

var baseURL = "https://www.bibliaonline.com.br/";

var oldTestament = [];
var newTestament = [];

request(baseURL, function(error, response, body) {

  var testaments = cheerio.load(body);
  if(error) {
    console.log("Error: " + error);
  }
  // Check status code (200 is HTTP OK)
  console.log("Status code: " + response.statusCode);
  if(response.statusCode === 200) {

    oldTestament = parseTestaments(testaments, 'div.oldTestament li');
    newTestament = parseTestaments(testaments, 'div.newTestament li');

    //console.log(oldTestament);
    //console.log(newTestament);

    oldTestament.forEach(function(value){

      var link = baseURL + "acf/" + value.link + "/";
      numberOfChapters(link);

    });

  }
});

function parseChapter(link) {

    console.log("accessing = " + link);
  request(link, function(error, response, body) {

    if(error) {
        console.log("Error: " + error);
    }
    // Check status code (200 is HTTP OK)
    console.log("Status code: " + response.statusCode);
    if(response.statusCode === 200) {

      var verses = [];

      var cheer = cheerio.load(body);

      var title = cheer("header h1").text();

      console.log("titulo :" + title);

      cheer('span.text').each(function(i, element){

        var number = cheer(this).prev().text();
        var verse = cheer(this).text();

        //console.log(number);
        //console.log(verse);

        var metadata = {
          number: number,
          verse: verse
        }

        verses.push(metadata);
      });
    }

    var chapter = {
      title: title,
      verses: verses
    }

    console.log(chapter);

  });

}

function parseTestaments($, tag) {

  var parsedObj = []

  $(tag).each(function(i, element){

    var book = $(element).find('a');
    var href = $(book).attr('href');
    var linkArray = href.split('/')

    var metadata = {
      book: book.text(),
      link:linkArray[linkArray.length - 1],
      version: linkArray[1]
    }

    parsedObj.push(metadata);
  });

  return parsedObj;
}

function numberOfChapters(link) {

  request(link, function(error, response, body) {

  console.log("chapters accessing = " + link);
    if(error) {
      console.log("Error: " + error);
    }

    // Check status code (200 is HTTP OK)
    console.log("Status code: " + response.statusCode);
    if(response.statusCode === 200) {

      var cheer = cheerio.load(body);
      var pages = [];

      cheer('ul.ChapterList li').each(function(i, element){

        var page = cheer(element).text();

        console.log("page number = " + page);
        parseChapter(link + page);
        
        pages.push(page);
      });

      var pg = pages[pages.length - 1];

      console.log("number of pages = " + pg);
    }
  });
}
