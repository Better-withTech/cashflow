const RatRace = function () {
    const opportunity = new Space({
        name: 'Opportunity - Big / Small Deal',
        action: function () {
            console.log('Landed on the Opportunity space!');
        }
    });

    const doodads = new Space({
        name: 'Doodads',
        action: function () {
            console.log('Landed on the Doodads space!');
        }
    });

    const charity = new Space({
        name: 'Charity - Use 1 or 2 dice for next 3 turns if you donate 10% of Total Income',
        action: function () {
            console.log('Landed on the Charity space!');
        }
    });

    const payCheck = new Space({
        name: 'Pay Check',
        action: function () {
            console.log('Landed on the Pay Check space!');
        }
    });

    const theMarket = new Space({
        name: 'The Market',
        action: function () {
            console.log('Landed on The Market space!');
        }
    });

    const baby = new Space({
        name: 'Baby - Congratulations! Add in your child expenses (Limit 3 children per Player)',
        action: function () {
            console.log('Landed on the Baby space!');
        }
    });

    const downsized = new Space({
        name: 'Downsized - Pay amount of total expenses to the bank. Lose 2 Turns',
        action: function () {
            console.log('Landed on the Downsized space!');
        }
    });

    this.spaces = [
        opportunity,
        doodads,
        opportunity,
        charity,
        opportunity,
        payCheck,
        opportunity,
        theMarket,
        opportunity,
        doodads,
        opportunity,
        baby,
        opportunity,
        payCheck,
        opportunity,
        theMarket,
        opportunity,
        doodads,
        opportunity,
        downsized,
        opportunity,
        payCheck,
        opportunity,
        theMarket
    ];
};