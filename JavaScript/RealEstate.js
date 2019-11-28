const RealEstate = function (details) {
    SmallDeal.call(this, details);

    var isRandom = details.isRandom || false;

    if (isRandom) {
        this.cost = randomTool.getRandomIntInRange(35000, 65000);
        this.downPay = Math.floor(0.2 * this.cost);
        this.mortgage = this.cost - this.downPay;
        this.cashflow = randomTool.getRandomIntInRange(-100, 400);
        this.ROI = Math.floor(100 * ((12 * this.cashflow) / this.downPay)) + '%';
        this.sellRange = '$' + (this.cost - 20000) + ' to $' + (this.cost + 20000);
        this.type = randomTool.getRandomIntInRange(1, 3);
        this.beds = randomTool.getRandomIntInRange(1, 4);
        this.baths = Math.max(1, this.beds - randomTool.getRandomIntInRange(0, 1));

        switch (this.type) {
            case REAL_ESTATE_TYPE.HOUSE:
                this.name = 'House For Sale - ' + this.beds + 'Br/' + this.baths + 'Ba';
                break;
            case REAL_ESTATE_TYPE.LAND:
                this.beds = 0;
                this.baths = 0;
                this.name = 'Land For Sale';
                break;
            case REAL_ESTATE_TYPE.CONDO:
                this.name = 'Condo For Sale - ' + this.beds + 'Br/' + this.baths + 'Ba';
                break;
        }

        this.description = 'This is a great piece of real estate!';
    } else {
        this.cost = details.cost;
        this.mortgage = details.mortgage;
        this.downPay = details.downPay;
        this.cashflow = details.cashflow;
        this.ROI = details.ROI;
        this.sellRange = details.sellRange;
        this.type = details.type;
        this.beds = details.beds || 0;
        this.baths = details.baths || 0;
    }
};