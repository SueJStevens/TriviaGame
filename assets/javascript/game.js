var game = {
  questions: [
    {
      "id": "001",
      "question": "What is ...1?",
      "choices": ["Choice 1-1", "Choice 1-2", "Choice 1-3", "Choice 1-4"],
      "correctAnswer": "Choice 1-A",
    },

    {
      "id": "002",
      "question": "What is ...2?",
      "choices": ["Choice 2-1", "Choice 2-2", "Choice 2-3", "Choice 2-4"],
      "correctAnswer": "Choice 2-B",
    },

    {
      "id": "003",
      "question": "What is ...3?",
      "choices": ["Choice 3-1", "Choice 3-2", "Choice 3-3", "Choice 3-4"],
      "correctAnswer": "Choice 3-C",
    },

    {
      "id": "004",
      "question": "What is ...4?",
      "choices": ["Choice 4-1", "Choice 4-2", "Choice 4-3", "Choice 4-4"],
      "correctAnswer": "Choice 4-D",
    },
  ], //end questions array
}; //end game object

//loop through each question, answer choices and correct answer
for (var i = 0; i < game.questions.length; i++) {
  console.log("Question #" + i + ": " + game.questions[i].question);
  //loop through each answer choice
  for (var j = 0; j < game.questions[i].choices.length; j++) {
    console.log("Choices: " + game.questions[i].choices[j]);
  }
}

//$(document).ready(function() {
  $(function() {
    //when the page loads the first time:
    //load the first question
    loadQuestion(0);

    function loadQuestion(indexIn) {
      var i=indexIn;
      //zero based index, but display human based index
      var q=indexIn + 1;
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
        str = '<div><input type="radio" id="choice-"'+j+' name="choice" /><label for="choice-"'+j+'">&nbsp;'+choice+'</label></div>';
        $("#choices").append(str);
      }

    }; //end load question function

    //create on-click listener for the button
    //$("#characterList").on("click",".character",function() {
      //which character was clicked?
  
    

  }); //end document ready function

