var seachBar = document.getElementById("searchBox")
var seachButton = document.getElementById("search")
var radioSports = document.getElementById("searchBox")
var radioMusic = document.getElementById("searchBox")
var radioOther = document.getElementById("searchBox")






  
 

seachButton.addEventListener("click", function() {
    
    var request = 'https://api.seatgeek.com/2/events?client_id=MjMxMzE1Njl8MTYzMDM3MTYzMS44ODg0NzI&geoip=' + seachBar.value
    
    fetch(request)
  .then(response => response.json())
  .then(data => console.log(data))
    if(radioSports.checked == true){


    }
    else if (radioMusic.checked == true){

    }
    else if (radioOther.checked == true){

    }
    else {

    }
});