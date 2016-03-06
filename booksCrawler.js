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

    //console.log("body :" + body);

    var $ = cheerio.load(body);

    var verseOfTheDay = $('div.dailyVerses span').text();

    console.log('verse: '+ verseOfTheDay);
  }

});
