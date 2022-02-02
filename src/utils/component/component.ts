export default class Component { //<State = {}>
  // private el;
  // state: State;
  // events: {
  //   [key: string]: (ev: Event) => void;
  // };

  constructor(element) { //: HTMLElement
    this.element = element;
    setTimeout(() => this.element.innerHTML = this.render(), 0);
  }

  render() {}

  setState(state) {
    this.state = { ...this.state, ...state };
    this.element.innerHTML = this.render();
  }

  subscribeToEvents(){}

}
