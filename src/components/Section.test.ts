import fs from 'fs';
import path from "path";
import Section from "./Section";

const html = fs.readFileSync(path.resolve(__dirname, "../prev-index.html"), "utf8");

let section: Section;
const mockRenderCallback = jest.fn().mockImplementation((data) => data);
const mockHandleCallback = jest.fn();
const selector = ".weather__history-list";
const maxLength = 4;

describe("Class Section", () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html;
    section = new Section(
      mockRenderCallback,
      selector,
      maxLength,
      mockHandleCallback
    );
  });

  it(`method setEventLiteners() create DOM with correct event listeners`, () => {
    const container = document.querySelector(".weather__history-list") as HTMLElement;
    container.dispatchEvent(new Event("click"));
    expect(mockHandleCallback).toHaveBeenCalledTimes(1);
  });

  it(`method addItem(item) calls methods
  render(item) and checkCardsCount() once`, () => {
    const item = document.createElement("div");
    section.render = jest.fn();
    section.checkCardsCount = jest.fn();
    // @ts-ignore Another type of argument because method used inside has been mocked
    section.addItem(item);
    expect(section.render).toBeCalledTimes(1);
    expect(section.checkCardsCount).toBeCalledTimes(1);
  });

  it(`method addItem(item) add element to section`, () => {
    const item = document.createElement("div");
    // @ts-ignore Another type of argument because method used inside has been mocked
    section.addItem(item);
    const sectionContainer = document.querySelector(selector) as HTMLElement;
    expect(sectionContainer.firstElementChild).toBe(item);
  });

  it(`method addItem(item) checks the number of child elements
  and if their number is equal to the maximum length
  deletes the earliest added element`, () => {
    const checkCardsCountSpy = jest.spyOn(section, "checkCardsCount");

    const items = [];
    for (let i = 0; i < maxLength + 1; i += 1) {
      items.push(document.createElement("div"));
    }
    // @ts-ignore Another type of argument because method used inside has been mocked
    items.forEach((item) => section.addItem(item));

    const sectionContainer = document.querySelector(selector) as HTMLElement;
    const expectedElements = items.slice(-maxLength);

    expect(checkCardsCountSpy).toBeCalledTimes(items.length);
    expect(sectionContainer.firstElementChild).toBe(
      expectedElements[expectedElements.length - 1]
    );
    expect(sectionContainer.lastElementChild).toBe(expectedElements[0]);
  });

  it(`method renderItems(items) calls method clear() once`, () => {
    const items = [{first: '1'}, {first: '2'}, {first: '3'}, {first: '4'}];
    section.clear = jest.fn();
    section.renderItems(items);
    expect(section.clear).toBeCalledTimes(1);
  });

  it(`method renderItems(items) calls method addItem()
  as many times as the length of the argument: items array`, () => {
    const items = [{first: '1'}, {first: '2'}, {first: '3'}, {first: '4'}];
    section.addItem = jest.fn();
    section.renderItems(items);
    expect(section.addItem).toBeCalledTimes(items.length);
  });
});
