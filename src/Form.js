export default class Form {
  constructor(selector, handleSubmit) {
    this._element = document.querySelector(selector);
    this._handleSubmit = handleSubmit;
  }

  getInputValues() {
    this._inputList = this._element.querySelectorAll(".form__input");
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    this._element.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this.getInputValues());
      this._element.reset();
    });
  }
}
