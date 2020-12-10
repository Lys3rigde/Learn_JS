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

        this.budget = 0;
        this.income = {};
        this.addIncome = [];
        this.period = 12;
        this.addExpenses = [];
        this.deposit = false;
        this.budgetDay = 0;
        this.budgetMonth = 200000;
        this.expensesMonth = 0;
        this.incomeMonth = 0;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.expenses = {};

   };

   AppData.prototype.start = function () {

        if (salaryAmount.value !== '') {
            let allInputs = document.querySelectorAll('[type=text]');
            start.style.display = 'none';
            cancel.style.display = 'block';
            allInputs.forEach(function (e) {
                e.setAttribute('disabled', 'disabled');
            });
        

        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getIncomeMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.getStatusIncome();
        this.getInfoDeposit();
        this.calcSavedMoney();
        this.showResult();
        }

   };

   AppData.prototype.reset = function () {

    let allInputs = document.querySelectorAll('[type=text]'),
    incomeItems = document.querySelectorAll('.income-items'),
    expensesItems = document.querySelectorAll('.expenses-items');
    
    this.budget = 0;
    this.income = {};
    this.addIncome = [];
    this.addExpenses = [];
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.incomeMonth = 0;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.expenses = {};

    this.showResult();

    periodSelect.value = 1;
    periodAmount.textContent = periodSelect.value;
    targetMonthValue.value = 0;

    expensesItems.forEach(function(item, index){

        if ( index !== 0 ) {
            item.remove();
        }
    });

    incomeItems.forEach(function(item, index){

        if ( index !== 0 ) {
            item.remove();
        }
    });

    cancel.style.display = 'none';
    start.style.display = 'block';
    btnPlus0.style.display = 'block';
    btnPlus1.style.display = 'block';

    allInputs.forEach(function (e) {
        e.value = '';
        e.removeAttribute('disabled', 'disabled');
    });

   };

   AppData.prototype.showResult = function () {
    console.log(this);
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    epxensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcSavedMoney();
    const periodInput = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount');
    periodInput.addEventListener('input', () => {
    periodAmount.innerHTML = periodInput.value;
    let calcSavedMoney =  this.budgetMonth * periodAmount.textContent;
    incomePeriodValue.value = calcSavedMoney;
    });

   };

    AppData.prototype.expensesCloneAmountUpdateValue = function(e,d) {

        var incD = d.querySelector('.expenses-amount');
        incD.value =  incD.value.replace(/[^0-9]/,'');

    };

    AppData.prototype.expensesCloneTitleUpdateValue = function(e, d) {

        var incD = d.querySelector('.expenses-title');
        incD.value =  incD.value.replace(/[^а-яА-Я,.?!;":]/,'');

    };

    AppData.prototype.addExpensesBlock = function() {
        const _this = this;
        let cloneExpensesItems = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItems, btnPlus1);
        expensesItems = document.querySelectorAll('.expenses-items');
        cloneExpensesItems.querySelector('.expenses-title').value = '';
        cloneExpensesItems.querySelector('.expenses-amount').value = '';
        cloneExpensesItems.addEventListener('input', 
        (e)=> {_this.expensesCloneAmountUpdateValue(e, cloneExpensesItems );});
        cloneExpensesItems.addEventListener('input', 
        (e)=> {_this.expensesCloneTitleUpdateValue(e, cloneExpensesItems );});
        if (expensesItems.length === 3) {
            btnPlus1.style.display = 'none';
        }
    };

    AppData.prototype.getExpenses = function () {
        const _this = this;
        console.log(_this);
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== '') {
                _this.expenses[itemExpenses] = cashExpenses;
            }
        });
    };

    AppData.prototype.incomeCloneAmountUpdateValue = function(e, d) {

        var incD = d.querySelector('.income-amount');
        incD.value =  incD.value.replace(/[^0-9]/,'');

    };

    AppData.prototype.incomeCloneTitleUpdateValue = function(e, d) {

        var incD = d.querySelector('.income-title');
        incD.value =  incD.value.replace(/[^а-яА-Я,.?!;":]/,'');

    };


    AppData.prototype.addIncomeBlock = function() {
        const _this = this;
        console.log(_this);
        let cloneIncomeItems = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItems, btnPlus0);
        incomeItems = document.querySelectorAll('.income-items');
        cloneIncomeItems.querySelector('.income-title').value = '';
        cloneIncomeItems.querySelector('.income-amount').value = '';
        cloneIncomeItems.addEventListener('input', 
        (e)=> {_this.incomeCloneAmountUpdateValue(e, cloneIncomeItems );console.log(_this);});
        cloneIncomeItems.addEventListener('input', 
        (e)=> {_this.incomeCloneTitleUpdateValue(e, cloneIncomeItems );});

        if (incomeItems.length === 3) {
            btnPlus0.style.display = 'none';
        }
    };

    AppData.prototype.getIncome = function() {
        const _this = this;
        incomeItems.forEach(function(item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== '') {
                _this.income[itemIncome] = cashIncome;
            }
        });


    };

    AppData.prototype.getAddExpenses = function() {
        const _this = this;
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== ''){
                _this.addExpenses.push(item);
            }
        });
    };

    AppData.prototype.getAddIncome = function() {
        const _this = this;
        additionalIncomeItem.forEach(function(item) {
            let itemValue = item.value.trim();
            if (itemValue !== ''){
                _this.addIncome.push(itemValue);
            }
        });
    };

    AppData.prototype.getInfoDeposit = function() {
        const _this = this;
        if(_this.deposit){
            _this.percentDeposit = +prompt("Какой ваш годовой процент?", 10);
            while(!isNumber(_this.percentDeposit)){
                _this.percentDeposit = +prompt("Какой ваш годовой процент?", 10);
            }
            _this.moneyDeposit = +prompt("Какая сумма у вас заложена?", 20000);
            while(!isNumber(_this.moneyDeposit)){
                _this.moneyDeposit = +prompt("Какая сумма у вас заложена?", 20000);
            }
        }
    };

    AppData.prototype.calcSavedMoney = function(){
        return this.budgetMonth * periodSelect.value;
    };

    AppData.prototype.getExpensesMonth = function(){ 
        const _this = this;
        for (let key in _this.expenses){
            _this.expensesMonth += +_this.expenses[key];
        }
    };
    AppData.prototype.getIncomeMonth = function(){ 
        const _this = this;
        for (let key in _this.income){
            _this.incomeMonth += +_this.income[key];
        }
    };
    
    AppData.prototype.getBudget = function(){
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth/30);
        return this.budgetMonth, this.budgetDay;
    };

    AppData.prototype.getTargetMonth = function () {
    return targetAmount.value / this.budgetMonth;
    };

    AppData.prototype.getStatusIncome = function (){
        const _this = this;
        if (_this.budgetDay >= 1200) {
            console.log("У вас высокий уровень дохода");
        }   else if(_this.budgetDay >= 600) {
            console.log("У вас средний уровень дохода");
        }   else if(_this.budgetDay >= 0) {
            console.log("К сожалению, ваш уровень дохода ниже среднего");
        }   else {
            console.log("Что-то пошло не так");
        }
    };

    AppData.prototype.changePeriodAmount = function () {
        periodAmount.textContent = periodSelect.value;
    };
   

    const  appData = new AppData ();

    console.log(appData);

    AppData.prototype.eventListeners = function () {
    const _this = this;
    console.log(this);
        start.addEventListener('click', _this.start.bind(_this) ,function(event){
            event.preventDefault();
            if (salaryAmount.value === '') {
                alert("Ошибка, поле 'Месячный доход' должно быть заполнено");
            }   else if (!isNumber(salaryAmount.value)) {
                alert("Ошибка, введите числовое значение");
            }   else {
               _this.start();
            }
        });

        cancel.addEventListener('click', this.reset.bind(this));
        btnPlus1.addEventListener('click', this.addExpensesBlock.bind(this));
        btnPlus0.addEventListener('click', this.addIncomeBlock.bind(this));
        periodSelect.addEventListener('input', this.changePeriodAmount.bind(this));
        console.log(this);
   
    };  
    appData.eventListeners();


   
    
   


    
    



