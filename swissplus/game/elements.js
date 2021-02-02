/**
 * @param i {number}
 */
function correctChar(i) {
  document.querySelector(".char" + i)?.classList.remove("prompt");
  document.querySelector(".char" + i)?.classList.add("correct");
}

/**
 * @param i {number}
 */
function wrongChar(i) {
  document.querySelector(".char" + i)?.classList.remove("prompt");
  document.querySelector(".char" + i)?.classList.add("wrong");
}

/**
 * @param i {number}
 */
function promptChar(i) {
  document.querySelector(".char" + i)?.classList.add("prompt");
}

/**
 * @param i {number}
 */
function removeChar(i) {
  document.querySelector(".char" + i)?.classList.remove("prompt", "wrong", "correct");
}
