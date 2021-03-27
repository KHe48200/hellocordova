//Grab DOM elements
var minutes = 00;
var seconds = 00;
var hundredths = 00;

var appendMinutes = document.getElementById("minutes");
var appendSeconds = document.getElementById("seconds");
var appendHundredths = document.getElementById("hundredths");

var startButton = document.getElementById("start");
var stopButton = document.getElementById("stop");
var resetButton = document.getElementById("reset");

var Interval;

//Start stopwatch
startButton.onclick = function(){
    clearInterval(Interval);
    Interval = setInterval(startTimer, 10);
}

//Stop stopwatch
stopButton.onclick = function(){
    clearInterval(Interval);
}

//Reset stopwatch
resetButton.onclick = function(){
    clearInterval(Interval);
    minutes = "00";
    seconds = "00";
    hundredths = "00";

    appendMinutes.innerHTML = minutes;
    appendSeconds.innerHTML = seconds;
    appendHundredths.innerHTML = hundredths;
}

//startTimer function from startButton.onclick -> setInterval
function startTimer(){
    hundredths++;

    if(hundredths <= 9)
        appendHundredths.innerHTML = "0" + hundredths;
    
    if(hundredths > 9)
        appendHundredths.innerHTML = hundredths;

    if(hundredths > 99){
        seconds++
        appendSeconds.innerHTML = "0" + seconds;
        hundredths = 0;
        appendHundredths.innerHTML = "0" + 0;
    }

    if(seconds > 9)
        appendSeconds.innerHTML = seconds;

    if(seconds > 59){
        minutes++;
        appendMinutes.innerHTML = "0" + minutes;
        seconds = 0;
        appendSeconds.innerHTML = "0" + 0;
    }

    if(minutes > 9)
        appendMinutes.innerHTML = minutes;

    
}