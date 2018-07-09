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
  var percent = 0;

  // step 1: upon clicking start button - hide start button and display first question and answer choices with Time remaining
  $(document).on('click','#start', function() {
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
        $('#trivia').html(
          `<p> You chose the incorrect answer!</p> <p> The correct answer is ${
            questions[questionCounter].correct
          }`
        );
        dispalyNextQuestion();
      }
    }, 1000);
  }

  $(document).on('click', '.answer', function() {
    var chosenAnswer = $(this)
      .text()
      .split(':')[1]
      .trim()
      .toString();
    console.log(chosenAnswer === questions[questionCounter].correct);
    if (chosenAnswer === questions[questionCounter].correct) {
      $('#trivia').html('<p> You chose the correct answer!</p>');
    } else {
      $('#trivia').html(
        `<p> You chose the incorrect answer!</p> <p> The correct answer is ${
          questions[questionCounter].correct
        }</p>`
      );
    }
    dispalyNextQuestion();
  });

  function dispalyNextQuestion() {
    // display progress bar
    percent = Math.round((questionCounter+1)/questions.length*100)
    $('.progress-bar').css('width', percent+'%').attr('aria-valuenow',percent).text(percent+'%');

    clearInterval(interval);
    counter = 5;
    questionCounter++;
    if (questionCounter < questions.length) {
      setTimeout(function() {
        displayQuestion();
        timer();
      }, 1000 * 2);
    } else {
      lastPage();
    }
  }

  function lastPage() {
    $('#trivia').html(
      '<p> last page </p><a id="reset" class="btn btn-primary btn-lg" href="#" role="button">Reset</a>'
    );
  }

  $(document).on('click','#reset', function() {
    $('#trivia').html('')
    $(this).hide();
    questionCounter = 0
    $('#start').show();
    $('.progress-bar').css('width', '0%').attr('aria-valuenow', 0).text('0%');
  });

  // step2: time counts down from 30 to 0
  // step3: if answer choice is clicked determine if answer is right or wrong - record wins/losses and display the correct answer to user for a short time before displaying the next question.
  // step4: if answer is unanswer upon timer completion - display correct answer and then display next question and add to losses
  // step5: after displaying all 5 questions display final page with the number of wins and losses (try adding a pie chart from d3)
});
