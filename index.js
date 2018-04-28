'use strict';
let datasource = STORE;
let questionNum = 0;

// tests STORE, debug
//function testStore() {
//  console.log(datasource);
//}

// sets score
let score = 0;

// creates item HTML
function generateItemElement(item) {
  return `
      <div id="qanda">
        <div class="row">
          <span class="question">
            ${datasource[item].question}
          </span>
        </div>
        <div class="row answer-list">
            <button type="button" class="answer">${datasource[item].answers[0]}</button>
            <button type="button" class="answer">${datasource[item].answers[1]}</button>
            <button type="button" class="answer">${datasource[item].answers[2]}</button>
            <button type="button" class="answer">${datasource[item].answers[3]}</button>
        </div>
      </div>
      <div class="row answer-list">
        <div id="correctAnswer">Correct!</div>
        <div id="incorrectAnswer">Incorrect. The correct answer is ${datasource[item].correctAnswer}.</div>
        <button type="button" class="answer continue">Continue</button>
      </div>
      `
  }

// function to push item to page
function postQuestion(item) {
  let htmlcontent = generateItemElement(item);
  $('.js-main').html(htmlcontent);
  // debug
  // alert(htmlcontent+ " pushed to page");
}

// add function to reset score
function resetScore() {
  score = 0;
}

function resetQuestionNum() {
  questionNum = 0;
}

// function to listen for start game click
function handleStartClick() {
  $("html").on('click', ".start", event => {
    // reset background
    $('html').css("background", "url(bg-stars.jpg) no-repeat center center fixed");
    $('html').css("background-size", "cover");
    
    // hide start button, this is broken
    $('.start').hide();
    
    // reset score
    resetScore();
    // push score to HTML
    $('.score').html('SCORE: '+score+'/10');
    
    // reset questionNum
    resetQuestionNum();
    // push question to page
    postQuestion(questionNum);
  });
}

// endgame function
function endGame() {
  // if score is < 5, show game over screen
  if (score < 5) {
    // 1st try, replace background
    // $('html').css("background", "url(gameover.jpg) no-repeat center center fixed");
    
    // instead of background image, modify the html to show a screen and button
    let htmlstart = `
    <div class="w3-container result">
      <img src="gameover.jpg") />
      <p>Game Over!</p>
    </div>`;
    $('.js-main').html(htmlstart);
  }
  // if score is < 7 then nice try screen
  else if (score < 7) {
    // 1st try
    // $('html').css("background", "url(iamerror.jpg) no-repeat center center fixed");
    
    // instead of background image, modify the html to show a screen and button
    let htmlstart = `
    <div class="w3-container result">
     <img src="iamerror.jpg") />
      <p>Almost, try again!</p>
    </div>`;
    $('.js-main').html(htmlstart);
  }
  // if score is = 10, show you win screen
  else if (score = 10) {
    // 1st try
    // $('html').css("background", "url(awinnerisyou.jpg) no-repeat center center fixed");
     
    // instead of background image, modify the html to show a screen and button
    let htmlstart = `
    <div class="w3-container result">
      <img src="awinnerisyou.jpg") />
      <p>A winner is you!</p>
    </div>`;
    $('.js-main').html(htmlstart);
  }
  
  // show the start button again
  $('.start').show();
}

// listen for continue click
function listenForContinue(){
  $(".js-main").on('click',".continue", event => {
    if ((questionNum + 1) < datasource.length) {
            questionNum += 1;
            $('#qanda').show();
            postQuestion(questionNum);
          }
          // once the questions are all answered, run endgame function
          else {
            endGame();
          }
  });
}

// Add function to listen for answers to question in clicks
function listenForAnswer() {
    $(".js-main").on('click',".answer", event => {
      
      // hide the answers
      $('#qanda').hide();
      
      // if the index of the amswer matches the correct answer, then increase score
      
      if ($(event.currentTarget).text() == datasource[questionNum].correctAnswer) {
        score += 1;
        // make correctAnswer visible and continue button visible
        $('#correctAnswer').show();
        $('.continue').show();
         $('.score').html('SCORE: '+score+'/10');
      }
      // if the index of the answer doesn't match the correct answer, then 0 point
      else {
        $('#incorrectAnswer').show();
        $('.continue').show();
        // make incorrectAnswer and continue button visible
      }
      // if there is another question to be asked, loop and use the next key/value pair
    });
}

// load functions on page load

function pageLoad(){
$(handleStartClick);
$(listenForAnswer);
$(listenForContinue);
}

$(pageLoad);