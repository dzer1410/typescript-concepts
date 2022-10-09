/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app/account-list.ts":
/*!*****************************!*\
  !*** ./app/account-list.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountList = void 0;
class AccountList {
    constructor() {
        this._accountList = [];
    }
    add(account) {
        this._accountList.push(account);
    }
    getAccounts() {
        return this._accountList;
    }
}
exports.AccountList = AccountList;


/***/ }),

/***/ "./app/app.ts":
/*!********************!*\
  !*** ./app/app.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const checking_account_1 = __webpack_require__(/*! ./checking-account */ "./app/checking-account.ts");
const renderer_1 = __webpack_require__(/*! ./renderer */ "./app/renderer.ts");
const savings_account_1 = __webpack_require__(/*! ./savings-account */ "./app/savings-account.ts");
const enums_1 = __webpack_require__(/*! ./enums */ "./app/enums.ts");
const account_list_1 = __webpack_require__(/*! ./account-list */ "./app/account-list.ts");
const atm_1 = __webpack_require__(/*! ./atm */ "./app/atm.ts");
class Main {
    constructor(renderer) {
        this.renderer = renderer;
    }
    loadAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch('data.json');
            const data = yield response.json();
            this.checkingAccount = new checking_account_1.CheckingAccount(Object.assign({}, data.checkingAccount));
            this.savingsAccount = new savings_account_1.SavingsAccount(Object.assign({}, data.savingsAccount));
            this.atm = new atm_1.ATM(this.checkingAccount);
            let html = this.renderAccounts();
            this.renderer.render(`
            <h2>Welcome to Acme Bank!</h2><br />
            <image src="src/images/acmebank.jpg" height="150">
            <br /><br />
            <h5>Your Accounts:</h5><br />
            ${html}
        `);
        });
    }
    changeView(view) {
        switch (view) {
            case 'checking':
                this.currentAccount = this.checkingAccount;
                break;
            case 'savings':
                this.currentAccount = this.savingsAccount;
                break;
            case 'atm':
                this.currentAccount = this.checkingAccount;
                this.renderAtm();
                return;
        }
        if (this.currentAccount) {
            this.renderAccount(this.currentAccount);
        }
    }
    renderAtm() {
        var _a;
        const html = `
                <h3>ATM</h3>
                <image src="src/images/atm.jpg" height="150">
                <br /><br />
                Current Checking Account Balance: $${(_a = this.checkingAccount) === null || _a === void 0 ? void 0 : _a.balance}
                <br /><br />
                $<input type="text" id="depositWithdrawalAmount">&nbsp;&nbsp;
                <button onclick="main.depositWithDrawal(true, true)">Deposit</button>&nbsp;
                <button onclick="main.depositWithDrawal(false, true)">Withdrawal</button>&nbsp;
            `;
        this.renderer.render(html);
    }
    renderAccounts() {
        let acctsHtml = '';
        const accList = new account_list_1.AccountList();
        accList.add(this.checkingAccount);
        accList.add(this.savingsAccount);
        accList.getAccounts().forEach((acct, index) => {
            acctsHtml += acct.title + '<br />';
        });
        return acctsHtml;
    }
    renderAccount(account) {
        const accountType = enums_1.AccountType[account.accountType];
        const html = `
                <h3>${accountType} Account</h3>
                <br />
                <span class="label">Owner:</span> ${account.title}
                <br />
                <span class="label">Balance:</span> $${account.balance.toFixed(2)}
                <br /><br />
                $<input type="text" id="depositWithdrawalAmount">&nbsp;&nbsp;
                <button onclick="main.depositWithDrawal(true)">Deposit</button>&nbsp;
                <button onclick="main.depositWithDrawal(false)">Withdrawal</button>&nbsp;
            `;
        this.renderer.render(html);
    }
    depositWithDrawal(deposit, atm) {
        var _a, _b;
        let amountInput = document.querySelector('#depositWithdrawalAmount');
        let amount = +amountInput.value;
        let error;
        try {
            if (deposit) {
                if (atm) {
                    (_a = this.atm) === null || _a === void 0 ? void 0 : _a.deposit(amount);
                }
                else {
                    if (this.currentAccount) {
                        this.currentAccount.deposit(amount);
                    }
                }
            }
            else {
                if (atm) {
                    (_b = this.atm) === null || _b === void 0 ? void 0 : _b.withdrawal(amount);
                }
                else {
                    if (this.currentAccount) {
                        this.currentAccount.withdrawal(amount);
                    }
                }
            }
        }
        catch (e) {
            error = e;
        }
        (atm) ? this.renderAtm() : this.renderAccount(this.currentAccount);
        if (error) {
            this.renderer.renderError(error.message);
        }
    }
}
// Create main object and add handlers for it
const renderer = new renderer_1.Renderer(document.querySelector('#viewTemplate'));
const main = new Main(renderer);
main.loadAccounts();
// Quick and easy way to expose a global API that can hook to the Main object
// so that we can get to it from click and events and others.
// Yes, there are other ways but this gets the job done for this demo.
window.main = main;


