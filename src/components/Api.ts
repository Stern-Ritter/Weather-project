export default class Api {
  private baseUrl: string;
  private staticParams: Record<string, any>;

  constructor({ baseUrl, params }: Record<string, any>) {
    this.baseUrl = baseUrl;
    this.staticParams = params;
  }

  getUrl(variableParams?: Record<string, any>) {
    const searchParams = new URLSearchParams();
    if (this.staticParams) {
      Object.entries(this.staticParams).forEach(([key, value]) => {
        searchParams.append(key, value);
      });
    }
    if (variableParams) {
      Object.entries(variableParams).forEach(([key, value]) => {
        searchParams.append(key, value);
      });
    }
    return `${this.baseUrl}?${searchParams.toString()}`;
  }

  static checkAnswerStatus(res: Response) {
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
