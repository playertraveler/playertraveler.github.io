const TimerState = {
  IDLE: "idle",
  RUNNING: "running",
  PAUSED: "paused",
};

const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const display = document.getElementById("display");
const message = document.getElementById("message");
const startButton = document.getElementById("start-btn");
const stopButton = document.getElementById("stop-btn");
const resetButton = document.getElementById("reset-btn");

let state = TimerState.IDLE;
let totalSecondsRemaining = 0;
let originalTotalSeconds = 0;
let intervalId = null;

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function setMessage(text, isError = false) {
  message.textContent = text;
  message.style.color = isError ? "#b91c1c" : "#047857";
}

function updateDisplay() {
  display.textContent = formatTime(totalSecondsRemaining);
}

function updateButtonStates() {
  startButton.disabled = state === TimerState.RUNNING;
  stopButton.disabled = state !== TimerState.RUNNING;
}

function clearTimerInterval() {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

function readAndValidateInput() {
  const minutes = Number(minutesInput.value);
  const seconds = Number(secondsInput.value);

  const isValid =
    Number.isInteger(minutes) &&
    Number.isInteger(seconds) &&
    minutes >= 0 &&
    seconds >= 0 &&
    seconds <= 59 &&
    minutes * 60 + seconds > 0;

  if (!isValid) {
    return { valid: false, totalSeconds: 0 };
  }

  return { valid: true, totalSeconds: minutes * 60 + seconds };
}

function tick() {
  totalSecondsRemaining = Math.max(0, totalSecondsRemaining - 1);
  updateDisplay();

  if (totalSecondsRemaining === 0) {
    clearTimerInterval();
    state = TimerState.IDLE;
    setMessage("Time is up!");
    updateButtonStates();
  }
}

function startTimer() {
  if (state === TimerState.RUNNING) {
    return;
  }

  if (state === TimerState.IDLE) {
    const parsed = readAndValidateInput();
    if (!parsed.valid) {
      setMessage("Please enter a valid time.", true);
      return;
    }

    originalTotalSeconds = parsed.totalSeconds;
    totalSecondsRemaining = parsed.totalSeconds;
    updateDisplay();
  }

  setMessage("");
  state = TimerState.RUNNING;
  updateButtonStates();

  clearTimerInterval();
  intervalId = setInterval(tick, 1000);
}

function stopTimer() {
  if (state !== TimerState.RUNNING) {
    return;
  }

  clearTimerInterval();
  state = TimerState.PAUSED;
  updateButtonStates();
}

function resetTimer() {
  clearTimerInterval();
  totalSecondsRemaining = originalTotalSeconds;
  updateDisplay();
  state = TimerState.IDLE;
  setMessage("");
  updateButtonStates();
}

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);

updateDisplay();
updateButtonStates();
