window.onload = start;

function start() {
    setup();
	/** CHANGE THE FIRST FUNCTION FOR TESTING **/
    tollbooth();
}

var buttonElement = document.getElementById("button1");
var textTimer;

function setup() {
    // setOptions();
    setOptions([
        { choice: "RPG not loading", target: "test1" },
        { choice: "test 2", target: "test2" },
        { choice: "test 3", target: "test3" }
    ]);
    var buttonElement = document.getElementById("button1");
    buttonElement.innerHTML = "What will you do?"; 
    buttonElement.onclick = function () {
        var dropdown = document.getElementById("choices");
        // console.log(dropdown.value);
        getScene(dropdown.value);
    }
}

function setOptions(options) {
    var dropdown = document.getElementById("choices");
    while (dropdown.options.length) {
        dropdown.remove(0);
    }
    for (var i = 0; i < options.length; i++) {
        var option = new Option(options[i].choice, options[i].target);
        dropdown.options.add(option);
    }
}

function displayStory(text, delay = false, append = false) {
    var currentStoryElement = document.getElementById("currentStory");
    if (typeof(text) === 'string') {
        currentStoryElement.innerHTML = text;
    } else if (delay) {
        // Disable the button to prevent making a selection before
        // full message is delivered.
        buttonElement.disabled = true;
        // Keep shifting strings from the array until it is empty.
        if (append) {
            currentStoryElement.innerHTML += `<br /><br />${text.shift()}`;
        } else {
            currentStoryElement.innerHTML = text.shift();
        }
        if (text.length) {
            setTimeout(function () {
                displayStory(text, delay, true);
            }, delay);
        } else {
            // Done. Re-enable button.
            buttonElement.disabled = false;
        }
    } else {
        currentStoryElement.innerHTML = text.join('<br /><br />');
    }
}