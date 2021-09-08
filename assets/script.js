var seachBar = document.getElementById("searchBox")
var seachButton = document.getElementById("search")
var radioSports = document.getElementById("searchBox")
var radioMusic = document.getElementById("searchBox")
var radioOther = document.getElementById("searchBox")

var request

fetch('https://api.seatgeek.com/2/events?geoip=48425 -u MjMxMzE1Njl8MTYzMDM3MTYzMS44ODg0NzI')
  .then(response => response.json())
  .then(data => console.log(data))
 

$(seachButton).click(function() {
    console.log("lol")
    console.log($.get("https://api.seatgeek.com/2/events?geoip=48423 -u MjMxMzE1Njl8MTYzMDM3MTYzMS44ODg0NzI"))
    if(radioSports.checked == true){

    }
    else if (radioMusic.checked == true){

    }
    else if (radioOther.checked == true){

    }
    else {

    }
});