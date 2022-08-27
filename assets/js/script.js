const searchBtn = document.querySelector('#search')
const city = document.querySelector('#city')
const todaysDate = document.querySelector('#todays-date')
const temperture = document.querySelector('#temperture')
const wind = document.querySelector('#wind-speed')
const humidity = document.querySelector('#humidity')
const uvIndex = document.querySelector('#uv')
const fiveDay = document.querySelector('#forcast')
// api key not working
const apiKey = '&appid=047d21016cdd7853b7f5215485dbb6b8'
const citySearch = document.getElementById('city-search')



function findWeather() {
    var showCity = city.value.trim()

    cityHistory(showCity)

    console.log(showCity)

    var date = new Date()
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + showCity + apiKey

    fetch(apiUrl).then(function(res) {
        return res.json()
    })
    .then(function(data) {
        var apiReturn = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ data.coord.lat +'&lon='+ data.coord.lon 
            + apiKey + '&units=imperial'
        fetch(apiReturn).then(function(res) {
            return res.json()
        }).then(function(data) {
            console.log(data)

            city.textContent = showCity
            todaysDate.textContent = '(' + date + ') -'
            temperture.textContent = 'Temperature:' + date.current.temp + 'F'
            wind.textContent = 'Wind Speed:' + data.current.wind_speed + 'MPH'
            humidity.textContent = 'Humidity:' + data.current.humidity + '%'
            uvIndex.textContent = 'UV Index:' + data.current.uvi

            fiveDay.innerHTML = ''

            for (let i = 1; i < 6; i++) {
                var humid = data.daily[i].humidity
                var windSpd = data.daily[i].wind_speed
                var temp = data.daily[i].temp.day
                var date2 = new Date()
                var weatherImage = data.daily[i].weather[0].icon
                console.log(date, weatherImage, temp, humid, windSpd)

                var fiveDayCard = 
                `<div style="width: 18rem" class="card">
                    <div class="card-body">
                        <h4 class="card-title">${date2}</h4>
                        <img src="http://openweathermap.org/img/wn/${weatherImage}@2x.png" alt="">
                        <p class="card-text">Temp: ${temp}</p>
                        <p class="card-text">Wind Speed: ${windSpd}</p>
                        <p class="card-text">Humidity: ${humid}</p>
                    </div>
                </div>`

                fiveDay.insertAdjacentHTML('beforeend', fiveDayCard)
            }
        })
    })
}

function cityHistory(cityLookUp) {
    var allCities =JSON.parse(localStorage.getItem('cities')) || []

    allCities.push(cityLookUp)

    localStorage.setItem('cities', JSON.stringify(allCities))
}

searchBtn.addEventListener("click", findWeather)