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

//Favorites containers
var myFavGif = $("#myFavGif")
var myFavJoke = $("#myFavJoke")

//Event Listeners

// Changes screen to hide our main content container, hide our fav jokes container, and show our fav gifs container, then it prints out from local storage
displayFavGifs.on("click", function () {
  hideNewContent();
  showFavoriteDisplay();
  hideFavJokeContainer();
  showFavGifContainer();
  printFavGifs()
});

//Hides all containers, shows fav jokes, prints fav jokes from local storage
displayFavJokes.on("click", function () {
  hideNewContent();
  showFavoriteDisplay();
  hideFavGifContainer();
  showFavJokeContainer();
  printFavJokes();
});

//hides our favorite screens, reenables main content.
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
  //JokeAPI URL, no APIKey needed, blacklist added to attempt to keep returns safe for work.
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
function saveGiphy() {
  // Find the src of the image that the user clicked on
  var gifURL = gifHolder.attr("src");
  console.log(gifURL);
  //Check to see if this gif is already a part of our array
  if (storedGifs.indexOf(gifURL) === -1) {
    // We want to add that src to our storedGifs array that we declare on page load
  storedGifs.push(gifURL);
  // create a JSON stringified version of this array
  var stringifiedData = JSON.stringify(storedGifs);
  // Store this string in our localstorage
  myStorage.setItem("gifs", stringifiedData);
}}

//function to save Joke
function saveJoke() {
  // myStorage.getitem(JokeAPICall);
  console.log("Save Joke");
  // Find the text of the joke that the user clicked on
  var jokeText = jokeHolder.text();
  if (storedJokes.indexOf(jokeText) === -1) {
  // We want to add that text to our storedJokes array that we declare on page load
  storedJokes.push(jokeText);
  // create a JSON stringified version of this array
  var stringifiedData = JSON.stringify(storedJokes);
  // Store this string in our localstorage
  myStorage.setItem("joke", stringifiedData);
}}

//Function to initialize our LS arrays
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

// Hides our main screen elements (cat buttons, joke display, gif display) except for the title header
function hideNewContent() {
  $("#intro").addClass("hidden");
  $("#contentWrapper").addClass("hidden");
}

// Shows our main screen elements (cat buttons, joke display, gif display)
function showNewContent() {
  $("#intro").removeClass("hidden");
  $("#contentWrapper").removeClass("hidden");
}

// hides our favorites content container
function hideFavoriteDisplay() {
  $("#favorites-display").addClass("hidden");
}

// shows our favorites content container (contains our favgif and fav jokes containers)
function showFavoriteDisplay() {
  $("#favorites-display").removeClass("hidden");
}

//hides our fav gif container
function hideFavGifContainer() {
  myFavGif.addClass("hidden");

}

//shows our fav gif container
function showFavGifContainer() {
  myFavGif.removeClass("hidden");
}

//Hides our fav joke container
function hideFavJokeContainer() {
  myFavJoke.addClass("hidden");

}

//shows our fav joke container
function showFavJokeContainer() {
  myFavJoke.removeClass("hidden");
}

//runs our initialize array function on page load
initializeArray();

//Instructions for DAN

//When creating the local storage retrieval target the element $<"#myFavGif"> and $<"#myFavJoke"> (that element wont exist just yet until Bri/Steph update the HTML side of things) Have your stuff output to there and we'll tie it all up later. The favorite buttons don't have their ID's setup yet, but their ids will be fav-gifs-LS and fav-jokes-LS

//if neither is selected return to homepage
// take input from selected button and place in an array in storage. Items in area are stored in class of joke or gif
//create a function to recall and display favorite jokes and gifs based on which callback button is pressed.
//ensure array of favorites is displayed in a formatted container
//call class and append to hidden favorites container

//define items to be retrieved from storage
// var giphValue = myStorage.getItem(GiphyAPICall);
// var jokeValue = myStorage.getItem(JokeAPICall);

//James Local Storage retrieval solution

//function to print our locally stored Jokes to our favorites container
function printFavJokes() {
  // Empty our container so we don't get duplicates
  myFavJoke.empty();
  //Pull from local storage and parse it into a usable object
  var retrievedJoke = JSON.parse(localStorage.getItem("joke"));
  //runs below for each contained item in our local storage
  retrievedJoke.forEach(function (joke) {
    //Creates a p element
    var createJokeEl = $("<p>");
    //sets the text content to the stored joke string
    createJokeEl.text(joke);
    //Adds our class giving it a border + spacing
    createJokeEl.addClass("printedJoke");
    //appends our newly created element to the container.
    myFavJoke.append(createJokeEl);
  })
}

//function to print our locally stored Gifs to our favorites container.
function printFavGifs() {
  //Empty our containers so we don't get duplicates
  myFavGif.empty();
  //Pull from local storage and parse it into a usable object
  var retrievedGifs = JSON.parse(localStorage.getItem("gifs"));
  //runs below for each contained item in our local storage
  retrievedGifs.forEach(function (gif) {
    //creates an image element
    var createGifEl = $("<img>");
    //sets the source equal to the URL we have saved in local storage
    createGifEl.attr("src", gif);
    //adds our custom class to the element giving it spacing and setting it to be inline
    createGifEl.addClass("printedGif");
    //Appends the created element to the favorites container
    myFavGif.append(createGifEl);
  })
}

