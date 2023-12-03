var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var start = false,
  level = 0;
$(document).keypress(() => {
  if (!start) {
    $("#level-title").text("level " + level);
    nextSequence();
    start = true;
  }
});
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var random_number = Math.floor(Math.random() * 4);
  var randomChoosenColour = buttonColours[random_number];
  gamePattern.push(randomChoosenColour);
  $("#" + randomChoosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChoosenColour);
}
function playSound(name) {
  var audio = new Audio("./" + name + ".mp3");
  audio.play();
}
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
function checkAnswer(currentlevel) {
  if (gamePattern[currentlevel] === userClickedPattern[currentlevel]) {
    console.log("Success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over,press any key to restart");
    $(document).keypress(() => {
      level = 0;
      start = false;
      if (!start) {
        $("#level-title").text("level " + level);
        nextSequence();
        start = true;
      }
    });
  }
}
