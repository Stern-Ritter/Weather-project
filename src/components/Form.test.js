import Form from "./Form";

const selector = "test-form";

describe("Class Form", () => {
  beforeAll(() => {
    document.body.innerHTML = `
    <form class="${selector}" name="weather">
      <input class="form__input" name="first" value="firstValue"/>
      <input class="form__input" name="second" value="secondValue"/>
    </form>`;
  });

  it(`method _getInputValues correct collects input field values`, () => {
    const expectedObj = {
      first: "firstValue",
      second: "secondValue",
    };
    const form = new Form(`.${selector}`, () => {});
    expect(form.getInputValues()).toStrictEqual(expectedObj);
  });

  it(`method setEventListeners correct add event listeners`, () => {
    const expectedObj = {
      first: "firstValue",
      second: "secondValue",
    };
    const mockCallback = jest.fn();
    const form = new Form(`.${selector}`, mockCallback);
    form.setEventListeners();
    document.forms.weather.submit();

    expect(mockCallback).toBeCalledTimes(1);
    expect(mockCallback).toBeCalledWith(expectedObj);
  });
});
