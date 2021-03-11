var giphyAPIKey = "XRfxNr7yL9ahmuuB5NE74GlaO9Pem6su";

//Reaches out to Giphy API
function GiphyAPICall(e) {
  //Gets the data value of the button that was clicked
  var giphyCata = $(e.target).data("val");
  //giphy API URL with our Key + query equal to the button the user clicks
  var giphyURL = `https://api.giphy.com/v1/gifs/search?api_key=${giphyAPIKey}&q=${giphyCata}`;
  //calls the Giphy API
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

//Reaches out to the Joke API
function JokeAPICall(e) {
  //Grabs the data-joke from the clicked button
  var JokeCata = $(e.target).data("joke");
  //JokeAPI URL, no APIKey needed, blacklist added to keep returns safe for work
  var JokeURL = `https://v2.jokeapi.dev/joke/${JokeCata}?`;
  //calls the JokeAPI
  fetch(JokeURL)
    .then((data) => data.json())
    .then(function (jokeData) {
      printJoke(jokeData)
    });
  }
  
  // Renders our
  function printJoke(jokeData) {
    console.log(jokeData)
    $("#testJokeHolder").text("");
    $("#testJokeHolder2").text("");
    
    if (jokeData.joke) {
      $("#testJokeHolder").text(jokeData.joke);
    }
    else {
      $("#testJokeHolder").text(jokeData.setup);
      $("#testJokeHolder2").text(jokeData.delivery);
    }
}

//Adds Event listener to our category buttons, when a button is clicked invokes the GiphyAPI Function
$(".testBtn").on(
  "click",
  GiphyAPICall
); /*Update me with the permanent buttons class.*/

// Adds Event Listener to our category buttons, when a button is clicked invokes the JokeAPI Function.
$(".testBtn").on(
  "click",
  JokeAPICall
); /*Update me with the permanent buttons class.*/








//User selects favorite between joke and gif
var Giphy = "#testJokeHolder"
var Joke = "#testJokeHolder2"
//define storage
var myStorage = window.localStorage
//create event listener for both the joke and gif
Giphy.addEventListener("click", saveGiphy(GiphyAPICall));
Joke.addEventListener("click", saveJoke(JokeAPICall));
//function to save gif
function saveGiphy(GiphyAPICall){
    preventDefault();
    myStorage.getItem(GiphyAPICall);
}
//function to save Joke
function saveJoke(JokeAPICall){
    preventDefault();
    myStorage.getitem(JokeAPICall);
}

//if neither is selected return to homepage
// take input from selected button and place in an array in storage. Items in area are stored in class of joke or gif
//create a function to recall and display favorite jokes and gifs based on which callback button is pressed. 
//ensure array of favorites is displayed in a formatted container
//call class and append to hidden favorites container
//Giphy API Key, delete after assignment
