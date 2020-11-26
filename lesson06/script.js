'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
sum = 0,
income = 'фриланс',
mission = 600000,
period = 7,
budgetDay = money/30,
missionTime,
accumulatedMonth,
expenses = [];

do{
    money = prompt("Ваш месячный доход?");
}
while(!isNumber(money));

let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую"),
deposit = confirm("Есть ли у вас депозит в банке?");
// expenses1 = prompt("Введите обязательную статью расходов"),
// amount1 = prompt("Во сколько это обойдется?"),
// expenses2 = prompt("Введите  еще одну обязательную статью расходов"),
// amount2 = prompt("Во сколько это обойдется?");

    function showTypeOf(money, income, deposit){
        console.log(typeof money);
        console.log(typeof income);
        console.log(typeof deposit);
    }
    showTypeOf(money, income, deposit);

    let getExpensesMonth = function(){
        
        for (let i = 0; i < 2; i++) {
            expenses[i] = prompt("Введите обязательную статью расходов");
            let sum2;
            sum2 = prompt("Во сколько это обойдется?");
            
            // sum += +prompt("Во сколько это обойдется?");
            while (!isNumber(sum2)) {
                sum2 = prompt("Во сколько это обойдется?");
                
            }
            sum += +sum2;
        }

        return(sum);
    };

    let expensesAmount = getExpensesMonth();

    function getAccumulatedMonth(money, expensesAmount){
        return money - expensesAmount;
    }
    accumulatedMonth = getAccumulatedMonth(money, expensesAmount);

    function getTargetMonth (mission, accumulatedMonth){
        return mission / accumulatedMonth;
    }

    let targetMonth = getTargetMonth(mission, accumulatedMonth);

        if (targetMonth > 0){
            console.log("Цель будет достигнута за: " + targetMonth);
        }   else  if (targetMonth <= 0){
            console.log("Цель не будет достигнута");
        }

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
    
console.log(expensesAmount);
console.log(addExpenses.toLowerCase().split(', '));
console.log("Бюджет на день: " + budgetDay);
getStatusIncome();