'use strict';

let start = document.getElementById('start'),
btnPlus0 = document.getElementsByTagName('button')[0],
btnPlus1 = document.getElementsByTagName('button')[1],
depositCheck = document.querySelector('#deposit-check'),
budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
epxensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
targetMonthValue = document.getElementsByClassName('target_month-value')[0],
salaryAmount = document.querySelector('.salary-amount'),
incomeTitle = document.querySelector('.income-title'),
expensesTitle = document.querySelector('.expenses-title'),
expensesItems = document.querySelectorAll('.expenses-items'),
additionalExpensesItem = document.querySelectorAll('.additional_expenses-item')[0],
additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
targetAmount = document.querySelector('.target-amount'),
periodSelect = document.querySelector('.period-select'),
budgetMonthValue = document.querySelector('.budget_month-value'),
incomeItems = document.querySelectorAll('.income-items'),
cancel = document.querySelector('#cancel');

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};


    let appData = {
        budget: 0,
        income: {},
        addIncome: [],
        period: 12,
        IncomeMonth: 0,
        addExpenses: [],
        deposit: false,
        budgetDay: 0,
        budgetMonth: 200000,
        expensesMonth: 0,
        incomeMonth: 0,
        percentDeposit: 0,
        moneyDeposit: 0,
        expenses: {},
        start: function () {

           appData.budget = +salaryAmount.value;
           
            appData.getExpenses();
            appData.getIncome();
            appData.getExpensesMonth();
            appData.getIncomeMonth();
            appData.getAddExpenses();
            appData.getAddIncome();
            appData.getBudget();
            appData.getStatusIncome();
            appData.getInfoDeposit();
            appData.calcSavedMoney();

            appData.showResult();
        },
        showResult: function() {
            budgetMonthValue.value = appData.budgetMonth;
            budgetDayValue.value = appData.budgetDay;
            epxensesMonthValue.value = appData.expensesMonth;
            additionalExpensesValue.value = appData.addExpenses.join(', ');
            additionalIncomeValue.value = appData.addIncome.join(', ');
            targetMonthValue.value = Math.ceil(appData.getTargetMonth());
            incomePeriodValue.value = appData.calcSavedMoney();
            
            const periodInput = document.querySelector('.period-select'),
            periodAmount = document.querySelector('.period-amount');
            periodInput.addEventListener('input', () => {
            periodAmount.innerHTML = periodInput.value;
            let calcSavedMoney =  appData.budgetMonth * periodAmount.textContent;
            incomePeriodValue.value = calcSavedMoney;
            });
            
        },

        addExpensesBlock: function() {
        
            let cloneExpensesItems = expensesItems[0].cloneNode(true);
            expensesItems[0].parentNode.insertBefore(cloneExpensesItems, btnPlus1);
            expensesItems = document.querySelectorAll('.expenses-items');
            
            if (expensesItems.length === 3) {
                btnPlus1.style.display = 'none';
            }
        },
        getExpenses: function () {
            expensesItems.forEach(function(item) {
                let itemExpenses = item.querySelector('.expenses-title').value;
                let cashExpenses = item.querySelector('.expenses-amount').value;
                if(itemExpenses !== '' && cashExpenses !== '') {
                    appData.expenses[itemExpenses] = cashExpenses;
                }
            });
        },

        addIncomeBlock: function() {

            let cloneIncomeItems = incomeItems[0].cloneNode(true);
            incomeItems[0].parentNode.insertBefore(cloneIncomeItems, btnPlus0);
            incomeItems = document.querySelectorAll('.income-items');

            if (incomeItems.length === 3) {
                btnPlus0.style.display = 'none';
            }
        },        
        getIncome: function() {
            incomeItems.forEach(function(item) {
                let itemIncome = item.querySelector('.income-title').value;
                let cashIncome = item.querySelector('.income-amount').value;
                if(itemIncome !== '' && cashIncome !== '') {
                    appData.income[itemIncome] = cashIncome;
                }
            });


        },
        getAddExpenses: function() {
            let addExpenses = additionalExpensesItem.value.split(',');
            addExpenses.forEach(function(item) {
                item = item.trim();
                if (item !== ''){
                    appData.addExpenses.push(item);
                }
            });
        },
        getAddIncome: function() {
            additionalIncomeItem.forEach(function(item) {
                let itemValue = item.value.trim();
                if (itemValue !== ''){
                    appData.addIncome.push(itemValue);
                }
            });
        },

        getInfoDeposit: function() {
            if(appData.deposit){
                appData.percentDeposit = +prompt("Какой ваш годовой процент?", 10);
                while(!isNumber(appData.percentDeposit)){
                    appData.percentDeposit = +prompt("Какой ваш годовой процент?", 10);
                }
                appData.moneyDeposit = +prompt("Какая сумма у вас заложена?", 20000);
                while(!isNumber(appData.moneyDeposit)){
                    appData.moneyDeposit = +prompt("Какая сумма у вас заложена?", 20000);
                }
            }
        },

        calcSavedMoney: function(){
            return appData.budgetMonth * periodSelect.value;
        }
        
    };

    start.addEventListener('click', function(event){
        event.preventDefault();
        if (salaryAmount.value === '') {
            alert("Ошибка, поле 'Месячный доход' должно быть заполнено");
        }   else if (!isNumber(salaryAmount.value)) {
            alert("Ошибка, введите числовое значение");
        }   else {
           appData.start();
        }
    });

    btnPlus1.addEventListener('click', appData.addExpensesBlock);
    btnPlus0.addEventListener('click', appData.addIncomeBlock);



    appData.getExpensesMonth = function(){ 
        for (let key in appData.expenses){
            appData.expensesMonth += +appData.expenses[key];
        }
    };
    appData.getIncomeMonth = function(){ 
        for (let key in appData.income){
            appData.incomeMonth += +appData.income[key];
        }
    };
    
    appData.getBudget = function(){
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth/30);
        return appData.budgetMonth, appData.budgetDay;
    };

    appData.getTargetMonth = function (){
        return targetAmount.value / appData.budgetMonth;
    };
    
    appData.targetMonth = appData.getTargetMonth(appData.mission, appData.accumulatedMonth);

        if (appData.targetMonth > 0){
            console.log("Цель будет достигнута за: " + Math.floor(appData.targetMonth) + " месяцев");
        }   else  if (appData.targetMonth <= 0){
            console.log("Цель не будет достигнута");
        }

    appData.getStatusIncome = function (){
        if (appData.budgetDay >= 1200) {
            console.log("У вас высокий уровень дохода");
        }   else if(appData.budgetDay >= 600) {
            console.log("У вас средний уровень дохода");
        }   else if(appData.budgetDay >= 0) {
            console.log("К сожалению, ваш уровень дохода ниже среднего");
        }   else {
            console.log("Что-то пошло не так");
        }
    };
    

const periodInput = document.querySelector('.period-select'),
periodAmount = document.querySelector('.period-amount');
periodInput.addEventListener('input', () => {
periodAmount.textContent = periodInput.value;
});