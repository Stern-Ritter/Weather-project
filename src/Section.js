export default class Section {
  constructor(render, selector, maxCount) {
    this._render = render;
    this._container = document.querySelector(selector);
    this._maxCount = maxCount;
  }

  _clear() {
    this._container.innerHTML = "";
  }

  _checkCardsCount() {
    if (this._container.children.length === this._maxCount) {
      const lastIndex = this._container.children.length - 1;
      this._container.children.item(lastIndex).remove();
    }
  }

  addItem(item) {
    const cardElement = this._render(item);
    this._checkCardsCount();
    this._container.prepend(cardElement);
  }

  renderItems(items) {
    this._clear();
    items.forEach((item) => this.addItem(item));
  }
}
