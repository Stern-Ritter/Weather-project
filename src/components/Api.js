export default class Api {
  constructor({ baseUrl, params }) {
    this._baseUrl = baseUrl;
    this._staticParams = params;
  }

  _getUrl(variableParams) {
    const searchParams = new URLSearchParams();
    if (this._staticParams) {
      Object.entries(this._staticParams).forEach(([key, value]) => {
        searchParams.append(key, value);
      });
    }
    if (variableParams) {
      Object.entries(variableParams).forEach(([key, value]) => {
        searchParams.append(key, value);
      });
    }
    return `${this._baseUrl}?${searchParams.toString()}`;
  }

  static _checkAnswerStatus(res) {
    if (res.ok) {
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return res.json();
      }
      return Promise.reject(new Error(`Сервер не отвечает.`));
    }
    if (res.status === 404) {
      return Promise.reject(new Error(`Город не найден.`));
    }
    return Promise.reject(new Error(`Сервер не отвечает.`));
  }
}
