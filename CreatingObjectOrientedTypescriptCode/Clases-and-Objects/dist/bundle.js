/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app/checking-account.ts":
/*!*********************************!*\
  !*** ./app/checking-account.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CheckingAccount = void 0;
class CheckingAccount {
    constructor(title) {
        this.title = title;
        this._balance = 0; // field
    }
    get balance() {
        return this._balance;
    }
    set balance(val) {
        this._balance = val;
    }
    deposit(amount) {
        this.balance += amount;
    }
    withdrawal(amount) {
        this.balance -= amount;
    }
}
exports.CheckingAccount = CheckingAccount;


/***/ }),

/***/ "./app/renderer.ts":
/*!*************************!*\
  !*** ./app/renderer.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Renderer = void 0;
class Renderer {
    // instance way
    // constructor(private viewTemplate: HTMLDivElement) {
    //     this.viewTemplate.innerHTML = '<h2>Welcome to Acme Bank!</h2><br /><h5>Your Accounts:</h5><br />';
    // }
    // render(html: string) {
    //     this.viewTemplate.innerHTML = html;
    // }
    constructor() { }
    static render(html) {
        Renderer.viewTemplate.innerHTML = html;
    }
}
exports.Renderer = Renderer;


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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!********************!*\
  !*** ./app/app.ts ***!
  \********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const checking_account_1 = __webpack_require__(/*! ./checking-account */ "./app/checking-account.ts");
