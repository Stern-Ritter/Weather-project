export default class Section {
  public render: (data: Record<string, string>) => HTMLElement;
  private container: HTMLElement;
  private maxCount: number;
  private handleClick: (evt: Event) => void;

  constructor(
    render: (data: Record<string, string>) => HTMLElement,
    selector: string,
    maxCount: number,
    handleClick: (evt: Event) => void
  ) {
    this.render = render;
    this.container = document.querySelector(selector) as HTMLElement;
    this.maxCount = maxCount;
    this.handleClick = handleClick;
    this.setEventLiteners();
  }

  private setEventLiteners() {
    this.container.addEventListener("click", (evt) => {
      this.handleClick(evt);
    });
  }

  clear() {
    this.container.innerHTML = "";
  }

  checkCardsCount() {
    if (this.container.children.length === this.maxCount) {
      const lastIndex = this.container.children.length - 1;
      this.container.children.item(lastIndex)?.remove();
    }
  }

  addItem(item: Record<string, string>) {
    const cardElement = this.render(item);
    this.checkCardsCount();
    this.container.prepend(cardElement);
  }

  renderItems(items: Record<string, string>[]) {
    this.clear();
    items.forEach((item) => this.addItem(item));
  }
}
