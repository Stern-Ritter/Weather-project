export default class Card {
  private city: string;
  private temperature: string;
  private icon: string;
  private selector: string;

  constructor(
    { city, temperature, icon }: Record<string, string>,
    selector: string
  ) {
    this.city = city;
    this.temperature = temperature;
    this.icon = icon;
    this.selector = selector;
  }

  getCity() { return this.city; }

  getTemperature() { return this.temperature; }

  getIcon() { return this.icon; }

  private getElement() {
    const template = document.querySelector(this.selector) as HTMLTemplateElement;
    const cardTemplate = template.content
      .querySelector(".weather__history-list-item") as HTMLLIElement;
    const cardElement = cardTemplate.cloneNode(true) as HTMLLIElement;
    return cardElement;
  }

  generate() {
    const element = this.getElement();
    const weatherCityName = element.querySelector(".weather__city-name") as HTMLSpanElement;
    const weatherTemperature = element.querySelector(".weather__temperature") as HTMLSpanElement;
    const weatherIcon = element.querySelector(".weather__icon") as HTMLImageElement;
    weatherCityName.textContent = `Город: ${this.city}`;
    weatherTemperature.textContent = `Температура: ${Math.round(Number(this.temperature))} \u2103`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${this.icon}@2x.png`;
    weatherIcon.alt = this.city;
    element.dataset.city = this.city;
    return element;
  }
}
