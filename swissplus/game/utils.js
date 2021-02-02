/**
 * @param text {string}
 */
function wordsToElement(text) {
  /** @type {HTMLSpanElement[]} */
  let els = [];

  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    let span = document.createElement("pre");
    span.classList.add("char" + i, "char");
    if (char == ' ') span.classList.add("space");
    span.innerHTML = char;
    els.push(span);
  }

  return els;
}

/**
 * @param text {string[]}
 * @param length {number}
 */
function generateText(text, length) {
  /** @type {string[]} */
  let ret = [];

  for (let i = 0; i < length; i++) {
    ret.push(text[Math.floor(Math.random() * text.length)]);
  }

  return ret.join(" ");
}

/**
 * @param text {string[]}
 */
function chooseOne(text) {
  return text[Math.floor(Math.random() * text.length)]
}

/**
 * @param length {number} total chars typed
 * @param mistakes {number} chars wrong
 * @param time {number} time in seconds
 */
function calcSpeed(length, mistakes, time) {
  return ((length / 5) - mistakes) / (time / 60);
}
