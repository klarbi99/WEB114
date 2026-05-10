// Name: Koceila Larbi
// Date: 5/10/2025


'use strict';



/* ---------------creat necessary variables, lists, objects--------------- */

let chosenLevel; // easy, normal, hard
let currentQuizCount; // the number of quizzes completed
let timer; // coutn down timer for the current quiz
let score; // the user's score

const levelData = 
    {
      easy:
        {
          timer: 20,
          quizCount: 5,
          operators: ['+', '-'],
          alternativeAnswerCount: 3, // how many choices
          allowNegative: false,
          digitNumber: 1, // how many digits for each number
          
        },
      normal:
        {
          timer: 15,
          quizCount: 10,
          operators: ['+', '-'],
          alternativeAnswerCount: 4,
          allowNegative: false,
          digitNumber: 2,
        },
      hard:
        {
          timer: 10,
          quizCount: 15,
          operators: ['+', '-', '*'],
          alternativeAnswerCount: 6,
          allowNegative: true,
          digitNumber: 2,
        }
    };



/* ---------------handle switch frame and start game-----------------  */
const welcomeFrame = document.getElementById('welcomeFrame');
const gameFrame = document.getElementById('gameFrame');
const scoreFrame = document.getElementById('scoreFrame');
const aboutFrame = document.getElementById('aboutFrame');

const levelEasyBtn = document.getElementById('levelEasyBtn');
const levelNormalBtn = document.getElementById('levelNormalBtn');
const levelHardBtn = document.getElementById('levelHardBtn');
const scoreFrameExit = document.getElementById('scoreFrameExit');
const scoreFrameStartOver = document.getElementById('scoreFrameStartOver');
const aboutFrameBackBtn = document.getElementById('aboutFrameBackBtn');

const aboutBtn = document.getElementById('aboutBtn');

function switchFrame(name) 
{
  switch (name) {
    case 'welcome':
      welcomeFrame.style.display = 'block';
      gameFrame.style.display = 'none';
      scoreFrame.style.display = 'none';
      aboutFrame.style.display = 'none';
      modelDisplay('close'); // close the modal when switching to welcome frame
      break;
    case 'game':
      welcomeFrame.style.display = 'none';
      gameFrame.style.display = 'block';
      scoreFrame.style.display = 'none';
      aboutFrame.style.display = 'none';
      currentQuizCount = 0; // reset game count every time the game starts
      startGame();
      break;
    case 'score':
      welcomeFrame.style.display = 'none';
      gameFrame.style.display = 'none';
      scoreFrame.style.display = 'block';
      aboutFrame.style.display = 'none';
      break;
    case 'about':
      welcomeFrame.style.display = 'none';
      gameFrame.style.display = 'none';
      scoreFrame.style.display = 'none';
      aboutFrame.style.display = 'block';
      break;
  }
}

levelEasyBtn.addEventListener('click', () => {
  chosenLevel = 'easy';
  switchFrame('game');
});

levelNormalBtn.addEventListener('click', () => {
  chosenLevel = 'normal';
  switchFrame('game');
});

levelHardBtn.addEventListener('click', () => {
  chosenLevel = 'hard';
  switchFrame('game');
});

scoreFrameExit.addEventListener('click', () => {
  switchFrame('welcome');
});

scoreFrameStartOver.addEventListener('click', () => {
  switchFrame('game');
});

aboutBtn.addEventListener('click', () => {
  switchFrame('about');
});

aboutFrameBackBtn.addEventListener('click', () => {
  switchFrame('welcome');
});


/* --------------handle close and open modal------------- */
const closeModalBtn = document.getElementById('closeModalBtn');
const startBtn = document.getElementById('startBtn');

function modelDisplay(status)
{
  const modal = document.getElementById('modal');
  modal.style.display = status === 'open' ? 'flex' : 'none';
}

startBtn.addEventListener('click', () => {
  modelDisplay('open');
});

closeModalBtn.addEventListener('click', () => {
  modelDisplay('close');
});



/* ----------------generate quiz--------------- */
function generateNumber(digits) 
{
  if (digits === 0) return 0;
  if (digits === 1) return Math.floor(Math.random() * 10);

  // never start with zero
  let result = Math.floor(Math.random() * 9) + 1;
  for (let i = 1; i < digits; i++) {
    result = result * 10 + Math.floor(Math.random() * 10);
  }

  return result;
}


function generateQuiz(level) 
{
  const levelObject = levelData[level];
 
  // generate two random numbers
  let num1 = generateNumber(levelObject.digitNumber); // generate num1
  let num2 = generateNumber(levelObject.digitNumber); // generate num2
  if (!levelObject.allowNegative && num1 < num2) { // deal with negative numbers according to level settings
    [num1, num2] = [num2, num1];
  }
  
  // generate operator and answer
  let operator = levelObject.operators[Math.floor(Math.random() * levelObject.operators.length)];
  let answer = eval(`${num1} ${operator} ${num2}`);
  
  // generate alternative answers acording to the correct answer number length so the choice is not predicted
  let alternativeAnswers = [];
  let answerLength = Math.abs(answer).toString().length;
  while (alternativeAnswers.length < levelObject.alternativeAnswerCount - 1) {
    let alt = generateNumber(answerLength) * (answer < 0 ? -1 : 1); // generate alternative answer match the sign of the correct answer
    if (alt !== answer && !alternativeAnswers.includes(alt)) {
      alternativeAnswers.push(alt);
    }
  }
  alternativeAnswers.push(answer); // add the correct answer so total is according to the level settings
  alternativeAnswers.sort(() => Math.random() - 0.5); // shuffle the alternative answers so the correct answer is not always at the same position
  
  const correctAnswerIndex = alternativeAnswers.indexOf(answer); // find index after shuffle
  
  return {
    num1: num1,
    num2: num2,
    operator: operator,
    answer: answer,
    correctAnswerIndex: correctAnswerIndex, // this is going to help us identify the correct answer and wrong answers
    alternativeAnswers: alternativeAnswers, 
  };
}
 


