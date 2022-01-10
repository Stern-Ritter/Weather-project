export const googleApiKey = "AIzaSyCBuvXZwArkKIUPq6S3WryCvZ0ZAVo-KHs";
export const weatherApiKey = "b82140a7d1cbeb6c6c0b4e0c0d943bb4";
export const storageHistoryKey = "weatherRequestHistory";

export const maxHistoryLength = 10;

export const googleMapsConfig = {
  baseUrl: "https://maps.googleapis.com/maps/api/staticmap",
  params: {
    key: googleApiKey,
    scale: 2,
    zoom: 10,
    size: "500x500",
    maptype: "hybrid",
  },
};

export const openWeatherConfig = {
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
  params: {
    appid: weatherApiKey,
    lang: "ru",
    units: "metric",
  },
};

export const geoJsConfig = {
  baseUrl: "https://get.geojs.io/v1/ip/geo.json",
  params: {},
};
