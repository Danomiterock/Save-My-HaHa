var giphyAPIKey = "XRfxNr7yL9ahmuuB5NE74GlaO9Pem6su";

//Reaches out to Giphy API with category
function GiphyAPICall(e) {
  //Gets the data value of the button that was clicked
  var giphyCata = $(e.target).data("val");
  //giphy API
  var giphyURL = `https://api.giphy.com/v1/gifs/search?api_key=${giphyAPIKey}&q=${giphyCata}`;
  fetch(giphyURL)
    .then((data) => data.json())
    .then(function (giphyData) {
      // Makes sure we get a random gif
      var index = Math.floor(Math.random() * giphyData.data.length);
      //variable for the random gifs hosted url
      var gif = giphyData.data[index].images.original.url;
      //sets our placeholder element to the gifs source, displaying it.
      $("#testGifHolder").attr("src", gif);
    });
}

function JokeAPICall(e) {
  var JokeCata = $(e.target).data("joke");
  var JokeURL = `https://v2.jokeapi.dev/joke/${JokeCata}?blacklistFlags=nsfw,racist,sexist&type=single`;

  fetch(JokeURL)
    .then((data) => data.json())
    .then(function (jokeData) {
      console.log(jokeData);
      $("#testJokeHolder").text(jokeData.joke);
    });
}

$(".testBtn").on(
  "click",
  GiphyAPICall
); /*Update me with the permanent buttons class. Calls Giphy*/
$(".testBtn").on(
  "click",
  JokeAPICall
); /*Update me with the permanent buttons class. Calls JokeAPI*/
