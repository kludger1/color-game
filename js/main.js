var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#color-display");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetBtn = document.querySelector("#reset");
var modeBtns = document.querySelectorAll(".mode")

var numOfSquares = 6;
var colors = [];
var pickedColor;






function randomColor() {
    //pick a "red" from 0 - 255
    var r = Math.floor(Math.random() * 256);
    //pick a "green" from 0 - 255
    var g = Math.floor(Math.random() * 256);
    //pick a "blue" from 0 - 255
    var b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`

}

function generateRandomColors(num) {
    // make a array
    var arr = []
    // repeat num times
    for (var i = 0; i < num; i++) {
        //get random color and push to a array  
        arr.push(randomColor())
    }
    // return that arr
    return arr;
}

function pickColor() {
    // Math.random() picks num below 1
    // Math.floor(Math.random() * 2) picks whole num between 0 and 1
    //Math.floor(Math.random() * 5) pickes whole num between 0 and 4
    //Math.floor(Math.random() * 5 + 1) pickes whole num between 1 and 5
    var random = Math.floor(Math.random() * colors.length)
    return colors[random];
}

function reset() {
    // generate all new colors
    colors = generateRandomColors(numOfSquares)
    // pick a new random color from array
    pickedColor = pickColor()
    //change color display to match picked color
    colorDisplay.textContent = pickedColor;
    resetBtn.textContent = "New Colors"
    messageDisplay.textContent = ""
    //change color of squares
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    };

    h1.style.backgroundColor = "#8C939E"
}



function matchColors(color) {
    // loop through all squares
    for (var i = 0; i < squares.length; i++) {
        // change each color to match given color
        squares[i].style.backgroundColor = color;

    };

}



function setUpModeBts() {
    // mode btns event listeners
    for (var i = 0; i < modeBtns.length; i++) {
        modeBtns[i].addEventListener("click", function () {
            modeBtns[0].classList.remove("selected")
            modeBtns[1].classList.remove("selected")
            this.classList.add("selected")
            this.textContent === "Easy" ? numOfSquares = 3 : numOfSquares = 6
            reset();
        });
    }
}

function setUpSquares() {
    for (var i = 0; i < squares.length; i++) {
        // add click listeners to squares
        squares[i].addEventListener("click", function () {
            // grab color of clicked square
            var clickedColor = this.style.backgroundColor
            // compare color to picked square
            if (pickedColor === clickedColor) {
                matchColors(clickedColor)
                messageDisplay.textContent = "Correct!"
                h1.style.backgroundColor = clickedColor
                resetBtn.textContent = "Play Again?"
            } else {
                this.style.backgroundColor = "#232323"
                messageDisplay.textContent = "Try Again"

            }
        })
    }
}



function init() {
    setUpModeBts()
    setUpSquares()
    reset()
}

init();





resetBtn.addEventListener("click", function () {
    reset();
});
