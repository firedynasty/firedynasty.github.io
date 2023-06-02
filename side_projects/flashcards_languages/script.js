

function changeNextButton() {
  // Get the current page URL
  var currentURL = window.location.href;

  // Extract the filename from the URL
  var filename = currentURL.substring(currentURL.lastIndexOf('/') + 1);

  // return the filename from 'www.url.com/filename'
  parts = filename.split(".")

  // check if the filename has a number
  var hasNumber = /\d/.test(parts[0])

  // replace the filename's number
  var prefixNoNumber = parts[0].replace(/\d+/g, "");

  if (parts[0].length < 1) {
    console.log('there is no name after slash in URL')
    // so next is not fixed 
  } else {
    if (hasNumber) {
      //return the number of the filename
      var URLnum = parseInt(parts[0].match(/\d+/)[0]);
      console.log(parts[0])
      console.log(URLnum)
      var new_number = URLnum + 1
      console.log(prefixNoNumber + new_number.toString() + ".html")
      document.getElementById('next-page').href = prefixNoNumber + new_number.toString() + ".html"
    } else {
      console.log('does not have a number')
      console.log(prefixNoNumber + "2.html")
      document.getElementById('next-page').href = prefixNoNumber + "2.html"
    }
  }
}

setTimeout(changeNextButton, 1000)

counter_ = 0;

function javascriptfunction(){
  var table2 = document.getElementsByTagName('table')[0];
  counter_ = counter_ + 1
  if (counter_ >= table2.rows.length) {
      counter_ = 0; // reset counter to 0 if it exceeds table length
  }
  var second_var = table2.rows[counter_].cells[0].textContent;
  document.getElementById('front').innerHTML = second_var;
  document.getElementById('back').innerHTML = 'Back';
}


document.getElementById("front").addEventListener("click", function() {
  let speech = new SpeechSynthesisUtterance();
  speech.lang = document.getElementById("language").textContent;
  //speech.lang = "fr-FR";

  speech.text = document.getElementById("front").textContent;
  speech.rate = 0.7;
  window.speechSynthesis.speak(speech);
});


document.getElementById("back").addEventListener("click", function() {
  var table2 = document.getElementsByTagName('table')[0];
  if (document.getElementById('back').innerHTML === "Back") {
    document.getElementById('back').innerHTML = table2.rows[counter_].cells[1].textContent;
  } else {
    document.getElementById('back').innerHTML = "Back";
}

});



