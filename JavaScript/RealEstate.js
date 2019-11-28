const RealEstate = function (details) {
    SmallDeal.call(this, details);

    this.cost = details.cost;
    this.mortgage = details.mortgage;
    this.downPay = details.downPay;
    this.cashflow = details.cashflow;
    this.ROI = details.ROI;
    this.sellRange = details.sellRange;
};