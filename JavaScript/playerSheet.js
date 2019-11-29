console.log('Player Sheet');

function doodadsBoxOpen() {
    document.getElementById('doodadsBox').style.display = 'block';
    document.getElementById('doodadsBoxInput').focus();
    document.addEventListener('keydown', doodadsBoxEnter);
}

function doodadsBoxEnter(e) {
    if (e.code === 'Enter') {
        doodadsBoxClose();
    }
}

function doodadsBoxClose() {
    var input = document.getElementById('doodadsBoxInput').value;

    if (input === '' || isNaN(input) || parseInt(input) < 0) {
        alert('ERROR!\n\n\"' + input + '\" is not a valid input!');
    } else {
        var amount = parseInt(input);
        var savings = getAmount('savings');
        savings -= amount;
        setAmount('savings', savings);

        document.getElementById('doodadsBox').style.display = 'none';
        document.getElementById('doodadsBoxInput').value = '';
        document.removeEventListener('keydown', doodadsBoxEnter);
    }
}

function realEstateBoxOpen() {
    document.getElementById('realEstateBox').style.display = 'block';
    document.addEventListener('keydown', realEstateBoxEnter);
}

function realEstateBoxEnter(e) {
    if (e.code === 'Enter') {
        realEstateBoxClose();
    }
}

function realEstateBoxClose() {
    var type = realEstateBoxGetType();
    var beds = document.getElementById('realEstateBoxBeds').value;
    var baths = document.getElementById('realEstateBoxBaths').value;
    var downPay = document.getElementById('realEstateBoxDownPay').value;
    var mortgage = document.getElementById('realEstateBoxMortgage').value;
    var cashflow = document.getElementById('realEstateBoxCashFlow').value;

    if (downPay === '' || isNaN(downPay) || parseInt(downPay) < 0) {
        alert('ERROR!\n\n\"' + downPay + '\" is not a valid input for Down Payment!');
    } else if (mortgage === '' || isNaN(mortgage) || parseInt(mortgage) < 0) {
        alert('ERROR!\n\n\"' + mortgage + '\" is not a valid input for Mortgage!');
    } else if (cashflow === '' || isNaN(cashflow)) {
        alert('ERROR!\n\n\"' + cashflow + '\" is not a valid input for Cash Flow!');
    } else {
        addRealEstate(type, beds, baths, downPay, mortgage, cashflow);

        document.getElementById('realEstateBox').style.display = 'none';
        document.getElementById('realEstateBoxBeds').value = '1';
        document.getElementById('realEstateBoxBaths').value = '1';
        document.getElementById('realEstateBoxDownPay').value = '';
        document.getElementById('realEstateBoxMortgage').value = '';
        document.getElementById('realEstateBoxCashFlow').value = '';
        document.removeEventListener('keydown', realEstateBoxEnter);
    }
}

function addRealEstate(type, beds, baths, downPay, mortgage, cashflow) {
    var savings = getAmount('savings');
    savings -= parseInt(downPay);
    setAmount('savings', savings);

    var realEstateIncome = getAmount('realEstateIncome');
    realEstateIncome += parseInt(cashflow);
    setAmount('realEstateIncome', realEstateIncome);

    recalculate();

    var realEstateTable = document.getElementById('realEstateTable');

    var row = document.createElement('tr');

    var typeCol = document.createElement('td');
    typeCol.innerText = type;

    var bedsCol = document.createElement('td');
    bedsCol.innerText = beds;

    var bathsCol = document.createElement('td');
    bathsCol.innerText = baths;

    var incomeCol = document.createElement('td');
    incomeCol.setAttribute('class', 'money');
    setAmount(incomeCol, parseInt(cashflow));

    var mortgageCol = document.createElement('td');
    mortgageCol.setAttribute('class', 'money');
    setAmount(mortgageCol, parseInt(mortgage));

    var buttonCol = document.createElement('td');
    var button = document.createElement('button');
    button.addEventListener('click', () => {
        removeRealEstate(row, type, beds, baths, mortgage, cashflow);
    });
    button.innerText = 'Sell';
    buttonCol.appendChild(button);

    row.appendChild(typeCol);
    row.appendChild(bedsCol);
    row.appendChild(bathsCol);
    row.appendChild(incomeCol);
    row.appendChild(mortgageCol);
    row.appendChild(buttonCol);

    realEstateTable.appendChild(row);
}

