const watchEl = document.querySelector(".watchDisplay");
const lapSectionEl = document.querySelector(".lapDetails");
let lapWatchEl, lapEl;

const btnStart = document.querySelector(".start");
const btnStop = document.querySelector(".stop");
const btnReset = document.querySelector(".reset");
const btnLap = document.querySelector(".lap");
//initializing key variables
let isWatchOn = false;

let time = 0;
let millisecs = 0;
let timer;

let lapTime = 0;
let lapMillisecs = 0;
let lapCounter = 0;
let lapTimer;

// update the UI to display watch based on the logic effected
function updateWatchUI(displayEl, hrs, mins, secs, millisecs) {
  displayEl.textContent = `${hrs < 10 ? String(hrs).padStart(2, "0") : hrs} : ${
    mins < 10 ? String(mins).padStart(2, "0") : mins
  } : ${secs < 10 ? String(secs).padStart(2, "0") : secs} . ${
    millisecs < 10 ? String(millisecs).padStart(2, "0") : millisecs
  }`;
}
//create lap watch content
function createLapContent() {
  lapEl = document.createElement("div");
  lapWatchEl = document.createElement("span");
  lapEl.className = "lapContent";
  lapEl.textContent = `Lap ${lapCounter}`;
  lapSectionEl.insertAdjacentElement("afterbegin", lapEl);
}
// standard watch logic
function watchLogic(watchTime, watchMillisecs) {
  watchTime++;
  watchMillisecs++;
  if (watchMillisecs >= 100) watchMillisecs = 0;
  const watchSecs = Math.trunc(watchTime / 100);
  const watchMins = Math.trunc(watchTime / 6000);
  const watchHrs = Math.trunc(watchTime / 360000);
  return { watchTime, watchHrs, watchMins, watchSecs, watchMillisecs };
}

btnStart.addEventListener("click", () => {
  clearInterval(timer);
  if (lapTime > 0) return;
  isWatchOn = true;

  if (lapCounter < 1) {
    lapCounter++;
    // create lap watch content
    createLapContent();
  }
  // create and update timer
  timer = setInterval(() => {
    const { watchTime, watchHrs, watchMins, watchSecs, watchMillisecs } =
      watchLogic(time, millisecs);
    time = watchTime;
    millisecs = watchMillisecs;

    updateWatchUI(watchEl, watchHrs, watchMins, watchSecs, watchMillisecs);

    if (lapCounter <= 1) {
      updateWatchUI(lapWatchEl, watchHrs, watchMins, watchSecs, watchMillisecs);
      lapEl.insertAdjacentElement("beforeend", lapWatchEl);
    }
  }, 10);
});

// stop watch functionality upon clicking the stop button
btnStop.addEventListener("click", () => {
  clearInterval(timer);
  clearInterval(lapTimer);
  isWatchOn = false;
});

// reset watch functionality upon clicking the reset button - reverts back to default
btnReset.addEventListener("click", () => {
  clearInterval(timer);
  clearInterval(lapTimer);
  isWatchOn = false;

  time = 0;
  millisecs = 0;
  lapTime = 0;
  lapMillisecs = 0;
  lapCounter = 0;
  lapSectionEl.innerHTML = "";
  updateWatchUI(watchEl, 0, 0, 0, 0);
});

// lap multiple watch functionality upon clicking the lap button
btnLap.addEventListener("click", () => {
  clearInterval(lapTimer);
  //prevents lapping once watch is off
  if (!isWatchOn) return;

  lapCounter++;
  lapTime = 0;
  lapMillisecs = 0;

  // create lap watch content
  createLapContent();
  //   create and update lap timer
  lapTimer = setInterval(() => {
    const { watchTime, watchHrs, watchMins, watchSecs, watchMillisecs } =
      watchLogic(lapTime, lapMillisecs);
    lapTime = watchTime;
    lapMillisecs = watchMillisecs;
    //update lap watch UI
    updateWatchUI(lapWatchEl, watchHrs, watchMins, watchSecs, watchMillisecs);
    lapEl.insertAdjacentElement("beforeend", lapWatchEl);
  }, 10);
});
