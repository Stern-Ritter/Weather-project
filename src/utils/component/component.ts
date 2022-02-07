import TemplateEngine from "../templateEngine/templateEngine";

export default abstract class Component<State = Record<string, unknown>> {
  private element;
  state: State;
  events: {
    [key: string]: (ev: Event) => void;
  };

  constructor(element: HTMLElement, initialState?: Partial<State>) {
    this.element = element;
    this.state = {...this.state, ...initialState};
    this.onMount(this.element);
  }

  abstract render(): string;

  subscribeToEvents(): void {
    Object.entries(this.events || []).forEach(([event, func]) => {
      const matches = event.match(/(\w+)@(\w+)?(\.[\w-]+)?/);
      if(matches !== null) {
        const el = this.element.querySelector(`${matches[2] || ''}${matches[3] || ''}`);
        el?.addEventListener(matches[1], func);
      }
    });
  }

  onMount(element: HTMLElement): void {
    setTimeout(() => {
      element.innerHTML = TemplateEngine.createDocument(this.render(), this.state);
      this.subscribeToEvents();
    }, 0);
  }

  setState(state: any): void {
    this.state = { ...this.state, ...state };
    this.element.innerHTML = TemplateEngine.createDocument(this.render(), this.state);
    this.subscribeToEvents();
  }
}
