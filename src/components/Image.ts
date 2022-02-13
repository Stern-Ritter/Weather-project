export default class Image {
  private element: HTMLImageElement;

  constructor(selector: string) {
    this.element = document.querySelector(selector) as HTMLImageElement;
  }

  setData(city: string, link: string) {
    this.element.alt = city;
    this.element.src = link;
  }
}
