/*--Name: Koceila Larbi--*/
/*--Date: 04/19/2026 --*/


// Select elements
const body = document.body;
const message = document.getElementById('message');
const title = document.getElementById('title');

const happyBtn = document.getElementById('happyBtn');
const sadBtn = document.getElementById('sadBtn');
const angryBtn = document.getElementById('angryBtn');
const sleepyBtn = document.getElementById('sleepyBtn');
const randomBtn = document.getElementById('randomBtn');

// Create Data Object
const moods = {
    happy: {
        name: 'Happy',
        bg: '#F5C842',
        text: '#3B2800',
        message: 'Everything feels wonderful today!'
    },
    sad: {
        name: 'Sad',
        bg: '#3A6EA5',
        text: '#E8F0FB',
        message: 'The world feels heavy on my shoulders.'
    },
    angry: {
        name: 'Angry',
        bg: '#C0392B',
        text: '#FDE8E8',
        message: 'My blood is boiling right now.'
    },
    sleepy: {
        name: 'Sleepy',
        bg: '#7D8A99',
        text: '#EDF0F3',
        message: 'I can barely keep my eyes open.'
    }
};


// Create the function that changes the page information
function changeMood(moodName) {
    const mood = moods[moodName];
    
    body.style.backgroundColor = mood.bg;
    body.style.color = mood.text;
    
    title.textContent = mood.name;
    message.textContent = mood.message;
}


// Event Handler

function handleHappyClick() {
  changeMood("happy");
}
function handleSadClick() {
  changeMood("sad");
}

function handleAngryClick() {
  changeMood("angry");
}

function handleSleepyClick() {
  changeMood("sleepy");
}

function handleRandomClick() {
  const randomMood = Object.keys(moods)[Math.floor(Math.random() * Object.keys(moods).length)];
  changeMood(randomMood);
}

// Event Listener

happyBtn.addEventListener('click', handleHappyClick);
sadBtn.addEventListener('click', handleSadClick);
angryBtn.addEventListener('click', handleAngryClick);
sleepyBtn.addEventListener('click', handleSleepyClick);
randomBtn.addEventListener('click', handleRandomClick);
