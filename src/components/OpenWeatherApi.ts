import Api from "./Api";

export default class OpenWeatherApi extends Api {
  getCurrentWeather(cityName: string) {
    return fetch(this.getUrl({ q: cityName }), { method: "GET" }).then((res) =>
      Api.checkAnswerStatus(res)
    );
  }
}
