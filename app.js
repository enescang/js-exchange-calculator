const api = "https://api.exchangeratesapi.io/";

const currencyOne = document.getElementById("currency_one");
const currencyTwo = document.getElementById("currency_two");
const currencyThree = document.getElementById("currency_three");
const currencyFour = document.getElementById("currency_four");
const amount = document.getElementById("amount");
const btnCalc = document.getElementById("btn_calculator");
const btnHistory = document.getElementById("btn_history");
const result = document.getElementById("result");
const resultHistory = document.getElementById("result_history");
const dateInput = document.getElementById('date_input');

const loadCurrency = async () => {
  try {
    const response = await fetch("./currencies.json");
    const data = await response.json();

    const keys = Object.keys(data);
    const values = Object.values(data);
    let options;

    for (let i = 0; i < keys.length; i++) {
      options += `<option value=${keys[i]}>${values[i]}</option>`;
    }
    currencyOne.innerHTML += options;
    currencyTwo.innerHTML += options;
    currencyThree.innerHTML += options;
    currencyFour.innerHTML += options;
  } catch (error) {
    alert("Currencies could not be loaded :( " + error);
  }
};

loadCurrency();

btnCalc.addEventListener("click", async () => {
  const baseCurrency = currencyOne.value;
  const converTo = currencyTwo.value;
  const currencyAmount = amount.value;

  try {
    const response = await fetch(`${api}latest?base=${baseCurrency}`);
    const data = await response.json();

    const rate = data.rates[converTo];
    result.innerHTML = `${currencyAmount} ${baseCurrency} = ${
      currencyAmount * rate
    }`;
  } catch (error) {
    alert("Something went wrong :( " + error);
  }
});

btnHistory.addEventListener('click', async () => {
  const selectedDay = dateInput.value;
  const previousDay = new Date((new Date(selectedDay)).valueOf() - 1000*60*60*24);
  const previousDayFormat = `${previousDay.getFullYear()}-${(previousDay.getMonth()+1)}-${previousDay.getDate()}`

  try {
    const response = await fetch(`${api}history?start_at=${previousDayFormat}&end_at=${selectedDay}&base=${currencyThree.value}`)
    const data = await response.json();
    resultHistory.innerHTML = `
   1 ${currencyThree.value} = ${data.rates[selectedDay][currencyFour.value]} ${currencyFour.value}
   at ${selectedDay}
    `;
  } catch (error) {
    alert('Data not found at ' + selectedDay);
  }
});
