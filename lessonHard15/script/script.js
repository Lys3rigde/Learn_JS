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
periodAmount = document.querySelector(`.period-amount`);

let expensesItems = document.querySelectorAll(`.expenses-items`),
incomeItems = document.querySelectorAll(`.income-items`);

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
            this.getExpInc();
            this.getAdd();
            this.getBudget();
            this.getStatusIncome();
            this.getInfoDeposit();
            this.calcSavedMoney();
            this.showResult();
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
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
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

        getExpInc () {
            const _this = this;
            const count = item =>  {
                const startStr = item.className.split('-')[0];
                const itemTitle = item.querySelector(`.${startStr}-title`).value;
                const itemAmount = item.querySelector(`.${startStr}-amount`).value;
                if (itemTitle !== '' && itemAmount !== '') {
                    this[startStr][itemTitle] = +itemAmount;
                }
            };

            incomeItems.forEach(count);
            expensesItems.forEach(count);

            for (const key in _this.income) {
                _this.incomeMonth += _this.income[key];
            }

            for (let key in _this.expenses){
                _this.expensesMonth += +_this.expenses[key];
            }

        }


        incomeCloneAmountUpdateValue (e, d) {

            const incD = d.querySelector(`.income-amount`);
            incD.value =  incD.value.replace(/[^0-9]/,``);
    
        }

        incomeCloneTitleUpdateValue (e, d) {

            const incD = d.querySelector(`.income-title`);
            incD.value =  incD.value.replace(/[^а-яА-Я,.?!;`:]/,``);
    
        }

         addBlock () {
                const target = event.target;
                const startStr = target.parentNode.className;
                const cloneItem = document.querySelector(`.${startStr}-items`).cloneNode(true);
                cloneItem.querySelector(`.${startStr}-title`).value = '';
                cloneItem.querySelector(`.${startStr}-amount`).value = '';
                target.parentNode.insertBefore(cloneItem, target);
                if (document.querySelectorAll(`.${startStr}-items`).length === 3) {
                    target.style.display = 'none';
                }
            }

         getAdd () {
           
            const joinElem = item => {
                return item.map(el => el.trim()).filter(el => el !== '');
            };
        
            this.addExpenses = joinElem(additionalExpensesItem.value.split(','));
            this.addIncome = joinElem([additionalIncomeItem[0].value, additionalIncomeItem[1].value]);
        }

        getInfoDeposit () {
            const _this = this;
            if(_this.deposit){
                _this.percentDeposit = +prompt(`Какой ваш годовой процент?`, 10);
                while(!isNumber(_this.percentDeposit)){
                    _this.percentDeposit = +prompt(`Какой ваш годовой процент?`, 10);
                }
                _this.moneyDeposit = +prompt(`Какая сумма у вас заложена?`, 20000);
                while(!isNumber(_this.moneyDeposit)){
                    _this.moneyDeposit = +prompt(`Какая сумма у вас заложена?`, 20000);
                }
            }
        }
    
        calcSavedMoney () {
            return this.budgetMonth * periodSelect.value;
        }


        getBudget () {
            this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
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
                btnPlus1.addEventListener(`click`, this.addBlock.bind(this));
                btnPlus0.addEventListener(`click`, this.addBlock.bind(this));
                periodSelect.addEventListener(`input`, this.changePeriodAmount.bind(this));
           
            }

   }
   
    const  appData = new AppData ();

    appData.eventListeners();


   
    
   


    
    



