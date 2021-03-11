var giphyAPIKey = "XRfxNr7yL9ahmuuB5NE74GlaO9Pem6su";
​
//define storage
/*
  When the page loads
  We want to look to localstorage and see if the user has any saved jokes or gifs
*/
var myStorage = window.localStorage;
var storedGifs = myStorage.getItem("gifs");
var storedJokes = myStorage.getItem("jokes");
​
/*
  If our user does have saved information
  We need to convert it from a JSON string
  To a Javascript Data Structure
  Note: In this case the data structure will be an array
*/
if (storedGifs) {
  storedGifs = JSON.parse(storedGifs);
} else {
  storedGifs = [];
}
​
if (storedJokes) {
  storedJokes = JSON.parse(storedJokes);
} else {
  storedJokes = [];
}
​
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
​
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
      printJoke(jokeData);
    });
}
​
// Renders our
function printJoke(jokeData) {
  $("#testJokeHolder").text("");
​
  if (jokeData.joke) {
    $("#testJokeHolder").text(jokeData.joke);
  } else {
    $("#testJokeHolder").html(jokeData.setup + "<br>" + jokeData.delivery);
  }
  // $("#testJokeHolder2").text(jokeData.delivery);
}
​
//Adds Event listener to our category buttons, when a button is clicked invokes the GiphyAPI Function
$(".testBtn").on(
  "click",
  GiphyAPICall
); /*Update me with the permanent buttons class.*/
​
// Adds Event Listener to our category buttons, when a button is clicked invokes the JokeAPI Function.
$(".testBtn").on(
  "click",
  JokeAPICall
); /*Update me with the permanent buttons class.*/
​
// Select an element
// Vanilla -> document.querySelector()
// jQuery -> $()
​
// Add event listener to the element
// Vanilla -> addEventListener()
// jQuery -> on()
​
//User selects favorite between joke and gif
// Select the place holders on the page
var joke = $("#testJokeHolder");
var giphy = $("#testGifHolder");
​
//create event listener for both the joke and gif
giphy.on("click", saveGiphy);
​
joke.on("click", saveJoke);
​
//function to save gif
function saveGiphy(e) {
  console.log(e);
  // e.target is going to be the img that is storing our gif
  // Find the src of the image that the user clicked on
  var gifURL = e.target.getAttribute("src");
  console.log(gifURL);
  // We want to add that src to our storedGifs array that we declare on page load
  storedGifs.push(gifURL);
  // create a JSON stringified version of this array
  var stringifiedData = JSON.stringify(storedGifs);
  // Store this string in our localstorage
  myStorage.setItem("gifs", stringifiedData);
}
​
//function to save Joke
function saveJoke(e) {
  // myStorage.getitem(JokeAPICall);
  console.log("Save Joke");
  return;
}
​
//if neither is selected return to homepage
// take input from selected button and place in an array in storage. Items in area are stored in class of joke or gif
//create a function to recall and display favorite jokes and gifs based on which callback button is pressed.
//ensure array of favorites is displayed in a formatted container
//call class and append to hidden favorites container
//Giphy API Key, delete after assignment
​
//define items to be retrieved from storage
// var giphValue = myStorage.getItem(GiphyAPICall);
// var jokeValue = myStorage.getItem(JokeAPICall)










