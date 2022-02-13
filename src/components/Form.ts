export default class Form {
  private element: HTMLFormElement;
  private handleSubmit: (data: Record<string, string>) => void;

  constructor(selector: string, handleSubmit: (data: Record<string, string>) => void) {
    this.element = document.querySelector(selector) as HTMLFormElement;
    this.handleSubmit = handleSubmit;
  }

  getInputValues() {
    const inputList: NodeListOf<HTMLInputElement> = this.element.querySelectorAll(".form__input");
    const formValues: Record<string, string> = {};
    inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    this.element.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.handleSubmit(this.getInputValues());
      this.element.reset();
    });
  }
}
