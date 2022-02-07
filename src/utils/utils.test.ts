import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';
import fs from 'fs';
import path from "path";
import OpenWeatherApi from "../components/OpenWeatherApi";
import GoogleMapApi from "../components/GoogleMapApi";
import Card from "../components/Card";
import Image from "../components/Image";
import History from "../components/History";
import Section from "../components/Section";
import ErrorElement from "../components/ErrorElement";
import {
  openWeatherConfig,
  googleMapsConfig,
  storageHistoryKey,
} from "./constants";
import { getLocationWeather } from "./utils";

const html = fs.readFileSync(path.resolve(__dirname, "../prev-index.html"), "utf8");

const imageSelector = ".weather__map";
const cardTemplateSelector = "#weather-history-item";
const cardElementSelector = ".weather__history-list-item";
const cardContainerSelector = ".weather__history-list";
const errorElementSelector = ".weather__error";
const cityElementSelector = ".weather__city-name";
const tempElementSelector = ".weather__temperature";
const iconElementSelector = ".weather__icon";
const maxHistoryLength = 3;

const init = {
  status: 200,
  headers: {
    "content-type": "application/json",
  },
};
const bodies = [
  {
    weather: [{ icon: "10d" }],
    main: { temp: 1.88 },
    name: "Москва",
  },
  {
    weather: [{ icon: "01d" }],
    main: { temp: 12.83 },
    name: "Сочи",
  },
  {
    weather: [{ icon: "13n" }],
    main: { temp: 0.61 },
    name: "Новосибирск",
  },
  {
    weather: [{ icon: "04n" }],
    main: { temp: -6.2 },
    name: "Киров",
  },
];
const expected = bodies.slice(-maxHistoryLength);

let weatherApi: OpenWeatherApi;
let mapsApi: GoogleMapApi;
let map: Image;
let storage: History;
let section: Section;
let error: ErrorElement;
let weatherApiSpy: jest.SpyInstance;
let mapsApiSpy: jest.SpyInstance;
let mapSpy: jest.SpyInstance;
let storageSpy: jest.SpyInstance;
let sectionSpy: jest.SpyInstance;
let errorClearSpy: jest.SpyInstance;
let errorShowSpy: jest.SpyInstance;

describe("Function getLocationWeather()", () => {
  beforeAll(() => {
    enableFetchMocks();

    document.documentElement.innerHTML = html;

    weatherApi = new OpenWeatherApi(openWeatherConfig);
    mapsApi = new GoogleMapApi(googleMapsConfig);
    map = new Image(imageSelector);
    storage = new History(storageHistoryKey, maxHistoryLength);
    error = new ErrorElement(errorElementSelector);
    section = new Section(
      (data) => {
        const card = new Card(data, cardTemplateSelector);
        return card.generate();
      },
      cardContainerSelector,
      maxHistoryLength,
      (evt) => {
        const element = evt.target as HTMLElement;
        if (element.classList.contains("weather__history-list-item")) {
          getLocationWeather(
            element.dataset.city || '',
            weatherApi,
            mapsApi,
            map,
            storage,
            section,
            error
          );
        }
      }
    );

    weatherApiSpy = jest.spyOn(weatherApi, "getCurrentWeather");
    mapsApiSpy = jest.spyOn(mapsApi, "getStaticMap");
    mapSpy = jest.spyOn(map, "setData");
    storageSpy = jest.spyOn(storage, "addElement");
    sectionSpy = jest.spyOn(section, "addItem");
    errorClearSpy = jest.spyOn(error, "clearError");
    errorShowSpy = jest.spyOn(error, "showError");
  });

  beforeEach(() => {
    bodies.forEach(async (body) => {
      fetchMock.mockResponseOnce(JSON.stringify(body), init);
      await getLocationWeather(
        body.name,
        weatherApi,
        mapsApi,
        map,
        storage,
        section,
        error
      );
    });
  });

  it("correct calls methods of class objects", async () => {
    expect(weatherApiSpy).toBeCalledTimes(bodies.length);
    expect(weatherApiSpy).toBeCalledTimes(bodies.length);
    expect(mapsApiSpy).toBeCalledTimes(bodies.length);
    expect(mapSpy).toBeCalledTimes(bodies.length);
    expect(storageSpy).toBeCalledTimes(bodies.length);
    expect(sectionSpy).toBeCalledTimes(bodies.length);
    expect(errorClearSpy).toBeCalledTimes(bodies.length);
    expect(errorShowSpy).not.toBeCalled();
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
    expect(storage.getHistory()).toStrictEqual(
      expected.map((element) => ({
        city: element.name,
        temperature: element.main.temp,
        icon: element.weather[0].icon,
      }))
    );
  });

  it("correct fills cards container with the data", async () => {
    const cardContainerElement = document.querySelector(cardContainerSelector) as HTMLElement;
    const cards = cardContainerElement
      .querySelectorAll(cardElementSelector) as NodeListOf<HTMLElement>;

    expect(cards.length).toBe(maxHistoryLength);

    cards.forEach((card, index) => {
      const cityName = (card.querySelector(cityElementSelector) as HTMLElement).textContent;
      const temperature = (card.querySelector(tempElementSelector) as HTMLElement).textContent;
      const icon = card.querySelector(iconElementSelector) as HTMLImageElement;
      const currIndex = expected.length - 1 - index;

      expect(cityName).toBe(`Город: ${expected[currIndex].name}`);
      expect(temperature).toBe(
        `Температура: ${Math.round(expected[currIndex].main.temp)} \u2103`
      );
      expect(icon.alt).toBe(expected[currIndex].name);
      expect(icon.src).toBe(
        "https://openweathermap.org/img/wn/" +
          `${expected[currIndex].weather[0].icon}@2x.png`
      );
    });
  });
});
