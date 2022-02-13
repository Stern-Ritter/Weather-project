import History from "./History";
import { storageHistoryKey } from "../utils/constants";

let history: History;
const maxHistoryLength = 5;

describe("Class History", () => {
  beforeEach(() => {
    localStorage.removeItem(storageHistoryKey);
    history = new History(storageHistoryKey, maxHistoryLength);
  });

  it(`method getHistory() return empty array if
  method addElement(element) has never been called yet`, () => {
    expect(history.getHistory()).toStrictEqual([]);
  });

  it(`method addElement(element) return last added elements`, () => {
    const elements = [
      { city: "Евпатория", temperature: "13.33", icon: "04n" },
      { city: "Бангладеш", temperature: "26.03", icon: "01n" },
      { city: "Киров", temperature: "0.46", icon: "13d" },
      { city: "Нью-йорк", temperature: "-0.81", icon: "02n" },
    ];
    elements.forEach((element) => history.addElement(element));
    expect(history.getHistory()).toStrictEqual(elements);
  });

  it(`method addElement(element) return last n elements
  (equal to the maximum history length),
  if more items are added than the maximum history length`, () => {
    const elements = [
      { city: "Евпатория", temperature: "13.33", icon: "04n" },
      { city: "Бангладеш", temperature: "26.03", icon: "01n" },
      { city: "Киров", temperature: "0.46", icon: "13d" },
      { city: "Нью-йорк", temperature: "-0.81", icon: "02n" },
      { city: "Бодрум", temperature: "17.96", icon: "04d" },
      { city: "Минск", temperature: "-1.63", icon: "04d" },
    ];
    elements.forEach((element) => history.addElement(element));
    expect(history.getHistory()).toStrictEqual(
      elements.slice(-maxHistoryLength)
    );
  });
});
