import Api from "./Api";

export default class OpenWeatherApi extends Api {
  getCurrentWeather(cityName) {
    return fetch(this._getUrl({ q: cityName }), { method: "GET" }).then((res) =>
      Api._checkAnswerStatus(res)
    );
  }
}
