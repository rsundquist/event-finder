  
var seachBar = document.getElementById("searchBar")
var seachButton = document.getElementById("searchButton")
var radioSports = document.getElementById("Sports")
var radioMusic = document.getElementById("Music")
var radioOther = document.getElementById("Other")






  
 

seachButton.addEventListener("click", function() {
    
    // 
    
    
    if(radioSports.checked == true){
        var requestSports = 'https://api.seatgeek.com/2/events?client_id=MjMxMzE1Njl8MTYzMDM3MTYzMS44ODg0NzI&geoip=' + seachBar.value + '&range=10mi&taxonomies.name=sports'
        fetch(requestSports)
        .then(response => response.json())
        .then(data => console.log(data))
        var searchResults = document.getElementById("searchContainer")
        var title1 = document.getElementById("title1")
        var type1 = document.getElementById("type1")
        var dateTime1 = document.getElementById("dateTime1")
        var location1 = document.getElementById("location1")
        var prive1 = document.getElementById("price1")
        console.log(response[0])
        }
    else if (radioMusic.checked == true){
        var requestMusic = 'https://api.seatgeek.com/2/events?client_id=MjMxMzE1Njl8MTYzMDM3MTYzMS44ODg0NzI&geoip=' + seachBar.value + '&range=10mi&taxonomies.name=concert'
        fetch(requestMusic)
          .then(response => response.json())
          .then(data => console.log(data))

    }
    else  {
        var requestOther = 'https://api.seatgeek.com/2/events?client_id=MjMxMzE1Njl8MTYzMDM3MTYzMS44ODg0NzI&geoip=' + seachBar.value + '&range=10mi'
        fetch(requestOther)
          .then(response => response.json())
          .then(data => console.log(data))
    }
});