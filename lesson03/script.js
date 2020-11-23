'use strict';

let money = 34973984;
console.log (typeof money);
let income = 'фриланс';
console.log (typeof income);
let addExpenses = 'Такси, Еда, Пивас';
let deposit = 7 === '7';
console.log (typeof deposit);
let mission = 343434343434;
let period = 7;
console.log (addExpenses.length);
console.log ("Период равен " + period + " месяцам");
console.log ("Цель заработать " + mission + " гривен");
console.log(addExpenses.toLowerCase(), addExpenses.split(', '));
let budgetDay = money/30;

money = prompt("Ваш месячный доход?");
addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
deposit = confirm("Есть ли у вас депозит в банке?");
let expenses1 = prompt("Введите обязательную статью расходов");
let amount1 = prompt("Во сколько это обойдется?");
let expenses2 = prompt("Введите  еще одну обязательную статью расходов");
let amount2 = prompt("Во сколько это обойдется?");
let budgetMonth = money - (Number(amount1) + Number(amount2));
console.log("Бюджет на месяц: " + budgetMonth);
let missionTime = Math.ceil(mission / budgetMonth);
console.log("Цель будет достигнута за: " + missionTime);
budgetDay = Math.floor(budgetMonth/30);
console.log("Бюджет на день: " + budgetDay);

    if (budgetDay >= 1200) {
        console.log("У вас высокий уровень дохода");
    }   else if(budgetDay >= 600) {
        console.log("У вас средний уровень дохода");
    }   else if(budgetDay >= 0) {
        console.log("К сожалению, ваш уровень дохода ниже среднего");
    }   else {
        console.log("Что-то пошло не так");
    }
