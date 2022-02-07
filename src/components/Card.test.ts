import fs from 'fs';
import path from "path";
import Card from "./Card";

const html = fs.readFileSync(path.resolve(__dirname, "../prev-index.html"), "utf8");

let card: Card;
let element: HTMLElement;

describe("Class Card", () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html;
    card = new Card(
      {
        city: "Евпатория",
        temperature: "13.33",
        icon: "04n",
      },
      "#weather-history-item"
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
    const cityElement = element.querySelector(".weather__city-name") as HTMLElement;
    const temperatureElement = element.querySelector(".weather__temperature") as HTMLElement;
    const iconElement = element.querySelector(".weather__icon") as HTMLImageElement;

    expect(cityElement.textContent).toBe(`Город: ${card.getCity()}`);
    expect(temperatureElement.textContent).toBe(
      `Температура: ${Math.round(Number(card.getTemperature()))} \u2103`
    );
    expect(iconElement.src).toBe(
      `https://openweathermap.org/img/wn/${card.getIcon()}@2x.png`
    );
    expect(iconElement.alt).toBe(card.getCity());
    expect(element.dataset.city).toBe(card.getCity());
  });
});
