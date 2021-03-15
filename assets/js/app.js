//Global Variables

//Giphy API Key
var giphyAPIKey = "XRfxNr7yL9ahmuuB5NE74GlaO9Pem6su";

var submitBtn = $(".testBtn");
var gifHolder = $("#testGifHolder");
var jokeHolder = $("#testJokeHolder");

//Storage variables
var myStorage = window.localStorage;
var storedGifs = myStorage.getItem("gifs");
var storedJokes = myStorage.getItem("jokes");

// Variables target the save to favorites buttons
var joke = $("#fav-jokes-LS");
var giphy = $("#fav-gifs-LS");

//Variables to change screens to favorites/new content
var displayFavGifs = $("#saved-gif");
var displayFavJokes = $("#saved-joke");
var displayNewContent = $("#reset");

//Event Listeners

// Event listeners on our "Show me" buttons.
displayFavGifs.on("click", function () {
  hideNewContent();
  showFavoriteDisplay();
  hideFavJokeContainer();
  showFavGifContainer();
});

displayFavJokes.on("click", function () {
  hideNewContent();
  showFavoriteDisplay();
  hideFavGifContainer();
  showFavJokeContainer();
});

displayNewContent.on("click", function () {
  hideFavGifContainer();
  hideFavJokeContainer();
  hideFavJokeContainer();
  showNewContent();
});

//Adds Event listener to our category buttons, when a button is clicked invokes the GiphyAPI and JokeAPI Functions.
submitBtn.on("click", function (e) {
  GiphyAPICall(e);
  JokeAPICall(e);
});

//Adds Event Listener on our Gif element
giphy.on("click", saveGiphy);

//Adds Event Listener on our Joke element
joke.on("click", saveJoke);

// Functions

//Reaches out to Giphy API
function GiphyAPICall(e) {
  //Gets the data value of the button that was clicked
  var giphyCata = $(e.target).data("val");
  //giphy API URL with our Key + query equal to the button the user clicks
  var giphyURL = `https://api.giphy.com/v1/gifs/search?rating=pg&api_key=${giphyAPIKey}&q=${giphyCata}`;
  //calls the Giphy API
  fetch(giphyURL)
    .then((data) => data.json())
    .then(function (giphyData) {
      // Makes sure we get a random gif
      var i = Math.floor(Math.random() * giphyData.data.length);
      //variable for the random gifs hosted url
      var gif = giphyData.data[i].images.original.url;
      //sets our placeholder element to the gifs source, displaying it.
      gifHolder.attr("src", gif);
    });
}

//Reaches out to the Joke API
function JokeAPICall(e) {
  //Grabs the data-joke from the clicked button
  var JokeCata = $(e.target).data("joke");
  //JokeAPI URL, no APIKey needed, blacklist added to keep returns safe for work
  var JokeURL = `https://v2.jokeapi.dev/joke/${JokeCata}?blacklist=nsfw,sexist,racist`;
  //calls the JokeAPI
  fetch(JokeURL)
    .then((data) => data.json())
    .then(function (jokeData) {
      printJoke(jokeData);
    });
}

// Renders our recieved joke
function printJoke(jokeData) {
  // Clears our previous Jokes
  $("#testJokeHolder").text("");

  // If single-type joke is recieved from API
  if (jokeData.joke) {
    $("#testJokeHolder").text(jokeData.joke);
  } else {
    //else if double-type joke
    $("#testJokeHolder").html(jokeData.setup + " " + jokeData.delivery);
  }
}

//function to save gif
function saveGiphy(e) {
  console.log(e);
  // e.target is going to be the img that is storing our gif
  // Find the src of the image that the user clicked on
  var gifURL = gifHolder.attr("src");
  console.log(gifURL);
  // We want to add that src to our storedGifs array that we declare on page load
  storedGifs.push(gifURL);
  // create a JSON stringified version of this array
  var stringifiedData = JSON.stringify(storedGifs);
  // Store this string in our localstorage
  myStorage.setItem("gifs", stringifiedData);
}
//function to save Joke
function saveJoke(e) {
  // myStorage.getitem(JokeAPICall);
  console.log("Save Joke");
  // Find the text of the joke that the user clicked on
  var jokeText = jokeHolder.text();
  console.log(jokeText);
  // We want to add that text to our storedJokes array that we declare on page load
  storedJokes.push(jokeText);
  // create a JSON stringified version of this array
  var stringifiedData = JSON.stringify(storedJokes);
  // Store this string in our localstorage
  myStorage.setItem("joke", stringifiedData);
}

//Function to initialize our arrays
function initializeArray() {
  //Initializes our Gif storage array
  if (storedGifs) {
    // if our array exists in local storage. pull it
    storedGifs = JSON.parse(storedGifs);
  } else {
    //if it doesn't exist, create a blank array
    storedGifs = [];
  }

  //Initializes our Joke storage array
  if (storedJokes) {
    // if our array exists in local storage. pull it
    storedJokes = JSON.parse(storedJokes);
  } else {
    // if it doesn't exist, create a blank array
    storedJokes = [];
  }
}

// Hides our main screen elements except for the title header
function hideNewContent() {
  $("#intro").addClass("hidden");
  $("#contentWrapper").addClass("hidden");
}

// Shows our main screen elements
function showNewContent() {
  $("#intro").removeClass("hidden");
  $("#contentWrapper").removeClass("hidden");
}

// hides our favorites content container
function hideFavoriteDisplay() {
  $("#favorites-display").addClass("hidden");
}

// shows our favorites content container
function showFavoriteDisplay() {
  $("#favorites-display").removeClass("hidden");
}

function hideFavGifContainer() {
  $("#myFavGif").addClass("hidden");
  // Clears out the gif container when we hide it so the next time it's loaded we don't get duplicates
  $("myFavGif").empty();
}

function showFavGifContainer() {
  $("#myFavGif").removeClass("hidden");
}

function hideFavJokeContainer() {
  $("#myFavJoke").addClass("hidden");
  // Clears out the joke container when we hide it so the next time it's loaded we don't get duplicates
  $("myFavJoke").empty();
}

function showFavJokeContainer() {
  $("#myFavJoke").removeClass("hidden");
}

function currentFavJoke() {
  array.forEach(element => {
    
  });
})

function printFavJokes() {
  var X = JSON.parse(localStorage.getItem("joke"));
  x.forEach(function (storedJokes) {
  var createJoke = $("<p>")
  createJoke.text(x)
  }

  // function printFavGifs() {
  //   var X = JSON.parse(localStorage.getItem("gifs"));
  //   x.forEach(function (storedGifs) {
  //   var createGif = $("<p>")
  //   createGif.text(x)
  //   }

//runs our initialize array function on page load
// initializeArray();

//Instructions for DAN


//if neither is selected return to homepage
// take input from selected button and place in an array in storage. Items in area are stored in class of joke or gif
//create a function to recall and display favorite jokes and gifs based on which callback button is pressed.
//ensure array of favorites is displayed in a formatted container
//call class and append to hidden favorites container

//define items to be retrieved from storage
// var giphValue = myStorage.getItem(GiphyAPICall);
// var jokeValue = myStorage.getItem(JokeAPICall);
// var saveFavJokes = document.getElementById("fav-jokes-LS"); 
// var saveFaveGifs = document.getElementById("fav-gifs-LS");

// saveFavJokes.on("click", saveJoke);
// saveFaveGifs.on("click", saveGiphy);
