/* Sliders */
var slider1 = document.getElementById("slider1");
var output1 = document.getElementById("output1");
output1.innerHTML = slider1.value;
slider1.oninput = function() { output1.innerHTML = this.value; }

var slider2 = document.getElementById("slider2");
var output2 = document.getElementById("output2");
output2.innerHTML = slider2.value;
slider2.oninput = function() { output2.innerHTML = this.value; }