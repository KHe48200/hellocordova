//Grab DOM elements
var startButton = document.getElementById("start");
var pauseButton = document.getElementById("pause");
var resetButton = document.getElementById("reset");

var setSets = document.getElementById("setsets")
var setWorkMins = document.getElementById("setworkmins");
var setWorkSecs = document.getElementById("setworksecs");
var setRestMins = document.getElementById("setrestmins");
var setRestSecs = document.getElementById("setrestsecs");

var displaySets = document.getElementById("displaysets");
var displayAction = document.getElementById("displayaction");
var displayMins = document.getElementById("displaymins");
var displaySecs = document.getElementById("displaysecs");

var Interval;
var paused = false;
var sets;
var workMins;
var workSecs;
var restMins;
var restSecs;

//Start timer
startButton.onclick = function(){
    sets = parseInt(setSets.value);
    displaySets.innerHTML = sets;

    workMins = parseInt(setWorkMins.value);
    workSecs = parseInt(setWorkSecs.value);


    restMins = parseInt(setRestMins.value);
    restSecs = parseInt(setRestSecs.value);

    document.getElementById("setup").classList.toggle("hide");
    document.getElementById("display").classList.toggle("hide");

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

    displayMins.innerHTML = "00"
    displaySecs.innerHTML = "00"

    //clear Work/Rest so it doesn't show up briefly when restarted
    displayAction.innerHTML = "Ready";

    document.getElementById("setup").classList.toggle("hide");
    document.getElementById("display").classList.toggle("hide");
}
    
//startTimer function
function startTimer() {

    if (sets > 0) {

        // if workMins != -1 (see if(workSecs < 0) below ) means there's still work minutes/second left
        if (workMins >= 0) {

            //Change displayed action to work
            displayAction.innerHTML = "Work";

            //Display remaining minutes and seconds correctly
            if(workSecs <= 9 && workSecs >= 0)
                displaySecs.innerHTML = "0" + workSecs;
            if(workSecs > 9)
                displaySecs.innerHTML = workSecs;
            if(workSecs < 0){
                workMins--; //if 0 workMins becomes -1 which is used as a condition to indicate work minutes/seconds have reached zero 
                displayMins.innerHTML = "0" + workMins;
                workSecs = 59;
                displaySecs.innerHTML = workSecs; 
            }
            if(workMins <= 9)
                displayMins.innerHTML = "0" + workMins;
            if(workMins > 9)
                displayMins.innerHTML = workMins;

            //Substract second
            workSecs--;
        }

        //if workMins == -1 means work minutes/seconds have reached zero and rolled over to negative (see above)
        if (workMins < 0) {

            //Change displayed action to Rest
            displayAction.innerHTML = "Rest";

            //Display remaining minutes and seconds correctly
            if(restSecs <= 9 && restSecs >= 0)
                displaySecs.innerHTML = "0" + restSecs;
            if(restSecs > 9)
                displaySecs.innerHTML = restSecs;
            if(restSecs < 0){
                restMins--;
                displayMins.innerHTML = "0" + restMins;
                restSecs = 59;
                displaySecs.innerHTML = restSecs; 
            }
            if(restMins <= 9)
                displayMins.innerHTML = "0" + restMins;
            if(restMins > 9)
                displayMins.innerHTML = restMins;

            //Substract second
            restSecs--;
        }

        //if both work and rest time have reached zero all times are reset and one set substracted 
        if(workMins < 0 && restMins < 0) {
            //Just so timer doesn't display anything weird (eg. -01:00)
            displayMins.innerHTML = "00"
            displaySecs.innerHTML = "00"

            //reset times to those specified on setup
            workMins = parseInt(setWorkMins.value);
            workSecs = parseInt(setWorkSecs.value);
            restMins = parseInt(setRestMins.value);
            restSecs = parseInt(setRestSecs.value);

            //substract set and update displayed value
            sets--
            displaySets.innerHTML = sets;
        }

        //Beep times up
        if (workMins == 0 && workSecs == 2 || workMins == 0 && workSecs == 1 || workMins == 0 && workSecs == 0 || workMins == 0 && workSecs == -1 || restMins == 0 && restSecs == 2 || restMins == 0 && restSecs == 1 || restMins == 0 && restSecs == 0 || restMins == 0 && restSecs == -1) {
            navigator.notification.beep(1);
        }

        console.log(workMins+":"+workSecs+", "+restMins+":"+restSecs)

        if(sets == 0){
            //Some sound?

            //Same as reset button
            clearInterval(Interval)

            displayMins.innerHTML = "00"
            displaySecs.innerHTML = "00"

            //clear Work/Rest so it doesn't show up briefly when restarted
            displayAction.innerHTML = "Ready";

            document.getElementById("setup").classList.toggle("hide");
            document.getElementById("display").classList.toggle("hide");
        }
    }
}
