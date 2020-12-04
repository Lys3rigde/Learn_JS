'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;


    let appData = {
        income: {},
        addIncome: [],
        period: 12,
        mission: 600000,
        addExpenses: [],
        deposit: false,
        budget: money,
        budgetDay: 0,
        budgetMonth: 200000,
        expensesMonth: 0,
        percentDeposit: 0,
        moneyDeposit: 0,
        expenses: {},
        asking: function(){

            if (confirm("Есть ли у вас дополнительный источник заработка?")) {
                let itemIncome = prompt("Какой у вас дополнительный заработок?", "таксую");
                while(isNumber(itemIncome)) {
                itemIncome = prompt("Какой у вас дополнительный заработок?", "таксую");
                }
                let cashIncome = +prompt("Сколько вы на этом зарабатываете?", 20000);
                while(!isNumber(cashIncome)) {
                    cashIncome = +prompt("Сколько вы на этом зарабатываете?", 20000);
                }
                appData.income[itemIncome] = cashIncome;
            }

            for (let i = 0; i < 2; i++) {
                let exps1 = prompt("Введите обязательную статью расходов в этом месяце");
                while (isNumber(exps1)) {
                    exps1 = prompt("Введите обязательную статью расходов в этом месяце");
                }
                let exps2 = +prompt("Во сколько обойдется?", 5000);
                while (!isNumber(exps2)) {
                    exps2 = +prompt("Во сколько обойдется?", 5000);
                }
                appData.expenses[exps1] = exps2;
            }
               
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
            return appData.budgetMonth * appData.period;
        }
        
    };

    do{
        appData.budget = prompt("Ваш месячный доход?", 50000);
    }

    while(!isNumber(appData.budget));

    appData.asking();



appData.addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую", "такси еда пивас");
appData.addExpenses = appData.addExpenses.split(' ').map(word=>{ return word[0].toUpperCase() + word.slice(1);});
appData.strExpenses = appData.addExpenses.join(', ');
console.log(appData.strExpenses);
appData.deposit = confirm("Есть ли у вас депозит в банке?");

    appData.getExpensesMonth = function(){ 
        for (let key in appData.expenses){
            appData.expensesMonth += +appData.expenses[key];
        }
    };
    appData.getExpensesMonth();
    console.log("Расходы за месяц: " + appData.expensesMonth + " рублей");

    appData.getBudget = function(money, expensesMonth){
        return appData.budget - appData.expensesMonth;
    };
    appData.accumulatedMonth = appData.getBudget(appData.budget, appData.expensesMonth);

    appData.getTargetMonth = function (mission, accumulatedMonth){
        return appData.mission / appData.accumulatedMonth;
    };
    
    appData.targetMonth = appData.getTargetMonth(appData.mission, appData.accumulatedMonth);

        if (appData.targetMonth > 0){
            console.log("Цель будет достигнута за: " + Math.floor(appData.targetMonth) + " месяцев");
        }   else  if (appData.targetMonth <= 0){
            console.log("Цель не будет достигнута");
        }

    appData.budgetDay = Math.floor(appData.accumulatedMonth/30);
    
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
    appData.getStatusIncome();

    console.log("Наша программа включает в себя данные:");
    for (let key in appData) {
        console.log(key + ": " + appData[key]);
    }

    appData.getInfoDeposit();
    appData.calcSavedMoney();

    const start = document.getElementById('start'),
    btnPlus0 = document.getElementsByTagName('button')[0],
    btnPlus1 = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    incomeItem = document.querySelectorAll('.additional_income-item'),
    budgetDayValue = document.getElementsByClassName('budget_day-value'),
    epxensesMonthValue = document.getElementsByClassName('expenses_month-value'),
    additionalIncomeValue = document.getElementsByClassName('additional_income-value'),
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value'),
    incomePeriodValue = document.getElementsByClassName('income_period-value'),
    targetMonthValue = document.getElementsByClassName('target_month-value'),
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesAmout = document.querySelector('.expenses-amount'),
    additionalExpensesTitle = document.querySelector('.additional-expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    budgetMonth = document.querySelector('budget_month-value'),
    cancel = document.querySelector('#cancel');