'use strict';

let money = 34973984;
let income = 'фриланс';
let addExpenses = 'Такси, Еда, Пивас';
let deposit = 7 === '7';
let mission = 343434343434;
let period = 7;
let budgetDay = money/30;
let expenses1;
let expenses2;
let amount1;
let amount2;
let budgetMonth;
let missionTime;
console.log (typeof money);
console.log (typeof income);
console.log (typeof deposit);
console.log (addExpenses.length);
console.log ("Период равен " + period + " месяцам");
console.log ("Цель заработать " + mission + " гривен");
console.log(addExpenses.toLowerCase().split(', '));

money = prompt("Ваш месячный доход?");
addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
deposit = confirm("Есть ли у вас депозит в банке?");
expenses1 = prompt("Введите обязательную статью расходов");
amount1 = prompt("Во сколько это обойдется?");
expenses2 = prompt("Введите  еще одну обязательную статью расходов");
amount2 = prompt("Во сколько это обойдется?");
budgetMonth = money - (Number(amount1) + Number(amount2));
missionTime = Math.ceil(mission / budgetMonth);
budgetDay = Math.floor(budgetMonth/30);

    function getExpensesMonth(amount1, amount2){
        console.log();
        return expenses1 + expenses2;
    }

     if (budgetDay >= 1200) {
        console.log("У вас высокий уровень дохода");
    }   else if(budgetDay >= 600) {
        console.log("У вас средний уровень дохода");
    }   else if(budgetDay >= 0) {
        console.log("К сожалению, ваш уровень дохода ниже среднего");
    }   else {
        console.log("Что-то пошло не так");
    }

console.log("Бюджет на месяц: " + budgetMonth);
console.log("Цель будет достигнута за: " + missionTime);
console.log("Бюджет на день: " + budgetDay);