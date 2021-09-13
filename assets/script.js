var searchBar = document.getElementById("searchBox")
var seachButton = document.getElementById("search")
var radioSports = document.getElementById("sports")
var radioMusic = document.getElementById("music")
var radioOther = document.getElementById("other")
var searchResults = document.getElementById("searchContainer")
var results = document.getElementById("results")
var currencyExchange = "https://v6.exchangerate-api.com/v6/ab0f110ed559d90d33353768/latest/USD"
//checks to see if input is 5 numbers
var zipCodeRegex = /^\d{5}$/;
console.log(localStorage[0])
searchBar.addEventListener("mouseover", function() {

        var values = [],
            keys = Object.keys(localStorage),
            i = keys.length;
    
        while ( i-- ) {
            values.push( localStorage.getItem(keys[i]) );
        }
        console.log(values);
})
seachButton.addEventListener("click", function() {
    //conditional statement to stop if not a zipcode is input
    if(zipCodeRegex.test(searchBar.value) === false ){
        results.innerHTML = "<h2>Please enter a valid US zipcode<h2>"
        return
    }
    //stores search query to local storage
    var n = localStorage.getItem(searchBar.value);
        if (n === null) {
            n = 0;
        }
        n++;
        localStorage.setItem(searchBar.value, n);
//uses exchange rate api to get the conversion ratio for prices from USD to an of the others
    var moneyPicker = document.getElementById("moneyPicker").value
    var converter = 1
    fetch(currencyExchange)
    .then(response => response.json())
    .then(data =>  {
//lots of parses here to make sure the conversion ratio is a number
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
//tracks which radio button if any is pressed
    var taxonomies = ""
    if (radioSports.checked == true) {
        taxonomies = '&taxonomies.name=sports'
    }
    else if (radioMusic.checked == true){
        taxonomies = "&taxonomies.name=concert"
    }
//fetches event data from seatgeeks api
    var requestSports = 'https://api.seatgeek.com/2/events?client_id=MjMxMzE1Njl8MTYzMDM3MTYzMS44ODg0NzI&geoip=' + searchBar.value + '&range=10mi' + taxonomies
    var priceString = 0
    fetch(requestSports)
        .then(response => response.json())
        .then(data => {
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
                    //adds appropiate dollar sign to price
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
//preps the data from api into an HTML format
                results.innerHTML = ''
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
            //pastes that data as search results
            results.innerHTML = finalHTML;
        })
});