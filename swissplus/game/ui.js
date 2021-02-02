document.querySelector(".start-btn").addEventListener("click", () => {
  document.querySelector(".start").style.display = "none";
  document.querySelector(".type").style.display = "block";
  shouldStart = true;
});

document.querySelector(".restart").addEventListener("click", () => {
  location.reload(true);
});

if (!localStorage.getItem("highwpm")) document.querySelector(".records").style.display = "none";
else {
  document.querySelector(".wpm-r").innerHTML = Number(localStorage.getItem("highwpm")).toFixed(2);
  document.querySelector(".acc-r").innerHTML = Number(localStorage.getItem("highacc")).toFixed(2);
}
