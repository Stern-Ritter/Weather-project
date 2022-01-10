export default class History {
  constructor(storageHistoryKey, maxCount) {
    this._maxCount = maxCount;
    this._storageHistoryKey = storageHistoryKey;
    this._history = this.getHistory();
  }

  getHistory() {
    return JSON.parse(localStorage.getItem(this._storageHistoryKey)) ?? [];
  }

  _setHistory() {
    localStorage.setItem(
      this._storageHistoryKey,
      JSON.stringify(this._history)
    );
  }

  _checkHistoryLength() {
    if (this._history.length > this._maxCount) {
      this._history = this._history.slice(-this._maxCount);
    }
  }

  addElement(element) {
    this._history.push(element);
    this._checkHistoryLength();
    this._setHistory();
  }
}
