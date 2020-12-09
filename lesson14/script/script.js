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
incomeTitle = document.querySelectorAll('.income-title'),
expensesTitle = document.querySelectorAll('.expenses-title'),
expensesItems = document.querySelectorAll('.expenses-items'),
additionalExpensesItem = document.querySelectorAll('.additional_expenses-item')[0],
additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
targetAmount = document.querySelector('.target-amount'),
periodSelect = document.querySelector('.period-select'),
budgetMonthValue = document.querySelector('.budget_month-value'),
incomeItems = document.querySelectorAll('.income-items'),
incomeAmount = document.querySelector('.income-amount'),
expensesAmount = document.querySelector('.expenses-amount'),
cancel = document.querySelector('#cancel'),
periodAmount = document.querySelector('.period-amount');

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};


function salaryUpdateValue(e) {
    let periodAmount = document.querySelector('.salary-amount');
    periodAmount.value =  periodAmount.value.replace(/[^0-9]/,'');
 }
 salaryAmount.addEventListener('input', salaryUpdateValue);

function incomeAmountUpdateValue(e) {
    let periodAmount = document.querySelector('.income-amount');
    periodAmount.value =  periodAmount.value.replace(/[^0-9]/,'');
 }
 incomeAmount.addEventListener('input', incomeAmountUpdateValue);
 
 function expensesAmountUpdateValue(e) {
    let periodAmount = document.querySelector('.expenses-amount');
    periodAmount.value =  periodAmount.value.replace(/[^0-9]/,'');
 }
 expensesAmount.addEventListener('input', expensesAmountUpdateValue);

 function targetAmountUpdateValue(e) {
    let periodAmount = document.querySelector('.target-amount');
    periodAmount.value =  periodAmount.value.replace(/[^0-9]/,'');
 }
 targetAmount.addEventListener('input', targetAmountUpdateValue);

 function incomeTitleUpdateValue(e) {
    let periodAmount = document.querySelectorAll('.income-title')[1];
    periodAmount.value =  periodAmount.value.replace(/[^а-яА-Я,.?!;":]/,'');
 }
 incomeTitle[1].addEventListener('input', incomeTitleUpdateValue);

 function expensesTitleUpdateValue(e) {
    let periodAmount = document.querySelectorAll('.expenses-title')[1];
    periodAmount.value =  periodAmount.value.replace(/[^а-яА-Я,.?!;":]/,'');
 }
 expensesTitle[1].addEventListener('input', expensesTitleUpdateValue);

 function additionalIncomeFirstItemUpdateValue(e) {
    let periodAmount = document.querySelectorAll('.additional_income-item')[0];
    periodAmount.value =  periodAmount.value.replace(/[^а-яА-Я,.?!;":]/,'');
 }
 additionalIncomeItem[0].addEventListener('input', additionalIncomeFirstItemUpdateValue);

 function additionalIncomeSecondItemUpdateValue(e) {
    let periodAmount = document.querySelectorAll('.additional_income-item')[1];
    periodAmount.value =  periodAmount.value.replace(/[^а-яА-Я,.?!;":]/,'');
 }
 additionalIncomeItem[1].addEventListener('input', additionalIncomeSecondItemUpdateValue);

    const AppData = function () {



   };

    const  appData = new AppData ();

    console.log(appData);

/*

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

    cancel.addEventListener('click', appData.reset.bind(appData));

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
    

let periodInput = document.querySelector('.period-select');
periodInput.addEventListener('input', () => {
periodAmount.textContent = periodInput.value;
});

*/