/***/ }),

/***/ "./app/atm.ts":
/*!********************!*\
  !*** ./app/atm.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ATM = void 0;
class ATM {
    constructor(account) {
        this.account = account;
    }
    deposit(amount) {
        this.account.deposit(amount);
    }
    withdrawal(amount) {
        this.account.withdrawal(amount);
    }
}
exports.ATM = ATM;


/***/ }),

/***/ "./app/bank-account.ts":
/*!*****************************!*\
  !*** ./app/bank-account.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BankAccount = void 0;
const constants_1 = __webpack_require__(/*! ./constants */ "./app/constants.ts");
class BankAccount {
    constructor(accountSettings) {
        this._balance = 0;
        this.id = accountSettings.id;
        this.title = accountSettings.title;
        this.balance = accountSettings.balance;
    }
    deposit(amount) {
        this.balance += amount;
    }
    withdrawal(amount) {
        this.balance -= amount;
    }
    getAccountInfo() {
        return {
            routingNumber: constants_1.Constants.ROUTING_NUMBER,
            bankNumber: constants_1.Constants.BANK_NUMBER
        };
    }
    ;
    get balance() {
        return this._balance;
    }
    set balance(val) {
        if (val >= 0) {
            this._balance = val;
        }
        else {
            throw Error('Balance cannot be negative!');
        }
    }
}
exports.BankAccount = BankAccount;


/***/ }),

/***/ "./app/checking-account.ts":
/*!*********************************!*\
  !*** ./app/checking-account.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CheckingAccount = void 0;
const bank_account_1 = __webpack_require__(/*! ./bank-account */ "./app/bank-account.ts");
const enums_1 = __webpack_require__(/*! ./enums */ "./app/enums.ts");
class CheckingAccount extends bank_account_1.BankAccount {
    constructor(accountSettings) {
        super(accountSettings);
        this.accountType = enums_1.AccountType.Checking;
    }
}
exports.CheckingAccount = CheckingAccount;


/***/ }),

/***/ "./app/constants.ts":
/*!**************************!*\
  !*** ./app/constants.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Constants = void 0;
class Constants {
    static get ROUTING_NUMBER() { return '1231A4433Y2'; }
    static get BANK_NUMBER() { return 100008374; }
}
exports.Constants = Constants;


/***/ }),

/***/ "./app/enums.ts":
/*!**********************!*\
  !*** ./app/enums.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountType = void 0;
var AccountType;
(function (AccountType) {
    AccountType[AccountType["Checking"] = 0] = "Checking";
    AccountType[AccountType["Savings"] = 1] = "Savings";
})(AccountType = exports.AccountType || (exports.AccountType = {}));


/***/ }),

/***/ "./app/renderer.ts":
/*!*************************!*\
  !*** ./app/renderer.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Renderer = void 0;
class Renderer {
    constructor(viewTemplate) {
        this.viewTemplate = viewTemplate;
        this.viewTemplate.innerHTML = '<h2>Welcome to Acme Bank!</h2><br /><h5>Your Accounts:</h5><br />';
    }
    render(html) {
        this.viewTemplate.innerHTML = html;
    }
    renderError(message) {
        this.viewTemplate.innerHTML += `<br /><br /><div class="alert alert-danger">${message}</div>`;
    }
}
exports.Renderer = Renderer;


/***/ }),

