//Grab DOM elements
var currentCount = 0;
var increase = document.getElementById("increase");
var decrease = document.getElementById("decrease");
var appendCount = document.getElementById("count")
var reset = document.getElementById("reset");

//Counter increase
increase.onclick = function(){
    currentCount++;
    appendCount.innerHTML = currentCount;
}

//Counter decrease
decrease.onclick = function(){
    currentCount--;
    appendCount.innerHTML = currentCount;
}

//Reset counter
reset.onclick = function(){
    currentCount = 0;
    appendCount.innerHTML = currentCount;
}