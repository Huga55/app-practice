import {
  action,
  autorun,
  computed,
  makeObservable,
  observable,
  reaction,
  when,
} from "mobx";

type TimerStoreFields = "_seconds" | "_isRunning" | "targetTime";

class TimerStore {
  private _seconds = 0;
  private _isRunning = false;
  private targetTime = 10;
  private timer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    makeObservable<this, TimerStoreFields>(this, {
      _seconds: observable,
      _isRunning: observable,
      targetTime: observable,
      start: action.bound,
      stop: action.bound,
      reset: action.bound,
      seconds: computed,
      isRunning: computed,
    });

    autorun(() => {
      console.log("Current seconds: ", this._seconds);
    });

    reaction(
      () => this._seconds,
      (currentTime) => {
        if (currentTime === this.targetTime - 2) {
          setTimeout(() => {
            alert("We are near the end!");
          }, 0);
        }
      }
    );

    when(
      () => this._seconds >= this.targetTime,
      () => {
        setTimeout(() => {
          alert(`The goal ${this.targetTime} seconds has been reached!`);
        }, 0);
      }
    );
  }

  public get seconds() {
    return this._seconds;
  }

  public get isRunning() {
    return this._isRunning;
  }

  public start = () => {
    this._isRunning = true;
    this.tick();
  };

  public stop = () => {
    this._isRunning = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  };

  public reset = () => {
    this._seconds = 0;
  };

  private tick = () => {
    if (this._isRunning) {
      this.timer = setTimeout(() => {
        if (this._isRunning) {
          this._seconds++;
          this.tick();
        }
      }, 1000);
    }
  };
}

export const timerStore = new TimerStore();
