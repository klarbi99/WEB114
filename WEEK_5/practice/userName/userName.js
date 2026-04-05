// username.js
console.log("hhhhhh")

let username = "";


username = prompt(`Enter your name. Please don't click OK without typing a name.`)?.trim();


while (username === "" || username === undefined) {
    alert(`Please enter a name and don't hit Cancel.`);
    username = prompt(`Enter your name please.`)?.trim();
}


username = username.toUpperCase();


if (username === "ADMIN") {
    console.log(`Welcome administrator.`);
} else if (username === "TEACHER") {
    console.log(`Hello teacher!`);
} else {
    console.log(`Hello, ${username}`);
}



let username2;


do {
    username2 = prompt(`Please enter your name and avoid hitting Cancel.`)?.trim();
} while (username2 === "" || username2 === undefined);


username2 = username2.toUpperCase();

if (username2 === "ADMIN") {
    console.log(`Welcome administrator.`);
} else if (username2 === "TEACHER") {
    console.log(`Hello teacher!`);
} else {
    console.log(`Hello, ${username2}`);
}


// Part 3 - Reflection Questions

// Q1: What is the main difference between a while loop and a do...while loop?
// A while loop checks the condition first before running.
// A do...while runs the code first then checks the condition.

// Q2: Which loop guarantees the code will run at least once?
// The do...while loop always runs at least one time.

// Q3: Which loop worked better for this activity? Why?
// I think do...while worked better because we always need to show
// the prompt at least once. The while loop needed extra setup outside the loop.
