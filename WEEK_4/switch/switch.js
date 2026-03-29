// Name: Koceila Larbi 
// Date: 03/28/2026

let favMonth = prompt("What is your favorite month?").trim().toLowerCase();
let message;
switch (favMonth) {
  //Spring months
  case "march":
  case "april":
  case "may":
    message = "Spring is nice with everything blooming.";
    break;
  
  //Summer months
  case "june":
  case "july":
  case "august":
    message = "You enjoy the summer months!";
    break;
    
  //Fall months
  case "september":
  case "october":
  case "november":
    message = "Fall is fun with all of the pretty colors.";
    break;
    
  //Winter months
  case "december":
  case "january":
  case "february":
    message = "You love the winter months!";
    break;
  
  //Other months 
  default:
    message = "Other months are interesting too!";
}

console.log(message);
