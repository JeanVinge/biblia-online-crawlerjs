var request = require('request');
var cheerio = require('cheerio');

var page = "https://www.bibliaonline.com.br/acf/gn/1";

request(page, function(error, response, body) {

  if(error) {
      console.log("Error: " + error);
  }
  // Check status code (200 is HTTP OK)
  console.log("Status code: " + response.statusCode);
  if(response.statusCode === 200) {

    var verses = [];

    var $ = cheerio.load(body);

    var title = $("header h1").text();

    console.log("titulo :" + title);

    $('span.text').each(function(i, element){

      var number = $(this).prev().text();
      var verse = $(this).text();

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
