class Forecast {
  constructor(){
    this.key = 'xbeqpM33BEqB2MhmWZuvt6gNkq3QultY';
    this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
    this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
  }
  async updateCity(city) {
    const cityDet = await this.getCity(city);
    const weather = await this.getWeather(cityDet.Key);
    // object shorthand notation only when property name and value name is same
    return { cityDet, weather };
  }

  // get city information
  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`;
    const response = await fetch(this.cityURI + query);
    const data = await response.json();
    return data[0];
  }

  // get weather info
  async getWeather(id) {
    const query = `${id}?apikey=${this.key}`;
    const response = await fetch(this.weatherURI + query);
    const data = await response.json();
    return data[0];
  }
}

// getCity('pune').then(data => {
//     return getWeather(data.Key);
// }).then(data => {
//     console.log(data);
// }).catch(err => console.log(err));