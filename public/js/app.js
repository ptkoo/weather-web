const time = document.getElementById('time')
const loca = document.getElementById('location')
const image = document.getElementById('image')
const condition = document.getElementById('condition')
const temperature = document.getElementById('temperature')
const wind = document.getElementById('wind')
const humidity = document.getElementById('humidity')
const pressure = document.getElementById('pressure')
const searchTerm = document.getElementById('searchTerm')
const search = document.getElementById('search')
const smallText = document.querySelector('small')
const progress = document.querySelector('progress')

let date = new Date()
console.log(date.toUTCString())
let day = date.getUTCDay()
const totalUtcSeconds = (date.getUTCHours() * 3600) + (date.getUTCMinutes() * 60) + date.getUTCSeconds()

switch (day) {
    case 0:
        day = 'Sunday'
        break;
    case 1:
        day = 'Monday'
        break;
    case 2:
        day = 'Tuesday'
        break;
    case 3:
        day = 'Thursday'
        break;
    case 4:
        day = 'Friday'
        break;
    case 5:
        day = 'Saturday'
        break;
    case 6:
        day = 'Sunday'
        break;
}

const form = document.getElementById('form')
const randomNumber = Math.floor(Math.random() * 13)

const randomArray = ['Yangon', 'Mandalay', 'North Okkalapa', 'Hlaing', 'Le Preel', 'Pyin Oo Lwin', 'London', 'Paris', 'Baturaja', 'Moscow', 'Berlin', 'Rome', 'England']
fetchData(randomArray[randomNumber]).then(result => displayData(result))


window.onload = (e) => {
    progress.classList.remove('hidden')
}

form.addEventListener('submit', async(e) => {
    progress.value = "1"
    progress.classList.remove('hidden')

    e.preventDefault()

    if (!searchTerm.value) {
        searchTerm.classList.add('invalid')
        smallText.classList.remove('hidden')
    } else {
        searchTerm.classList.remove('invalid')
        smallText.classList.add('hidden')


        const [location, weatherIcon, condition, temperature, wind, humidity, pressure, timezone] = await fetchData(searchTerm.value)
        const weatherInfo = [location, weatherIcon, condition, temperature, wind, humidity, pressure, timezone]
        displayData(weatherInfo)
    }



})

async function fetchData(term) {

    const rep = await fetch(`http://localhost:3000/weather?address=${term}`)
    const data = await rep.json()

    return data.data

}

function displayData(weatherInfo) {
    weatherInfo.forEach((item, index, array) => {
        switch (index) {
            case 0:
                loca.innerText = item
                progress.value = `${index}`
                break;
            case 1:
                image.src = `http://openweathermap.org/img/wn/${item}@2x.png`
                progress.value = `${index}`
                break;
            case 2:
                condition.innerText = item
                progress.value = `${index}`
                break;
            case 3:
                temperature.innerText = Math.floor(item - 272.15)
                progress.value = `${index}`
                break;
            case 4:
                wind.innerText = item
                progress.value = `${index}`
                break;
            case 5:
                humidity.innerText = item
                progress.value = `${index}`
                break;
            case 6:
                pressure.innerText = item
                progress.value = `${index}`
                progress.classList.add('hidden')
                break;
            case 7:

                const seconds = item + totalUtcSeconds
                const hour = Math.floor(seconds / 3600)
                const minutes = Math.floor(seconds / 60) % 60

                time.innerText = `${day} ${hour}:${minutes}`
                progress.value = `${index}`
                progress.classList.add('hidden')
            default:
                // code block
        }
    })
}




const Cen = document.getElementById('Cen')
const Fah = document.getElementById('Fah')
let cenFlag = true
let fahFlag = false
Fah.addEventListener('click', () => {
    if (fahFlag === false) {
        Fah.classList.remove('faint')
        Cen.classList.add('faint')
        const temp = temperature.innerText
        temperature.innerText = Math.floor(temp * 1.8 + 32)
        fahFlag = true
        cenFlag = false

    }
})
Cen.addEventListener('click', () => {
    if (cenFlag === false) {
        Cen.classList.remove('faint')
        Fah.classList.add('faint')
        const temp = temperature.innerText
        temperature.innerText = Math.floor((temp - 32) / 1.8)
        cenFlag = true
        fahFlag = false
    }
})