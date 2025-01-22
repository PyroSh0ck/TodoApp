// eslint-disable-next-line
import React from "react";

function formatDate(time) {
  const monthArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let timeArr = time.split("-");
  let daySuffix = "";
  let lastDigit = timeArr[2].slice(1, 2);
  let firstDigit = timeArr[2].slice(0, 1);
  let temp;

  if (lastDigit === "1") {
    daySuffix = "st";
  } else if (lastDigit === "2") {
    daySuffix = "nd";
  } else if (lastDigit === "3") {
    daySuffix = "rd";
  } else {
    daySuffix = "th";
  }

  if (firstDigit === "0") {
    temp = lastDigit;
  } else {
    temp = timeArr[2];
  }
  let finalString =
    monthArr[timeArr[1] - 1] + " " + temp + daySuffix + ", " + timeArr[0];

  return finalString;
}

export default formatDate;
