import Card from "./Card";

const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");

const mockCallback = jest.fn();
let card;
let element;

describe("Class Card", () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html;
    card = new Card(
      {
        city: "Евпатория",
        temperature: 13.33,
        icon: "04n",
      },
      "#weather-history-item",
      mockCallback
    );
    element = card.generate();
  });

  afterEach(() => {
    jest.resetModules();
  });

  it(`method generate() create DOM element with correct child elements`, () => {
    expect(
      element.classList.contains("weather__history-list-item")
    ).toBeTruthy();
    expect(element.querySelector(".weather__text")).toBeTruthy();
    expect(element.querySelector(".weather__city-name")).toBeTruthy();
    expect(element.querySelector(".weather__temperature")).toBeTruthy();
    expect(element.querySelector(".weather__icon")).toBeTruthy();
  });

  it(`method generate() create DOM element with correct data`, () => {
    const cityElement = element.querySelector(".weather__city-name");
    const temperatureElement = element.querySelector(".weather__temperature");
    const iconElement = element.querySelector(".weather__icon");

    expect(cityElement.textContent).toBe(`Город: ${card._city}`);
    expect(temperatureElement.textContent).toBe(
      `Температура: ${Math.round(card._temperature)} \u2103`
    );
    expect(iconElement.src).toBe(
      `https://openweathermap.org/img/wn/${card._icon}@2x.png`
    );
    expect(iconElement.alt).toBe(card._city);
    expect(element.dataset.city).toBe(card._city);
  });

  it(`method _setEventLiteners() create DOM with correct event listeners`, () => {
    element.click();
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
