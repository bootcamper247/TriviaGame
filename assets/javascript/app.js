$(document).ready(function () {
  
    var trivia = [
      {
        question: "Which city hosted the 2016 Summer Olympics?",
        ans: "Rio de Janeiro",
        option1: "Rio de Janeiro",
        option2: "Sochi",
        option3: "Caracas",
        option4: "Sao Paulo",
        imgTag: "rio.png"
      },
      {
        question: "Which city is home to the Monument to the Bandeiras?",
        ans: "Sao Paulo",
        option1: "Lima",
        option2: "Santiago",
        option3: "Sao Paulo",
        option4: "Quito",
        imgTag: "sao.png"
      },
      {
        question: "Which city is home to the Golden Gate Bridge?",
        ans: "San Francisco",
        option1: "San Diego",
        option2: "New york",
        option3: "Miami",
        option4: "San Francisco",
        imgTag: "sfo.png"
      },
      {
        question: "Which city is home to the Brandenburg Gate?",
        ans: "Berlin",
        option1: "Berlin",
        option2: "London",
        option3: "Coopenhagen",
        option4: "Geneva",
        imgTag: "berlin.png"
      },
      {
        question: "Which city is home to the Acropolis?",
        ans: "Athens",
        option1: "Santorini",
        option2: "Barcelona",
        option3: "Basel",
        option4: "Athens",
        imgTag: "athens.png"
      }
    ];

    //Declare global variables
    var time;
    var clockRunning;
    var count;
    var correct;
    var incorrect;
    var unanswered;
    var intervalId;
    var showText;
    var timeOutId;
    var ansInfo;
    const timeGiven = 15;

    initVars();
    displayStartScreen();

    $("#start").on("click", function () {
      // $(this).hide();
      $("#startScreen").hide();
      $("#ansScreen").hide();
      $("#resultScreen").hide();
      displayTriviaScreen();
    });

    $(".options").on("click", function () {
      if (clockRunning) {
        //stop timer
        stopTimer();
        //check ans
        if ($(this).text().trim() === trivia[count].ans) {
          correct++;
          showText = "Correct!";
          ansInfo = "You Got It!"
        }
        else {
          incorrect++
          showText = "Sorry!";
          ansInfo = "The Correct Answer Was: <h3>" + trivia[count].ans + "</h3>";
        }
        // displayAnswerScreen for 5 seconds and then move to next question
        displayAnsScreen();
      }
    });

    $("#reset").on("click", function () {
      initVars();
      $("#ansScreen").hide();
      $("#resultsScreen").hide();
      $("#startScreen").hide();
      displayTriviaScreen();
    });

    function displayTriviaScreen() {
      clearTimeout(timeOutId);
      $("#ansScreen").hide();
      $("#question").text(trivia[count].question);
      $("#opt1").text(trivia[count].option1);
      $("#opt2").text(trivia[count].option2);
      $("#opt3").text(trivia[count].option3);
      $("#opt4").text(trivia[count].option4);
      $("#circle").text(timeGiven);
      $("#rectangle").text(timeGiven);
      $("#triviaScreen").show();
      startTimer();
    }

    function displayStartScreen() {
      $("#triviaScreen").hide();
      $("#ansScreen").hide();
      $("#resultsScreen").hide();
      $("#startScreen").show();
    }

    function startTimer() {
      if (!clockRunning) {
        time = timeGiven;
        intervalId = setInterval(showTimeLeft, 1000);
        clockRunning = true;
      }
    }

    function stopTimer() {
      // clear the timer
      clearInterval(intervalId);
      clockRunning = false;
    }

    function showTimeLeft() {
      time--;
      $("#circle").text(time);
      $("#rectangle").text(time);
      if (time <= 0) {
        stopTimer();
        unanswered++;
        showText = "Ooops...Out of Time"
        ansInfo = "The Correct Answer Was: <h3>" + trivia[count].ans + "</h3>";
        displayAnsScreen();
      }
    }

    function displayAnsScreen() {
      $("#triviaScreen").hide();
      $("#timeLeft").text(time + " seconds");
      $("#showText").text(showText);
      $("#ansInfo").html(ansInfo);
      $("#ansImg").attr("src", "assets/images/" + trivia[count].imgTag);
      $("#ansScreen").show();


      //Incr ques counter and show next ques or results after 5 sec as valid
      count++;
      if (count < trivia.length) {
        timeOutId = setTimeout(displayTriviaScreen, 5000);
      }
      else {
      //show results screen with stats and reset button
      timeOutId = setTimeout(displayResultsScreen, 5000);
      }
    }

    function displayResultsScreen() {
      clearTimeout(timeOutId);
      $("#triviaScreen").hide();
      $("#ansScreen").hide();
      $("#showStats").text("Here are your results");
      $("#correct").text("   " + correct);
      $("#incorrect").text("   " + incorrect);
      $("#unanswered").text("  " + unanswered);
      $("#resultsScreen").show();
    }

    function initVars(){
    time = 0;
    clockRunning = false;
    count = 0;
    ansIndex = "";
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    intervalId = 0;
    showText = "";
    timeOutId = 0;
    ansInfo = "";
  }

}); //end of document ready
