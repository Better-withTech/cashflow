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
        ROI: '0%',
        sellRange: '??'
    }),
    new RealEstate({
        name: 'You Find a Great Deal!',
        description: 'Company bought ...',
        cost: 45000,
        mortgage: 43000,
        downPay: 2000,
        cashflow: 250,
        ROI: '150%',
        sellRange: '$65,000 to $135,000'
    })
];

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
    return Math.floor(Math.random() * 6 + 1);
}