function removeRealEstate(element, type, beds, baths, mortgage, cashflow) {
    var infoBox = document.createElement('div');
    infoBox.setAttribute('class', 'infoBox');

    var header = document.createElement('div');
    header.setAttribute('class', 'header');
    header.innerText = 'Sell your ' + type;
    if (type !== 'Land') {
        header.innerText += ' ' + beds + 'Br/' + baths + 'Ba';
    }

    var description = document.createElement('div');
    description.innerText = 'How much do you sell it for?';

    var input = document.createElement('input');
    input.setAttribute('type', 'text');

    var button = document.createElement('button');
    button.addEventListener('click', () => {
        var isSuccessful = sellRealEstate(element, input.value, parseInt(mortgage), parseInt(cashflow));
        if (isSuccessful) {
            document.body.removeChild(infoBox);
        }
    });
    button.innerText = 'Sell';

    infoBox.appendChild(header);
    infoBox.appendChild(description);
    infoBox.appendChild(input);
    infoBox.appendChild(button);

    document.body.appendChild(infoBox);
}

function sellRealEstate(element, sellAmount, mortgage, cashflow) {
    if (sellAmount === '' || isNaN(sellAmount) || sellAmount < 0) {
        alert('ERROR!\n\n\"' + sellAmount + '\" is not a valid input!');

        return false;
    } else {
        sellAmount = parseInt(sellAmount);
        var proceeds = sellAmount - mortgage;
        var savings = getAmount('savings');
        savings += proceeds;
        setAmount('savings', savings);

        var realEstateIncome = getAmount('realEstateIncome');
        realEstateIncome -= cashflow;
        setAmount('realEstateIncome', realEstateIncome);

        recalculate();

        element.style.display = 'none';

        return true;
    }
}

function realEstateBoxGetType() {
    var choices = document.getElementsByName('realEstateType');

    for (var choice of choices) {
        if (choice.checked) {
            return choice.value;
        }
    }
}

function stocksBoxOpen() {
    document.getElementById('stocksBox').style.display = 'block';
}

function stocksBoxClose() {
    var name = document.getElementById('stocksBoxName').value;
    var price = document.getElementById('stocksBoxPrice').value;
    var units = document.getElementById('stocksBoxUnits').value;
    var income = document.getElementById('stocksBoxIncome').value;
    income = income === '' ? '0' : income;

    if (name === '') {
        alert('ERROR!\n\n\"' + name + '\" is not a valid input!');
    } else if (price === '' || isNaN(price) || parseInt(price) < 0) {
        alert('ERROR!\n\n\"' + price + '\" is not a valid input!');
    } else if (units === '' || isNaN(units) || parseInt(units) < 0) {
        alert('ERROR!\n\n\"' + units + '\" is not a valid input!');
    } else if (isNaN(income) || parseInt(income) < 0) {
        alert('ERROR!\n\n\"' + income + '\" is not a valid input!');
    } else {
        addStock(name, parseInt(price), parseInt(units), parseInt(income));
        document.getElementById('stocksBox').style.display = 'none';
        document.getElementById('stocksBoxName').value = '';
        document.getElementById('stocksBoxPrice').value = '';
        document.getElementById('stocksBoxUnits').value = '';
        document.getElementById('stocksBoxIncome').value = '';
    }
}

function addStock(name, price, units, income) {
    var cost = price * units;
    var savings = getAmount('savings');
    savings -= cost;
    setAmount('savings', savings);

    var dividendsInterestIncome = getAmount('dividendsInterestIncome');
    dividendsInterestIncome += income;
    setAmount('dividendsInterestIncome', dividendsInterestIncome);

    recalculate();

    var stocksTable = document.getElementById('stocksTable');

    var row = document.createElement('tr');

    var nameCol = document.createElement('td');
    nameCol.innerText = name;

    var unitsCol = document.createElement('td');
    unitsCol.innerText = units;

    var buttonCol = document.createElement('td');
    var button = document.createElement('button');
    button.addEventListener('click', () => {
        removeStock(row, name, units, income);
    });
    button.innerText = 'Sell';
    buttonCol.appendChild(button);

    row.appendChild(nameCol);
    row.appendChild(unitsCol);

    if (income <= 0) {
        var splitButtonCol = document.createElement('td');

        var splitButton = document.createElement('button');
        splitButton.addEventListener('click', () => {
            var units = parseInt(unitsCol.innerText);
            units *= 2;
            unitsCol.innerText = units;
        });
        splitButton.innerText = 'Split';

        var reverseSplitButton = document.createElement('button');
        reverseSplitButton.addEventListener('click', () => {
            var units = parseInt(unitsCol.innerText);
            units /= 2;
            units = Math.floor(units);
            unitsCol.innerText = units;
        });
        reverseSplitButton.innerText = 'Reverse Split';

        splitButtonCol.appendChild(splitButton);
        splitButtonCol.appendChild(reverseSplitButton);

        row.appendChild(splitButtonCol);
    } else {
        var incomeCol = document.createElement('td');
        incomeCol.setAttribute('class', 'money');
        setAmount(incomeCol, income);

        row.appendChild(incomeCol);
    }

    row.appendChild(buttonCol);

    stocksTable.appendChild(row);
}

