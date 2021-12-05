export async function getLocationWeather(
  cityName,
  weatherApi,
  mapsApi,
  img,
  storage,
  section,
  error
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
