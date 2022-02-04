import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';
import Api from "./Api";

describe("Class Api", () => {
  beforeAll(() => {
    enableFetchMocks();
  });

  it("method getUrl(variableParams) complete correct request string", () => {
    const api = new Api({
      baseUrl: "https://test.com/api",
      params: {
        static1: "value1",
        static2: "value2",
      },
    });
    const url = api.getUrl({
      var1: "value1",
      var2: "value2",
    });
    expect(url).toBe(
      `https://test.com/api?static1=value1&static2=value2&var1=value1&var2=value2`
    );
  });

  it(`method checkAnswerStatus(res) return correct json object if response:
  1) has "status: 200;
  2) has "content-type": "application/json"`, async () => {
    const body = { test: "Test" };
    const init = {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    };

    fetchMock.mockResponseOnce(JSON.stringify(body), init);
    const data = fetch("https://test.com").then((res) =>
      Api.checkAnswerStatus(res)
    );
    await expect(data).resolves.toStrictEqual(body);
  });

  it(`method checkAnswerStatus(res) return string "Сервер не отвечает." if response:
  1) has "status: 200;
  2) has not "content-type": "application/json"`, async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 200 });
    const data = fetch("https://test.com").then((res) =>
      Api.checkAnswerStatus(res)
    );
    await expect(data).rejects.toThrow("Сервер не отвечает.");
  });

  it(`method checkAnswerStatus(res) return string "Сервер не отвечает." if response:
  1) has not "statusText: OK;
  2) has not "status": 500`, async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 500 });
    const data = fetch("https://test.com").then((res) =>
      Api.checkAnswerStatus(res)
    );
    await expect(data).rejects.toThrow("Сервер не отвечает.");
  });

  it(`method checkAnswerStatus(res) return string "Город не найден." if response:
  1) has not "statusText: OK;
  2) has "status": 404`, async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}), { status: 404 });
    const data = fetch("https://test.com").then((res) =>
      Api.checkAnswerStatus(res)
    );
    await expect(data).rejects.toThrow("Город не найден.");
  });
});
