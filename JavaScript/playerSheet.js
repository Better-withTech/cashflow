console.log('Player Sheet');

function getAmount(id) {
    var text = document.getElementById(id).innerText;
    text = text.substring(1);

    return parseInt(text);
}

function recalculate() {
    var totalExpenses = getAmount('taxExpense') + getAmount('housingExpense') + getAmount('schoolExpense') + getAmount('carExpense') + getAmount('creditCardExpense') + getAmount('retailExpense') + getAmount('otherExpense') + getAmount('childExpense') + getAmount('bankLoanExpense');
    var passiveIncome = getAmount('interest') + getAmount('dividends') + getAmount('realEstateIncome') + getAmount('businessesIncome');
    var totalIncome = passiveIncome + getAmount('salary');
    var cashflow = totalIncome - totalExpenses;

    document.getElementById('totalExpenses').innerText = '$' + totalExpenses;
    document.getElementById('passiveIncome').innerText = '$' + passiveIncome;
    document.getElementById('totalIncome').innerText = '$' + totalIncome;
    document.getElementById('cashflow').innerText = '$' + cashflow;
}

function formatUI() {
    var moneyElements = document.getElementsByClassName('money');

    for (var element of moneyElements) {
        var text = element.innerText.substring(1);
        text = '$' + parseInt(text).toLocaleString();
        element.innerText = text;
    }
}

function getProfession() {
    var button = document.getElementById('professionButton');
    button.style.display = 'none';

    var profession = PROFESSIONS[Math.floor(Math.random() * PROFESSIONS.length)];

    document.getElementById('professionTitle').innerText = profession.title;
    document.getElementById('savings').innerText = '$' + profession.savings;
    document.getElementById('salary').innerText = '$' + profession.salary;
    document.getElementById('perChildExpense').innerText = '$' + profession.perChildExpense;
    document.getElementById('taxExpense').innerText = '$' + profession.expenses.tax;
    document.getElementById('housingExpense').innerText = '$' + profession.expenses.housing;
    document.getElementById('schoolExpense').innerText = '$' + profession.expenses.school;
    document.getElementById('carExpense').innerText = '$' + profession.expenses.car;
    document.getElementById('creditCardExpense').innerText = '$' + profession.expenses.creditCard;
    document.getElementById('retailExpense').innerText = '$' + profession.expenses.retail;
    document.getElementById('otherExpense').innerText = '$' + profession.expenses.other;
    document.getElementById('housingLiability').innerText = '$' + profession.liabilities.housing;
    document.getElementById('schoolLiability').innerText = '$' + profession.liabilities.school;
    document.getElementById('carLiability').innerText = '$' + profession.liabilities.car;
    document.getElementById('creditCardLiability').innerText = '$' + profession.liabilities.creditCard;
    document.getElementById('retailLiability').innerText = '$' + profession.liabilities.retail;

    recalculate();
    formatUI();
}
