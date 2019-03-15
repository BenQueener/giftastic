//initialize global variables
var apiKey = "yx64KPFC2rhNqVaYehYGswlOMV5xOnkL";
//The beginning list of things from a Dragonball Z topic
var topics = ["Goku", "Vegeta", "Gohan", "Trunks", "Frieza", "Bulma", "Android 8","Krillin", "Goten","Videl","Master Roshi","Yamcha","Nappa","Raditz","Tien Shinhan","Mr. Satan", "Captian Ginyu", "Chiaotzu", "Recoome", "Spopovich", "Kibito","Majin Buu"];

// Example queryURL for Giphy API
var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=" + apiKey;

// Function for displaying topic data
function renderButtons() {

    // Deleting the topic buttons prior to adding new movie buttons
    $("#buttons-view").empty();

    // Looping through the array of topics
    for (var i = 0; i < topics.length; i++) {

      // Then dynamicaly generating buttons for each topic in the array.
      var a = $("<button>");
      // Adding a class
      a.addClass("topic");
      // Adding a data-attribute with a value of the topic at index i
      a.attr("data-name", topics[i]);
      // Providing the button's text with a value of the topic at index i
      a.text(topics[i]);
      // Adding the button to the HTML
      $("#buttons-view").append(a);
    }
}

// This function handles events where one button is clicked
$("#add-topic").on("click", function(event) {
    event.preventDefault();

    // This line will grab the text from the input box
    var movie = $("#topic-input").val().trim();
    // The movie from the textbox is then added to our array
    topics.push(topic);

    // calling renderButtons which handles the processing of our topic array
    renderButtons();
});

// Calling the renderButtons function at least once to display the initial list of topics
renderButtons();











    // $.ajax({
    //   url: queryURL,
    //   method: "GET"
    // }).then(function(response) {
    //   console.log(response);
    // });



