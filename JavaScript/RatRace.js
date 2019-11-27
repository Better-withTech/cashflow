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
            console.log('Landed on the Opportunity space!');
        }
    });

    this.spaces = [
        opportunity,
        doodads
    ];
};