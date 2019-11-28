const RandomTool = function () {
    this.getRandomIntInRange = function (start, end) {
        var ranage = end - start + 1;
        return Math.floor(ranage * Math.random() + start);
    };
};