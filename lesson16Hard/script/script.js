'use strict';

const start = document.getElementById(`start`),
btnPlus0 = document.getElementsByTagName(`button`)[0],
btnPlus1 = document.getElementsByTagName(`button`)[1],
depositCheck = document.querySelector(`#deposit-check`),
budgetDayValue = document.getElementsByClassName(`budget_day-value`)[0],
epxensesMonthValue = document.getElementsByClassName(`expenses_month-value`)[0],
additionalIncomeValue = document.getElementsByClassName(`additional_income-value`)[0],
additionalExpensesValue = document.getElementsByClassName(`additional_expenses-value`)[0],
incomePeriodValue = document.getElementsByClassName(`income_period-value`)[0],
targetMonthValue = document.getElementsByClassName(`target_month-value`)[0],
salaryAmount = document.querySelector(`.salary-amount`),
incomeTitle = document.querySelectorAll(`.income-title`),
expensesTitle = document.querySelectorAll(`.expenses-title`),
additionalExpensesItem = document.querySelectorAll(`.additional_expenses-item`)[0],
additionalIncomeItem = document.querySelectorAll(`.additional_income-item`),
targetAmount = document.querySelector(`.target-amount`),
periodSelect = document.querySelector(`.period-select`),
budgetMonthValue = document.querySelector(`.budget_month-value`),
incomeAmount = document.querySelector(`.income-amount`),
expensesAmount = document.querySelector(`.expenses-amount`),
cancel = document.querySelector(`#cancel`),
periodAmount = document.querySelector(`.period-amount`),
depositBank = document.querySelector(`.deposit-bank`),
depositAmount = document.querySelector(`.deposit-amount`),
depositPercent = document.querySelector(`.deposit-percent`),
resultInputs = document.querySelectorAll('.result input');

let expensesItems = document.querySelectorAll(`.expenses-items`),
incomeItems = document.querySelectorAll(`.income-items`),
leftInputs = document.querySelectorAll('.data input[type=text]'),
resultStorage = {};


const isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
};


 const salaryUpdateValue = (e) => {
    salaryAmount.value =  salaryAmount.value.replace(/[^0-9]/,``);
 };
 salaryAmount.addEventListener(`input`, salaryUpdateValue);

const incomeAmountUpdateValue = (e) => {
    incomeAmount.value =  incomeAmount.value.replace(/[^0-9]/,``);
 };
 incomeAmount.addEventListener(`input`, incomeAmountUpdateValue);
 
 const expensesAmountUpdateValue = (e) => {
    expensesAmount.value =  expensesAmount.value.replace(/[^0-9]/,``);
 };
 expensesAmount.addEventListener(`input`, expensesAmountUpdateValue);

 const targetAmountUpdateValue = (e) => {
    targetAmount.value =  targetAmount.value.replace(/[^0-9]/,``);
 };
 targetAmount.addEventListener(`input`, targetAmountUpdateValue);

 const incomeTitleUpdateValue = (e) => {
    incomeTitle[1].value =  incomeTitle[1].value.replace(/[^а-яА-Я,.?!;`:]/,``);
 };
 incomeTitle[1].addEventListener(`input`, incomeTitleUpdateValue);

 const expensesTitleUpdateValue = (e) => {
    expensesTitle[1].value =  expensesTitle[1].value.replace(/[^а-яА-Я,.?!;`:]/,``);
 };
 expensesTitle[1].addEventListener(`input`, expensesTitleUpdateValue);

 const additionalIncomeFirstItemUpdateValue = (e) => {
    const periodAmount = document.querySelectorAll(`.additional_income-item`)[0];
    periodAmount.value =  periodAmount.value.replace(/[^а-яА-Я,.?!;`:]/,``);
 };
 additionalIncomeItem[0].addEventListener(`input`, additionalIncomeFirstItemUpdateValue);

 const additionalIncomeSecondItemUpdateValue = (e) => {
    const periodAmount = document.querySelectorAll(`.additional_income-item`)[1];
    periodAmount.value =  periodAmount.value.replace(/[^а-яА-Я,.?!;`:]/,``);
 };
 additionalIncomeItem[1].addEventListener(`input`, additionalIncomeSecondItemUpdateValue);

 const addCookie = (key, value) => {
    let cookieStr = key + '=' + value;
    let date = Date.now() + 1000*60*60*24*7;
    date = new Date(date);
    cookieStr += '; expires = ' + date.toGMTString();
    document.cookie = cookieStr;
};
const removeCookie = (key) => {
    let cookieStr = key + '= ""';
    let date = Date.now() - 1000000;
    date = new Date(date);
    cookieStr += '; expires = ' + date.toGMTString();
    document.cookie = cookieStr;
};
const checkCookie = (resultObj) => {
    for (const key in resultObj) {
        if(!document.cookie.includes(key)) {return false;}
    }
    if(!document.cookie.includes('isLoad')) {return false;}
    return true;
};