function removeStock(element, name, units, income) {
    var infoBox = document.createElement('div');
    infoBox.setAttribute('class', 'infoBox');

    var header = document.createElement('div');
    header.setAttribute('class', 'header');
    header.innerText = 'Sell ' + name;

    var description = document.createElement('div');
    description.innerText = 'What is the cost per unit?';

    var input = document.createElement('input');
    input.setAttribute('type', 'text');

    var button = document.createElement('button');
    button.addEventListener('click', () => {
        var isSuccessful = sellStock(element, input.value, units, income);
        if (isSuccessful) {
            document.body.removeChild(infoBox);
        }
    });
    button.innerText = 'Sell';

    infoBox.appendChild(header);
    infoBox.appendChild(description);
    infoBox.appendChild(input);
    infoBox.appendChild(button);

    document.body.appendChild(infoBox);
}

function sellStock(element, price, units, income) {
    if (price === '' || isNaN(price) || parseInt(price) < 0) {
        alert('ERROR!\n\n\"' + price + '\" is not a valid input!');

        return false;
    } else {
        price = parseInt(price);
        var sellAmount = price * units;
        var savings = getAmount('savings');
        savings += sellAmount;
        setAmount('savings', savings);

        var dividendsInterestIncome = getAmount('dividendsInterestIncome');
        dividendsInterestIncome -= income;
        setAmount('dividendsInterestIncome', dividendsInterestIncome);

        recalculate();

        element.style.display = 'none';

        return true;
    }
}

function businessBoxOpen() {
    document.getElementById('businessBox').style.display = 'block';
}

function businessBoxClose() {
    var name = document.getElementById('businessBoxName').value;
    var liability = document.getElementById('businessBoxLiability').value;
    var downPay = document.getElementById('businessBoxDownPay').value;
    var cashflow = document.getElementById('businessBoxCashFlow').value;

    if (name === '') {
        alert('ERROR!\n\n\"' + name + '\" is not a valid input!');
    } else if (liability === '' || isNaN(liability) || parseInt(liability) < 0) {
        alert('ERROR!\n\n\"' + liability + '\" is not a valid input!');
    } else if (downPay === '' || isNaN(downPay) || parseInt(downPay) < 0) {
        alert('ERROR!\n\n\"' + downPay + '\" is not a valid input!');
    } else if (cashflow === '' || isNaN(cashflow)) {
        alert('ERROR!\n\n\"' + cashflow + '\" is not a valid input!');
    } else {
        addBusiness(name, parseInt(liability), parseInt(downPay), parseInt(cashflow));
        document.getElementById('businessBox').style.display = 'none';
        document.getElementById('businessBoxName').value = '';
        document.getElementById('businessBoxLiability').value = '';
        document.getElementById('businessBoxDownPay').value = '';
        document.getElementById('businessBoxCashFlow').value = '';
    }
}

function addBusiness(name, liability, downPay, cashflow) {
    var savings = getAmount('savings');
    savings -= downPay;
    setAmount('savings', savings);

    var businessesIncome = getAmount('businessesIncome');
    businessesIncome += cashflow;
    setAmount('businessesIncome', businessesIncome);

    recalculate();

    var businessesTable = document.getElementById('businessesTable');

    var row = document.createElement('tr');

    var nameCol = document.createElement('td');
    nameCol.innerText = name;

    var incomeCol = document.createElement('td');
    incomeCol.setAttribute('class', 'money');
    setAmount(incomeCol, cashflow);

    var liabilityCol = document.createElement('td');
    liabilityCol.setAttribute('class', 'money');
    setAmount(liabilityCol, liability);

    var buttonCol = document.createElement('td');
    var button = document.createElement('button');
    button.addEventListener('click', () => {
        removeBusiness(row, name, cashflow);
    });
    button.innerText = 'Sell';
    buttonCol.appendChild(button);

    row.appendChild(nameCol);
    row.appendChild(incomeCol);
    row.appendChild(liabilityCol);
    row.appendChild(buttonCol);

    businessesTable.appendChild(row);
}

function removeBusiness(element, name, cashflow) {
    var infoBox = document.createElement('div');
    infoBox.setAttribute('class', 'infoBox');

    var header = document.createElement('div');
    header.setAttribute('class', 'header');
    header.innerText = 'Sell ' + name;

    var description = document.createElement('div');
    description.innerText = 'How much are you selling the business for?';

    var input = document.createElement('input');
    input.setAttribute('type', 'text');

    var button = document.createElement('button');
    button.addEventListener('click', () => {
        var isSuccessful = sellBusiness(element, input.value, cashflow);
        if (isSuccessful) {
            document.body.removeChild(infoBox);
        }
    });
    button.innerText = 'Sell';

    infoBox.appendChild(header);
    infoBox.appendChild(description);
    infoBox.appendChild(input);
    infoBox.appendChild(button);

    document.body.appendChild(infoBox);
}

