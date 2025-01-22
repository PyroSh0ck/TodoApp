// eslint-disable-next-line
import React from "react";

function formatTime(time) {
  let firstTwo = time.slice(0, 2);
  let newTime;

  if (parseInt(firstTwo, 10) - 12 > 0) {
    newTime = `${parseInt(firstTwo, 10) - 12}:${time.slice(3)} pm`;
  } else {
    newTime = `${parseInt(firstTwo, 10)}:${time.slice(3)} am`;
  }

  return newTime;
}

export default formatTime;
