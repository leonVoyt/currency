import React, { useState, useEffect } from "react";
import CurrencyConverter from "./components/CurrencyConverter";
import "./App.css";
import { getCurrency } from "./API";

const App = () => {
  const [rates, setRates] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const rates = await getCurrency(["UAH", "USD", "EUR"]);
        setRates(rates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchRates();
  }, []);

  if (!rates) {
    return <div>Loading rates...</div>;
  }

  return (
    <div className="container">
      <header>
        <h1>Currency Rates</h1>
        <p>UAH: {parseFloat((1 / rates.USD).toFixed(2))} USD</p>
        <p>UAH: {parseFloat((1 / rates.EUR).toFixed(2))} EUR</p>
      </header>
      <CurrencyConverter rates={rates} />
    </div>
  );
};

export default App;
