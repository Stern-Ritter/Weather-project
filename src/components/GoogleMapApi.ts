import Api from "./Api";

export default class GoogleMapsApi extends Api {
  getStaticMap(cityName: string) {
    return this.getUrl({ center: cityName });
  }
}
