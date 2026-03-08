// Step 1:  Welcome message
alert("Welcome to the Adventure Realm! Let's create your hero!");

// Step 2:  Character name
const characterName = prompt("What is your character's name?");

// Step 3:  Pet / companion
const pet = prompt(`What kind of pet does ${characterName} have? (dragon, wolf, robot, unicorn, phoenix, etc.)`, "dragon");

// Step 4:  Superpower

const superpower = prompt(`What is ${characterName}'s special superpower?`);

// Step 5:  Likes fighting monsters
const likesFighting = confirm(`Does ${characterName} like fighting monsters?`);

// Step 6:  Loading / preparing message
alert(`Gathering magic for ${characterName}... almost ready!`);

// Step 7:  Final character story
alert(`
========================================

          Name: ${characterName}
          Pet: ${pet}
          Superpower: ${superpower}
          Monster fighter?: ${likesFighting}
        
        
        The hero ${characterName} and their loyal ${pet} traveled far.
        Together, they used the power of ${superpower} to stay safe.
        It is ${likesFighting} that they enjoy fighting every monster.
        
========================================
        
`);
