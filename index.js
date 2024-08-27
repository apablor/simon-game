let colorSequence = [];
// the rand array
let gamePattern = []; 

const buttonColors = ["red", "yellow", "green", "blue"]; 

let level = 0; 
let isGamePlaying = false; 


$(document).keypress(function() {
    if (!isGamePlaying) {
      $("#level-title").text("Level " + level);
      nextSequence();
      isGamePlaying = true;
    }
  });


function nextSequence(){
    // this was the missing key point, why? 
    colorSequence = []; 
    // Reset the user sequence for the new level
    level++;
    $("#level-title").text("Level " + level);
    
    // gets the random color
    let randomNum = Math.floor(Math.random() * 4); 
    let chosenColor = buttonColors[randomNum];

    //adds it to the game pattern
    gamePattern.push(chosenColor); 

    $(`#${chosenColor}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    addSound(chosenColor); 
}

$(".btn").on("click", function(event){
    let colorClicked = event.target.id;
    colorSequence.push(colorClicked);  
    console.log(colorSequence);  
    // adding effect 
    addPressed(colorClicked); 
    checkAnswer(colorSequence.length-1); 
});

function checkAnswer(currentLevel){ 
    if(gamePattern[currentLevel] === colorSequence[currentLevel]){
        if (colorSequence.length === gamePattern.length){
        //    adding delay
            setTimeout(function () {
                nextSequence();
            }, 1000);
        } 
    }
    else{
        $("h1").text("Game Over, Press Any Key to Restart");
        addSound("wrong"); 
        $("body").addClass("game-over"); 
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 500);
        startOver();  
    }
}

function addSound(name){
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play(); 
}; 

function addPressed(color) {
    $(`#${color}`).addClass("pressed");
    setTimeout(function() {
        $(`#${color}`).removeClass("pressed");
    }, 200);
};

function startOver(){
    level = 0; 
    colorSequence = [];
    isGamePlaying = false;
}


    





// var buttonColors = ['red', 'green', 'blue', 'yellow'];
// var pattern = [];

// function newSequence() {
//     var randomNumber = Math.floor(Math.random() * 4);
//     return randomNumber;
// }

// function randomChosenColor() {
//     var color = buttonColors[newSequence()];
//     flash(color);
//     addSound(color);
//     return color;
// }

// function addSound(color) {
//     var audio = new Audio(`sounds/${color}.mp3`);
//     audio.play();
// }

// function flash(color) {
//     $(`#${color}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
// }

// $(".btn").on("click", function(event) {
//     var chosenColor = event.target.id;
//     addPressed(chosenColor);
//     console.log(chosenColor);
//     // Add logic to compare with the current pattern step
// });



// $(document).on("keypress", function(event) {
//     $("h1").text("Level #");
//     pattern.push(randomChosenColor());  // Start sequence on keypress
//     console.log(pattern);
// });

// var length = $(".btn").length;
// console.log(length);

// randomChosenColor(); 