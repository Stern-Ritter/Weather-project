export default class History {
  constructor(maxCount, storageHistoryKey) {
    this.maxCount = maxCount;
    this.storageHistoryKey = storageHistoryKey;
    this.history = this.getHistory();
  }

  getHistory() {
    return JSON.parse(localStorage.getItem(this.storageHistoryKey)) ?? [];
  }

  setHistory() {
    localStorage.setItem(JSON.stringify(this.history), this.storageHistoryKey);
  }

  checkHistoryLength() {
    if (this.history.length > this.maxCount) {
      this.history = this.history.slice(-10);
    }
  }

  addHistoryElement(historyElement) {
    this.history.push(historyElement);
    this.checkHistoryLength();
    this.setHistory();
  }
}
