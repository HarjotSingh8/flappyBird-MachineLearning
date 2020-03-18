let mouseIsPressed = false;
let menuIsClicked = false;
let menuIsVisible = false;
function menuToggle() {
  //show or hide menu
}

function menuClicked() {
  console.log("mousePressed on menu");
  menuIsClicked = true;
}
function mousePressed() {
  setTimeout(mouseisPressed, 10);
}
function nextGenButton() {
  menuClicked();
  nextGenerationBirds();
}
function mouseisPressed() {
  /*
   * This is an event listener for mouse pressed
   */
  if (menuIsClicked) {
    menuIsClicked = false;
  } else {
    mouseIsPressed = true;
  }
}

function mouseDragged() {
  /*
   * do something on mouse dragged
   */
}

function mouseReleased() {
  /*
   * Event listener for mouse released
   */
  mouseIsPressed = false;
  menuIsClicked = false;
}

function onMenu() {
  return false;
  if (mouseX >= 5 && mouseX <= 45 && mouseY >= 5 && mouseY <= 27) return true;
  if (menuOpen) {
    if (mouseX >= 5 && mouseY >= 27)
      //checking for menu when menu is expanded
      return true;
  }
  return false;
}

function toggleMenuVisible() {
  console.log("menu toggle");
  var x = document.getElementById("menu");
  if (x.style.display == "none") x.style.display = "block";
  else x.style.display = "none";
}
