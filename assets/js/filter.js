// filter subjects
var letters = document.getElementsByClassName("letter");

function filterLetters(tag) {
  for (var i = 0; i < letters.length; i++) {
    var tags = letters[i].dataset.tags.split(" ");
    if (tags.includes(tag)) {
      letters[i].classList.remove("hidden");
//      letters[i].addClass("active");
    } else {
      letters[i].classList.add("hidden");
    }
  }
}

// Add active class to the current control button (highlight it)
var btnContainer = document.getElementById("subject-filters");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
