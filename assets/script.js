var searchBar = document.getElementById("searchBox")
var seachButton = document.getElementById("search")
var radioSports = document.getElementById("sports")
var radioMusic = document.getElementById("music")
var radioOther = document.getElementById("other")
var searchResults = document.getElementById("searchContainer")
var results = document.getElementById("results")
var currencyExchange = "https://v6.exchangerate-api.com/v6/ab0f110ed559d90d33353768/latest/USD"
console.log(radioSports)
console.log(radioMusic)
console.log(radioOther)
seachButton.addEventListener("click", function() {
    if(searchBar.value === "" ){
        return
    }
    var moneyPicker = document.getElementById("moneyPicker").value
    console.log(moneyPicker)
    var taxonomies = ""
    if (radioSports.checked == true) {
        taxonomies = '&taxonomies.name=sports'
    }
    else if (radioMusic.checked == true){
        taxonomies = "&taxonomies.name=concert"
    }
    var requestSports = 'https://api.seatgeek.com/2/events?client_id=MjMxMzE1Njl8MTYzMDM3MTYzMS44ODg0NzI&geoip=' + searchBar.value + '&range=10mi' + taxonomies
    var converter = 
    fetch(currencyExchange)
    .then(response => response.json())
    .then(data =>  {
        if (moneyPicker == "CAD") {
            var ratio = data.conversion_rates.CAD
            converter = parseFloat(ratio)
            }
            
        else if (moneyPicker == "EUR") {
            var ratio = data.conversion_rates.EUR
            converter = parseFloat(ratio)
          }
        else if (moneyPicker == "JPY") {
            var ratio = data.conversion_rates.JPY
            converter = parseFloat(ratio)
          }
        else if (moneyPicker == "AUD") {
            var ratio = data.conversion_rates.AUD
            converter = parseFloat(ratio)}
        else {
            converter = 1 
        }
     
    })
    var priceString = 0
    fetch(requestSports)
        .then(response => response.json())
        .then(data => {console.log
            var finalHTML = ""
            for (var i = 0; i < data.events.length ; i++){
            var price = data.events[i].stats.average_price
            if (price === null){
                    priceString = "No Price Listed"
                }
                else {
                    
                    var priceNum = parseFloat(price)
                    priceNum = priceNum*converter 
                        priceString =  priceNum.toFixed(2)
                    if (moneyPicker == "USD"){
                                        priceString = "$" + priceString
                                        
                                    }
                                    else if (moneyPicker == "CAD"){
                                        priceString = "$" + priceString
                                            
                                    }
                                    else if (moneyPicker == "EUR"){
                                        priceString = "€" + priceString
                                        }
                                    else if (moneyPicker == "JPY"){ 
                                        priceString = "¥" + priceString
                                    }
                                    else if (moneyPicker == "AUD"){ 
                                        priceString = "$" + priceString
                                    }
                }
           

                var dateTime = data.events[i].datetime_local
                var finalTime = dateTime.replace("T", "   ")
                var article = `
                    <article class = "resultBox">
                        <p class = "title">${data.events[i].title}</p>
                        <p class = type>${data.events[i].type}</p>
                        <p class = "dateTime">${finalTime}</p>
                        <p class = "location">${data.events[i].venue.name}</p>
                        <p class = "price">${priceString}</p>
                    </article>
                `
                finalHTML += article
            }
            results.innerHTML = finalHTML;
        })
        
    
});