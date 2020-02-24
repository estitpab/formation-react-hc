"use strict";

const counter = {
  value: 0,
  incr() {
    this.value++;
  },
  incrAsync() {
    // this === counter
    setTimeout(() => {
      // this === this du scope parent === counter
      this.incr();
    }, 10);
  }
};

counter.incrAsync();
