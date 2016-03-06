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
    }
  });
