export default class Cards {
  constructor(maxCount, cardsHolder) {
    this.elements = document.getElementsByClassName(
      ".weather__history-list-item"
    );
    this.maxCount = maxCount;
    this.cardsHolder = cardsHolder;
  }

  // composeCradText(name, temperature) {
  //   return `Город: ${name}
  //     Температура: ${temperature}&deg`;
  // }

  createCard({ name, temperature, icon }) {
    const cardTemplate = document.querySelector(
      "#weather-history-item"
    ).content;
    const card = cardTemplate
      .querySelector(".weather__history-list-item")
      .cloneNode(true);
    const cityName = card.querySelector(".weather__text");
    const weatherIcon = card.querySelector(".weather__icon");
    cityName.textContent = this.composeCradText(name, temperature);
    weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    weatherIcon.alt = name;
    card.dataset.name = name;
    return card;
  }

  checkCardsCount() {
    if (this.elements.length === this.maxCount - 1) {
      this.elements.item(0).remove();
    }
  }

  addCard(...cards) {
    cards.forEach((card) => {
      this.cardsHolder.prepend(card);
      this.checkCardsCount();
    });
  }
}
