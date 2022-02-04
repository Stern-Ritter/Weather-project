import OpenWeatherApi from "../components/OpenWeatherApi";
import GoogleMapsApi from "../components/GoogleMapApi";
import Image from "../components/Image";
import History from "../components/History";
import Section from "../components/Section";
import ErrorElement from "../components/ErrorElement";

export async function getLocationWeather(
  cityName: string,
  weatherApi: OpenWeatherApi,
  mapsApi: GoogleMapsApi,
  img: Image,
  storage: History,
  section: Section,
  error: ErrorElement
) {
  error.clearError();
  try {
    const res = await weatherApi.getCurrentWeather(cityName);
    const city = res.name;
    const temperature = res.main.temp;
    const { icon } = res.weather[0];
    const link = mapsApi.getStaticMap(city);

    img.setData(city, link);
    storage.addElement({ city, temperature, icon });
    section.addItem({ city, temperature, icon });
  } catch (err) {
    error.showError(err);
  }
}
