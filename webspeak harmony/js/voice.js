// const startButton = document.getElementById('startButton');
// const stopButton = document.getElementById('stopButton');
// const outputDiv = document.getElementById('output');
// // const recognition = new webkitSpeechRecognition();
// //const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
const recognition = window.recognition || new (webkitSpeechRecognition || SpeechRecognition)();
window.recognition = recognition;

recognition.interimResults = true;
recognition.continuous = true;
//stopButton.disabled = true;
let commandExecuted = false;
var elements = '';

// startButton.addEventListener('click', () => {
//     recognition.start();
//     startButton.disabled = true;
//     stopButton.disabled = false;
//     startButton.textContent = 'Recording...';
//     commandExecuted = false;
//     //localStorage.setItem('isRecognitionStarted', 'true');
//     localStorage.setItem('isRecognitionStarted', 'true');
// });

// stopButton.addEventListener('click', () => {
//     recognition.stop();
//     stopButton.disabled = true;
//     stopButton.textContent = 'Recording Stopped';
//     window.location.reload();
//     //localStorage.removeItem('isRecognitionStarted')
//     localStorage.removeItem('isRecognitionStarted');
// });
//*****************************************Toggle Switch******************************* */
    var microToggle = document.getElementById("microphoneToggle"); 
    var microOn = document.getElementById("microOn"); 
    var microphOn = document.getElementById("microphOn"); 
    var microOff = document.getElementById("microOff"); 
    var microphOff = document.getElementById("microphOff"); 
    var microText = document.getElementById("micro-text"); 

  function toggleMicrophone() { 
    var microToggle = document.getElementById("microphoneToggle"); 
    var microOn = document.getElementById("microOn"); 
    var microphOn = document.getElementById("microphOn"); 
    var microOff = document.getElementById("microOff"); 
    var microphOff = document.getElementById("microphOff"); 
    var microText = document.getElementById("micro-text"); 

    microOn.classList.toggle('hidden'); 
    microphOn.classList.toggle('hidden'); 
    microOff.classList.toggle('hidden'); 
    microphOff.classList.toggle('hidden'); 

    var isMicrophoneOn = !microOff.classList.contains('hidden'); 
    microText.textContent = isMicrophoneOn ? "Microphone is ON" : "Microphone is OFF"; 
    if(isMicrophoneOn)
    {
        recognition.start();
        // startButton.disabled = true;
        // stopButton.disabled = false;
        //startButton.textContent = 'Recording...';
        commandExecuted = false;
        localStorage.setItem('isRecognitionStarted', 'false');
    }else{
        recognition.stop();
        // stopButton.disabled = true;
        // stopButton.textContent = 'Recording Stopped';
        window.location.reload();
        localStorage.removeItem('isRecognitionStarted');
    }
   
  } 

//****************************Toggle Switch******************************************** */
recognition.onresult = (event) => {
    
        const result = event.results[event.results.length - 1][0].transcript;
        //outputDiv.textContent = result;
        processSpeech(result); 
    
};

recognition.onend = () => {
    // startButton.disabled = false;
    // startButton.textContent = 'Start Recording';
};

recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
};

recognition.onnomatch = () => {
    console.log('No speech was recognized.');
};

