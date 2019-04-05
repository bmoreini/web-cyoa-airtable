window.onload = start;

var options=[];
var buttonElement = document.getElementById("button1");
var currentStoryElement = document.getElementById("currentStory");
var dropdown = document.getElementById("choices");
var messages = [];
var choices;
var answer;
var textTimer;

function start() {
    setup();
}


function setup() {
    setOptions([{ choice: "No DB", target: "" }]);
    buttonElement.innerHTML = "What will you do?"; 
    buttonElement.onclick = function () {
    getScene(dropdown.value);
    }
}

function setOptions(options) {
    var dropdown = document.getElementById("choices");
    while (dropdown.options.length) {
        dropdown.remove(0);
    }
    for (var i = 0; i < options.length; i++) {
		// This is object-oriented JavaScript (hence capital letter)
        var option = new Option(options[i].choice, options[i].target);
        dropdown.options.add(option);
    }
}

function displayStory(text, delay = false, append = false) {
    var currentStoryElement = document.getElementById("currentStory");
    if (typeof(text) === 'string') {
        currentStoryElement.innerHTML = text;
    } 
	// the following makes text reveal slowly if a delay is indicated in the database
	else if (delay) {
        // Disable the button to prevent making a selection before
        // full message is delivered.
        buttonElement.disabled = true;
        // Keep shifting strings from the array until it is empty.
        if (append) {
            currentStoryElement.innerHTML += `<br /><br />${text.shift()}`;
        } 
		else {
            currentStoryElement.innerHTML = text.shift();
        }
        if (text.length) {
            setTimeout(function () {
                displayStory(text, delay, true);
            }, delay);
        } 
		else {
            // Done. Re-enable button.
            buttonElement.disabled = false;
        }
    } 
	else {
        currentStoryElement.innerHTML = text.join('<br /><br />');
    }
}