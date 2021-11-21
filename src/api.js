import { googleApiKey, weatherApiKey } from "./constants";

const googleMapsCongif = {
  baseUrl: "https://maps.googleapis.com/maps/api/staticmap",
  params: {
    scale: 2,
    zoom: 10,
    size: "400x400",
    maptype: "hybrid",
    key: googleApiKey,
  },
};

const openWeatherConfig = {
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
  params: {
    appid: weatherApiKey,
  },
};

const geoJsConfig = {
  baseUrl: "https://get.geojs.io/v1/ip/geo.json",
  params: {},
};

const getUrl = (baseUrl, staticParams, variableParams) => {
  const searchParams = new URLSearchParams("?");
  staticParams.entries().forEach(([key, value]) => {
    searchParams.append(key, value);
  });
  variableParams.entries().forEach(([key, value]) => {
    searchParams.append(key, value);
  });
  return fetch(`${baseUrl}${searchParams.toString()}`);
};

const checkAnswerStatus = (res) => {
  if (res.ok) {
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return res.json();
    }
    if (contentType && contentType.includes("image/png")) {
      return res.blob();
    }
  }
  return Promise.reject(new Error(`Ошибка: ${res.status}`));
};

// ?center=${cityName}&scale=2&zoom=10&size=400x400&maptype=hybrid&markers=size:mid%7Ccolor:red%7C${cityName}&key=${googleApiKey}`;
export const getMap = (cityName) =>
  fetch(
    getUrl(googleMapsCongif.baseUrl, googleMapsCongif.params, {
      center: cityName,
    }),
    { method: "GET" }
  ).then((res) => checkAnswerStatus(res));

export const getWeather = (cityName) =>
  fetch(
    getUrl(openWeatherConfig.baseUrl, openWeatherConfig.params, {
      q: cityName,
    }),
    { method: "GET" }
  ).then((res) => checkAnswerStatus(res));

export const getCurrentLocation = () =>
  fetch(getUrl(geoJsConfig.baseUrl), { method: "GET" }).then((res) =>
    checkAnswerStatus(res)
  );