//*******************Check if speech recognition is already started*******************************************
const isRecognitionStarted = localStorage.getItem('isRecognitionStarted') === 'false';
if (isRecognitionStarted) {
    recognition.start();
    microOn.classList.toggle('hidden'); 
    microphOn.classList.toggle('hidden'); 
    microOff.classList.toggle('hidden'); 
    microphOff.classList.toggle('hidden'); 
    var isMicrophoneOn = !microOff.classList.contains('hidden'); 
    microText.textContent = isMicrophoneOn ? "Microphone is ON" : "Microphone is OFF"; 
}


 //************************************* Main Function Execution ***************************************************** */
 function processSpeech(speech) {
    
    var cmd = speech.toLowerCase();
    displayGuidingMessage(`You said ${cmd}.\n Say 'Help' to Know more about the command.`);
   
   
//************************************* Click Command Execution ********************************************* */
if (!commandExecuted) {
   
    if(cmd.includes('click')) {
         elements = document.querySelectorAll('a, button, input[type="submit"], input[type="text"]');     
         elements.forEach(function(element, index) {
            element.setAttribute('value', index + 1);
            var numberIcon = document.createElement('span');
            numberIcon.className = 'number-icon';
            numberIcon.textContent = index + 1;
            element.insertBefore(numberIcon, element.firstChild);
         });

         var style = document.createElement('style');
         style.innerHTML = '.number-icon { background-color: yellow; color: black; font-weight: bold; padding: 2px 5px; border-radius: 5px; margin-right: 5px; }';
         document.head.appendChild(style);
         
         displayGuidingMessage2(` Say the 'Labeled Number' to click.`);
         
        }
    commandExecuted = true;

    }
   
//*******************Say the number of the element you want to activate************************** */

const index1 = parseInt(cmd);

if (!isNaN(index1) && index1 >= 1 && index1 <= elements.length) {
    if (elements[index1 - 1].tagName.toLowerCase() === 'input' && elements[index1 - 1].type.toLowerCase() === 'text') {
        elements[index1 - 1].focus();
    } 

    else {
        if (elements[index1 - 1].href) {
            localStorage.setItem('redirectUrl', elements[index1 - 1].href);
            window.location.href = elements[index1 - 1].href;
        } else {
            elements[index1 - 1].click();
        }
        
    }


}
  

//************************************** Simulate typing in the focused input field ************************************* */
if (cmd.includes('type')) {

    typeInInput(cmd.substr('type:'.length).trim());
}
if (cmd.includes('select')) {
    // Handle the "select" command
    selectTextInInput();
} 
if (cmd.includes('copy')) {
    // Handle the "copy" command
    copySelectedText();
}
if (cmd.includes('cut')) {
    // Handle the "copy" command
    cutSelectedText();
}
if (cmd.includes('pest') || cmd.includes('best')) {
    // Handle the "paste" command
    pasteTextInInput();
}
if (cmd.includes('auto scroll')) {
    // Start auto-scrolling
    startAutoScroll();
}
if (cmd.includes('stop')) {
    // Stop auto-scrolling
    stopAutoScroll();
}
if (cmd.includes('help')) {
    // Display help window
    displayHelpWindow();
}

function displayHelpWindow() {
    const helpWindow = document.createElement('div');
    helpWindow.className = 'help-window';
    helpWindow.innerHTML = `
        <h2>Available Commands:</h2>
        <ul>
            <li>'click': Perform a click action on a clickable element.</li>
            <li>'autoscroll': Start continuous auto-scrolling down the page.</li>
            <li>'stop': Stop auto-scrolling.</li>
            <li>'help': Display this help window.</li>
            
        </ul>
    `;

    document.body.appendChild(helpWindow);

    // Close the help window when clicking outside of it
    document.addEventListener('click', closeHelpWindow);

    // Optionally, set a timer to automatically close the help window after a certain duration
    setTimeout(() => {
        closeHelpWindow();
    }, 8000); // Close after 10 seconds (adjust the duration as needed)
}

function closeHelpWindow() {
    const helpWindow = document.querySelector('.help-window');
    if (helpWindow) {
        document.body.removeChild(helpWindow);
        document.removeEventListener('click', closeHelpWindow);
    }
}

function startAutoScroll() {
    // Scroll smoothly every 16 milliseconds (60 frames per second)
    
    var scrolling = false;

    function pageScroll() {
        if (!scrolling) {
    autoScrollInterval = setInterval(() => {
        window.scrollBy(0, 4); // Scroll down 1 pixel
    }, 16);
}
}

    function handleScroll() {
        scrolling = true;
        clearTimeout(scrolldelay);
        scrolldelay = setTimeout(function () {
            scrolling = false;
        }, 2);
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('wheel', handleScroll);
    window.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown') {
            handleScroll();
        }
    });
    pageScroll();
}

function stopAutoScroll() {
    // Stop the auto-scrolling interval
    clearInterval(autoScrollInterval);
}

function displayGuidingMessage(message) {
    const guidingMessageCard = document.createElement('div');
    guidingMessageCard.className = 'guiding-message-card';
    guidingMessageCard.textContent = message;
    document.body.appendChild(guidingMessageCard);

    // Auto-hide the guiding message after a certain duration (e.g., 3 seconds)
    setTimeout(() => {
        guidingMessageCard.style.opacity = '0';
        guidingMessageCard.style.transition = 'opacity 3s';

        // Remove the guiding message card from the DOM after the transition ends
        guidingMessageCard.addEventListener('transitionend', () => {
            document.body.removeChild(guidingMessageCard);
        });
    }, 3000);
}

