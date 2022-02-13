export default class ErrorElement {
  private element: HTMLSpanElement;

  constructor(selector: string) {
    this.element = document.querySelector(selector) as HTMLSpanElement;
  }

  showError(error: Error) {
    this.element.textContent = error.message;
  }

  clearError() {
    this.element.textContent = "";
  }
}
