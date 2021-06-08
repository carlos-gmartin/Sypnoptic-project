

/* IMAGE QUESTIONS */
var cod = document.getElementById("cod");
var mackeral = document.getElementById("mackeral");
var trout = document.getElementById("trout");
var next = document.getElementById("next");

var zone1 = document.getElementById("zone1");
var zone2 = document.getElementById("zone1");
var zone3 = document.getElementById("zone1");



/* SLIDER */
var slider1 = document.getElementById("slider1");
var output1 = document.getElementById("output1");
output1.innerHTML = slider1.value;
slider1.oninput = function() { output1.innerHTML = this.value; }

var slider2 = document.getElementById("slider2");
var output2 = document.getElementById("output2");
output2.innerHTML = slider2.value;
slider2.oninput = function() { output2.innerHTML = this.value; }