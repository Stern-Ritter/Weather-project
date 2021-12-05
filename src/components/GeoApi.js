import Api from "./Api";

export default class GeoApi extends Api {
  getCurrentLocation() {
    return fetch(this._getUrl(), { method: "GET" }).then((res) =>
      Api._checkAnswerStatus(res)
    );
  }
}