const renderer_1 = __webpack_require__(/*! ./renderer */ "./app/renderer.ts");
class Main {
    constructor( /* private renderer: Renderer */) {
        // Create CheckingAccount instance
        this.checkingAccount = new checking_account_1.CheckingAccount('John Doe Checking');
        this.renderAccount();
    }
    renderAccount() {
        const html = `
                <h3>Checking Account</h3>
                <br />
                <span class="label">Owner:</span> ${this.checkingAccount.title}
                <br />
                <span class="label">Balance:</span> $${this.checkingAccount.balance.toFixed(2)}
                <br /><br />
                $<input type="text" id="depositWithdrawalAmount">&nbsp;&nbsp;
                <button onclick="main.depositWithDrawal(true)">Deposit</button>&nbsp;
                <button onclick="main.depositWithDrawal(false)">Withdrawal</button>&nbsp;
            `;
        renderer_1.Renderer.render(html);
    }
    depositWithDrawal(deposit) {
        let amountInput = document.querySelector('#depositWithdrawalAmount');
        let amount = +amountInput.value;
        if (deposit) {
            this.checkingAccount.deposit(amount);
        }
        else {
            this.checkingAccount.withdrawal(amount);
        }
        this.renderAccount();
    }
}
// Create main object and add handlers for it
// const renderer = new Renderer(document.querySelector('#viewTemplate'));
renderer_1.Renderer.viewTemplate = document.querySelector('#viewTemplate');
const main = new Main( /* renderer*/);
// Quick and easy way to expose a global API that can hook to the Main object
// so that we can get to it from click and events and others.
// Yes, there are other ways but that's not the focus of this demo
window.main = main;

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jcmVhdGluZ29iamVjdG9yaWVudGVkdHlwZXNjcmlwdGNvZGUvLi9hcHAvY2hlY2tpbmctYWNjb3VudC50cyIsIndlYnBhY2s6Ly9jcmVhdGluZ29iamVjdG9yaWVudGVkdHlwZXNjcmlwdGNvZGUvLi9hcHAvcmVuZGVyZXIudHMiLCJ3ZWJwYWNrOi8vY3JlYXRpbmdvYmplY3RvcmllbnRlZHR5cGVzY3JpcHRjb2RlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NyZWF0aW5nb2JqZWN0b3JpZW50ZWR0eXBlc2NyaXB0Y29kZS8uL2FwcC9hcHAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFhO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qjs7Ozs7Ozs7Ozs7QUNyQlY7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7Ozs7Ozs7VUNoQmhCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7O0FDckJhO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELDJCQUEyQixtQkFBTyxDQUFDLHFEQUFvQjtBQUN2RCxtQkFBbUIsbUJBQU8sQ0FBQyxxQ0FBWTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRDtBQUNwRDtBQUNBLHVEQUF1RDtBQUN2RDtBQUNBLHVFQUF1RTtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkNoZWNraW5nQWNjb3VudCA9IHZvaWQgMDtcclxuY2xhc3MgQ2hlY2tpbmdBY2NvdW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHRpdGxlKSB7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgIHRoaXMuX2JhbGFuY2UgPSAwOyAvLyBmaWVsZFxyXG4gICAgfVxyXG4gICAgZ2V0IGJhbGFuY2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JhbGFuY2U7XHJcbiAgICB9XHJcbiAgICBzZXQgYmFsYW5jZSh2YWwpIHtcclxuICAgICAgICB0aGlzLl9iYWxhbmNlID0gdmFsO1xyXG4gICAgfVxyXG4gICAgZGVwb3NpdChhbW91bnQpIHtcclxuICAgICAgICB0aGlzLmJhbGFuY2UgKz0gYW1vdW50O1xyXG4gICAgfVxyXG4gICAgd2l0aGRyYXdhbChhbW91bnQpIHtcclxuICAgICAgICB0aGlzLmJhbGFuY2UgLT0gYW1vdW50O1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuQ2hlY2tpbmdBY2NvdW50ID0gQ2hlY2tpbmdBY2NvdW50O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLlJlbmRlcmVyID0gdm9pZCAwO1xyXG5jbGFzcyBSZW5kZXJlciB7XHJcbiAgICAvLyBpbnN0YW5jZSB3YXlcclxuICAgIC8vIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlld1RlbXBsYXRlOiBIVE1MRGl2RWxlbWVudCkge1xyXG4gICAgLy8gICAgIHRoaXMudmlld1RlbXBsYXRlLmlubmVySFRNTCA9ICc8aDI+V2VsY29tZSB0byBBY21lIEJhbmshPC9oMj48YnIgLz48aDU+WW91ciBBY2NvdW50czo8L2g1PjxiciAvPic7XHJcbiAgICAvLyB9XHJcbiAgICAvLyByZW5kZXIoaHRtbDogc3RyaW5nKSB7XHJcbiAgICAvLyAgICAgdGhpcy52aWV3VGVtcGxhdGUuaW5uZXJIVE1MID0gaHRtbDtcclxuICAgIC8vIH1cclxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XHJcbiAgICBzdGF0aWMgcmVuZGVyKGh0bWwpIHtcclxuICAgICAgICBSZW5kZXJlci52aWV3VGVtcGxhdGUuaW5uZXJIVE1MID0gaHRtbDtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLlJlbmRlcmVyID0gUmVuZGVyZXI7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuY29uc3QgY2hlY2tpbmdfYWNjb3VudF8xID0gcmVxdWlyZShcIi4vY2hlY2tpbmctYWNjb3VudFwiKTtcclxuY29uc3QgcmVuZGVyZXJfMSA9IHJlcXVpcmUoXCIuL3JlbmRlcmVyXCIpO1xyXG5jbGFzcyBNYWluIHtcclxuICAgIGNvbnN0cnVjdG9yKCAvKiBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlciAqLykge1xyXG4gICAgICAgIC8vIENyZWF0ZSBDaGVja2luZ0FjY291bnQgaW5zdGFuY2VcclxuICAgICAgICB0aGlzLmNoZWNraW5nQWNjb3VudCA9IG5ldyBjaGVja2luZ19hY2NvdW50XzEuQ2hlY2tpbmdBY2NvdW50KCdKb2huIERvZSBDaGVja2luZycpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyQWNjb3VudCgpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyQWNjb3VudCgpIHtcclxuICAgICAgICBjb25zdCBodG1sID0gYFxyXG4gICAgICAgICAgICAgICAgPGgzPkNoZWNraW5nIEFjY291bnQ8L2gzPlxyXG4gICAgICAgICAgICAgICAgPGJyIC8+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImxhYmVsXCI+T3duZXI6PC9zcGFuPiAke3RoaXMuY2hlY2tpbmdBY2NvdW50LnRpdGxlfVxyXG4gICAgICAgICAgICAgICAgPGJyIC8+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImxhYmVsXCI+QmFsYW5jZTo8L3NwYW4+ICQke3RoaXMuY2hlY2tpbmdBY2NvdW50LmJhbGFuY2UudG9GaXhlZCgyKX1cclxuICAgICAgICAgICAgICAgIDxiciAvPjxiciAvPlxyXG4gICAgICAgICAgICAgICAgJDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiZGVwb3NpdFdpdGhkcmF3YWxBbW91bnRcIj4mbmJzcDsmbmJzcDtcclxuICAgICAgICAgICAgICAgIDxidXR0b24gb25jbGljaz1cIm1haW4uZGVwb3NpdFdpdGhEcmF3YWwodHJ1ZSlcIj5EZXBvc2l0PC9idXR0b24+Jm5ic3A7XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIG9uY2xpY2s9XCJtYWluLmRlcG9zaXRXaXRoRHJhd2FsKGZhbHNlKVwiPldpdGhkcmF3YWw8L2J1dHRvbj4mbmJzcDtcclxuICAgICAgICAgICAgYDtcclxuICAgICAgICByZW5kZXJlcl8xLlJlbmRlcmVyLnJlbmRlcihodG1sKTtcclxuICAgIH1cclxuICAgIGRlcG9zaXRXaXRoRHJhd2FsKGRlcG9zaXQpIHtcclxuICAgICAgICBsZXQgYW1vdW50SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGVwb3NpdFdpdGhkcmF3YWxBbW91bnQnKTtcclxuICAgICAgICBsZXQgYW1vdW50ID0gK2Ftb3VudElucHV0LnZhbHVlO1xyXG4gICAgICAgIGlmIChkZXBvc2l0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tpbmdBY2NvdW50LmRlcG9zaXQoYW1vdW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tpbmdBY2NvdW50LndpdGhkcmF3YWwoYW1vdW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZW5kZXJBY2NvdW50KCk7XHJcbiAgICB9XHJcbn1cclxuLy8gQ3JlYXRlIG1haW4gb2JqZWN0IGFuZCBhZGQgaGFuZGxlcnMgZm9yIGl0XHJcbi8vIGNvbnN0IHJlbmRlcmVyID0gbmV3IFJlbmRlcmVyKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN2aWV3VGVtcGxhdGUnKSk7XHJcbnJlbmRlcmVyXzEuUmVuZGVyZXIudmlld1RlbXBsYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ZpZXdUZW1wbGF0ZScpO1xyXG5jb25zdCBtYWluID0gbmV3IE1haW4oIC8qIHJlbmRlcmVyKi8pO1xyXG4vLyBRdWljayBhbmQgZWFzeSB3YXkgdG8gZXhwb3NlIGEgZ2xvYmFsIEFQSSB0aGF0IGNhbiBob29rIHRvIHRoZSBNYWluIG9iamVjdFxyXG4vLyBzbyB0aGF0IHdlIGNhbiBnZXQgdG8gaXQgZnJvbSBjbGljayBhbmQgZXZlbnRzIGFuZCBvdGhlcnMuXHJcbi8vIFllcywgdGhlcmUgYXJlIG90aGVyIHdheXMgYnV0IHRoYXQncyBub3QgdGhlIGZvY3VzIG9mIHRoaXMgZGVtb1xyXG53aW5kb3cubWFpbiA9IG1haW47XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=