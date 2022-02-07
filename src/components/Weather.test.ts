import { Weather } from "./Weather";
import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';

let weatherComponent: Weather;
const imageSelector = ".weather__map";
const cardElementSelector = ".weather__history-list-item";
const cardContainerSelector = ".weather__history-list";
const cityElementSelector = ".weather__city-name";
const tempElementSelector = ".weather__temperature";
const iconElementSelector = ".weather__icon";
const maxHistoryLength = 10;

const init = {
  status: 200,
  headers: {
    "content-type": "application/json",
  },
};
const bodies = [
  {
    weather: [{ icon: "10d" }],
    main: { temp: "1.88" },
    name: "Москва",
  },
  {
    weather: [{ icon: "01d" }],
    main: { temp: "12.83" },
    name: "Сочи",
  },
  {
    weather: [{ icon: "13n" }],
    main: { temp: "0.61" },
    name: "Новосибирск",
  },
  {
    weather: [{ icon: "04n" }],
    main: { temp: "-6.2" },
    name: "Киров",
  },
  {
    weather: [{ icon: "04n" }],
    main: { temp: "-16.39" },
    name: "Новосибирск",
  },
  {
    weather: [{ icon: "13n" }],
    main: { temp: "-13.23" },
    name: "Куйбышев",
  },
  {
    weather: [{ icon: "01d" }],
    main: { temp: "-21.81" },
    name: "Мирный",
  },
  {
    weather: [{ icon: "01d" }],
    main: { temp: "7.15" },
    name: "Керчь",
  },
  {
    weather: [{ icon: "04n" }],
    main: { temp: "-7.61" },
    name: "Уфа",
  },
  {
    weather: [{ icon: "01d" }],
    main: { temp: "-10.92" },
    name: "Тюмень",
  },
  {
    weather: [{ icon: "13n" }],
    main: { temp: "-1.06" },
    name: "Тамбов",
  },
];

const expected = bodies.slice(-maxHistoryLength);

describe("Class Weather", () => {
  beforeAll(() => {
    enableFetchMocks();

    document.documentElement.innerHTML = `
    <main class="page">
      <section class="weather"></section>
    </main>`;

    const root = document.querySelector('.weather') as HTMLElement;
    weatherComponent = new Weather(root);
  });

  beforeEach(() => {
    bodies.forEach(async (body) => {
      fetchMock.mockResponseOnce(JSON.stringify(body), init);
      await weatherComponent.getLocationWeather(body.name);
    });
  });

  it("correct fills map element with the data", async () => {
    const mapElement = document.querySelector(imageSelector) as HTMLImageElement;
    expect(mapElement.alt).toBe(expected[expected.length - 1].name);
    expect(mapElement.src).toBe(
      "https://maps.googleapis.com/maps/api/staticmap" +
        "?key=AIzaSyCBuvXZwArkKIUPq6S3WryCvZ0ZAVo-KHs&scale=2&zoom=10&size=500x500&maptype=hybrid" +
        `&center=${encodeURIComponent(expected[expected.length - 1].name)}`
    );
  });

  it("correct fills the localStorage with the data", async () => {
    expect(weatherComponent.history.getHistory()).toStrictEqual(
      expected.map((element) => ({
        city: element.name,
        temperature: element.main.temp,
        icon: element.weather[0].icon,
      }))
    );
  });

  it("correct fills markup with the data", async () => {
    const cardContainerElement = document.querySelector(cardContainerSelector) as HTMLElement;
    const cards = Array.from(cardContainerElement
      .querySelectorAll(cardElementSelector) as NodeListOf<HTMLElement>).reverse();

    expect(cards.length).toBe(maxHistoryLength);

    cards.forEach((card, index) => {
      const cityName = (card.querySelector(cityElementSelector) as HTMLElement).textContent;
      const temperature = (card.querySelector(tempElementSelector) as HTMLElement).textContent;
      const icon = card.querySelector(iconElementSelector) as HTMLImageElement;
      const currIndex = expected.length - 1 - index;

      expect(cityName).toBe(`Город: ${expected[currIndex].name}`);
      expect(temperature).toBe(
        `Температура: ${expected[currIndex].main.temp}\u2103`
      );
      expect(icon.alt).toBe(expected[currIndex].name);
      expect(icon.src).toBe(
        "https://openweathermap.org/img/wn/" +
          `${expected[currIndex].weather[0].icon}@2x.png`
      );
    });
  });
});
