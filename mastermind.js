//declare global variable
var rowNumber = 0;
var currentRow;
var guessedColours = [];
var patternColours = [];
var win = false;

window.onload = highlghtCurrentRow();
window.onload = randomPattern();

// set local storage
//localStorage.setItem('lastPlayed', Date.now())

// add all the event listeners to the patternColours
document.getElementById("orange").addEventListener("click", function () { addOrange() });
document.getElementById("pink").addEventListener("click", function () { addPink() });
document.getElementById("green").addEventListener("click", function () { addGreen() });
document.getElementById("yellow").addEventListener("click", function () { addYellow() });
document.getElementById("blue").addEventListener("click", function () { addBlue() });
document.getElementById("white").addEventListener("click", function () { addWhite() });
document.getElementById("enter").addEventListener("click", function () { enter() });
document.getElementById("back").addEventListener("click", function () { back() });


/**
 * Highlght the current row that is being played on lighter
 */
function highlghtCurrentRow() {
    // get list of rows in the board
    var ul = document.getElementById("board");
    var rows = ul.getElementsByTagName("li");
    currentRow = rows[rowNumber];
    console.log(currentRow);
    console.log(rows);
    var circles = rows[rowNumber].getElementsByTagName("span");
    for (let i = 0; i < 5; i++) {
        if (circles[i].classList.contains("circle"))
        {
            circles[i].classList.add("highlight");
            circles[i].classList.remove("circle");
        }
        else
        {
            circles[i].classList.add("highlightScoreBox");
            circles[i].classList.remove("scoreBox");
        }
    }
    console.log(currentRow);
    // increment row number so that next time the next row will be highlighted
    rowNumber++;
}

/**
 * When a colour is clicked, add that colour to the first available in the current row
 */
function addOrange() {
    //console.log(currentRow);
    // get first element in current row
    var circles = currentRow.getElementsByTagName("span");
    for (let i = 0; i < 4; i++) {
        if (circles[i].classList.contains("highlight")) {
            circles[i].classList.add("orange");
            circles[i].classList.remove("highlight");

            guessedColours.push("orange");
            break;
        }
    }
}


/**
 * When a colour is clicked, add that colour to the first available in the current row
 */
function addYellow() {
    //console.log(currentRow);
    // get first element in current row
    var circles = currentRow.getElementsByTagName("span");
    for (let i = 0; i < 4; i++) {
        if (circles[i].classList.contains("highlight")) {
            circles[i].classList.add("yellow");
            circles[i].classList.remove("highlight");

            guessedColours.push("yellow");
            break;
        }
    }
}

/**
 * When a colour is clicked, add that colour to the first available in the current row
 */
function addGreen() {
    //console.log(currentRow);
    // get first element in current row
    var circles = currentRow.getElementsByTagName("span");
    for (let i = 0; i < 4; i++) {
        if (circles[i].classList.contains("highlight")) {
            circles[i].classList.add("green");
            circles[i].classList.remove("highlight");

            guessedColours.push("green");
            break;
        }
    }
}


/**
 * When a colour is clicked, add that colour to the first available in the current row
 */
function addPink() {
    //console.log(currentRow);
    // get elements in current row
    var circles = currentRow.getElementsByTagName("span");
    console.log(circles);
    for (let i = 0; i < 4; i++) {
        if (circles[i].classList.contains("highlight")) {
            circles[i].classList.add("pink");
            circles[i].classList.remove("highlight");

            guessedColours.push("pink");
            break;
        }
    }
}

/**
 * When a colour is clicked, add that colour to the first available in the current row
 */
function addBlue() {
    // console.log(currentRow);
    // get first element in current row
    var circles = currentRow.getElementsByTagName("span");
    // need to do it less messily in a loop later
    for (let i = 0; i < 4; i++) {
        if (circles[i].classList.contains("highlight")) {
            circles[i].classList.add("blue");
            circles[i].classList.remove("highlight");

            guessedColours.push("blue");
            break;
        }
    }
}


/**
 * When a colour is clicked, add that colour to the first available in the current row
 */
function addWhite() {
    //console.log(currentRow);
    // get elements in current row
    var circles = currentRow.getElementsByTagName("span");
    for (let i = 0; i < 4; i++) {
        if (circles[i].classList.contains("highlight")) {
            circles[i].classList.add("white");
            circles[i].classList.remove("highlight");

            guessedColours.push("white");
            break;
        }
    }
}

