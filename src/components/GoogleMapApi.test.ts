import Api from "./Api";
import GoogleMapsApi from "./GoogleMapApi";
import { googleMapsConfig } from "../utils/constants";

describe("Class GoogleMapsApi", () => {
  it("extends class Api", () => {
    const api = new GoogleMapsApi(googleMapsConfig);
    expect(api).toBeInstanceOf(Api);
  });

  it(`method getStaticMap(cityName) return correct url string`, () => {
    const api = new GoogleMapsApi(googleMapsConfig);
    expect(api.getStaticMap("Москва")).toBe(
      "https://maps.googleapis.com/maps/api/staticmap" +
        "?key=AIzaSyCBuvXZwArkKIUPq6S3WryCvZ0ZAVo-KHs&scale=2&zoom=10" +
        "&size=500x500&maptype=hybrid&center=%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0"
    );
  });
});
