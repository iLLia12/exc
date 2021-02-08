export default class {
  constructor(currencies, currencyToChange, currencyToGet, valueToChange) {
    this.currencyToChange = currencyToChange;
    this.currencyToGet = currencyToGet;
    this.currencies = currencies;
    this.valueToChange = valueToChange;
    this.found = null;
    this.a = null;
    this.b = null;
    this.buffer = null;
  }
  find(ccy, base_ccy) {
    this.found = this.currencies.find(
      e => e["ccy"] === ccy && e["base_ccy"] === base_ccy
    );
    return this;
  }
  divide(a, b = this.buffer) {
    this.buffer = b / parseFloat(this.found[a]);
    return this;
  }
  multiply(a, b = this.buffer) {
    this.buffer = b * parseFloat(this.found[a]);
    return this;
  }
  value() {
    return this.buffer;
  }
  
  /**
   * TODO::a temporary solution, refactoring is needed
   */
  get() {
    this.currencies.every(o => {
      if (o["base_ccy"] === this.currencyToChange && o["ccy"] === this.currencyToGet) {
        this.buffer = this.valueToChange / parseFloat(o["sale"]);
        return false;
      }
      if (o["base_ccy"] === this.currencyToGet && o["ccy"] === this.currencyToChange) {
        this.buffer = this.valueToChange * parseFloat(o["buy"]);
        return false;
      }
      return true;
    });

    if (this.buffer) return this.buffer;

    if (this.currencyToChange === "UAH" && this.currencyToGet === "BTC") {
      return this.find("USD", "UAH")
        .divide("sale", this.valueToChange)
        .find("BTC", "USD")
        .divide("sale")
        .value();
    }
    if (this.currencyToChange === "BTC" && this.currencyToGet === "UAH") {
      return this.find("BTC", "USD")
        .multiply("buy", this.valueToChange)
        .find("USD", "UAH")
        .multiply("buy")
        .value();
    }
    if (this.currencyToChange === "BTC" && this.currencyToGet === "EUR") {
      return this.find("BTC", "USD")
        .multiply("buy", this.valueToChange)
        .find("USD", "UAH")
        .multiply("buy")
        .find("EUR", "UAH")
        .divide("sale")
        .value();
    }
    if (this.currencyToChange === "EUR" && this.currencyToGet === "BTC") {
      return this.find("EUR", "UAH")
        .multiply("buy", this.valueToChange)
        .find("USD", "UAH")
        .divide("sale")
        .find("BTC", "USD")
        .divide("sale")
        .value();
    }
    if (this.currencyToChange === "USD" && this.currencyToGet === "EUR") {
      return this.find("USD", "UAH")
        .multiply("buy", this.valueToChange)
        .find("EUR", "UAH")
        .divide("sale")
        .value();
    }
    if (this.currencyToChange === "EUR" && this.currencyToGet === "USD") {
      return this.find("EUR", "UAH")
        .multiply("buy", this.valueToChange)
        .find("USD", "UAH")
        .divide("sale")
        .value();
    }
  }
}
