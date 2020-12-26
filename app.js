const api = "https://api.exchangeratesapi.io/";

const currencyOne = document.getElementById("currency_one");
const currencyTwo = document.getElementById("currency_two");
const amount = document.getElementById("amount");
const btnCalc = document.getElementById("btn_calculator");
const result = document.getElementById("result");

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
