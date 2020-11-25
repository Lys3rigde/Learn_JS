'use strict';

let money = 34973984,
income = 'фриланс',
addExpenses = 'Такси, Еда, Пивас',
deposit = 7 === '7',
mission = 343434343434,
period = 7,
budgetDay = money/30,
expenses1,
expenses2,
amount1,
amount2,
missionTime,
accumulatedMonth;

money = prompt("Ваш месячный доход?");
addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
deposit = confirm("Есть ли у вас депозит в банке?");
expenses1 = prompt("Введите обязательную статью расходов");
amount1 = prompt("Во сколько это обойдется?");
expenses2 = prompt("Введите  еще одну обязательную статью расходов");
amount2 = prompt("Во сколько это обойдется?");

    function showTypeOf(money, income, deposit){
        console.log(typeof money);
        console.log(typeof income);
        console.log(typeof deposit);
    }
    showTypeOf(money, income, deposit);

    function getExpensesMonth(amount1, amount2){
        return Number(amount1) + Number(amount2);
    }

    function getAccumulatedMonth(money, amount1, amount2){
        return money - amount1 - amount2;
    }

    function getTargetMonth(mission, accumulatedMonth){
        return mission / accumulatedMonth;
    }

    accumulatedMonth = getAccumulatedMonth(money, amount1, amount2);
    missionTime = Math.ceil(mission / accumulatedMonth);
    budgetDay = Math.floor(accumulatedMonth/30);
    
    function getStatusIncome(){
        if (budgetDay >= 1200) {
            console.log("У вас высокий уровень дохода");
        }   else if(budgetDay >= 600) {
            console.log("У вас средний уровень дохода");
        }   else if(budgetDay >= 0) {
            console.log("К сожалению, ваш уровень дохода ниже среднего");
        }   else {
            console.log("Что-то пошло не так");
        }
    }
    
console.log(getExpensesMonth(amount1, amount2));
console.log(addExpenses.toLowerCase().split(', '));
console.log("Цель будет достигнута за: " + getTargetMonth(mission, accumulatedMonth));
console.log("Бюджет на день: " + budgetDay);
getStatusIncome();