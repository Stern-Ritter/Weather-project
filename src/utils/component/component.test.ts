import Component from './Component';

let el //: HTMLDivElement;
//const sleep = (x: number) => new Promise((r) => setTimeout(r, x));
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

describe('Component', () => {
  beforeEach(()=> {
    el = document.createElement('div');
  });

  it('is a class', () => {
    expect(Component).toBeInstanceOf(Function);
    expect(new Component(el)).toBeInstanceOf(Component);
  });

  it('renders on instantiating', async () => {
    const text =  `${Math.random()}`;
    class TestComponent extends Component {
      render() { return `<h1>${text}</h1>`}
    }

    new TestComponent(el);
    await sleep(0);

    expect(el.innerHTML).toBe(`<h1>${text}</h1>`);
  });

  it('renders on instantiating with state props', async () => {
    const text =  `${Math.random()}`;
    class TestComponent extends Component {
      state = { text: text }
      render() { return `<h1>${this.state.text}</h1>`}
    }

    new TestComponent(el);
    await sleep(0)

    expect(el.innerHTML).toBe(`<h1>${text}</h1>`);
  });

  it('updates component view on setState call', async () => {
    const first = `${Math.random()}`;
    const second = `${Math.random()}`;
    class TestComponent extends Component {
      state = { first, second }
      render() { return `${JSON.stringify(this.state)}`}
    }

    const component = new TestComponent(el);
    await sleep(0);

    expect(el.innerHTML).toBe(`${JSON.stringify({ first, second })}`);

    const updatedSecond = `${Math.random()}`;
    component.setState({ second: updatedSecond});
    expect(el.innerHTML).toBe(`${JSON.stringify({ first, second: updatedSecond })}`);
  });

  it('calls methods based on events definition', async () => {
    const value = Math.floor(Math.random() * 100);

    class TestComponent extends Component {
      state = { value }
      increase = () => this.setState({value: this.state.value + 1})
      decrease = () => this.setState({value: this.state.value - 1})

      events = {
        'click@.inc': this.increase,
        'click@input.dec': this.decrease,
      }

      render() {
        return `
          <h1>${this.state.value}</h1>
          <button class="inc">+</button>
          <input type="button" class="dec" value="-" />
        `
      }
    }
    const element = new TestComponent(el);
    const increaseSpy = jest.spyOn(element, 'increase');
    const decreaseSpy = jest.spyOn(element, 'decrease');
    await sleep(0);

    expect(element.state.value).toBe(value);
    expect((element.querySelector('h1') as HTMLDivElement).innerHTML).toBe(`${value}`);

    (el.querySelector('.inc') as HTMLButtonElement).dispatchEvent(new Event('click'));

    expect(increaseSpy).toHaveBeenCalled(); //???
    expect(element.state.value).toBe(value + 1);
    expect((el.querySelector('h1') as HTMLDivElement).innerHTML).toBe(`${value + 1}`);

    (el.querySelector('.dec') as HTMLButtonElement).dispatchEvent(new Event('click'));
    (el.querySelector('.dec') as HTMLButtonElement).dispatchEvent(new Event('click'));
    expect(element.state.value).toBe(value - 1);
    expect((el.querySelector('h1') as HTMLDivElement).innerHTML).toBe(`${value - 1}`);

  })
});
