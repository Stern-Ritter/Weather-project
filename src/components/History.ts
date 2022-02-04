export default class History {
  private maxCount: number;
  private storageHistoryKey: string;
  private history: Record<string, string>[];

  constructor(storageHistoryKey: string, maxCount: number) {
    this.maxCount = maxCount;
    this.storageHistoryKey = storageHistoryKey;
    this.history = this.getHistory();
  }

  getHistory() {
    return JSON.parse(localStorage.getItem(this.storageHistoryKey) || "[]");
  }

  private setHistory() {
    localStorage.setItem(
      this.storageHistoryKey,
      JSON.stringify(this.history)
    );
  }

  private checkHistoryLength() {
    if (this.history.length > this.maxCount) {
      this.history = this.history.slice(-this.maxCount);
    }
  }

  addElement(element: Record<string, string>) {
    this.history.push(element);
    this.checkHistoryLength();
    this.setHistory();
  }
}
