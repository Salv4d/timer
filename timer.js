class Timer {
  constructor(durationInput, startButton, pauseButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    this.totalDuration = this.timeRemaining;

    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }

    // this.durationInput.addEventListener
    this.startButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.pause);
  }

  start = () => {
    if (this.timeRemaining <= 0) {
      this.timeRemaining = this.totalDuration;
    }

    this.onStart(this.timeRemaining);
    this.tick();
    this.intervalId = setInterval(this.tick, 20);
  };

  pause = () => {
    clearInterval(this.intervalId);
  };

  tick = () => {
    this.timeRemaining = this.timeRemaining - 0.02;

    if (this.onTick) {
      this.onTick(this.timeRemaining);
    }

    if (this.timeRemaining <= 0) {
      this.onComplete();
    }
  };

  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }

  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
  }
}
