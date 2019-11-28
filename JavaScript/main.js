console.log('Hello Cashflow!');

const stocks = [
    new Stock({
        name: 'Stock - MYT4U Electronics Co.',
        description: 'Fast growing seller of home ...',
        symbol: 'MYT4U',
        price: 20,
        dividend: 0,
        yield: '0%',
        tradingRange: '$5 to $30'
    })
];

const realEstates = [
    new RealEstate({
        name: '10 Acres Raw Land',
        description: 'Wonderful park-like setting with ...',
        cost: 5000,
        mortgage: 0,
        downPay: 5000,
        cashflow: 0,
        ROI: '0%'
    })
];

const smallDeals = stocks.concat(realEstates);
console.log('Small Deals:', smallDeals);

const ratRace = new RatRace();
console.log(ratRace);

function startGame() {
    // alert('Sheila made this cute little button! Good Luck!!');
    takeTurn();
}

function takeTurn() {
    var roll = getDieRoll() + getDieRoll();

    var rollInfo = document.createElement('div');
    rollInfo.setAttribute('id', 'infoBox');
    rollInfo.innerText = 'You rolled a: ' + roll;
    document.body.appendChild(rollInfo);

    setTimeout(() => {
        document.body.removeChild(rollInfo);
    }, 1500);
}

function getDieRoll() {
    return Math.floor(Math.random() * 6 + 1);
}
