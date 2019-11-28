const InfoBox = function (details) {
    var title = details.title;
    var description = details.description;
    var requiresInput = details.requiresInput || false;
    var action = details.action;

    this.element = document.createElement('div');
    this.element.setAttribute('class', 'infoBox');

    var titleElement = document.createElement('div');
    titleElement.setAttribute('class', 'infoBoxTitle');
    titleElement.innerText = title;

    var descriptionElement = document.createElement('div');
    descriptionElement.innerText = description;

    var inputElement = document.createElement('input');
    inputElement.setAttribute('id', 'infoBoxInput');
    inputElement.setAttribute('type', 'text');

    var buttonElement = document.createElement('button');
    buttonElement.innerText = 'Continue';

    if (action !== undefined) {
        buttonElement.addEventListener('click', () => {
            action();
        });
    }

    buttonElement.addEventListener('click', () => {
        document.body.removeChild(this.element);
    });

    this.element.appendChild(titleElement);
    this.element.appendChild(document.createElement('br'));
    this.element.appendChild(document.createElement('br'));
    this.element.appendChild(descriptionElement);
    this.element.appendChild(document.createElement('br'));
    this.element.appendChild(document.createElement('br'));

    if (requiresInput) {
        this.element.appendChild(inputElement);
        this.element.appendChild(document.createElement('br'));
        this.element.appendChild(document.createElement('br'));
    }

    this.element.appendChild(buttonElement);
};