//create a new array to store colours
var buttonColours = ["green", "red", "yellow", "blue"];

// At the top of the game.js file, create a new empty array called gamePattern.
var gamePattern = [];

// Create a new empty array with the name userClickedPattern;
var userClickedPattern = [];


// A function that detect when any of the buttons are clicked and trigger the handler function
$(".btn").click(function(event) {

    // Create a new variable called userChosenColour to store the id of the button that got clicked
    var userChosenColour = $(this).attr("id");

    // Add the contents of the variable above to the end of userClickedPattern
    userClickedPattern.push(userChosenColour);

    // Refactoring functions to word here
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

});

//Create a new variable called level and start at level 0.
var level = 0;

// You'll need a way to keep track of whether if the game has started or not
var started = false;

// Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).on("keypress", function(event) {
            
    if (!started) {
        //  The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("#level-title").text("Level " + level); 

        // Initialize the function
        nextSequence();
        started = true;  
    };  

});  

// Create a new function called nextSequence()
function nextSequence() {

    // Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
    level++;

    // Inside nextSequence(), update the h1 with this change in the value of level.
    $("#level-title").text("Level " + level); 
     
    // Create a variable that stores random number between 0 and 3
    var randomNumber = Math.floor(Math.random() * 4);

    // Create a new variable called randomChosenColour and use 
    // the randomNumber from step 2 to select a random colour from the buttonColours array.
    var randomChosenColour = buttonColours[randomNumber];

    // Add the new randomChosenColour above to gamePattern
    gamePattern.push(randomChosenColour);

    // Use jQuery to select the button with the same id as the randomChosenColour

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    // Refactoring playSound to work here
    playSound(randomChosenColour);

};


//Create a new function called playSound that takes a single input parameter named name
function playSound(name) {
    
    // Take the code we sed to play sound in nextSequence function and move it to playSound
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

};

// Create a new function that takes the parameter currentColour
function animatePress(currentColour) {

    // Use jQuery to add this pressed class to the button that gets clicked inside animatePress()
    $("#" + currentColour).addClass("pressed");

    // Removes the pressed class after 100ms
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);

};

function checkAnswer(currentLevel) {

    // Write an if statement inside checkAnswer() to check if the 
    // most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
            userClickedPattern.length = 0;
        }
    }
    else {

        console.log("wrong");
        // In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
        playSound("wrong");

        // In the styles.css file, there is a class called "game-over", apply this class to the body of the website 
        // when the user gets one of the answers wrong and then remove it after 200 milliseconds.
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        // Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
        $("h1").text("Game Over, Press Any Key to Restart");

        // Call startOver() if the user gets the sequence wrong.
        startOver();
        
    }
}

// Create a new function called startOver().
function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}