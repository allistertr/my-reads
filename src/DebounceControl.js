export default class DebounceControl {
  constructor(method, debounceTime) {
    this.lastRunTime;
    this.method = method;
    this.debounceTime = debounceTime;
  }

  onChange() {
    let runTime = new Date().getTime();
    this.lastRunTime = runTime;

    setTimeout(() => {
      if (runTime === this.lastRunTime)
        this.method(...arguments);
    }, this.debounceTime);
  }
}