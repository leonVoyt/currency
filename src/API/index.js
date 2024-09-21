import axios from "axios";

export const getCurrency = async (currName) => {
  const response = await axios.get(
    "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json"
  );
  let result = response.data.reduce(
    (acc, curr) => {
      if (currName.includes(curr.cc) && curr.rate) {
        acc[curr.cc] = 1 / curr.rate;
      }
      return acc;
    },
    { UAH: 1 }
  );

  return result;
};

const LetterCode = {
  UAH: "₴",
  USD: "$",
  EUR: "€",
};
