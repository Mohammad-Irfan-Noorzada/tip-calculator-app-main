const bill = document.getElementById("inp-bill");
const tipBtns = document.querySelectorAll(".main__btn-wrapper.tip");
const tipCostum = document.getElementById("inp-tip");
const tipPeople = document.getElementById("inp-people");
const errorMsg = document.querySelector(".main__error-msg");
const tipAmountOutput = document.getElementById("tip-amount");
const totalOutput = document.getElementById("total-amount");
const resetBtn = document.querySelector(".reset");

bill.addEventListener("input", setBillValue);
tipBtns.forEach(btn => {
    btn.addEventListener("click", handleClick);
});
tipCostum.addEventListener("input", setTipCustomValue);
tipPeople.addEventListener("input", setPeopleValue);
resetBtn.addEventListener("click", reset);

let billValue = 0.0;
let tipValue = 0.15; // Default 15%
let peopleValue = 1;

// ========== Validation Functions ==========
function validateFloat(s) {
    var rgx = /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx);
}

function validateInt(s) {
    var rgx = /^[0-9]*$/;
    return s.match(rgx);
}


// ========== Bill Value Handler ==========
function setBillValue() {
    if(bill.value.includes(",")) {
        bill.value = bill.value.replace("," , ".");
    }

    if (!validateFloat(bill.value)) {
        bill.value = bill.value.substring(0, bill.value.length - 1);
    }

    billValue = parseFloat(bill.value);
    calculateTip();
}


// ========== Tip Button Handler ==========
function handleClick() {
    tipBtns.forEach(btn => {
        btn.classList.remove("active");
    });

    this.classList.add("active");
    
    tipValue = parseFloat(this.innerHTML) / 100;

    tipCostum.value = '';
    calculateTip();
}


// ========== Custom Tip Input Handler ==========
function setTipCustomValue() {
    if (!validateInt(tipCostum.value)) {
        tipCostum.value = tipCostum.value.substring(0, tipCostum.value.length - 1);
    }

    tipValue = parseFloat(tipCostum.value) / 100;

    tipBtns.forEach(btn => {
        btn.classList.remove("active");
    });

    if (tipCostum.value !== '') {
        calculateTip()
    }
}


// ========== People Input Handler ==========
function setPeopleValue() {
    if (!validateInt(tipPeople.value)) {
        tipPeople.value = tipPeople.value.substring(0, tipPeople.value.length - 1);
    }

    peopleValue = parseFloat(tipPeople.value);

    if (peopleValue <= 0 || isNaN(peopleValue)) {
        errorMsg.classList.add("show-error-msg");
        setTimeout(() => {
            errorMsg.classList.remove("show-error-msg");
        }, 3000);
        return;
    }

    calculateTip();
}


// ========== Main Tip Calculation ==========
function calculateTip() {
    if (peopleValue >= 1) {
        let tipAmount = (billValue * tipValue) / peopleValue;
        let total = (billValue * (1 + tipValue)) / peopleValue;
        
        tipAmountOutput.innerHTML = '$' + tipAmount.toFixed(2);
        totalOutput.innerHTML = '$' + total.toFixed(2);
    }
}


// ========== Reset All ==========
function reset() {
    bill.value = "0.0";
    setBillValue();

    tipBtns[2].click();

    tipPeople.value = '1';
    setPeopleValue();

    tipCostum.value = '';
}