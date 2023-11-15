const showTransactionsHere = document.querySelector(".show-transactions-here");
const depositButton = document.querySelector(".deposit");
const withdrawButton = document.querySelector(".withdraw");
const currentBalance = document.querySelector(".current-balance");
const showHistoryTransactions = document.querySelector(
  ".show-history-of-transactions"
);

let date = new Date();
let currentDay = date.getDate();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();

function createBankAccount(accountName, initialAmount, currency) {
  const valueOfInput = document.querySelector(".input-value");

  let nrCrt = 1;
  let name = accountName;
  let amount = initialAmount;
  let transactions = [];
  currentBalance.textContent = `${amount} ${currency}`;

  const validateInput = (value) => {
    if (isNaN(value) || value === "") {
      alert("Invalid input. Please enter a valid number.");
      return false;
    }
    return true;
  };

  function showDetails() {
    console.log(`Account name: ${name}, amount: ${amount}`);
  }

  function deposit() {
    if (!validateInput(valueOfInput.value)) return;

    amount += parseInt(valueOfInput.value);
    addTransaction(parseInt(valueOfInput.value), "deposit");
    currentBalance.innerHTML = `${amount} ${currency}`;

    const tableRow = document.createElement("tr");
    const rowNumber = document.createElement("td");
    const date = document.createElement("td");
    const operationDeposit = document.createElement("td");
    const valueOfDeposit = document.createElement("td");

    rowNumber.textContent = nrCrt;
    date.textContent = `${currentDay}-${currentMonth}-${currentYear}`;
    operationDeposit.textContent = "Deposit";
    valueOfDeposit.textContent = `${parseInt(valueOfInput.value)} ${currency}`;

    showTransactionsHere.appendChild(tableRow);

    tableRow.appendChild(rowNumber);
    tableRow.appendChild(date);
    tableRow.appendChild(operationDeposit);
    tableRow.appendChild(valueOfDeposit);
    nrCrt++;

    valueOfInput.value = "";
  }

  function withdraw() {
    if (!validateInput(valueOfInput.value)) return;

    if (amount < parseInt(valueOfInput.value)) {
      console.log("Suma este prea mare");
      return;
    }

    amount -= parseInt(valueOfInput.value);
    addTransaction(parseInt(valueOfInput.value), "withdraw");
    currentBalance.innerHTML = `${amount} ${currency}`;

    const tableRow = document.createElement("tr");
    const rowNumber = document.createElement("td");
    const date = document.createElement("td");
    const operationDeposit = document.createElement("td");
    const valueOfDeposit = document.createElement("td");

    rowNumber.textContent = nrCrt;
    date.textContent = `${currentDay}-${currentMonth}-${currentYear}`;
    operationDeposit.textContent = "Withdraw";
    valueOfDeposit.textContent = `${parseInt(valueOfInput.value)} ${currency}`;

    showTransactionsHere.appendChild(tableRow);

    tableRow.appendChild(rowNumber);
    tableRow.appendChild(date);
    tableRow.appendChild(operationDeposit);
    tableRow.appendChild(valueOfDeposit);
    nrCrt++;
    valueOfInput.value = "";
  }

  function addTransaction(value, transactionType) {
    const newTransaction = {
      value: `${value} ${currency}`,
      transactionType,
      date: new Date(),
    };
    transactions.push(newTransaction);
  }

  function showTransactions() {
    console.log(`------- Transaction list for ${name} --------`);
    for (let transaction of transactions) {
      console.log(
        `Value: ${transaction.value}, Transaction Type: ${transaction.transactionType}, Date: ${transaction.date}`
      );
    }
    console.log(`---------------`);
  }

  return {
    showDetails,
    deposit,
    withdraw,
    showTransactions,
  };
}

let accountName = "Cont principal";
const bankAccount1 = createBankAccount(accountName, 10843, "USD");

depositButton.addEventListener("click", function (e) {
  e.preventDefault();
  bankAccount1.deposit();
});

withdrawButton.addEventListener("click", function (e) {
  e.preventDefault();
  bankAccount1.withdraw();
});

showHistoryTransactions.addEventListener("click", function () {
  bankAccount1.showTransactions();
  alert("Transactions are listed in the console.");
});
