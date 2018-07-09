$(document).ready(function() {
  // setup Question constructor (question, answers and correct)
  function Question(question, answers, correct) {
    (this.question = question),
      (this.answers = answers),
      (this.correct = correct);
  }

  // create 5 questions
  questions = [
    new Question('question 1', ['a', 'b', 'c'], 'a'),
    new Question('question 2', ['a', 'b', 'c'], 'a'),
    new Question('question 3', ['d', 'e', 'f', 'g'], 'g'),
    new Question('question 4', ['d', 'e', 'f'], 'e'),
    new Question('question 5', ['a', 'b', 'c', 'd', 'e'], 'a')
  ];

  var questionCounter = 0;
  var counter = 5;

  // step 1: upon clicking start button - hide start button and display first question and answer choices with Time remaining
  $('#start').on('click', function() {
    $(this).hide();
    displayQuestion();
    timer();
  });

  function displayQuestion() {
    html = '';
    for (key in questions[questionCounter].answers) {
      html += `<p class = 'answer'>${key}: ${
        questions[questionCounter].answers[key]
      }</p>`;
    }
    console.log(html);

    $('#trivia').html(
      `<p> Time Remaining: <span id='time'>30</span> seconds </p> <h2> ${
        questions[questionCounter].question
      }</h2> <p> ${html}`
    );
    console.log(questions[questionCounter].question);
  }

  function timer() {
    interval = setInterval(function() {
      counter--;
      console.log(counter);
      $('#time').text(counter);
      if (counter === 0) {
        answerPage();
      }
    }, 1000);
  }

  // step2: time counts down from 30 to 0
  // step3: if answer choice is clicked determine if answer is right or wrong - record wins/losses and display the correct answer to user for a short time before displaying the next question.
  // step4: if answer is unanswer upon timer completion - display correct answer and then display next question and add to losses
  // step5: after displaying all 5 questions display final page with the number of wins and losses (try adding a pie chart from d3)
});
