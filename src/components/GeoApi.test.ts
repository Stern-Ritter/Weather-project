import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';
import Api from "./Api";
import GeoApi from "./GeoApi";
import { geoJsConfig } from "../utils/constants";

describe("Class GeoApi", () => {
  beforeAll(() => {
    enableFetchMocks();
  });

  it("extends class Api", () => {
    const api = new GeoApi(geoJsConfig);
    expect(api).toBeInstanceOf(Api);
  });

  it(`method getCurrentLocation() return correct json object
  and calls correct url string`, async () => {
    const api = new GeoApi(geoJsConfig);
    const body = {
      city: "Moscow",
      country: "Russia",
      longitude: "37.6171",
      latitude: "55.7483",
    };
    const init = {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    };
    fetchMock.mockResponseOnce(JSON.stringify(body), init);
    await expect(api.getCurrentLocation()).resolves.toStrictEqual(body);
    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.calls[0][0]).toEqual(
      "https://get.geojs.io/v1/ip/geo.json?"
    );
  });
});
