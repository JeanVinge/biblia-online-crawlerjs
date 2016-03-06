var request = require('request');
var cheerio = require('cheerio');

var page = "https://www.bibliaonline.com.br/acf/gn";

    request(page, function(error, response, body) {

      if(error) {
          console.log("Error: " + error);
      }
      // Check status code (200 is HTTP OK)
      console.log("Status code: " + response.statusCode);
      if(response.statusCode === 200) {

        var $ = cheerio.load(body);


        var pages = [];

        $('ul.ChapterList li').each(function(i, element){

            var page = $(element).text();
            pages.push(page);
        });

        console.log(pages[pages.length - 1]);

  }

});
