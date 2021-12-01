import { getLocationWeather } from "./utils";

describe("Function", () => {
  it("test", () => {
    expect(getLocationWeather).toBeInstanceOf(Function);
  });
});
