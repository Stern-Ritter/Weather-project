// 1. Создайте страницу:
// 1.1 при открытии страницы пользователь видит погоду (город, температуру и иконку) в
// своей местности (для получения прогноза погоды используйте https://openweathermap.org/current)
// 1.2 он может ввести имя города в поле ввода и увидеть погоду в выбранном городе
// 1.3 введенные города сохраняются у пользователя в браузере, так что он видит последние 10 городов,
// где он смотрел погоду
// 1.4 при клике по строчке города в списке он видит погоду в выбранном городе
// 1.5 кроме информации о погоде покажите в центре страницы карту для введенного адреса
// (используйте Google Maps Statis API https://developers.google.com/maps/documentation/maps-static/start)
// 2. Проверить покрытие кода тестами, и добавить проверку покрытия при запуске test скрипта.
// Покрытие должно быть не ниже 60%

import "./index.css";
import {
  maxHistoryLength,
  storageHistoryKey,
  googleMapsConfig,
  openWeatherConfig,
  geoJsConfig,
} from "./constants";

import GoogleMapsApi from "./GoogleMapApi";
import OpenWeatherApi from "./OpenWeatherApi";
import GeoApi from "./GeoApi";
import Card from "./Card";
import Section from "./Section";
import History from "./History";
import Form from "./Form";

const map = document.querySelector(".weather__map");
const errorElement = document.querySelector(".weather__error");

const googleMapsApi = new GoogleMapsApi(googleMapsConfig);
const openWeatherApi = new OpenWeatherApi(openWeatherConfig);
const geoApi = new GeoApi(geoJsConfig);
const history = new History(storageHistoryKey, maxHistoryLength);

function showError(error) {
  errorElement.textContent = error.message;
}

function clearError() {
  errorElement.textContent = "";
}

const weatherSection = new Section(
  (item) => {
    const card = new Card(
      item,
      "#weather-history-item",
      function handleClick() {
        getLocationWeather({ city: this._element.dataset.city });
      }
    );
    const cardElement = card.generate();
    weatherSection.addItem(cardElement);
  },
  ".weather__history-list",
  maxHistoryLength
);

const weatherForm = new Form(".weather__form", function handleSubmit() {
  getLocationWeather(this._getInputValues());
});
weatherForm.setEventListeners();

function getLocationWeather({ city }) {
  clearError(errorElement);
  openWeatherApi
    .getCurrentWeather(city)
    .then((data) => {
      map.src = googleMapsApi.getStaticMap(city);
      map.alt = city;
      const temperature = data.main.temp;
      const { icon } = data.weather[0];
      history.addElement({ city, temperature, icon });
      weatherSection.render({ city, temperature, icon });
    })
    .catch((err) => showError(errorElement, err));
}

function getCurrentLocationWeather() {
  clearError(errorElement);
  geoApi
    .getCurrentLocation()
    .then((res) => {
      getLocationWeather(res);
    })
    .catch((err) => showError(errorElement, err));
}

// Начальная инициализация
getCurrentLocationWeather();
weatherSection.renderItems(history.getHistory());
