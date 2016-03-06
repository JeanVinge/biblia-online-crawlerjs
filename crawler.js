var request = require('request');
var cheerio = require('cheerio');

var baseURL = "https://www.bibliaonline.com.br/";

var oldTestament = [];
var newTestament = [];

makeRequest(baseURL, function(object) {

  parseTestaments(object, 'div.oldTestament li', function(object) {

    oldTestament = object;

    object.forEach(function(book){

      getNumberOfChapters(book.link, function(pages) {

        pages.forEach(function(page) {
          console.log(page);

          getChapter(book.link + "/" + page, function(chapter) {

          });
        });
      });
    });

  });

});

//
// Handler API
//

function makeRequest(path, success) {
  request(path, function(error, response, body) {

    handleRequest(error, response, body, function() {

      success(body);

    }, function(error) {

    });
  });
}

function handleRequest(error, response, body, success, failure) {

  if(error) {
    console.log("Error: " + error);
    failure(error);
  }

  if(response.statusCode === 200) {
    success();
  } else {

    console.log("Error with status code: " + response.statusCode);
    failure();
  }

}

//
// Parse Testament, returns a object that contains, books and link to the books.
//

function parseTestaments(body, tag, callback) {

  var parsedObj = []

  var $ = cheerio.load(body);

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

  callback(parsedObj);
}

//
// Returns the number of chapters that a book has
//

function numberOfChapters(body, tag, callback) {

  var $ = cheerio.load(body);
  var pages = [];

  $(tag).each(function(i, element){

    var page = $(element).text();

    pages.push(page);
  });

  callback(pages);
}

//
// Manager to get number of chapters
//

function getNumberOfChapters(path, callback) {

  console.log("parsing number of chapters in :" + baseURL + path);

  // todo: make for other bibles
  makeRequest(baseURL + "acf/" + path, function(body) {

    numberOfChapters(body, 'ul.ChapterList li', function(pages) {

      callback(pages);

    });
  });
}

//
// Returns a chapter that contain verses
//

function parseChapter(body, callback) {
  var verses = [];

  var $ = cheerio.load(body);
  var title = $("header h1").text();

  $('span.text').each(function(i, element){

    var number = $(element).prev().text();
    var verse = $(element).text();

    var metadata = {
      number: number,
      verse: verse
    }

    verses.push(metadata);
  });

  var chapter = {
    title: title,
    verses: verses
  }

  console.log(chapter);

  callback(chapter);
}

function getChapter(path, callback) {

  var url = baseURL + "acf/" + path;
  console.log("parsing chapter in :" + url);

  // todo: make for other bibles
  makeRequest(url, function(body) {

    parseChapter(body, function(chapter) {

    });
  });
}
