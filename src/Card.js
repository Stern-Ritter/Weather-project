export default class Card {
  constructor({ city, temperature, icon }, selector, handleClick) {
    this._city = city;
    this._temperature = temperature;
    this._icon = icon;
    this._selector = selector;
    this._handleClick = handleClick;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content.querySelector(".weather__history-list-item")
      .cloneNode(true);
    return cardElement;
  }

  _setEventLiteners() {
    this._element.addEventListener("click", () => {
      this._handleClick();
    });
  }

  generate() {
    this._element = this._getElement();
    const weatherCityName = this._element.querySelector(".weather__city-name");
    const weatherTemperature = this._element.querySelector(
      ".weather__temperature"
    );
    const weatherIcon = this._element.querySelector(".weather__icon");
    weatherCityName.textContent = `Город: ${this._city}`;
    weatherTemperature.textContent = `Температура: ${Math.round(
      this._temperature
    )} \u2103`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${this._icon}@2x.png`;
    weatherIcon.alt = this._city;
    this._element.dataset.city = this._city;
    this._setEventLiteners();
    return this._element;
  }
}
