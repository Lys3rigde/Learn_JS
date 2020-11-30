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
                let itemIncome = prompt("Какой у вас дополнительный заработок?");
                while(isNumber(itemIncome)) {
                itemIncome = prompt("Какой у вас дополнительный заработок?");
                }
                let cashIncome = +prompt("Сколько вы на этом зарабатываете?");
                while(!isNumber(cashIncome)) {
                    cashIncome = +prompt("Сколько вы на этом зарабатываете?");
                }
                appData.income[itemIncome] = cashIncome;
            }

            for (let i = 0; i < 2; i++) {
                let exps1 = prompt("Введите обязательную статью расходов в этом месяце");
                while (isNumber(exps1)) {
                    exps1 = prompt("Введите обязательную статью расходов в этом месяце");
                }
                let exps2 = +prompt("Во сколько обойдется?");
                while (!isNumber(exps2)) {
                    exps2 = +prompt("Во сколько обойдется?");
                }
                appData.expenses[exps1] = exps2;
            }
               
        },

        getInfoDeposit: function() {
            if(appData.deposit){
                appData.percentDeposit = +prompt("Какой ваш годовой процент?");
                while(!isNumber(appData.percentDeposit)){
                    appData.percentDeposit = +prompt("Какой ваш годовой процент?");
                }
                appData.moneyDeposit = +prompt("Какая сумма у вас заложена?");
                while(!isNumber(appData.moneyDeposit)){
                    appData.moneyDeposit = +prompt("Какая сумма у вас заложена?");
                }
            }
        },

        calcSavedMoney: function(){
            return appData.budgetMonth * appData.period;
        }
        
    };

    do{
        appData.budget = prompt("Ваш месячный доход?");
    }

    while(!isNumber(appData.budget));

    appData.asking();



appData.addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
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