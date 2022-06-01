'use strict';

class Sale {
  constructor(date, saleValue, seller) {
    this.date = date;
    this.saleValue = parseFloat(saleValue);
    this.seller = seller;
    return this;
  }
}

module.exports = Sale