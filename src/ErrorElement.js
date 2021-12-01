export default class ErrorElement {
  constructor(selector) {
    this._element = document.querySelector(selector);
  }

  showError(error) {
    this._element.textContent = error.message;
  }

  clearError() {
    this._element.textContent = "";
  }
}
