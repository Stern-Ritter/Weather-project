export default class Image {
  constructor(selector) {
    this._element = document.querySelector(selector);
  }

  setData(city, link) {
    this._element.alt = city;
    this._element.src = link;
  }
}