function randomPattern() {
    // return 4 random numbers and store in an array
    for (let i = 0; i < 4; i++) {
        // Returns a random integer from 0 to 5:
        let number = Math.floor(Math.random() * 6);
        //console.log(number);
        var colour;
        if (number == 0) {
            colour = "orange";
        }
        else if (number == 1) {
            colour = "pink"
        }
        else if (number == 2) {
            colour = "green"
        }

        else if (number == 3) {
            colour = "yellow"
        }
        else if (number == 4) {
            colour = "blue"
        }
        else {
            colour = "white"
        }
        //console.log(colour);
        patternColours.push(colour);
    }
    //console.log(colours);
}

function comparePatterns() {
    console.log("Comparing patterns:")
    console.log("Pattern: " + patternColours);
    console.log("Guessed: " + guessedColours);

    // asssume both will have 4 items
    var exactMatch = 0;
    var colourMatch = 0;
    // create an array to store which colours in the pattern have already been matched to 
    let alreadyMatched = [];
    let alreadyMatchedGuessed = [];
    for (let i = 0; i < 4; i++) {
        alreadyMatched.push(false);
        alreadyMatchedGuessed.push(false);
    }

    // first check for exact matches
    for (let i = 0; i < 4; i++)
        if (patternColours[i] == guessedColours[i]) {
            exactMatch++;
            alreadyMatched[i] = true;
            alreadyMatchedGuessed[i] = true;
        }
    // exit the function if there is an exact match
    if (exactMatch == 4) {
        console.log("You won!!!");
        win = true;
        // display results of row being guessed
        displayScore(exactMatch, colourMatch);
        return;
    }
    
    // compare each item in both arrays to see which match colours but not position
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            // check that it hasnt already been compared to or isnt an exact match but the colour is right
            if (guessedColours[i] == patternColours[j] && i!=j && alreadyMatched[j] == false && alreadyMatchedGuessed[i] == false) {
                colourMatch++;
                alreadyMatched[j] = true;
                alreadyMatchedGuessed[i] = true;
                console.log(alreadyMatched);
                break;
            }
        }
    }
    console.log("Colour matches: " + colourMatch);
    console.log("Exact matches: " + exactMatch);

    // display results of row being guessed
    displayScore(exactMatch, colourMatch);
}

/**
 * Enter button
 */
function enter() {

    // check pattern against randomly generated
    comparePatterns();
    //reset guessed to empty
    for (let i = 0; i < 4; i++) {
        guessedColours.pop();
    }
    
    // the score box should be the 5th element, with then 4 dots in it that need to be individually accessed

    if (win == false) {
        //highlight next row
        highlghtCurrentRow();
    }
    else
    {
        winningScreen();
    }

}

/**
 * Use the dot score box at the end of the row to display the results of the users input
 */
function displayScore(exact, part)
{
    // get all elements in current row
    var rowElements = currentRow.getElementsByTagName("span");
    
    // get all dots in current row
    var scoreDots = rowElements[4].getElementsByTagName("span");
    for (let i=0; i < exact; i++)
    {
        scoreDots[i].classList.add("scoreDotExact");
        scoreDots[i].classList.remove("scoreDot");
    }
    for (let j=exact; j<exact+part; j++)
    {
        scoreDots[j].classList.add("scoreDotPartial");
        scoreDots[j].classList.remove("scoreDot");
    }
    
    
}

/**
 * Back button
 */
function back() {
    //unhighlight last highlighted and re set classes
    var circles = currentRow.getElementsByTagName("span");
    console.log("back");
    for (let i = 3; i >= 0; i--) {
        if (circles[i].classList.contains("highlight") == false) {
            console.log("entering" + i);
            circles[i].classList.add("highlight");
            circles[i].classList.remove("green");
            circles[i].classList.remove("pink");
            circles[i].classList.remove("orange");
            circles[i].classList.remove("yellow");
            circles[i].classList.remove("white");
            circles[i].classList.remove("blue");
            guessedColours.pop();
            break;
        }
        console.log(i);
    }
}

/**
 * Function to display the winning screen
 */
function winningScreen() {
    Swal.fire({
        customClass: {
            confirmButton: "btn enter",
            cancelButton: "btn enter"
          },
          
        title: "You Won!",
        text: "You Completed the game in " + rowNumber + " moves!",
        icon: 'success',
        color: '#f4f1de',
        background: '#22223b',
        showCancelButton: true,
        cancelButtonText: `Play Again`,
        buttonsStyling: false

    }).then((result) => {

        if (result.isDismissed) {
            window.location.reload();
        } 
    });
}