const init = function() {
    if (localStorage.budget) {
        resultStorage = JSON.parse(localStorage.budget);
        if (checkCookie(resultStorage)) { 
            resultInputs.forEach(item => {
                item.value = resultStorage[item.classList[1]];
            });
            for (let input of leftInputs) {
                input.disabled = true;
            }
            start.style.display = 'none';
            cancel.style.display = 'block';
        } else { 
            for (const key in resultStorage) {
                removeCookie(key);
            }
            removeCookie('isLoad');
            localStorage.removeItem('budget');
        }
        
    } 
};

    class AppData {
        constructor(){
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
    
        }

        start () {

            if (salaryAmount.value !== ``) {
                const allInputs = document.querySelectorAll(`[type=text]`);
                start.style.display = `none`;
                cancel.style.display = `block`;
                allInputs.forEach( (e) => {
                    e.setAttribute(`disabled`, `disabled`);
                });
            
    
            this.budget = +salaryAmount.value;
            this.getExpenses();
            this.getIncome();
            this.getExpensesMonth();
            this.getIncomeMonth();
            this.getAddExpenses();
            this.getAddIncome();
            this.getInfoDeposit();
            this.getBudget();
            this.getStatusIncome();
            this.calcSavedMoney();
            this.showResult();
            this.saveToStorage();
            }
    
       }

       reset () {

        const allInputs = document.querySelectorAll(`[type=text]`),
        incomeItems = document.querySelectorAll(`.income-items`),
        expensesItems = document.querySelectorAll(`.expenses-items`);
        
        this.budget = 0;
        this.income = {};
        this.addIncome = [];
        this.addExpenses = [];
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.incomeMonth = 0;
        this.expenses = {};
    
        this.showResult();
    
        periodSelect.value = 1;
        periodAmount.textContent = periodSelect.value;
        targetMonthValue.value = 0;
    
        expensesItems.forEach( (item, index) => {
    
            if ( index !== 0 ) {
                item.remove();
            }
        });
    
        incomeItems.forEach(( item, index) => {
    
            if ( index !== 0 ) {
                item.remove();
            }
        });
    
        cancel.style.display = `none`;
        start.style.display = `block`;
        btnPlus0.style.display = `block`;
        btnPlus1.style.display = `block`;
    
        allInputs.forEach( (e) => {
            e.value = ``;
            e.removeAttribute(`disabled`, `disabled`);
        });

        for (const key in resultStorage) {
            removeCookie(key);
        }
        removeCookie('isLoad');
        localStorage.removeItem('budget');

    
       }

       saveToStorage() {
        const inputObj = {};
        for (let input of resultInputs) {
            inputObj[input.classList[1]] = input.value;
        }
        localStorage.budget = JSON.stringify(inputObj);

        addCookie('isLoad', 'true');
        for (const key in inputObj) {
            addCookie(key, inputObj[key]);
        }
        
    }

       showResult () {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        epxensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(`, `);
        additionalIncomeValue.value = this.addIncome.join(`, `);
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcSavedMoney();
        const periodInput = document.querySelector(`.period-select`),
        periodAmount = document.querySelector(`.period-amount`);
        periodInput.addEventListener(`input`, () => {
        periodAmount.innerHTML = periodInput.value;
        const calcSavedMoney =  this.budgetMonth * periodAmount.textContent;
        incomePeriodValue.value = calcSavedMoney;
        });
    
       }

       expensesCloneAmountUpdateValue (e,d) {

        const incD = d.querySelector(`.expenses-amount`);
        incD.value =  incD.value.replace(/[^0-9]/,``);

       }

       expensesCloneTitleUpdateValue (e, d) {

        const incD = d.querySelector(`.expenses-title`);
        incD.value =  incD.value.replace(/[^а-яА-Я,.?!;`:]/,``);

       }


       addExpensesBlock () {
        const _this = this;
        const cloneExpensesItems = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItems, btnPlus1);
        expensesItems = document.querySelectorAll(`.expenses-items`);
        cloneExpensesItems.querySelector(`.expenses-title`).value = ``;
        cloneExpensesItems.querySelector(`.expenses-amount`).value = ``;
        cloneExpensesItems.addEventListener(`input`, 
        (e)=> {_this.expensesCloneAmountUpdateValue(e, cloneExpensesItems );});
        cloneExpensesItems.addEventListener(`input`, 
        (e)=> {_this.expensesCloneTitleUpdateValue(e, cloneExpensesItems );});
        if (expensesItems.length === 3) {
            btnPlus1.style.display = `none`;
            }
        }

        getExpenses ()  {
            const _this = this;
            expensesItems.forEach((item) => {
                const itemExpenses = item.querySelector(`.expenses-title`).value;
                const cashExpenses = item.querySelector(`.expenses-amount`).value;
                if(itemExpenses !== `` && cashExpenses !== ``) {
                    _this.expenses[itemExpenses] = cashExpenses;
                }
            });
        }

        incomeCloneAmountUpdateValue (e, d) {

            const incD = d.querySelector(`.income-amount`);
            incD.value =  incD.value.replace(/[^0-9]/,``);
    
        }

        incomeCloneTitleUpdateValue (e, d) {

            const incD = d.querySelector(`.income-title`);
            incD.value =  incD.value.replace(/[^а-яА-Я,.?!;`:]/,``);
    
        }

        addIncomeBlock ()  {
            const _this = this;
            const cloneIncomeItems = incomeItems[0].cloneNode(true);
            incomeItems[0].parentNode.insertBefore(cloneIncomeItems, btnPlus0);
            incomeItems = document.querySelectorAll(`.income-items`);
            cloneIncomeItems.querySelector(`.income-title`).value = ``;
            cloneIncomeItems.querySelector(`.income-amount`).value = ``;
            cloneIncomeItems.addEventListener(`input`, 
            (e)=> {_this.incomeCloneAmountUpdateValue(e, cloneIncomeItems );});
            cloneIncomeItems.addEventListener(`input`, 
            (e)=> {_this.incomeCloneTitleUpdateValue(e, cloneIncomeItems );});
    
            if (incomeItems.length === 3) {
                btnPlus0.style.display = `none`;
            }
        }
    
        getIncome () {
            const _this = this;
            incomeItems.forEach((item) => {
                const itemIncome = item.querySelector(`.income-title`).value;
                const cashIncome = item.querySelector(`.income-amount`).value;
                if(itemIncome !== `` && cashIncome !== ``) {
                    _this.income[itemIncome] = cashIncome;
                }
            });
        }

        getAddExpenses () {
            const _this = this;
            const addExpenses = additionalExpensesItem.value.split(`,`);
            addExpenses.forEach((item) => {
                item = item.trim();
                if (item !== ``){
                    _this.addExpenses.push(item);
                }
            });
        }
    
        getAddIncome () {
            const _this = this;
            additionalIncomeItem.forEach((item) => {
                const itemValue = item.value.trim();
                if (itemValue !== ``){
                    _this.addIncome.push(itemValue);
                }
            });
        }
    
        calcSavedMoney () {
            return this.budgetMonth * periodSelect.value;
        }

        getExpensesMonth () { 
            const _this = this;
            for (let key in _this.expenses){
                _this.expensesMonth += +_this.expenses[key];
            }
        }

        getIncomeMonth () { 
            const _this = this;
            for (let key in _this.income){
                _this.incomeMonth += +_this.income[key];
            }
        }

        getBudget () {
            const monthDeposit = this.moneyDeposit * this.percentDeposit;
            this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
            this.budgetDay = Math.floor(this.budgetMonth/30);
            return this.budgetMonth, this.budgetDay;
        }

        getTargetMonth ()  {
            return targetAmount.value / this.budgetMonth;
            }
        
        getStatusIncome ()  {
            const _this = this;
            if (_this.budgetDay >= 1200) {
                console.log(`У вас высокий уровень дохода`);
            }   else if(_this.budgetDay >= 600) {
                console.log(`У вас средний уровень дохода`);
            }   else if(_this.budgetDay >= 0) {
                console.log(`К сожалению, ваш уровень дохода ниже среднего`);
            }   else {
                console.log(`Что-то пошло не так`);
            }
        }

        changePeriodAmount () {
            periodAmount.textContent = periodSelect.value;
        }

        getInfoDeposit() {

            if (this.deposit) {
                this.percentDeposit = depositPercent.value;
                this.moneyDeposit = depositAmount.value;
            }

        }

        changePercent() {
            const valueSelect =  this.value; 
                if (valueSelect === `other`) {
                    depositPercent.value = '';
                    depositPercent.addEventListener('input', function(){
                        if (
                            depositPercent.value !== depositPercent.value.replace(/[^0-9]/, '') || 
                            depositPercent.value > 100 ||
                            depositPercent.value < 0 
                        ) {
                            alert(`Введите корректное значение в строке "Проценты"`);
                            start.disabled = true;
                        }   else {
                            start.disabled = false;
                        }  
                    }); 
                    depositPercent.style.display = `inline-block`;
                }   else {
                    depositPercent.style.display = `none`;
                    depositPercent.value = valueSelect;
                }
            console.log(valueSelect);
        }

        depositHandler () {
            if (depositCheck.checked) {
                depositBank.style.display = `inline-block`;
                depositAmount.style.display = `inline-block`;
                this.deposit = true;
                depositBank.addEventListener('change', this.changePercent);
                depositPercent.disabled = false;
            }   else {
                depositBank.style.display = `none`;
                depositAmount.style.display = `none`;
                depositPercent.style.display = `none`;
                depositPercent.disabled = true;
                depositBank.value = '';
                depositAmount.value = '';
                depositPercent.value = '';
                this.deposit = false;
                depositBank.removeEventListener('change', this.changePercent);
            }
        }


        eventListeners () {
            const _this = this;
                start.addEventListener(`click`, _this.start.bind(_this) ,(event) => {
                    event.preventDefault();
                    if (salaryAmount.value === ``) {
                        alert(`Ошибка, поле "Месячный доход" должно быть заполнено`);
                    }   else if (!isNumber(salaryAmount.value)) {
                        alert(`Ошибка, введите числовое значение`);
                    }   else {
                       _this.start();
                    }
                });
        
                cancel.addEventListener(`click`, this.reset.bind(this));
                btnPlus1.addEventListener(`click`, this.addExpensesBlock.bind(this));
                btnPlus0.addEventListener(`click`, this.addIncomeBlock.bind(this));
                periodSelect.addEventListener(`input`, this.changePeriodAmount.bind(this));
                depositCheck.addEventListener(`change`, this.depositHandler.bind(this));
            }


   }
   
    const  appData = new AppData ();

    appData.eventListeners();

init();
    
   


    
    



