console.log('Hello Cashflow!');

const randomTool = new RandomTool();

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

const REAL_ESTATE_TYPE = {
    HOUSE: 1,
    CONDO: 2,
    LAND: 3
};

const realEstates = [
    new RealEstate({
        name: '10 Acres Raw Land',
        description: 'Wonderful park-like setting with ...',
        cost: 5000,
        mortgage: 0,
        downPay: 5000,
        cashflow: 0,
        ROI: '0%',
        sellRange: '??',
        type: REAL_ESTATE_TYPE.LAND
    }),
    new RealEstate({
        name: 'You Find a Great Deal!',
        description: 'Company bought ...',
        cost: 45000,
        mortgage: 43000,
        downPay: 2000,
        cashflow: 250,
        ROI: '150%',
        sellRange: '$65,000 to $135,000',
        type: REAL_ESTATE_TYPE.HOUSE,
        beds: 3,
        baths: 2
    }),
    new RealEstate({
        name: 'Condo For Sale - 2Br/1Ba',
        description: 'Parents selling 2/1 condo used ...',
        cost: 40000,
        mortgage: 36000,
        downPay: 4000,
        cashflow: 140,
        ROI: '42%',
        sellRange: '$45,000 to $65,000',
        type: REAL_ESTATE_TYPE.CONDO,
        beds: 2,
        baths: 1
    })
];

const numOfRandomRealEstates = 20;
for (var i = 0; i < numOfRandomRealEstates; i++) {
    realEstates.push(new RealEstate({ isRandom: true }));
}

const smallDeals = stocks.concat(realEstates);
console.log('Small Deals:', smallDeals);

const ratRace = new RatRace();
console.log(ratRace);

var playerIsMade = false;
var player;

function startGame() {
    // alert('Sheila made this cute little button! Good Luck!!');
    createPlayer();
}

function createPlayer() {
    var infoBox = new InfoBox({
        title: 'Welcome to Cashflow!',
        description: 'What is your name?',
        requiresInput: true,
        action: function () {
            var name = document.getElementById('infoBoxInput').value;
            player = new Player(name);
            console.log(player);
            playerIsMade = true;
        }
    });

    document.body.appendChild(infoBox.element);
}

function takeTurn() {
    if (playerIsMade) {
        var roll = getDieRoll();

        player.space += roll;
        player.space %= ratRace.spaces.length;

        var space = ratRace.spaces[player.space];
        space.action();

        var rollInfoBox = new InfoBox({
            title: 'You rolled!',
            description: 'You rolled the die and rolled a: ' + roll + '. You are on the space: ' + ratRace.spaces[player.space].name + '!'
        });

        document.body.appendChild(rollInfoBox.element);
    } else {
        var infoBox = new InfoBox({
            title: 'No Player!',
            description: 'You must create a Player first before playing!'
        });

        document.body.appendChild(infoBox.element);
    }
}

function getDieRoll() {
    return randomTool.getRandomIntInRange(1, 6);
}
