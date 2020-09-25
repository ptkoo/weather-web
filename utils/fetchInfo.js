const axios = require('axios')

// let location, weatherIcon, condition, temperature, wind, humidity, pressure


//open weather
async function fetchWeather(lat = "", lon = "") {
    try {
        const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7f17a62d77ea87ea9b6751a109fbbe4e`
        const resp = await axios.get(url)
        const data = resp.data
        const weatherArray = [data.name, data.weather[0].icon, data.weather[0].main, data.main.temp, data.wind.speed, data.main.humidity, data.main.pressure, data.timezone]


        return weatherArray

    } catch (error) {
        console.log(error)
        return error
    }

}

// geocoding 
async function fetchWeatherFromLocation(location) {
    try {
        const geoURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoicHRra2siLCJhIjoiY2tmZjF2c2tnMGFreDJybnB5em0ybHNhaSJ9.8rGXSDDTKqqc6dBOSBH5Ng&limit=1`
        const resp = await axios.get(geoURL)
        const data = resp.data

        const lat = data.features[0].center[1]
        const lon = data.features[0].center[0]


        const weather = await fetchWeather(lat, lon)

        return weather


    } catch (error) {
        console.log(error)
        return error
    }


}




module.exports = fetchWeatherFromLocation