import Api from "./Api";
import OpenWeatherApi from "./OpenWeatherApi";
import { openWeatherConfig } from "./constants";

require("jest-fetch-mock").enableMocks();

describe("Class OpenWeatherApi", () => {
  it("extends class Api", () => {
    const api = new OpenWeatherApi("https://test.com/api");
    expect(api).toBeInstanceOf(Api);
  });

  it(`method getCurrentWeather(cityName) return correct json object
  and calls correct url string`, async () => {
    const api = new OpenWeatherApi(openWeatherConfig);
    const body = {
      weather: [
        {
          id: 502,
          main: "Rain",
          description: "сильный дождь",
          icon: "10n",
        },
      ],
      main: {
        temp: 3.73,
      },
      name: "Москва",
    };
    const init = {
      status: 200,
      headers: new Headers({
        "content-type": "application/json",
      }),
    };
    fetch.mockResponseOnce(JSON.stringify(body), init);
    await expect(api.getCurrentWeather("Москва")).resolves.toStrictEqual(body);
    expect(fetch.mock.calls.length).toEqual(1);
    expect(fetch.mock.calls[0][0]).toEqual(
      "https://api.openweathermap.org/data/2.5/weather" +
        "?appid=b82140a7d1cbeb6c6c0b4e0c0d943bb4&lang=ru&units=metric" +
        "&q=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0"
    );
  });
});
