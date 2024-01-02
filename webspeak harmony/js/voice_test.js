// // ... (previous code remains unchanged)

// function processSpeech(speech) {
//     const cmd = speech.toLowerCase();

//     if (!commandExecuted) {
//         if (cmd.includes('click')) {
//             elements = document.querySelectorAll('a, button, input[type="submit"], input[type="text"]');
//             elements.forEach((element, index) => {
//                 element.setAttribute('value', index + 1);
//                 const numberIcon = document.createElement('span');
//                 numberIcon.className = 'number-icon';
//                 numberIcon.textContent = index + 1;
//                 element.insertBefore(numberIcon, element.firstChild);
//             });

//             const style = document.createElement('style');
//             style.innerHTML = '.number-icon { background-color: yellow; color: black; font-weight: bold; padding: 2px 5px; border-radius: 5px; margin-right: 5px; }';
//             document.head.appendChild(style);
//         }

//         commandExecuted = true;
//     }

//     const index1 = parseInt(cmd);

//     if (!isNaN(index1) && index1 >= 1 && index1 <= elements.length) {
//         if (cmd.includes('type')) {
//             // Handle the "type: something" command
//             typeInInput(cmd.substr('type:'.length).trim());
//         } else if (elements[index1 - 1].tagName.toLowerCase() === 'input' && elements[index1 - 1].type.toLowerCase() === 'text') {
//             // If the selected element is a text input, focus on it for typing
//             elements[index1 - 1].focus();
//         } else if (elements[index1 - 1].href) {
//             // Store the target URL in localStorage
//             localStorage.setItem('redirectUrl', elements[index1 - 1].href);
//             window.location.href = elements[index1 - 1].href;
//         } else {
//             elements[index1 - 1].click();
//         }
//     }
// }



// Function to start the recognition
function startRecognition() {
    recognition.start();
    startButton.disabled = true;
    stopButton.disabled = false;
    startButton.textContent = 'Recording...';
    commandExecuted = false;
    localStorage.setItem('isRecognitionStarted', 'true');
}

// Function to stop the recognition
function stopRecognition() {
    recognition.stop();
    stopButton.disabled = true;
    startButton.disabled = false;
    startButton.textContent = 'Start Recording';
    localStorage.removeItem('isRecognitionStarted');
}

// Check if speech recognition is already started from localStorage
const isRecognitionStarted = localStorage.getItem('isRecognitionStarted') === 'true';
if (isRecognitionStarted) {
    startRecognition();
}

//Check if there's a stored target URL in localStorage
const redirectUrl = localStorage.getItem('redirectUrl');
if (redirectUrl) {
    // Clear the stored URL
    localStorage.removeItem('redirectUrl');
    
    // Execute the 'click' command on the redirected page
    window.location.href = redirectUrl;
} else if (isRecognitionStarted) {
    // If recognition was started, resume it on the redirected page
    startRecognition();
}