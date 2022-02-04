export default abstract class Component<State = Record<string, unknown>> {
  private element;
  state: State;
  events: {
    [key: string]: (ev: Event) => void;
  };

  constructor(element: HTMLElement, initialState?: Partial<State>) {
    this.element = element;
    if(initialState) { this.state = {...this.state, ...initialState} }
    setTimeout(() => {
      this.element.innerHTML = this.render();
      this.subscribeToEvents();
    }, 0);
  }

  abstract render(): string;

  subscribeToEvents(): void {
    Object.entries(this.events || []).forEach(([event, func]) => {
      const matches = event.match(/(\w+)@(\w+)?(\.\w+)?/);
      if(matches !== null) {
        const el = this.element.querySelector(`${matches[2] || ''}${matches[3] || ''}`);
        el?.addEventListener(matches[1], func);
      }
    });
  }

  setState(state: any): void {
    this.state = { ...this.state, ...state };
    this.element.innerHTML = this.render();
    this.subscribeToEvents();
  }

  // onMount(el: HTMLElement): void {}
}
