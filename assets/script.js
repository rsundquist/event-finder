var seachBar = document.getElementById("searchBox")
var seachButton = document.getElementById("search")
var radioSports = document.getElementById("sports")
var radioMusic = document.getElementById("music")
var radioOther = document.getElementById("other")
var searchResults = document.getElementById("searchContainer")
var title1 = document.getElementById("title1")
var type1 = document.getElementById("type1")
var dateTime1 = document.getElementById("dateTime1")
var location1 = document.getElementById("location1")
var price1 = document.getElementById("price1")
var results = document.getElementById("results")
console.log(radioSports)
console.log(radioMusic)
console.log(radioOther)
seachButton.addEventListener("click", function() {
    var taxonomies = ""
    if (radioSports.checked == true) {
        taxonomies = '&taxonomies.name=sports'
    }
    else if (radioMusic.checked == true){
        taxonomies = "&taxonomies.name=concert"
    }
    console.log(taxonomies)
    console.log(radioMusic.checked)
    console.log(radioSports.checked)
    var requestSports = 'https://api.seatgeek.com/2/events?client_id=MjMxMzE1Njl8MTYzMDM3MTYzMS44ODg0NzI&geoip=' + seachBar.value + '&range=10mi' + taxonomies
    fetch(requestSports)
        .then(response => response.json())
        .then(data => {
            console.log(data.events)
            var finalHTML = ""
            for (var i = 0; i < data.events.length ; i++){
                var article = `
                    <article>
                        <p id = "title1">${data.events[i].title}</p>
                        <p id = type1></p>
                        <p id = "dateTime1"></p>
                        <p id = "location1"></p>
                        <p id = "price1"></p>
                        <p></p>
                    </article>
                `
                console.log(article)
                finalHTML += article
            }
            results.innerHTML = finalHTML;
        })
        
    
});