/***/ "./app/savings-account.ts":
/*!********************************!*\
  !*** ./app/savings-account.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SavingsAccount = void 0;
const bank_account_1 = __webpack_require__(/*! ./bank-account */ "./app/bank-account.ts");
const enums_1 = __webpack_require__(/*! ./enums */ "./app/enums.ts");
class SavingsAccount extends bank_account_1.BankAccount {
    constructor(accountSettings) {
        super(accountSettings);
        this.accountType = enums_1.AccountType.Savings;
        this._interestRate = accountSettings.interestRate;
        setInterval(() => {
            this.addInterest();
        }, 60000);
    }
    deposit(amount) {
        let newAmount = amount + (amount * (this._interestRate / 100));
        this.balance += newAmount;
    }
    addInterest() {
        this.balance = this.balance + (this.balance * (this._interestRate / 100));
    }
}
exports.SavingsAccount = SavingsAccount;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./app/app.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jcmVhdGluZ29iamVjdG9yaWVudGVkdHlwZXNjcmlwdGNvZGUvLi9hcHAvYWNjb3VudC1saXN0LnRzIiwid2VicGFjazovL2NyZWF0aW5nb2JqZWN0b3JpZW50ZWR0eXBlc2NyaXB0Y29kZS8uL2FwcC9hcHAudHMiLCJ3ZWJwYWNrOi8vY3JlYXRpbmdvYmplY3RvcmllbnRlZHR5cGVzY3JpcHRjb2RlLy4vYXBwL2F0bS50cyIsIndlYnBhY2s6Ly9jcmVhdGluZ29iamVjdG9yaWVudGVkdHlwZXNjcmlwdGNvZGUvLi9hcHAvYmFuay1hY2NvdW50LnRzIiwid2VicGFjazovL2NyZWF0aW5nb2JqZWN0b3JpZW50ZWR0eXBlc2NyaXB0Y29kZS8uL2FwcC9jaGVja2luZy1hY2NvdW50LnRzIiwid2VicGFjazovL2NyZWF0aW5nb2JqZWN0b3JpZW50ZWR0eXBlc2NyaXB0Y29kZS8uL2FwcC9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vY3JlYXRpbmdvYmplY3RvcmllbnRlZHR5cGVzY3JpcHRjb2RlLy4vYXBwL2VudW1zLnRzIiwid2VicGFjazovL2NyZWF0aW5nb2JqZWN0b3JpZW50ZWR0eXBlc2NyaXB0Y29kZS8uL2FwcC9yZW5kZXJlci50cyIsIndlYnBhY2s6Ly9jcmVhdGluZ29iamVjdG9yaWVudGVkdHlwZXNjcmlwdGNvZGUvLi9hcHAvc2F2aW5ncy1hY2NvdW50LnRzIiwid2VicGFjazovL2NyZWF0aW5nb2JqZWN0b3JpZW50ZWR0eXBlc2NyaXB0Y29kZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9jcmVhdGluZ29iamVjdG9yaWVudGVkdHlwZXNjcmlwdGNvZGUvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjs7Ozs7Ozs7Ozs7QUNkTjtBQUNiO0FBQ0EsMkJBQTJCLCtEQUErRCxnQkFBZ0IsRUFBRSxFQUFFO0FBQzlHO0FBQ0EsbUNBQW1DLE1BQU0sNkJBQTZCLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDakcsa0NBQWtDLE1BQU0saUNBQWlDLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDcEcsK0JBQStCLHFGQUFxRjtBQUNwSDtBQUNBLEtBQUs7QUFDTDtBQUNBLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCwyQkFBMkIsbUJBQU8sQ0FBQyxxREFBb0I7QUFDdkQsbUJBQW1CLG1CQUFPLENBQUMscUNBQVk7QUFDdkMsMEJBQTBCLG1CQUFPLENBQUMsbURBQW1CO0FBQ3JELGdCQUFnQixtQkFBTyxDQUFDLCtCQUFTO0FBQ2pDLHVCQUF1QixtQkFBTyxDQUFDLDZDQUFnQjtBQUMvQyxjQUFjLG1CQUFPLENBQUMsMkJBQU87QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBGQUEwRjtBQUMxRix1RkFBdUY7QUFDdkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0EsdUVBQXVFO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLFlBQVk7QUFDbEM7QUFDQSxvREFBb0Q7QUFDcEQ7QUFDQSx1REFBdUQ7QUFDdkQ7QUFDQSx1RUFBdUU7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDeklhO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVzs7Ozs7Ozs7Ozs7QUNkRTtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxtQkFBbUI7QUFDbkIsb0JBQW9CLG1CQUFPLENBQUMsdUNBQWE7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjs7Ozs7Ozs7Ozs7QUNwQ047QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsdUJBQXVCO0FBQ3ZCLHVCQUF1QixtQkFBTyxDQUFDLDZDQUFnQjtBQUMvQyxnQkFBZ0IsbUJBQU8sQ0FBQywrQkFBUztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7Ozs7Ozs7Ozs7O0FDWFY7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsaUJBQWlCO0FBQ2pCO0FBQ0EsaUNBQWlDLHNCQUFzQjtBQUN2RCw4QkFBOEIsa0JBQWtCO0FBQ2hEO0FBQ0EsaUJBQWlCOzs7Ozs7Ozs7OztBQ1BKO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsd0NBQXdDLG1CQUFtQixLQUFLOzs7Ozs7Ozs7OztBQ1BwRDtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0ZBQXNGLFFBQVE7QUFDOUY7QUFDQTtBQUNBLGdCQUFnQjs7Ozs7Ozs7Ozs7QUNmSDtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxzQkFBc0I7QUFDdEIsdUJBQXVCLG1CQUFPLENBQUMsNkNBQWdCO0FBQy9DLGdCQUFnQixtQkFBTyxDQUFDLCtCQUFTO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjs7Ozs7OztVQ3RCdEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUNyQkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5BY2NvdW50TGlzdCA9IHZvaWQgMDtcclxuY2xhc3MgQWNjb3VudExpc3Qge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5fYWNjb3VudExpc3QgPSBbXTtcclxuICAgIH1cclxuICAgIGFkZChhY2NvdW50KSB7XHJcbiAgICAgICAgdGhpcy5fYWNjb3VudExpc3QucHVzaChhY2NvdW50KTtcclxuICAgIH1cclxuICAgIGdldEFjY291bnRzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hY2NvdW50TGlzdDtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLkFjY291bnRMaXN0ID0gQWNjb3VudExpc3Q7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn07XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgY2hlY2tpbmdfYWNjb3VudF8xID0gcmVxdWlyZShcIi4vY2hlY2tpbmctYWNjb3VudFwiKTtcclxuY29uc3QgcmVuZGVyZXJfMSA9IHJlcXVpcmUoXCIuL3JlbmRlcmVyXCIpO1xyXG5jb25zdCBzYXZpbmdzX2FjY291bnRfMSA9IHJlcXVpcmUoXCIuL3NhdmluZ3MtYWNjb3VudFwiKTtcclxuY29uc3QgZW51bXNfMSA9IHJlcXVpcmUoXCIuL2VudW1zXCIpO1xyXG5jb25zdCBhY2NvdW50X2xpc3RfMSA9IHJlcXVpcmUoXCIuL2FjY291bnQtbGlzdFwiKTtcclxuY29uc3QgYXRtXzEgPSByZXF1aXJlKFwiLi9hdG1cIik7XHJcbmNsYXNzIE1haW4ge1xyXG4gICAgY29uc3RydWN0b3IocmVuZGVyZXIpIHtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyID0gcmVuZGVyZXI7XHJcbiAgICB9XHJcbiAgICBsb2FkQWNjb3VudHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB5aWVsZCBmZXRjaCgnZGF0YS5qc29uJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB5aWVsZCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tpbmdBY2NvdW50ID0gbmV3IGNoZWNraW5nX2FjY291bnRfMS5DaGVja2luZ0FjY291bnQoT2JqZWN0LmFzc2lnbih7fSwgZGF0YS5jaGVja2luZ0FjY291bnQpKTtcclxuICAgICAgICAgICAgdGhpcy5zYXZpbmdzQWNjb3VudCA9IG5ldyBzYXZpbmdzX2FjY291bnRfMS5TYXZpbmdzQWNjb3VudChPYmplY3QuYXNzaWduKHt9LCBkYXRhLnNhdmluZ3NBY2NvdW50KSk7XHJcbiAgICAgICAgICAgIHRoaXMuYXRtID0gbmV3IGF0bV8xLkFUTSh0aGlzLmNoZWNraW5nQWNjb3VudCk7XHJcbiAgICAgICAgICAgIGxldCBodG1sID0gdGhpcy5yZW5kZXJBY2NvdW50cygpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcihgXHJcbiAgICAgICAgICAgIDxoMj5XZWxjb21lIHRvIEFjbWUgQmFuayE8L2gyPjxiciAvPlxyXG4gICAgICAgICAgICA8aW1hZ2Ugc3JjPVwic3JjL2ltYWdlcy9hY21lYmFuay5qcGdcIiBoZWlnaHQ9XCIxNTBcIj5cclxuICAgICAgICAgICAgPGJyIC8+PGJyIC8+XHJcbiAgICAgICAgICAgIDxoNT5Zb3VyIEFjY291bnRzOjwvaDU+PGJyIC8+XHJcbiAgICAgICAgICAgICR7aHRtbH1cclxuICAgICAgICBgKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGNoYW5nZVZpZXcodmlldykge1xyXG4gICAgICAgIHN3aXRjaCAodmlldykge1xyXG4gICAgICAgICAgICBjYXNlICdjaGVja2luZyc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRBY2NvdW50ID0gdGhpcy5jaGVja2luZ0FjY291bnQ7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc2F2aW5ncyc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRBY2NvdW50ID0gdGhpcy5zYXZpbmdzQWNjb3VudDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdhdG0nOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50QWNjb3VudCA9IHRoaXMuY2hlY2tpbmdBY2NvdW50O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJBdG0oKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEFjY291bnQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJBY2NvdW50KHRoaXMuY3VycmVudEFjY291bnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlbmRlckF0bSgpIHtcclxuICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgY29uc3QgaHRtbCA9IGBcclxuICAgICAgICAgICAgICAgIDxoMz5BVE08L2gzPlxyXG4gICAgICAgICAgICAgICAgPGltYWdlIHNyYz1cInNyYy9pbWFnZXMvYXRtLmpwZ1wiIGhlaWdodD1cIjE1MFwiPlxyXG4gICAgICAgICAgICAgICAgPGJyIC8+PGJyIC8+XHJcbiAgICAgICAgICAgICAgICBDdXJyZW50IENoZWNraW5nIEFjY291bnQgQmFsYW5jZTogJCR7KF9hID0gdGhpcy5jaGVja2luZ0FjY291bnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5iYWxhbmNlfVxyXG4gICAgICAgICAgICAgICAgPGJyIC8+PGJyIC8+XHJcbiAgICAgICAgICAgICAgICAkPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJkZXBvc2l0V2l0aGRyYXdhbEFtb3VudFwiPiZuYnNwOyZuYnNwO1xyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBvbmNsaWNrPVwibWFpbi5kZXBvc2l0V2l0aERyYXdhbCh0cnVlLCB0cnVlKVwiPkRlcG9zaXQ8L2J1dHRvbj4mbmJzcDtcclxuICAgICAgICAgICAgICAgIDxidXR0b24gb25jbGljaz1cIm1haW4uZGVwb3NpdFdpdGhEcmF3YWwoZmFsc2UsIHRydWUpXCI+V2l0aGRyYXdhbDwvYnV0dG9uPiZuYnNwO1xyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKGh0bWwpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyQWNjb3VudHMoKSB7XHJcbiAgICAgICAgbGV0IGFjY3RzSHRtbCA9ICcnO1xyXG4gICAgICAgIGNvbnN0IGFjY0xpc3QgPSBuZXcgYWNjb3VudF9saXN0XzEuQWNjb3VudExpc3QoKTtcclxuICAgICAgICBhY2NMaXN0LmFkZCh0aGlzLmNoZWNraW5nQWNjb3VudCk7XHJcbiAgICAgICAgYWNjTGlzdC5hZGQodGhpcy5zYXZpbmdzQWNjb3VudCk7XHJcbiAgICAgICAgYWNjTGlzdC5nZXRBY2NvdW50cygpLmZvckVhY2goKGFjY3QsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGFjY3RzSHRtbCArPSBhY2N0LnRpdGxlICsgJzxiciAvPic7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGFjY3RzSHRtbDtcclxuICAgIH1cclxuICAgIHJlbmRlckFjY291bnQoYWNjb3VudCkge1xyXG4gICAgICAgIGNvbnN0IGFjY291bnRUeXBlID0gZW51bXNfMS5BY2NvdW50VHlwZVthY2NvdW50LmFjY291bnRUeXBlXTtcclxuICAgICAgICBjb25zdCBodG1sID0gYFxyXG4gICAgICAgICAgICAgICAgPGgzPiR7YWNjb3VudFR5cGV9IEFjY291bnQ8L2gzPlxyXG4gICAgICAgICAgICAgICAgPGJyIC8+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImxhYmVsXCI+T3duZXI6PC9zcGFuPiAke2FjY291bnQudGl0bGV9XHJcbiAgICAgICAgICAgICAgICA8YnIgLz5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibGFiZWxcIj5CYWxhbmNlOjwvc3Bhbj4gJCR7YWNjb3VudC5iYWxhbmNlLnRvRml4ZWQoMil9XHJcbiAgICAgICAgICAgICAgICA8YnIgLz48YnIgLz5cclxuICAgICAgICAgICAgICAgICQ8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImRlcG9zaXRXaXRoZHJhd2FsQW1vdW50XCI+Jm5ic3A7Jm5ic3A7XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIG9uY2xpY2s9XCJtYWluLmRlcG9zaXRXaXRoRHJhd2FsKHRydWUpXCI+RGVwb3NpdDwvYnV0dG9uPiZuYnNwO1xyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBvbmNsaWNrPVwibWFpbi5kZXBvc2l0V2l0aERyYXdhbChmYWxzZSlcIj5XaXRoZHJhd2FsPC9idXR0b24+Jm5ic3A7XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIoaHRtbCk7XHJcbiAgICB9XHJcbiAgICBkZXBvc2l0V2l0aERyYXdhbChkZXBvc2l0LCBhdG0pIHtcclxuICAgICAgICB2YXIgX2EsIF9iO1xyXG4gICAgICAgIGxldCBhbW91bnRJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkZXBvc2l0V2l0aGRyYXdhbEFtb3VudCcpO1xyXG4gICAgICAgIGxldCBhbW91bnQgPSArYW1vdW50SW5wdXQudmFsdWU7XHJcbiAgICAgICAgbGV0IGVycm9yO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChkZXBvc2l0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXRtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKF9hID0gdGhpcy5hdG0pID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5kZXBvc2l0KGFtb3VudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50QWNjb3VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRBY2NvdW50LmRlcG9zaXQoYW1vdW50KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXRtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKF9iID0gdGhpcy5hdG0pID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi53aXRoZHJhd2FsKGFtb3VudCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50QWNjb3VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRBY2NvdW50LndpdGhkcmF3YWwoYW1vdW50KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgZXJyb3IgPSBlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAoYXRtKSA/IHRoaXMucmVuZGVyQXRtKCkgOiB0aGlzLnJlbmRlckFjY291bnQodGhpcy5jdXJyZW50QWNjb3VudCk7XHJcbiAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyRXJyb3IoZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbi8vIENyZWF0ZSBtYWluIG9iamVjdCBhbmQgYWRkIGhhbmRsZXJzIGZvciBpdFxyXG5jb25zdCByZW5kZXJlciA9IG5ldyByZW5kZXJlcl8xLlJlbmRlcmVyKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN2aWV3VGVtcGxhdGUnKSk7XHJcbmNvbnN0IG1haW4gPSBuZXcgTWFpbihyZW5kZXJlcik7XHJcbm1haW4ubG9hZEFjY291bnRzKCk7XHJcbi8vIFF1aWNrIGFuZCBlYXN5IHdheSB0byBleHBvc2UgYSBnbG9iYWwgQVBJIHRoYXQgY2FuIGhvb2sgdG8gdGhlIE1haW4gb2JqZWN0XHJcbi8vIHNvIHRoYXQgd2UgY2FuIGdldCB0byBpdCBmcm9tIGNsaWNrIGFuZCBldmVudHMgYW5kIG90aGVycy5cclxuLy8gWWVzLCB0aGVyZSBhcmUgb3RoZXIgd2F5cyBidXQgdGhpcyBnZXRzIHRoZSBqb2IgZG9uZSBmb3IgdGhpcyBkZW1vLlxyXG53aW5kb3cubWFpbiA9IG1haW47XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuQVRNID0gdm9pZCAwO1xyXG5jbGFzcyBBVE0ge1xyXG4gICAgY29uc3RydWN0b3IoYWNjb3VudCkge1xyXG4gICAgICAgIHRoaXMuYWNjb3VudCA9IGFjY291bnQ7XHJcbiAgICB9XHJcbiAgICBkZXBvc2l0KGFtb3VudCkge1xyXG4gICAgICAgIHRoaXMuYWNjb3VudC5kZXBvc2l0KGFtb3VudCk7XHJcbiAgICB9XHJcbiAgICB3aXRoZHJhd2FsKGFtb3VudCkge1xyXG4gICAgICAgIHRoaXMuYWNjb3VudC53aXRoZHJhd2FsKGFtb3VudCk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5BVE0gPSBBVE07XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuQmFua0FjY291bnQgPSB2b2lkIDA7XHJcbmNvbnN0IGNvbnN0YW50c18xID0gcmVxdWlyZShcIi4vY29uc3RhbnRzXCIpO1xyXG5jbGFzcyBCYW5rQWNjb3VudCB7XHJcbiAgICBjb25zdHJ1Y3RvcihhY2NvdW50U2V0dGluZ3MpIHtcclxuICAgICAgICB0aGlzLl9iYWxhbmNlID0gMDtcclxuICAgICAgICB0aGlzLmlkID0gYWNjb3VudFNldHRpbmdzLmlkO1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSBhY2NvdW50U2V0dGluZ3MudGl0bGU7XHJcbiAgICAgICAgdGhpcy5iYWxhbmNlID0gYWNjb3VudFNldHRpbmdzLmJhbGFuY2U7XHJcbiAgICB9XHJcbiAgICBkZXBvc2l0KGFtb3VudCkge1xyXG4gICAgICAgIHRoaXMuYmFsYW5jZSArPSBhbW91bnQ7XHJcbiAgICB9XHJcbiAgICB3aXRoZHJhd2FsKGFtb3VudCkge1xyXG4gICAgICAgIHRoaXMuYmFsYW5jZSAtPSBhbW91bnQ7XHJcbiAgICB9XHJcbiAgICBnZXRBY2NvdW50SW5mbygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByb3V0aW5nTnVtYmVyOiBjb25zdGFudHNfMS5Db25zdGFudHMuUk9VVElOR19OVU1CRVIsXHJcbiAgICAgICAgICAgIGJhbmtOdW1iZXI6IGNvbnN0YW50c18xLkNvbnN0YW50cy5CQU5LX05VTUJFUlxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICA7XHJcbiAgICBnZXQgYmFsYW5jZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYmFsYW5jZTtcclxuICAgIH1cclxuICAgIHNldCBiYWxhbmNlKHZhbCkge1xyXG4gICAgICAgIGlmICh2YWwgPj0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLl9iYWxhbmNlID0gdmFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0JhbGFuY2UgY2Fubm90IGJlIG5lZ2F0aXZlIScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnRzLkJhbmtBY2NvdW50ID0gQmFua0FjY291bnQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuQ2hlY2tpbmdBY2NvdW50ID0gdm9pZCAwO1xyXG5jb25zdCBiYW5rX2FjY291bnRfMSA9IHJlcXVpcmUoXCIuL2JhbmstYWNjb3VudFwiKTtcclxuY29uc3QgZW51bXNfMSA9IHJlcXVpcmUoXCIuL2VudW1zXCIpO1xyXG5jbGFzcyBDaGVja2luZ0FjY291bnQgZXh0ZW5kcyBiYW5rX2FjY291bnRfMS5CYW5rQWNjb3VudCB7XHJcbiAgICBjb25zdHJ1Y3RvcihhY2NvdW50U2V0dGluZ3MpIHtcclxuICAgICAgICBzdXBlcihhY2NvdW50U2V0dGluZ3MpO1xyXG4gICAgICAgIHRoaXMuYWNjb3VudFR5cGUgPSBlbnVtc18xLkFjY291bnRUeXBlLkNoZWNraW5nO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuQ2hlY2tpbmdBY2NvdW50ID0gQ2hlY2tpbmdBY2NvdW50O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkNvbnN0YW50cyA9IHZvaWQgMDtcclxuY2xhc3MgQ29uc3RhbnRzIHtcclxuICAgIHN0YXRpYyBnZXQgUk9VVElOR19OVU1CRVIoKSB7IHJldHVybiAnMTIzMUE0NDMzWTInOyB9XHJcbiAgICBzdGF0aWMgZ2V0IEJBTktfTlVNQkVSKCkgeyByZXR1cm4gMTAwMDA4Mzc0OyB9XHJcbn1cclxuZXhwb3J0cy5Db25zdGFudHMgPSBDb25zdGFudHM7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuQWNjb3VudFR5cGUgPSB2b2lkIDA7XHJcbnZhciBBY2NvdW50VHlwZTtcclxuKGZ1bmN0aW9uIChBY2NvdW50VHlwZSkge1xyXG4gICAgQWNjb3VudFR5cGVbQWNjb3VudFR5cGVbXCJDaGVja2luZ1wiXSA9IDBdID0gXCJDaGVja2luZ1wiO1xyXG4gICAgQWNjb3VudFR5cGVbQWNjb3VudFR5cGVbXCJTYXZpbmdzXCJdID0gMV0gPSBcIlNhdmluZ3NcIjtcclxufSkoQWNjb3VudFR5cGUgPSBleHBvcnRzLkFjY291bnRUeXBlIHx8IChleHBvcnRzLkFjY291bnRUeXBlID0ge30pKTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5SZW5kZXJlciA9IHZvaWQgMDtcclxuY2xhc3MgUmVuZGVyZXIge1xyXG4gICAgY29uc3RydWN0b3Iodmlld1RlbXBsYXRlKSB7XHJcbiAgICAgICAgdGhpcy52aWV3VGVtcGxhdGUgPSB2aWV3VGVtcGxhdGU7XHJcbiAgICAgICAgdGhpcy52aWV3VGVtcGxhdGUuaW5uZXJIVE1MID0gJzxoMj5XZWxjb21lIHRvIEFjbWUgQmFuayE8L2gyPjxiciAvPjxoNT5Zb3VyIEFjY291bnRzOjwvaDU+PGJyIC8+JztcclxuICAgIH1cclxuICAgIHJlbmRlcihodG1sKSB7XHJcbiAgICAgICAgdGhpcy52aWV3VGVtcGxhdGUuaW5uZXJIVE1MID0gaHRtbDtcclxuICAgIH1cclxuICAgIHJlbmRlckVycm9yKG1lc3NhZ2UpIHtcclxuICAgICAgICB0aGlzLnZpZXdUZW1wbGF0ZS5pbm5lckhUTUwgKz0gYDxiciAvPjxiciAvPjxkaXYgY2xhc3M9XCJhbGVydCBhbGVydC1kYW5nZXJcIj4ke21lc3NhZ2V9PC9kaXY+YDtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLlJlbmRlcmVyID0gUmVuZGVyZXI7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuU2F2aW5nc0FjY291bnQgPSB2b2lkIDA7XHJcbmNvbnN0IGJhbmtfYWNjb3VudF8xID0gcmVxdWlyZShcIi4vYmFuay1hY2NvdW50XCIpO1xyXG5jb25zdCBlbnVtc18xID0gcmVxdWlyZShcIi4vZW51bXNcIik7XHJcbmNsYXNzIFNhdmluZ3NBY2NvdW50IGV4dGVuZHMgYmFua19hY2NvdW50XzEuQmFua0FjY291bnQge1xyXG4gICAgY29uc3RydWN0b3IoYWNjb3VudFNldHRpbmdzKSB7XHJcbiAgICAgICAgc3VwZXIoYWNjb3VudFNldHRpbmdzKTtcclxuICAgICAgICB0aGlzLmFjY291bnRUeXBlID0gZW51bXNfMS5BY2NvdW50VHlwZS5TYXZpbmdzO1xyXG4gICAgICAgIHRoaXMuX2ludGVyZXN0UmF0ZSA9IGFjY291bnRTZXR0aW5ncy5pbnRlcmVzdFJhdGU7XHJcbiAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFkZEludGVyZXN0KCk7XHJcbiAgICAgICAgfSwgNjAwMDApO1xyXG4gICAgfVxyXG4gICAgZGVwb3NpdChhbW91bnQpIHtcclxuICAgICAgICBsZXQgbmV3QW1vdW50ID0gYW1vdW50ICsgKGFtb3VudCAqICh0aGlzLl9pbnRlcmVzdFJhdGUgLyAxMDApKTtcclxuICAgICAgICB0aGlzLmJhbGFuY2UgKz0gbmV3QW1vdW50O1xyXG4gICAgfVxyXG4gICAgYWRkSW50ZXJlc3QoKSB7XHJcbiAgICAgICAgdGhpcy5iYWxhbmNlID0gdGhpcy5iYWxhbmNlICsgKHRoaXMuYmFsYW5jZSAqICh0aGlzLl9pbnRlcmVzdFJhdGUgLyAxMDApKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLlNhdmluZ3NBY2NvdW50ID0gU2F2aW5nc0FjY291bnQ7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9hcHAvYXBwLnRzXCIpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==