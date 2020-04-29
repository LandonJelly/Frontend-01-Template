/*
 * @Description: This file is made for
 * @Date: 2020-04-29 17:31:50
 * @LastEditTime: 2020-04-29 17:33:25
 * @Author: LeongD
 * @LastEditors: LeongD
 */
function convertStringToNumber(string, x) {
  if (arguments.length < 2) {
    x = 10;
  }
  let letters = ["a", "b", "c", "d", "e", "f"];
  let chars = string.toLowerCase().split("");
  let flag = chars.includes("-");
  let number = 0;
  let i = 0;

  while (i < chars.length && chars[i] !== "." && !letters.includes(chars[i])) {
    number *= x;
    number += chars[i].codePointAt() - "0".codePointAt();
    i++;
  }

  // Point
  if (chars[i] === ".") {
    i++;
  }
  let fraction = 1;
  while (
    x === 10 &&
    i < chars.length &&
    chars[i] !== "e" &&
    chars[i] !== "+" &&
    chars[i] !== "-"
  ) {
    fraction /= x;
    number += (chars[i].codePointAt() - "0".codePointAt()) * fraction;
    i++;
  }

  // index
  if ((x === 10 && chars[i] === "-") || chars[i] === "+" || chars[i] === "e") {
    i++;
  }
  let index = 0;
  while (x === 10 && i < chars.length) {
    index *= x;
    index += convertStringToNumber(chars[i]);
    if (flag) number /= x ** index;
    else number *= x ** index;
    i++;
  }

  //  hex
  while (x === 16 && letters.includes(chars[i])) {
    number *= x;
    number += chars[i].codePointAt() - 87; // a 97
    i++;
  }
  return number;
}
