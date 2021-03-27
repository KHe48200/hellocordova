//Grab DOM elements
var timerMinDisplay = document.getElementById("timermins");
var timerSecDisplay = document.getElementById("timersecs");

var timerMins;
var timerSecs;

var startButton = document.getElementById("start");
var pauseButton = document.getElementById("pause");
var resetButton = document.getElementById("reset");

var Interval;
var paused = false;

//Start timer
startButton.onclick = function(){
    timerMins = parseInt(document.getElementById("timermins").value);
    timerSecs = parseInt(document.getElementById("timersecs").value);

    clearInterval(Interval);
    Interval = setInterval(startTimer, 1000);
}

//Pause timer
pauseButton.onclick = function(){
    if(paused){
        clearInterval(Interval);
        Interval = setInterval(startTimer, 1000);
        paused = false;
        pauseButton.innerHTML = "PAUSE";
    }
    else{
        clearInterval(Interval);
        paused = true;
        pauseButton.innerHTML = "RESUME";
    }
}

//Reset timer
resetButton.onclick = function(){
    clearInterval(Interval)

    timerMinDisplay.value = "0";
    timerSecDisplay.value = "00";
}

//startTimer()
function startTimer(){
    
    timerSecs--;

    if(timerSecs <= 9 && timerSecs >= 0 )
        timerSecDisplay.value = "0" + timerSecs; 

    if(timerSecs > 9)
        timerSecDisplay.value = timerSecs;

    if (timerSecs < 0){
        timerMins--;
        timerMinDisplay.value = timerMins;
        timerSecs = 59;
        timerSecDisplay.value = timerSecs;
    }

    //Beep times up
    if(timerMins == 0 && timerSecs == 3 || timerMins == 0 && timerSecs == 2 || timerMins == 0 && timerSecs == 1 || timerMins == 0 && timerSecs == 0){
        navigator.notification.beep(1);
    }

    if(timerMins == 0 && timerSecs == 0)
        clearInterval(Interval);
}