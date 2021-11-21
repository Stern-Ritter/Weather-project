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

import { storageHistoryKey } from "./constants";
import History from "./history";
import Cards from "./cards";
import Weather from "./weather";

const weatherSection = document.querySelector(".weather");
const form = document.forms.weather;
const nameInput = form.elements.name;
const map = weatherSection.querySelector(".weather__map");
const error = weatherSection.querySelector(".weather__error");
const historyList = weatherSection.querySelector(".weather__history-list");

const history = new History(10, storageHistoryKey);
const cards = new Cards(10, historyList);
const weather = new Weather(map, error, history, cards);

form.addEventLitener("submit", (evt) => {
  evt.preventDefault();
  weather.getLocationWeather(nameInput.value);
  evt.target.clear();
});

historyList.addEventListener("click", (evt) => {
  if (evt.target.classList.includes("weather__history-list-item")) {
    weather.getLocationWeather(evt.target.dataset.name);
  }
});

weather.showWeatherHistory();
