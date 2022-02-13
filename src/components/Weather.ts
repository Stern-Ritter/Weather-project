import Component from "../utils/component/Component";
import GoogleMapsApi from "./GoogleMapApi";
import OpenWeatherApi from "./OpenWeatherApi";
import GeoApi from "./GeoApi";
import History from "./History";
import {
  maxHistoryLength,
  storageHistoryKey,
  googleMapsConfig,
  openWeatherConfig,
  geoJsConfig,
} from "../utils/constants";

type HistoryElement = {
  city: string,
  temperature: string,
  icon: string
}

type State = {
  city: string,
  map: string,
  error: string,
  elements: HistoryElement[]
};

export class Weather extends Component<State> {
  openWeatherApi: OpenWeatherApi;
  googleMapsApi: GoogleMapsApi;
  geoApi: GeoApi;
  history: History;

  state: State = {
    city: 'Карта',
    map: '#',
    error: '',
    elements: []
  }

  constructor(element: HTMLElement, initialState?: Partial<State>) {
    super(element, initialState);
    this.openWeatherApi = new OpenWeatherApi(openWeatherConfig);
    this.googleMapsApi = new GoogleMapsApi(googleMapsConfig);
    this.geoApi = new GeoApi(geoJsConfig);
    this.history = new History(storageHistoryKey, maxHistoryLength);
    this.initialization();
  }

  async getLocationWeather(cityName: string) {
    this.setState({ error: '' });
    try {
      const res = await this.openWeatherApi.getCurrentWeather(cityName);
      const city = String(res.name);
      const temperature = String(res.main.temp);
      const icon = String(res.weather[0].icon);
      const map = this.googleMapsApi.getStaticMap(city);
      this.history.addElement({ city, temperature, icon });
      this.setState({
        city,
        map,
        elements: [...this.state.elements, { city, temperature, icon }].slice(-10)
      })
    } catch (err) {
      this.setState({ error: err });
    }
  }

  weatherSectionClick = (evt: Event) => {
    const element = evt.target as HTMLElement;
    if (element.classList.contains("weather__history-list-item")) {
      this.getLocationWeather(element.dataset.city || '');
    }
  };

  weatherFormClick = (evt: Event) => {
    evt.preventDefault();
    const form = evt.target as HTMLFormElement;
    const input = form.querySelector('.form__input[name="city"]') as HTMLInputElement;
    this.getLocationWeather(input.value || '');
    form.reset();
  }

  events = {
    "click@.weather__history-list": this.weatherSectionClick,
    "submit@.weather__form": this.weatherFormClick
  };

  initialization() {
    this.geoApi.getCurrentLocation()
      .then((data) => this.getLocationWeather(data.city))
      .catch((err) => this.setState({ error: err.message }));
    const elements = this.history.getHistory()
    this.setState({ elements });
  }

  render() {
    return `
    <img class="weather__map" alt="{{city}}" src="{{map}}" />
    <form
      name="weather"
      action="#"
      autocomplete="off"
      class="form weather__form"
    >
      <input
        class="form__input weather__input"
        id="city"
        name="city"
        placeholder="Имя вашего города"
        type="text"
        required
        minlength="2"
        maxlength="30"
      />
      <button
        class="weather__button"
        name="acceptBtn"
        type="submit"
      >Показать</button>
    </form>
    <p class="weather__error">{{error}}</p>
    <ul class="weather__history-list">
      {{for elements as element}}
        <li class="weather__history-list-item" data-city="{{element.city}}">
          <p class="weather__text">
            <span class="weather__city-name">Город: {{element.city}}</span>
            <span class="weather__temperature">Температура: {{element.temperature}}℃</span>
          </p>
          <img class="weather__icon"
            src="https://openweathermap.org/img/wn/{{element.icon}}@2x.png"
            alt="{{element.city}}">
        </li>
      {{endfor}}
    </ul>`;
  }
}
