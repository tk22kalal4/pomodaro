// Display Digital Clock
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById("digitalClock").textContent = `${hours}:${minutes}:${seconds}`;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Countdown Timer
let countdownInterval;
let isOnBreak = false;
let initialCountdownSeconds;

function startCountdown() {
    clearInterval(countdownInterval);
    isOnBreak = false;

    // Get countdown hours, minutes, and seconds
    const hours = parseInt(document.getElementById("hoursInput").value) || 0;
    const minutes = parseInt(document.getElementById("minutesInput").value) || 0;
    const seconds = parseInt(document.getElementById("secondsInput").value) || 0;

    // Get break time in hours, minutes, and seconds
    const breakHours = parseInt(document.getElementById("breakHoursInput").value) || 0;
    const breakMinutes = parseInt(document.getElementById("breakMinutesInput").value) || 0;
    const breakSeconds = parseInt(document.getElementById("breakSecondsInput").value) || 0;

    // Convert times to seconds
    initialCountdownSeconds = hours * 3600 + minutes * 60 + seconds;
    let breakTimeSeconds = breakHours * 3600 + breakMinutes * 60 + breakSeconds;

    // Function to update countdown
    function updateCountdown() {
        if (!isOnBreak && initialCountdownSeconds > 0) {
            initialCountdownSeconds--;
            displayTime(initialCountdownSeconds, "countdownDisplay");

            if (initialCountdownSeconds === 0) {
                playSound(); // Play sound when countdown ends
                if (breakTimeSeconds > 0) {
                    isOnBreak = true;
                    initialCountdownSeconds = breakTimeSeconds;
                    document.getElementById("countdownDisplay").textContent = "Break time!";
                }
            }
        } else if (isOnBreak && initialCountdownSeconds > 0) {
            initialCountdownSeconds--;
            displayTime(initialCountdownSeconds, "countdownDisplay");

            if (initialCountdownSeconds === 0) {
                playSound(); // Play sound when break time ends
                isOnBreak = false;
                initialCountdownSeconds = hours * 3600 + minutes * 60 + seconds;
                startCountdown();
            }
        }
    }

    // Start countdown interval
    countdownInterval = setInterval(updateCountdown, 1000);
}

// Function to display time in HH:MM:SS format
function displayTime(seconds, elementId) {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    document.getElementById(elementId).textContent = `${hrs}:${mins}:${secs}`;
}

// Play sound function
function playSound() {
    const soundToggle = document.getElementById("soundToggle").checked;
    if (soundToggle) {
        const alertSound = document.getElementById("alertSound");
        alertSound.play();
        document.getElementById("muteButton").style.display = "inline-block"; // Show mute button
    }
}

// Mute sound function
function muteSound() {
    const alertSound = document.getElementById("alertSound");
    alertSound.pause();
    alertSound.currentTime = 0; // Reset sound to the beginning
    document.getElementById("muteButton").style.display = "none"; // Hide mute button
}

// Reset Function
function resetTimer() {
    clearInterval(countdownInterval);
    isOnBreak = false;
    document.getElementById("countdownDisplay").textContent = "";

    // Clear all input fields
    document.getElementById("hoursInput").value = "";
    document.getElementById("minutesInput").value = "";
    document.getElementById("secondsInput").value = "";
    document.getElementById("breakHoursInput").value = "";
    document.getElementById("breakMinutesInput").value = "";
    document.getElementById("breakSecondsInput").value = "";

    // Reset and hide mute button
    muteSound();
}