function sellBusiness(element, sellAmount, cashflow) {
    if (sellAmount === '' || isNaN(sellAmount) || parseInt(sellAmount) < 0) {
        alert('ERROR!\n\n\"' + sellAmount + '\" is not a valid input!');

        return false;
    } else {
        sellAmount = parseInt(sellAmount);
        var savings = getAmount('savings');
        savings += sellAmount;
        setAmount('savings', savings);

        var businessesIncome = getAmount('businessesIncome');
        businessesIncome -= cashflow;
        setAmount('businessesIncome', businessesIncome);

        recalculate();

        element.style.display = 'none';

        return true;
    }
}

function haveBaby() {
    var babies = document.getElementById('babies').innerText;
    babies = parseInt(babies);

    if (babies < 3) {
        babies++;
        document.getElementById('babies').innerText = babies;

        var childExpense = getAmount('childExpense');
        var perChildExpense = getAmount('perChildExpense');
        childExpense += perChildExpense;
        setAmount('childExpense', childExpense);

        recalculate();
    } else {
        alert('You already have the max amount of babies!');
    }
}

function addBankLoan() {
    var savings = getAmount('savings');
    savings += 1000;
    setAmount('savings', savings);

    var bankLoanLiability = getAmount('bankLoanLiability');
    bankLoanLiability += 1000;
    setAmount('bankLoanLiability', bankLoanLiability);

    var bankLoanExpense = getAmount('bankLoanExpense');
    bankLoanExpense += 100;
    setAmount('bankLoanExpense', bankLoanExpense);

    recalculate();
}

function payBankLoan() {
    var savings = getAmount('savings');
    var bankLoanLiability = getAmount('bankLoanLiability');

    if (savings >= 1000 && bankLoanLiability > 0) {
        savings -= 1000;
        setAmount('savings', savings);

        bankLoanLiability -= 1000;
        setAmount('bankLoanLiability', bankLoanLiability);

        var bankLoanExpense = getAmount('bankLoanExpense');
        bankLoanExpense -= 100;
        setAmount('bankLoanExpense', bankLoanExpense);

        recalculate();
    }
}

function getAmount(id) {
    var text = document.getElementById(id).innerText;
    text = text.substring(1);
    text = text.replace(',', '');

    return parseInt(text);
}

function setAmount(id, amount) {
    amount = amount.toLocaleString();
    var element = id instanceof Element ? id : document.getElementById(id);
    element.innerText = '$' + amount;
}

function recalculate() {
    var totalExpenses = getAmount('taxExpense') + getAmount('housingExpense') + getAmount('schoolExpense') + getAmount('carExpense') + getAmount('creditCardExpense') + getAmount('retailExpense') + getAmount('otherExpense') + getAmount('childExpense') + getAmount('bankLoanExpense');
    var passiveIncome = getAmount('dividendsInterestIncome') + getAmount('realEstateIncome') + getAmount('businessesIncome');
    var totalIncome = passiveIncome + getAmount('salary');
    var cashflow = totalIncome - totalExpenses;

    setAmount('totalExpenses', totalExpenses);
    setAmount('passiveIncome', passiveIncome);
    setAmount('totalIncome', totalIncome);
    setAmount('cashflow', cashflow);
}

function payCheck() {
    var cashflow = getAmount('cashflow');
    var savings = getAmount('savings');
    savings += cashflow;
    setAmount('savings', savings);
}

function getProfession() {
    var button = document.getElementById('professionButton');
    button.style.display = 'none';

    var profession = PROFESSIONS[Math.floor(Math.random() * PROFESSIONS.length)];

    document.getElementById('professionTitle').innerText = profession.title;

    setAmount('savings', profession.savings);
    setAmount('salary', profession.salary);
    setAmount('perChildExpense', profession.perChildExpense);
    setAmount('taxExpense', profession.expenses.tax);
    setAmount('housingExpense', profession.expenses.housing);
    setAmount('schoolExpense', profession.expenses.school);
    setAmount('carExpense', profession.expenses.car);
    setAmount('creditCardExpense', profession.expenses.creditCard);
    setAmount('retailExpense', profession.expenses.retail);
    setAmount('otherExpense', profession.expenses.other);
    setAmount('housingLiability', profession.liabilities.housing);
    setAmount('schoolLiability', profession.liabilities.school);
    setAmount('carLiability', profession.liabilities.car);
    setAmount('creditCardLiability', profession.liabilities.creditCard);
    setAmount('retailLiability', profession.liabilities.retail);

    recalculate();
}
