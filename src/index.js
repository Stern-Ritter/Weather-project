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
import Image from "./Image";
import ErrorElement from "./ErrorElement";
import History from "./History";
import Form from "./Form";
import { getLocationWeather } from "./utils";

const googleMapsApi = new GoogleMapsApi(googleMapsConfig);
const openWeatherApi = new OpenWeatherApi(openWeatherConfig);
const geoApi = new GeoApi(geoJsConfig);
const history = new History(storageHistoryKey, maxHistoryLength);
const map = new Image(".weather__map");
const errorElement = new ErrorElement(".weather__error");
const weatherSection = new Section(
  (data) => {
    const card = new Card(data, "#weather-history-item", () => {
      getLocationWeather(
        card.getCity(),
        openWeatherApi,
        googleMapsApi,
        map,
        history,
        weatherSection,
        errorElement
      );
    });
    return card.generate();
  },
  ".weather__history-list",
  maxHistoryLength
);

const weatherForm = new Form(".weather__form", () => {
  const { city } = weatherForm.getInputValues();
  getLocationWeather(
    city,
    openWeatherApi,
    googleMapsApi,
    map,
    history,
    weatherSection,
    errorElement
  );
});
weatherForm.setEventListeners();

// Начальная инициализация
geoApi
  .getCurrentLocation()
  .then((data) =>
    getLocationWeather(
      data.city,
      openWeatherApi,
      googleMapsApi,
      map,
      history,
      weatherSection,
      errorElement
    )
  )
  .catch((err) => errorElement.showError(err.message));

weatherSection.renderItems(history.getHistory());
