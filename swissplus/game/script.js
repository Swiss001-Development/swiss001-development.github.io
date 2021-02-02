// shouldStart is to make it so that the user won't accidentally type when not in a test.
let shouldStart = false;

(async () => {
  const ignoredKeys = [ 16, 13, 20, 9, 38, 37, 39, 40, 225 ];

  // get all the quotes
  const allText = (await fetch("/quotes.txt").then(r => r.text())).split("\n**\n");

  // generate a random quote
  let words = chooseOne(allText);

  // append the generated tags
  let els = wordsToElement(words);
  document.querySelector(".text").append(...els);

  // i = cursor pos and mistakes = accuracy
  let i = -1;
  let mistakes = 0;

  // init the cursor
  promptChar(i + 1);

  // start is the start time and if user finished typing ended will be true.
  let start = null;
  let ended = false;

  document.body.addEventListener("keydown", e => {
    // warn for caps lock
    if (e.getModifierState("CapsLock")) document.querySelector(".capslock").style.display = "inline-block";
    else document.querySelector(".capslock").style.display = "none";

    // quick macros to start the tests
    if (e.which == 13) {
      if (!start) document.querySelector(".start-btn").click();
      if (ended) document.querySelector(".restart").click();
    }

    // don't take in keys if ended/not important key
    if (ended) return;
    if (ignoredKeys.includes(e.which) || e.altKey || e.ctrlKey || e.metaKey) return;

    // start the timer if the user just pressed a key.
    if (!shouldStart) return;
    if (!start) start = new Date().getTime();


    // no matter what, the cursor moves! -- except backspace
    if (e.which != 8) i++;
    else if (i >= 0) {
      removeChar(i + 1);
      removeChar(i);
      i--;
      promptChar(i + 1);
      return;
    }

    // move the cursor
    if (words[i] == e.key) correctChar(i);
    else wrongChar(i), mistakes++;

    // end the test 
    if (i < words.length - 1) promptChar(i + 1);
    else {
      ended = true;

      let wpm = calcSpeed(words.length, mistakes, (new Date().getTime() - start) / 1000);
      let acc = (1 - mistakes / words.length) * 100;

      let wpmStr = wpm.toFixed(2);
      let accuracy = acc.toFixed(2);


      // highscores
      let lWpm = localStorage.getItem("highwpm");
      let lAcc = localStorage.getItem("highacc");
      if (!lWpm || Number(lWpm) < wpm) {
        localStorage.setItem("highwpm", wpm.toString());
        document.querySelector(".new-wpm").style.display = "inline";
      }
      if (!lAcc || Number(lAcc) < acc) {
        localStorage.setItem("highacc", acc);
        document.querySelector(".new-acc").style.display = "inline";
      }


      document.querySelector(".wpm").innerHTML = wpmStr;
      document.querySelector(".accuracy").innerHTML = accuracy;

      document.querySelector(".type").style.display = "none";
      document.querySelector(".results").style.display = "block";
    }
  });
})();
