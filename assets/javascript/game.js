var game = {
  questions: [
    {
      "id": "001",
      "question": "What is ...1?",
      "choices": ["Choice 1-1", "Choice 1-2", "Choice 1-3", "Choice 1-4"],
      "correctAnswer": "Choice 1-1",
    },

    {
      "id": "002",
      "question": "What is ...2?",
      "choices": ["Choice 2-1", "Choice 2-2", "Choice 2-3", "Choice 2-4"],
      "correctAnswer": "Choice 2-2",
    },

    {
      "id": "003",
      "question": "What is ...3?",
      "choices": ["Choice 3-1", "Choice 3-2", "Choice 3-3", "Choice 3-4"],
      "correctAnswer": "Choice 3-3",
    },

    {
      "id": "004",
      "question": "What is ...4?",
      "choices": ["Choice 4-1", "Choice 4-2", "Choice 4-3", "Choice 4-4"],
      "correctAnswer": "Choice 4-4",
    },
  ], //end questions array
  currentIndex: 0,
  playerAnswers: [],
  quizResults: [],
}; //end game object


//  Variable that will hold our setInterval that runs the countdown clock
var intervalId;

// prevents the clock from being sped up unnecessarily
var clockRunning = false;
var time = 10;




//$(document).ready(function() {
  $(function() {
    //when the page loads the first time:
    var wait = "";

    

    //load the first question
    loadQuestion(game.currentIndex);

    function loadQuestion(indexIn) {
      clearTimeout(wait);  //clear the timeout
      stop(); //clear interval
      var i=indexIn;
      //zero based index, but display human based index
      var q=indexIn + 1;

      //clear previous question:
      clear("legend");
      clear("question");
      clear("choices");
      clear("answer");
      clear("results");

      //construct HTML Legend & append
      str = "Question #" + q + ": ";    
      $("#legend").append(str);

      //construct HTML question String & append
      str = game.questions[i].question;    
      $("#question").append(str);

      //construct HTML answer Strings & append
      //loop through each answer choice
      for (var j = 0; j < game.questions[i].choices.length; j++)
      {
        choice = game.questions[i].choices[j];
        str = '<div><input type="radio" id="choice-'+j+'" name="choice" value="'+choice+'" /><label for="choice-'+j+'">&nbsp;'+choice+'</label></div>';
        $("#choices").append(str);
      }

      //show form's submit button
      elementToggle(".btnContainer", "d-none", "show");
      elementToggle("#display", "d-none", "show");

      //start countdown
      clockRunning = false;
      time = 10;
      resetClock();

    }; //end load question function

    function displayAnswer(str) {
      //hide form's submit button
      elementToggle(".btnContainer", "d-none", "hide");
      //hide the clock
      elementToggle(".display", "d-none", "hide");
      $("#answer").append(str);
    }

    //clear question
    function clear(strIn){
      var list = document.getElementById(strIn);
      while (list.hasChildNodes()) {   
          list.removeChild(list.firstChild);
      }
    }; //end clear question function

    function getRadioCheckedValue(radio_name) {
      var oRadio = document.forms[0].elements[radio_name];
      for(var i = 0; i < oRadio.length; i++) {
        if(oRadio[i].checked) {
          return oRadio[i].value;
        }
      }
      return 'Not Answered';
    }    

    function revealAnswer(source) {
      //get player's answer
      playerAnswer = (getRadioCheckedValue("choice"));
      game.playerAnswers.push(playerAnswer);

      //clear previous question:
      clear("choices");

      //test player's answer to see if it is correct or incorrect & Display
      if(source==="click") {
        if(game.questions[game.currentIndex].correctAnswer === playerAnswer){
          str = "Good Job! Your answer, "+ playerAnswer + ", is correct";
          game.quizResults.push("Correct");
                
        } else {
          str = "The correct answer is "+ game.questions[game.currentIndex].correctAnswer + ".<br> Your Answer: " + playerAnswer;
          if (playerAnswer === 'Not Answered') {
            game.quizResults.push("Unanswered");
          } else {
            game.quizResults.push("Incorrect");
          }
        }
      } else {
        str = "It appears you aren't playing the game.  You must try harder."
        game.quizResults.push("Unanswered");
      }
      displayAnswer(str); 

      //don't allow click to increment higher than length of triva question list
      if(game.currentIndex<game.questions.length-1) {
        //increment currentIndex
        game.currentIndex +=1;

        //load next question (but wait 5 seconds)--runs only 1x
        wait = setTimeout(loadQuestion, 5000, game.currentIndex);

      } else {
        wait = setTimeout(loadResult, 5000);
      }
    }; //end revealAnswer


    function loadResult() {
      clearTimeout(wait);  //clear the timeout
      stop(); //clear interval

      elementToggle(".btnRestart","d-none", "show");
      elementToggle(".btnContainer","d-none", "hide");

      //clear previous question:
      clear("legend");
      clear("question");
      clear("choices");
      clear("answer");
      //clear("result");

      //construct HTML Legend & append
      str = "Quiz Results: ";    
      $("#legend").append(str);
      $("#results").append(countResults());
      
    }; //end results function


    function countResults() {
      result="";
      array_elements = game.quizResults; 
      array_elements.sort();
  
      var current = null;
      var cnt = 0;
      var str = "";
      for (var i = 0; i < array_elements.length; i++) {
          if (array_elements[i] != current) {
              if (cnt > 0) {
                if (current != "Unanswered") {
                  str = ' Answers: ';
                } else {
                  str = ': ';
                }
                  result = result + (current + str + cnt + '<br>');
              }
              current = array_elements[i];
              if (current != "Unanswered") {
                str = ' Answers: ';
              } else {
                str = ': ';
              }
            cnt = 1;
          } else {
              cnt++;
          }
      }
      if (cnt > 0) {
        if (current != "Unanswered") {
          str = ' Answers: ';
        } else {
          str = ': ';
        }
        result = result + (current + str + cnt);
      }
      return result;
  
  }


    //create on-click listener for the button
    $("#submit").on("click",function() {
      stop();
      revealAnswer("click");
    }); //end on-click button 

    //create on-click listener for the button
    $("#restart").on("click",function() {
      console.log("Restart Button Clicked");
      game.currentIndex = 0;
      game.quizResults = [];
      game.playerAnswers = [];
      elementToggle(".btnRestart","d-none", "hide");
      elementToggle(".btnContainer","d-none", "show");
      loadQuestion(game.currentIndex);
    }); //end restart button 

        /*
    Adding and removing a class to show or hide a element, usually a div.  
    In this application, the only class that uses this function is d-none (a bootstrap class), 
    but the function is generic so could be used elsewhere.
    */
    function elementToggle(elementIn, classIn, actionIn) {
      if (actionIn === "hide") {
          $(elementIn).addClass(classIn);
      } else if (actionIn === "show") {
          $(elementIn).removeClass(classIn);
      }
    };



    /*countdown clock*/
/*
|---------------------------|
|   __  o __  __    _       |
|    _)   __)  /   |_)|V|   |
|   /__ o __) /    |  | |   |
|---------------------------|
*/

function resetClock() {
  clockRunning = false;
  var time = time;
  $("#display").text("Time Left: 00:10");
  start();
} 

function start() {
  if (!clockRunning) {
    intervalId = setInterval(count, 1000);
    clockRunning = true;
  }
}

function stop() {
  clearInterval(intervalId);
  clockRunning = false;
}

/*웃*/
function count() {
  time--;
  if (time<0) {
    stop();
    revealAnswer("timeout");
  } else {
    var converted = "Time Left: " + timeConverter(time);
    $("#display").text(converted);
  }
} //end count

function timeConverter(t) {

  var minutes = Math.floor(t / 60);
  var seconds = t - (minutes * 60);

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  if (minutes === 0) {
    minutes = "00";
  }
  else if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return minutes + ":" + seconds;
}




  }); //end document ready function

