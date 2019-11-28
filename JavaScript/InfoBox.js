const InfoBox = function (details) {
    var title = details.title;
    var description = details.description;

    this.element = document.createElement('div');
    this.element.setAttribute('class', 'infoBox');

    var titleElement = document.createElement('div');
    titleElement.setAttribute('class', 'infoBoxTitle');
    titleElement.innerText = title;

    var descriptionElement = document.createElement('div');
    descriptionElement.innerText = description;

    var buttonElement = document.createElement('button');
    buttonElement.innerText = 'Continue';
    buttonElement.addEventListener('click', () => {
        document.body.removeChild(this.element);
    });

    this.element.appendChild(titleElement);
    this.element.appendChild(document.createElement('br'));
    this.element.appendChild(document.createElement('br'));
    this.element.appendChild(descriptionElement);
    this.element.appendChild(document.createElement('br'));
    this.element.appendChild(document.createElement('br'));
    this.element.appendChild(buttonElement);
};