import Api from "./Api";

export default class GeoApi extends Api {
  getCurrentLocation() {
    return fetch(this.getUrl(), { method: "GET" }).then((res) =>
      Api.checkAnswerStatus(res)
    );
  }
}
