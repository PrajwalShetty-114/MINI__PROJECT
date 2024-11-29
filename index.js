

var blink = document.querySelectorAll('.press').length;
for (var i = 0; i < blink; i++) {

    document.querySelectorAll(".press")[i].addEventListener("click", function () {
var elem=this.innerHTML;
        if (i == 2) {
            var variable = this.classList;
            variable.add("pressed");
            setTimeout(function () { variable.remove("pressed"); }, 100);
            changeIcon(i,elem);
        } else if (i == 3) {
            var variable = this.classList;
            variable.add("pressed");
            setTimeout(function () { variable.remove("pressed"); }, 100);
            changeIcon(i,elem);
        } else {
            var variable = this.classList;
            variable.add("pressed");
            setTimeout(function () { variable.remove("pressed"); }, 100);
            
        }
    });

}

function changeIcon(value,elem) {
    var variable = elem.classList;
    variable.add("bi-check-square-fill");
    switch (value) {
        case 2:

            elem.setAttribute("d", "M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z");
            var variable = elem.classList;
            variable.add("bi-check-square-fill");
            break;
        case 3:
            this.setAttribute("d", "M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5");
            var variable = elem.classList;
            variable.add("bi-trash3-fill");
            break;

        default:
            break;
    }
}



const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.continuous = true;
  recognition.interimResults = true;

  const micImage = document.getElementById('mic');
  const frequencyBars = document.querySelector('.frequency-bars');
  const timerText = document.getElementById('timerText');
  const textContainer = document.querySelector('.texts');
  const copyIcon = document.querySelector('.bi-copy'); // Copy icon
  const deleteIcon = document.querySelector('.bi-trash3'); // Delete icon
  let isListening = false;
  let timer;
  let seconds = 0;

  // Toggle listening state on mic click
  micImage.addEventListener('click', () => {
    if (isListening) {
      recognition.stop(); // Stop recording
    } else {
      recognition.start(); // Start recording
    }
    isListening = !isListening;
    toggleMicState(isListening); // Update UI state
  });

  // Toggle UI based on microphone state
  function toggleMicState(listening) {
    if (listening) {
      micImage.src = './microphone.png'; // Keep mic image
      frequencyBars.style.visibility = 'visible'; // Show frequency bars
      startTimer(); // Start the timer
    } else {
      micImage.src = './microphone.png'; // Keep mic image
      frequencyBars.style.visibility = 'hidden'; // Hide frequency bars
      stopTimer(); // Stop the timer
    }
  }

  // Start the timer
  function startTimer() {
    timer = setInterval(() => {
      seconds++;
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      timerText.textContent = formatTime(hours, minutes, secs); // Update timer text
    }, 1000); // Update every second
  }

  // Stop the timer
  function stopTimer() {
    clearInterval(timer); // Clear the timer
    seconds = 0; // Reset seconds
    timerText.textContent = 'Tap to record'; // Reset the text when stopped
  }

  // Format time to HH:MM:SS
  function formatTime(hours, minutes, seconds) {
    return `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`;
  }

  // Pad time for 2 digits
  function padTime(time) {
    return time < 10 ? `0${time}` : time;
  }

  // Handle recognition result (speech-to-text)
  recognition.onresult = (event) => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    textContainer.textContent = transcript; // Display result in text container
  };

  // Handle errors during recognition
  recognition.onerror = (event) => {
    console.error('Speech Recognition Error:', event.error);
  };

  // Reset when recognition stops
  recognition.onend = () => {
    isListening = false;
    toggleMicState(false); // Reset UI state
  };

  // Copy functionality
  copyIcon.addEventListener('click', () => {
    const text = textContainer.textContent.trim();
    if (text) {
      navigator.clipboard.writeText(text).then(() => {
        // Change to check-square icon
        copyIcon.outerHTML = `
          <svg style="color: black;" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-check-square-fill" viewBox="0 0 16 16">
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
          </svg>`;
        setTimeout(() => location.reload(), 2000); // Reset icon after 2 seconds
      }).catch((err) => {
        console.error('Failed to copy text:', err);
      });
    } else {
      alert('No text to copy!');
    }
  });

  // Delete functionality
  deleteIcon.addEventListener('click', () => {
    textContainer.textContent = ''; // Clear text container
    // Change to trash icon
    deleteIcon.outerHTML = `
      <svg style="color: white;" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
      </svg>`;
  });
} else {
  alert('Speech Recognition API is not supported in this browser. Please use Chrome or Edge.');
}



//summarizer




document.getElementById("summarizeButton").addEventListener("click", async function() {
  const text = document.getElementById("inputText").value; // Input text from textarea
  if (!text) {
      alert("Please enter text to summarize.");
      return;
  }

  try {
      // Fetch the summary from Hugging Face API
      const response = await fetch("https://api-inference.huggingface.co/models/facebook/bart-large-cnn", {
          method: "POST",
          headers: {
              "Authorization": "Bearer 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", // Replace with your API key
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ inputs: text }) // Send input text for summarization
      });

      const result = await response.json();

      if (response.ok) {
          if (result && result[0] && result[0].summary_text) {
              // Save the summary in localStorage
              localStorage.setItem("summary", result[0].summary_text);

              // Redirect to the summary2.html page
              window.location.href = "http://127.0.0.1:5500/summary2.html";
          } else {
              alert("No summary returned. Please check the input text.");
          }
      } else {
          console.error("API Request Failed: ", result);
          alert(`Error: ${result.error || 'Could not fetch summary. Try again later.'}`);
      }
  } catch (error) {
      console.error("Error summarizing text:", error);
      alert("Error: Unable to fetch summary.");
  }
});
