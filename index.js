const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const amPm = document.getElementById('am-pm');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');


const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật']
const months = ['Tháng giêng', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

setInterval(()=>{
    const time = new Date()
    const month = time.getMonth()
    const date = time.getDate()
    const day = time.getDay()
    const hour = time.getHours()
    if(hour > 12 && hour <= 16){
        amPm.innerHTML = 'Buổi Trưa'
    }
    else if(hour > 16 && hour <= 18){
        amPm.innerHTML = 'Buổi  Chiều'
    }
    else if(hour >18 && hour <= 24){
        amPm.innerHTML = "Buổi  tối"
    }
    else{
        amPm.innerHTML = 'Buổi  sáng'
    }
    const minutes = time.getMinutes()
    timeEl.innerHTML = `${hour}h:${minutes}p`
    dateEl.innerHTML = `${days[day]}, ${date} ${months[month]}`
},1000)


const API_KEY ='b35beef5251e67a749893cfbe5d2fd51'

getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData(data);
        })

    })
}

function showWeatherData(data){
    let {humidity,pressure,sunrise,sunset,wind_speed} = data.current
    timezone.innerHTML = data.timezone
    countryEl.innerHTML = data.lat + 'N' + data.lon + 'E'

    currentWeatherItemsEl.innerHTML = `
            <div class="weather-item">
            <div class="">Độ ẩm</div>
            <div class="">${humidity}%</div>
        </div>
        <div class="weather-item">
            <div class="">Sức ép</div>
            <div class="">${pressure}</div>
        </div>
        <div class="weather-item">
            <div class="">Tốc độ gió</div>
            <div class="">${wind_speed}</div>
        </div>
        <div class="weather-item">
            <div class="">Bình minh</div>
            <div class="">${window.moment(sunrise * 1000).format('HH:mm a')} </div>
        </div>
        <div class="weather-item">
            <div class="">Hoàng hôn</div>
            <div class="">${window.moment(sunset*1000).format('HH:mm a')} </div>
        </div>
    
    
    `;
    let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        if(idx == 0){
            currentTempEl.innerHTML = `
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
                <div class="temp">Sáng - ${day.temp.night}&#176;C</div>
                <div class="temp">Ngày - ${day.temp.day}&#176;C</div>
            </div>
            
            `
        }else{
            otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Sáng - ${day.temp.night}&#176;C</div>
                <div class="temp">Ngày - ${day.temp.day}&#176;C</div>
            </div>
            
            `
        }
    })


    weatherForecastEl.innerHTML = otherDayForcast;
}
    




