console.log('Player Sheet');

function getAmount(id) {
    var text = document.getElementById(id).innerText;
    text = text.substring(1);
    text = text.replace(',', '');

    return parseInt(text);
}

function setAmount(id, amount) {
    amount = amount.toLocaleString();
    document.getElementById(id).innerText = '$' + amount;
}

function recalculate() {
    var totalExpenses = getAmount('taxExpense') + getAmount('housingExpense') + getAmount('schoolExpense') + getAmount('carExpense') + getAmount('creditCardExpense') + getAmount('retailExpense') + getAmount('otherExpense') + getAmount('childExpense') + getAmount('bankLoanExpense');
    var passiveIncome = getAmount('interest') + getAmount('dividends') + getAmount('realEstateIncome') + getAmount('businessesIncome');
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
