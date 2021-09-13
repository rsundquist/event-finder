var searchBar = document.getElementById("searchBox")
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
var currencyExchange = "https://v6.exchangerate-api.com/v6/ab0f110ed559d90d33353768/latest/USD"
zipCodeRegex = /^\d{5}$/;
seachButton.addEventListener("click", function() {
    if(zipCodeRegex.test(searchBar.value) === false ){
        results.innerHTML = "<h2>Please enter a valid US zipcode<h2>"
        return
    }
    var moneyPicker = document.getElementById("moneyPicker").value
    console.log(moneyPicker)
    var converter = 1
    fetch(currencyExchange)
    .then(response => response.json())
    .then(data =>  {
        if (moneyPicker == "CAD") {
            var ratio = data.conversion_rates.CAD
            converter = parseFloat(ratio)
            console.log(converter)
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
                console.log(converter)
            }
            console.log(converter)
        })
        var taxonomies = ""
        if (radioSports.checked == true) {
            taxonomies = '&taxonomies.name=sports'
        }
        else if (radioMusic.checked == true){
            taxonomies = "&taxonomies.name=concert"
        }
        var requestSports = 'https://api.seatgeek.com/2/events?client_id=MjMxMzE1Njl8MTYzMDM3MTYzMS44ODg0NzI&geoip=' + searchBar.value + '&range=10mi' + taxonomies
        
    var priceString = 0
    fetch(requestSports)
        .then(response => response.json())
        .then(data => {console.log
            var finalHTML = ""
           
            for (var i = 0; i < data.events.length ; i++){
            var price = data.events[i].stats.average_price
            console.log(price)
            if (price === null){
                    priceString = "No Price Listed"
                }
                else {
                    
                    var priceNum = parseFloat(price)
                    console.log(priceNum)
                    console.log(converter)
                    priceNum = priceNum*converter 
                    console.log(priceNum)
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
           

                results.innerHTML = ''
                var dateTime = data.events[i].datetime_local
                var finalTime = dateTime.replace("T", "   ")
                console.log(data.events[i].stats.average_price)
                var article = `
                    <article class = "resultBox">
                        <p class = "title">${data.events[i].title}</p>
                        <p class = type>${data.events[i].type}</p>
                        <p class = "dateTime">${finalTime}</p>
                        <p class = "location">${data.events[i].venue.name}</p>
                        <p class = "price">${price}</p>
                    </article>
                `
                finalHTML += article
            }
            results.innerHTML = finalHTML;
            console.log(priceString)
        })
        
    
});