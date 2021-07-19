const cityForm  = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const forecast = new Forecast();

// update ui
const updateUI = (data) => {
    // const cityDet = data.cityDet;
    // const weather = data.weather;

    // destructuring
    const { cityDet, weather } = data;

    // update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDet.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    // update night and day and icons
    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    // if(weather.IsDayTime){
    //     timeSrc = 'img/day.svg';
    // }else{
    //     timeSrc = 'img/night.svg';
    // }
    time.setAttribute('src', timeSrc);

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc)

    // remove d-none class if present
    if(card.classList.contains('d-none'))
        card.classList.remove('d-none');
};

cityForm.addEventListener('submit', e => {
    // prevent default action
    e.preventDefault();

    // get city 
    const city = cityForm.city.value.trim();

    // reset city form
    cityForm.reset();

    // update ui with new city
    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    // set local storage
    localStorage.setItem('city', city);
});

if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}