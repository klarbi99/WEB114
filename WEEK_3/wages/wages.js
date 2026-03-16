"use strict";
//-------------------1: Add srict mode

//-------------------2:  Get the information from the user

let hourlyWage = Number(prompt("What is your hourly wage?"));
confirm(`You entered $${hourlyWage} per hour. Is that correct?`);

//-------------------3: Prompt the user "How many hours did you work this week?"
const hoursWorked = Number(prompt("How many hours did you work this week?"));
confirm(`You enterd ${hoursWorked} hours. Is that correct?`);

//___________________4: Calculate the grossPay.
const grossPay = hourlyWage * hoursWorked;

//-------------------5: Calculate the tax amount.
const taxes = grossPay * 0.1; // 10%

//-------------------6: Subtract taxes from the grossPay amount
const netPay = grossPay - taxes;

//-------------------7: Log the weekly earning with 2 decimal places.
console.log(`You earned: $${netPay.toFixed(2)} this week`);

//-------------------8: Overtime check
if (hoursWorked > 40) 
    {
      console.log("You worked overtime this week!");
    } 
else if (hoursWorked === 40) 
    {
      console.log("You worked exactly 40 hours.");
    } 
else
    {
      console.log("No overtime this week.");
    }

// ------------------9: final weekly earnings.
if (netPay > 800) 
    {
      console.log("Great paycheck this week!");
    } 
else 
    {
      console.log("Keep working toward a bigger paycheck!");
    }
