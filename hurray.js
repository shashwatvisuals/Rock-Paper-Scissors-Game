// Get the modal
var modal = document.getElementById("ruleModal");
var btn = document.getElementById("togglerulebook");

//Rule button pop-up
var span = document.getElementById("cross");
btn.onclick = function() {
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
}