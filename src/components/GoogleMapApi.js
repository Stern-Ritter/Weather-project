import Api from "./Api";

export default class GoogleMapsApi extends Api {
  getStaticMap(cityName) {
    return this._getUrl({ center: cityName });
  }
}
