let scores = [{
  name: "WILLIAMBAEWER",
  wpm: 29.02
}, {
  name: "Whippingdot",
  wpm: 71.63
}, {
  name: "alanchen12",
  wpm: 80.79
}, {
  name: "parker02311",
  wpm: 35.77
}, {
  name: "froggiez55555",
  wpm: 32.67
}, {
  name: "XanthusPettitt",
  wpm: 50.17
}, {
  name: "RajanHill",
  wpm: 85
}];

scores = scores.sort((a, b) => b.wpm - a.wpm);

for (const score of scores) {
  const el = document.createElement("li");
  el.innerHTML = `${score.name}: ${score.wpm} WPM`;
  document.querySelector(".lb").appendChild(el);
}
