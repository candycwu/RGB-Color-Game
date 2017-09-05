//variable to keep track on which mode we are on
var numSquares = 6
//single arguement inside the () to decide the number of times.
var colors = []; 
//variable for picked color
var pickedColor; 

//DOM Element
var h1 = document.querySelector("h1");
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

//initiate game
init();

//reset button
resetButton.addEventListener("click", function(){ 
    reset();
});

//-------------------------------------------------------------
//--------------------------Functions--------------------------
//-------------------------------------------------------------

function init(){ //when the page starts or refreshed
    setUpModeButtons();
    setUpSquares();
    }
    
//function to reset the game
function reset(){ 
    //generate all new colors
    colors = generateRandomColors(numSquares); 
    //pick a new random color from array
    pickedColor = pickColor(); 
    //change the colorDisplay to match picked color
    colorDisplay.textContent = pickedColor; 
    //remove messageDisplay
    messageDisplay.textContent = ""; 
    //change "Play Again?" to "New Colors"
    resetButton.textContent = "New Colors"; 
    //change the h1 color back
    h1.style.backgroundColor = "steelblue"; 

    //change the colors of the squares on the page
    for(i=0; i<squares.length; i++){ 
        //if there is a color
        if(colors[i]){ 
        squares[i].style.display = "block";
        squares[i].style.backgroundColor = colors[i]; 
    } else {
        //to hide extra colors
        squares[i].style.display = "none"; 
    }
}};

function setUpModeButtons(){
    //mode button event listeners
    for(var i=0; i<modeButtons.length; i++){
    modeButtons[i].addEventListener("click", function(){
        modeButtons[0].classList.remove("selected");
        modeButtons[1].classList.remove("selected");
        modeButtons[2].classList.remove("selected");
        //this refers to what's clicked on 
        this.classList.add("selected"); 
        // this.textContent === "Easy" ? numSquares = 3: numSquares = 6; //ternary operator: condition, then, else
        if(this.textContent === "Easy"){
            numSquares = 3;
        } else if(this.textContent === "Medium"){
            numSquares = 6;
        } else {
            numSquares = 9;
        }
        reset();
        });
    }
}

function setUpSquares(){
    for(i=0; i<squares.length; i++){
        //add click listeners to squares
        squares[i].addEventListener("click", function(){    
        //grab color of clicked square
        var clickedColor = this.style.backgroundColor; //this refers to the clicked item.
        //compare color to pickedColor
        if(clickedColor === pickedColor){
            messageDisplay.textContent = "Correct!";
            changeColors(clickedColor);
            h1.style.backgroundColor = clickedColor;
            resetButton.textContent = "Play Again?";
        }else{
            this.style.backgroundColor = "#232323";
            messageDisplay.textContent ="Try Again";
        }
        })
    }
    reset();
}

//to change  all square colors to the correct color 
function changeColors(color) { 
    //loop through all squares
    for(i=0; i<squares.length; i++){ 
    //change each color to match given color
    squares[i].style.backgroundColor = color; 
    }
}

// to pick a random color
function pickColor(){ 
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

//To generate 6 random numbers for the color of the squares 
function generateRandomColors(num){   
    //make an empty array to store
    var arr = []; 
    //add num to random colors to array (repeat num times)
    for(var i=0; i<num; i++){ 
        //get random color & push into array
        arr.push(randomColor()); 
    }
    //return that array
    return arr; 
 }

 //To generate the random color inside the generateRandomColors() function
function randomColor (){ 
    //pick a red from 0 to 255
     var r = Math.floor(Math.random() * 256); 
     var g = Math.floor(Math.random() * 256);
     var b = Math.floor(Math.random() * 256); 
     return "rgb(" + r +", " + g + ", " + b + ")" ;
 }