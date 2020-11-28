'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;


    let appData = {
        
        mission: 600000,
        budget: money,
        budgetDay: 0,
        budgetMonth: 0,
        expensesMonth: 0,
        expenses: {},
        asking: function(){
            for (let i = 0; i < 2; i++) {
                let exps1 = prompt("Введите обязательную статью расходов в этом месяце");
                let exps2 = +prompt("Во сколько обойдется?");
                while (!isNumber(exps2)) {
                    exps2 = +prompt("Во сколько обойдется?");
                }
                appData.expenses[exps1] = exps2;
            }
        }
    };

    appData.asking();

    do{
        appData.budget = prompt("Ваш месячный доход?");
    }
    while(!isNumber(appData.budget));

// let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую"),
// deposit = confirm("Есть ли у вас депозит в банке?");

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