/* ----------------render and update ui functions---------------- */
/* render equation and alternativeAnswers */
function renderQuiz(quiz) 
{
  const gameFrameEquation = document.getElementById('gameFrameEquation');
  const gameFrameAnswer = document.getElementById('gameFrameAnswer');
  
  const gameFrameEquationText = `${quiz.num1} ${quiz.operator} ${quiz.num2} = ?`;
  const gameFramerAlternativeAnswersHtml = `
    ${quiz.alternativeAnswers.map((answer, index) => 
      `
      <li>
        <input type="radio" id="answer${index}" name="answer" value="${answer}">
        <label for="answer${index}">${answer}</label>
      </li>
      `).join('')}
    `
  gameFrameEquation.innerText = gameFrameEquationText;
  gameFrameAnswer.innerHTML = gameFramerAlternativeAnswersHtml;
}

/* update timer and progress bar*/
function updateTimer(timeLeft, totalTime)
{
  const timerBar     = document.getElementById('gameFrameTimerBar');
  const timerDisplay = document.getElementById('gameFrameHeaderTimer');
  const percentage   = (timeLeft / totalTime) * 100;

  timerBar.style.setProperty('--percentage', `${percentage}%`);
  timerDisplay.textContent = `${timeLeft}s`;
}
/* render progress list in header */
function renderProgressList(num)
{
  const progressList = document.getElementById('gameFrameHeaderProgress');
  progressList.innerHTML = '';
  for (let i = 0; i < num; i++) {
    const li = document.createElement('li');
    progressList.appendChild(li);
  }
}

/* style progess list item */
function styleProgressListItem(index, status)
{
  const progressList = document.getElementById('gameFrameHeaderProgress');
  const item = progressList.querySelectorAll(`li`);
  item[index - 1].classList.add(status);
}

/* disable all inputs options */
function disableInputs()
{
  document.querySelectorAll('input[name="answer"]').forEach(input => input.disabled = true);
}

//* update the score page 
function updateScorePage()
{
  const scoreFrameAnswerCount = document.getElementById('scoreFrameAnswerCount');
  scoreFrameAnswerCount.innerHTML = `${score} out of ${levelData[chosenLevel].quizCount}`;
}

/* ----------------functions after the user reaction (selected answer)--------------- */

function highlightAnswer(selectedIndex, correctAnswerIndex) 
{
  // highlight the correct answer green always
  document.getElementById(`answer${correctAnswerIndex}`).parentElement.classList.add('correct');

  // only highlight red if the user selected the wrong answer
  if (selectedIndex !== null && selectedIndex !== correctAnswerIndex) {
    document.getElementById(`answer${selectedIndex}`).parentElement.classList.add('wrong');
  }
}


/* ----------------start game---------------- */


function startGame()
{
  // render element that don't need to be updated each quiz
  renderProgressList(levelData[chosenLevel].quizCount);
  document.getElementById('gameFrameHeaderLevel').innerHTML = chosenLevel;
  score = 0;
  main();
}

function main()
{
  // redirect to score frame if quiz count is exceeded
  if (currentQuizCount >= levelData[chosenLevel].quizCount)
  {
    updateScorePage();
    switchFrame('score');
    return;
  }

  clearInterval(timer); // start new timer

  // generate and render the new quiz
  let currentQuiz = generateQuiz(chosenLevel);
  renderQuiz(currentQuiz);

  // setup countdown
  const totalTime = levelData[chosenLevel].timer;
  let timeLeft    = totalTime;
  updateTimer(timeLeft, totalTime);
  timer = setInterval(() =>
  {
    timeLeft--;
    updateTimer(timeLeft, totalTime);

    // time is up
    if (timeLeft <= 0)
    {
      clearInterval(timer);
      disableInputs();
      highlightAnswer(null, currentQuiz.correctAnswerIndex);
      styleProgressListItem(currentQuizCount, 'wrong');
      setTimeout(main, 1000);
    }
  }, 1000);

  // handle the user interaction with the input options
  function handleAnswer(e)
  {
    clearInterval(timer); // stop the timer when the user answers
    const selectedIndex = Number(e.target.id.replace('answer', ''));
    disableInputs();
    highlightAnswer(selectedIndex, currentQuiz.correctAnswerIndex);
    // handle the correct and wrong answer
    if (selectedIndex === currentQuiz.correctAnswerIndex)
      {
        score++;
        styleProgressListItem(currentQuizCount, 'correct');
      } 
    else 
      {
        styleProgressListItem(currentQuizCount, 'wrong');
      };
    setTimeout(main, 1000);
  }
  currentQuizCount++;
  document.getElementById('gameFrameAnswer').addEventListener('change', handleAnswer, { once: true });
}
