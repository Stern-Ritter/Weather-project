import { getMap, getWeather, getCurrentLocation } from "./api";
import { fahrenheitToCelsius } from "./utils";

export default class Weather {
  constructor(map, error, history, cards) {
    this.map = map;
    this.error = error;
    this.history = history;
    this.cards = cards;
  }

  showError(text) {
    this.error.textContent = text;
  }

  getLocationWeather(name) {
    const weatherRequest = getWeather(name);
    const weatherMapRequest = getMap(name);
    return Promise.all([weatherRequest, weatherMapRequest])
      .then(([weatherData, weatherMapData]) => {
        this.map.src = URL.createObjectURL(weatherMapData);
        this.map.alt = name;
        const temperature = fahrenheitToCelsius(weatherData.main.temp);
        const { icon } = weatherData.weather[0];
        this.history.addHistoryElement({ name, temperature, icon });
        this.cards.createCard({ name, temperature, icon });
      })
      .catch((err) => this.showError(err));
  }

  getCurrentLocationWeather() {
    getCurrentLocation()
      .then((res) => this.getLocationWeather(res.city))
      .catch((err) => this.showError(err));
  }

  showWeatherHistory() {
    this.cards.addCard(this.history.history);
  }
}
