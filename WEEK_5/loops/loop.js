//Name:  Koceila
//Date:  04/05/2026

"use strict";

// loop
for (let crate = 1; crate <= 20; crate++) {

  // fragile equipment
  if (crate % 5 === 0) {
    console.log("Crate " + crate + ": Handle with care");

  // normal supplies
  } else if (crate % 2 === 0) {
    console.log("Crate " + crate + ": Load crate");

  // unknown cargo
  } else {
    console.log("Crate " + crate + ": Inspect crate");
  }
}

console.log("Total crates scanned: 20");
