//initialize global variables
var apiKey = "yx64KPFC2rhNqVaYehYGswlOMV5xOnkL";
//The beginning list of things from a Dragonball Z topic
var topics = ["Goku", "Vegeta", "Gohan", "Trunks", "Frieza", "Bulma", "Android 8","Krillin", "Goten","Videl","Master Roshi","Yamcha","Nappa","Raditz","Tien Shinhan","Mr. Satan", "Captian Ginyu", "Chiaotzu", "Recoome", "Spopovich", "Kibito","Majin Buu"];
//sets the number of gifs to pull when we click a topic
var limit = 10;
// Function for displaying topic data
function renderButtons() {

    // Deleting the topic buttons prior to adding new movie buttons
    $("#buttons-view").empty();

    // Looping through the array of topics
    for (var i = 0; i < topics.length; i++) {

      // Then dynamicaly generating buttons for each topic in the array.
      var a = $("<button>");
      // Adding a class
      a.addClass("topic-btn");
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
    var topic = $("#topic-input").val().trim();
    // The movie from the textbox is then added to our array
    topics.push(topic);
    // calling renderButtons which handles the processing of our topic array
    renderButtons();
});

//  re-renders the HTML to display the appropriate content
 function displayTopicInfo() {

    var topic = $(this).attr("data-name");
    //queryURL for Giphy API
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + topic +"&limit=" + limit;
    // example: https://api.giphy.com/v1/gifs/?searchapi_key=yx64KPFC2rhNqVaYehYGswlOMV5xOnkL&q=goku&limit=5
    // Creating an AJAX call for the specific topic button being clicked
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
    //loop through each of the returned gifs
    for (i=0;i<limit;i++) {

        // Creating a div to hold the gif topic
        var topicDiv = $("<div class='topic'>");

        // Storing the rating data
        var rating = response.data[i].rating;

        // Creating an element to have the rating displayed
        var pRating = $("<p>").text("Rating: " + rating);

        // Displaying the rating
        topicDiv.append(pRating);

        // Storing the image still
        var stillURL = response.data[i].images.fixed_height_still.url;
        // Storing the moving gif
        var gifURL = response.data[i].images.fixed_height_downsampled.url;
        
        // Creating an element to hold gif        
        var still = $("<img class=gif>").attr("src", stillURL);
        // Now we add the url for the still image
        still.attr("data-still", stillURL);
        still.attr("data-animate", gifURL);
        still.attr("data-state", "still");


        // Displaying the release year
        topicDiv.append(still);


        // Putting the entire movie above the previous movies
        $("#topic-view").prepend(topicDiv);
    }
});

}

// Calling the renderButtons function at least once to display the initial list of topics
renderButtons();

// Adding a click event listener to all elements with a class of "topic-btn"
$(document).on("click", ".topic-btn", displayTopicInfo);

$(document).on("click", ".gif", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    //empty the old gifs
    $("#topicview").empty();

    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });



