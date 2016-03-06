var request = require('request');
var cheerio = require('cheerio');

var page = "https://www.bibliaonline.com.br/";

    request(page, function(error, response, body) {

      if(error) {
          console.log("Error: " + error);
      }
      // Check status code (200 is HTTP OK)
      console.log("Status code: " + response.statusCode);
      if(response.statusCode === 200) {

        var $ = cheerio.load(body);

        var books = []

        $('div.oldTestament li').each(function(i, element){

            var book = $(element).find('a');

            var href = $(book).attr('href');

            var linkArray = href.split('/')
            var metadata = {
              book: book.text(),
              link:linkArray[linkArray.length - 1],
              version: linkArray[1]
            }

            books.push(metadata);

        });

        console.log(books);
  }

});