function displayGuidingMessage2(message) {
    const guidingMessageCard = document.createElement('div');
    guidingMessageCard.className = 'guiding-message-card-2';
    guidingMessageCard.textContent = message;
    document.body.appendChild(guidingMessageCard);

    // Auto-hide the guiding message after a certain duration (e.g., 3 seconds)
    setTimeout(() => {
        guidingMessageCard.style.opacity = '0';
        guidingMessageCard.style.transition = 'opacity 6s';

        // Remove the guiding message card from the DOM after the transition ends
        guidingMessageCard.addEventListener('transitionend', () => {
            document.body.removeChild(guidingMessageCard);
        });
    }, 3000);
}

function selectTextInInput() {
    const activeElement = document.activeElement;
    if (activeElement.tagName.toLowerCase() === 'input' && activeElement.type.toLowerCase() === 'text') {
        // Select the text in the focused input field
        activeElement.select();
    }
}
function typeInInput(text) {
    const activeElement = document.activeElement;
    if (activeElement.tagName.toLowerCase() === 'input' && activeElement.type.toLowerCase() === 'text') {
        activeElement.value = text;
    }
}


function copySelectedText() {
    const activeElement = document.activeElement;
    if (activeElement.tagName.toLowerCase() === 'input' && activeElement.type.toLowerCase() === 'text') {
        // Copy the selected text in the focused input field using the Clipboard API
        activeElement.select();
        var textBox_value=activeElement.value;
        localStorage.setItem("textBox_value", textBox_value);
        activeElement.setSelectionRange(0, 0);

    }
}

function cutSelectedText() {
    const activeElement = document.activeElement;
    if (activeElement.tagName.toLowerCase() === 'input' && activeElement.type.toLowerCase() === 'text') {
        // Copy the selected text in the focused input field using the Clipboard API
        activeElement.select();
        var textBox_value=activeElement.value;
        localStorage.setItem("textBox_value", textBox_value);
        activeElement.value = " "; 
        activeElement.setSelectionRange(0, 0);

    }
}

function pasteTextInInput() {
    const activeElement = document.activeElement;
    if (activeElement.tagName.toLowerCase() === 'input' && activeElement.type.toLowerCase() === 'text') {
        var text = localStorage.getItem("textBox_value");
        activeElement.value = text; 
    }
}

//************************************** Scroll Down Command Execution ************************************* */
if (cmd.includes('scroll down')) {
    console.log('User wants to scroll');

    var scrolling = false;

    function pageScroll() {
        if (!scrolling) {
            window.scrollBy(0, 250);
            requestAnimationFrame(pageScroll);
        }
    }

    function handleScroll() {
        scrolling = true;
        clearTimeout(scrolldelay);
        scrolldelay = setTimeout(function () {
            scrolling = false;
        }, 2);
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('wheel', handleScroll);
    window.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown') {
            handleScroll();
        }
    });

    pageScroll();
}


//************************************** Scroll up Command Execution ************************************* */      
if (cmd.includes('scroll up')) {

    var scrolling = false;

    function pageScroll() {
        if (!scrolling) {
            window.scrollBy(0, -250);
            requestAnimationFrame(pageScroll);
        }
    }

    function handleScroll() {
        scrolling = true;
        clearTimeout(scrolldelay);
        scrolldelay = setTimeout(function () {
            scrolling = false;
        }, 2);
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('wheel', handleScroll);
    window.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown') {
            handleScroll();
        }
    });

    pageScroll();
}


//************************************** Forward Command Execution ************************************* */
    else if(cmd.includes('forward')){

    function goForward() {
      window.history.forward();
    }
    goForward();
   }
//************************************** Back Command Execution ************************************* */
   else if(cmd.includes('back')){
    function goBack() {
      window.history.back();
    }
    goBack();
   }
//************************************** reload Command Execution ************************************* */
   else if(cmd.includes('reload')){
    function reload() {
      window.location.reload();
    }
    reload();
   }
//************************************** stop Command Execution ************************************* */
    else if(cmd.includes('stop')){
    function stop() {
      window.stop();
    }
    stop();
   }

   else {
      console.log('Unrecognised speech');
   }
 }
