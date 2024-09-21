import React, { useState } from "react";
import "./styles.css";
const LetterCode = {
  UAH: "₴",
  USD: "$",
  EUR: "€",
};

const CurrencyConverter = ({ rates }) => {
  const currencies = ["UAH", "USD", "EUR"];
  const [firstCurrency, setFirstCurrency] = useState("UAH");
  const [secondCurrency, setSecondCurrency] = useState("USD");
  const [firstAmount, setFirstAmount] = useState(100);

  const convertCurrency = (amount, from, to) => {
    if (from === to) return amount;
    const result = (amount * rates[from]) / rates[to];
    return parseFloat(result.toFixed(2));
  };

  const [secondAmount, setSecondAmount] = useState(() =>
    convertCurrency(firstAmount, secondCurrency, firstCurrency)
  );

  const handleFirstAmountChange = (value) => {
    const amount = parseFloat(+value) || 0;
    setFirstAmount(amount);
    setSecondAmount(convertCurrency(amount, secondCurrency, firstCurrency));
  };

  const handleSecondAmountChange = (value) => {
    const amount = parseFloat(+value) || 0;
    setSecondAmount(amount);
    setFirstAmount(convertCurrency(amount, firstCurrency, secondCurrency));
  };

  const handleFirstCurrencyChange = (currency) => {
    setFirstCurrency(currency);

    setSecondAmount(convertCurrency(firstAmount, secondCurrency, currency));
  };

  const handleSecondCurrencyChange = (currency) => {
    setSecondCurrency(currency);

    setSecondAmount(convertCurrency(firstAmount, currency, firstCurrency));
  };

  return (
    <div className="currency-converter">
      <div className="converter-item">
        <p className="converter-item_text">from</p>
        <input
          type="text"
          value={firstAmount + " " + LetterCode[firstCurrency]}
          onChange={(e) => handleFirstAmountChange(e.target.value)}
        />
        <select
          value={firstCurrency}
          onChange={(e) => handleFirstCurrencyChange(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <div className="converter-item">
        <p className="converter-item_text">to</p>
        <input
          type="text"
          value={secondAmount + " " + LetterCode[secondCurrency]}
          onChange={(e) => handleSecondAmountChange(e.target.value)}
        />
        <select
          value={secondCurrency}
          onChange={(e) => handleSecondCurrencyChange(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CurrencyConverter;
