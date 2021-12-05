import Section from "./Section";

const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

let section;
const mockCallback = jest.fn().mockImplementation((data) => data);
const selector = ".weather__history-list";
const maxLength = 4;

describe("Class Section", () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html;
    section = new Section(mockCallback, selector, maxLength);
  });

  it(`method addItem(item) calls methods
  _render(item) and _checkCardsCount() once`, () => {
    const item = document.createElement("div");
    section._render = jest.fn();
    section._checkCardsCount = jest.fn();
    section.addItem(item);
    expect(section._render).toBeCalledTimes(1);
    expect(section._checkCardsCount).toBeCalledTimes(1);
  });

  it(`method addItem(item) add element to section`, () => {
    const item = document.createElement("div");
    section.addItem(item);
    const sectionContainer = document.querySelector(selector);
    expect(sectionContainer.firstElementChild).toBe(item);
  });

  it(`method addItem(item) checks the number of child elements
  and if their number is equal to the maximum length
  deletes the earliest added element`, () => {
    const checkCardsCountSpy = jest.spyOn(section, "_checkCardsCount");

    const items = [];
    for (let i = 0; i < maxLength + 1; i += 1) {
      items.push(document.createElement("div"));
    }
    items.forEach((item) => section.addItem(item));

    const sectionContainer = document.querySelector(selector);
    const expectedElements = items.slice(-maxLength);

    expect(checkCardsCountSpy).toBeCalledTimes(items.length);
    expect(sectionContainer.firstElementChild).toBe(
      expectedElements[expectedElements.length - 1]
    );
    expect(sectionContainer.lastElementChild).toBe(expectedElements[0]);
  });

  it(`method renderItems(items) calls method _clear() once`, () => {
    const items = [1, 2, 3, 4];
    section._clear = jest.fn();
    section.renderItems(items);
    expect(section._clear).toBeCalledTimes(1);
  });

  it(`method renderItems(items) calls method addItem()
  as many times as the length of the argument: items array`, () => {
    const items = [1, 2, 3, 4];
    section.addItem = jest.fn();
    section.renderItems(items);
    expect(section.addItem).toBeCalledTimes(items.length);
  });
});
