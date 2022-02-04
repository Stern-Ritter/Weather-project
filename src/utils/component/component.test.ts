import Component from './component';

let element: HTMLDivElement;
const sleep = (ms: number) => new Promise((res) => { setTimeout(res, ms) });

describe('Component', () => {
  beforeEach(()=> {
    element = document.createElement('div');
  });

  it('is a class', () => {
    expect(Component).toBeInstanceOf(Function);
  });

  it('renders on instantiating', async () => {
    const text =  `${Math.random()}`;
    class TestComponent extends Component {
      render() { return `<h1>${text}</h1>`}
    }

    const component = new TestComponent(element);
    await sleep(0);
    expect(component).toBeInstanceOf(Component);
    expect(element.innerHTML).toBe(`<h1>${text}</h1>`);
  });

  it('renders on instantiating with state props', async () => {
    const text =  `${Math.random()}`;
    class TestComponent extends Component {
      state = { text }
      render() { return `<h1>${this.state.text}</h1>`}
    }

    const component = new TestComponent(element);
    await sleep(0)
    expect(component).toBeInstanceOf(Component);
    expect(element.innerHTML).toBe(`<h1>${text}</h1>`);
  });

  it('updates component view on setState call', async () => {
    const first = `${Math.random()}`;
    const second = `${Math.random()}`;
    class TestComponent extends Component {
      state = { first, second }
      render() { return `${JSON.stringify(this.state)}`}
    }

    const component = new TestComponent(element);
    await sleep(0);

    expect(component).toBeInstanceOf(Component);
    expect(element.innerHTML).toBe(`${JSON.stringify({ first, second })}`);

    const updatedSecond = `${Math.random()}`;
    component.setState({ second: updatedSecond});
    expect(element.innerHTML).toBe(`${JSON.stringify({ first, second: updatedSecond })}`);
  });

  it('calls methods based on events definition', async () => {
    class TestComponent extends Component {
      state = {
        value: 1,
        input: "123"
      }

      increaseCounter = () => this.setState({value: this.state.value + 1});
      decreaseCounter = () => this.setState({value: this.state.value - 1});

      setInputValue = (ev: Event) => {
        this.setState({
          input: (ev.target as HTMLInputElement).value
        });
      };

      events = {
        "click@button.inc": this.increaseCounter,
        "click@button.dec": this.decreaseCounter,
        "change@input": this.setInputValue
      }

      render() {
        return `
        <h1>Count ${this.state.value} (${this.state.input})</h1>
        <input value="${this.state.input}"  />
        <button class="dec">-</button>
        <button class="inc">+</button>
      `;
      }
    }

    const component = new TestComponent(element);
    await sleep(0);

    expect(component).toBeInstanceOf(Component);
    expect(component.state).toEqual({ value: 1, input: "123" });
    expect((element.querySelector('h1') as HTMLDivElement).innerHTML).toBe(`Count 1 (123)`);

    (element.querySelector('.inc') as HTMLButtonElement).dispatchEvent(new Event('click'));
    expect(component.state).toEqual({ value: 2, input: "123" });
    expect((element.querySelector('h1') as HTMLDivElement).innerHTML).toBe(`Count 2 (123)`);

    (element.querySelector('.dec') as HTMLButtonElement).dispatchEvent(new Event('click'));
    (element.querySelector('.dec') as HTMLButtonElement).dispatchEvent(new Event('click'));
    expect(component.state).toEqual({ value: 0, input: "123" });
    expect((element.querySelector('h1') as HTMLDivElement).innerHTML).toBe(`Count 0 (123)`);

    (element.querySelector('input') as HTMLButtonElement).value = "456";
    (element.querySelector('input') as HTMLButtonElement).dispatchEvent(new Event('change'));
    expect(component.state).toEqual({ value: 0, input: "456" });
    expect((element.querySelector('h1') as HTMLDivElement).innerHTML).toBe(`Count 0 (456)`);
  })
});
