const Stock = function (details) {
    SmallDeal.call(this, details);

    this.symbol = details.symbol;
    this.price = details.price;
    this.dividend = details.dividend;
    this.yield = details.yield;
    this.tradingRange = details.tradingRange;
};