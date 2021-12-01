import Api from "./Api";

require("jest-fetch-mock").enableMocks();

describe("Class Api", () => {
  it("method _getUrl(variableParams) complete correct request string", () => {
    const api = new Api({
      baseUrl: "https://test.com/api",
      params: {
        static1: "value1",
        static2: "value2",
      },
    });
    const url = api._getUrl({
      var1: "value1",
      var2: "value2",
    });
    expect(url).toBe(
      `https://test.com/api?static1=value1&static2=value2&var1=value1&var2=value2`
    );
  });

  it(`method _checkAnswerStatus(res) return correct json object if response:
  1) has "status: 200;
  2) has "content-type": "application/json"`, async () => {
    const body = { test: "Test" };
    const init = {
      status: 200,
      headers: new Headers({
        "content-type": "application/json",
      }),
    };

    fetch.mockResponseOnce(JSON.stringify(body), init);
    const data = fetch("https://test.com").then((res) =>
      Api._checkAnswerStatus(res)
    );
    await expect(data).resolves.toStrictEqual(body);
  });

  it(`method _checkAnswerStatus(res) return string "Сервер не отвечает." if response:
  1) has "status: 200;
  2) has not "content-type": "application/json"`, async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 200 });
    const data = fetch("https://test.com").then((res) =>
      Api._checkAnswerStatus(res)
    );
    await expect(data).rejects.toThrow("Сервер не отвечает.");
  });

  it(`method _checkAnswerStatus(res) return string "Сервер не отвечает." if response:
  1) has not "statusText: OK;
  2) has not "status": 404`, async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
    const data = fetch("https://test.com").then((res) =>
      Api._checkAnswerStatus(res)
    );
    await expect(data).rejects.toThrow("Сервер не отвечает.");
  });

  it(`method _checkAnswerStatus(res) return string "Город не найден." if response:
  1) has not "statusText: OK;
  2) has "status": 404`, async () => {
    fetch.mockResponseOnce(JSON.stringify({}), { status: 404 });
    const data = fetch("https://test.com").then((res) =>
      Api._checkAnswerStatus(res)
    );
    await expect(data).rejects.toThrow("Город не найден.");
  });
});
