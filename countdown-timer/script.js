const TimerState = {
  IDLE: "idle",
  RUNNING: "running",
  PAUSED: "paused",
};

const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const display = document.getElementById("display");
const message = document.getElementById("message");

let state = TimerState.IDLE;
let totalSeconds = 0;
let originalTotalSeconds = 0;
let intervalId = null;

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function updateDisplay() {
  display.textContent = formatTime(totalSeconds);
}

function setInputsFromTotalSeconds(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  minutesInput.value = String(mins);
  secondsInput.value = String(secs);
}

function clearMessage() {
  message.textContent = "";
}

function setMessage(text) {
  message.textContent = text;
}

function parseAndValidateInput() {
  const minutesText = minutesInput.value.trim();
  const secondsText = secondsInput.value.trim();

  const minutes = minutesText === "" ? 0 : Number(minutesText);
  const seconds = secondsText === "" ? 0 : Number(secondsText);

  const isValid =
    Number.isInteger(minutes) &&
    Number.isInteger(seconds) &&
    minutes >= 0 &&
    seconds >= 0 &&
    seconds <= 59;

  if (!isValid) {
    return null;
  }

  const combined = minutes * 60 + seconds;
  if (combined <= 0) {
    return null;
  }

  return combined;
}

function syncButtons() {
  const isRunning = state === TimerState.RUNNING;

  startButton.disabled = isRunning;
  stopButton.disabled = !isRunning;
  minutesInput.disabled = isRunning;
  secondsInput.disabled = isRunning;
}

function stopInterval() {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

function tick() {
  if (totalSeconds > 0) {
    totalSeconds -= 1;
    updateDisplay();
  }

  if (totalSeconds === 0) {
    stopInterval();
    state = TimerState.IDLE;
    syncButtons();
    setMessage("Time is up!");
  }
}

function startTimer() {
  if (state === TimerState.RUNNING) {
    return;
  }

  clearMessage();

  if (state === TimerState.IDLE) {
    const validatedSeconds = parseAndValidateInput();
    if (validatedSeconds === null) {
      setMessage("Please enter a valid time.");
      return;
    }

    originalTotalSeconds = validatedSeconds;
    totalSeconds = validatedSeconds;
    updateDisplay();
  }

  state = TimerState.RUNNING;
  syncButtons();

  if (intervalId === null && totalSeconds > 0) {
    intervalId = setInterval(tick, 1000);
  }
}

function stopTimer() {
  if (state !== TimerState.RUNNING) {
    return;
  }

  stopInterval();
  state = TimerState.PAUSED;
  syncButtons();
}

function resetTimer() {
  stopInterval();
  state = TimerState.IDLE;

  totalSeconds = originalTotalSeconds > 0 ? originalTotalSeconds : 0;
  setInputsFromTotalSeconds(totalSeconds);
  updateDisplay();
  clearMessage();
  syncButtons();
}

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);

setInputsFromTotalSeconds(0);

syncButtons();
updateDisplay();
