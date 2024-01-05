const axios = require("axios");
const errorHandler = require("../utils/errorHandler");

const getTopCryptos = async (req, res) => {
  try {
    console.log('url',process.env.BASE_URL);
    const response = await axios.get(`${process.env.BASE_URL}/coins/markets`, {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 100,
        page: 1,
      },
    });
console.log("response",response);
    const topCryptos = response?.data.map((crypto) => ({
      id: crypto.id,
      name: crypto.name,
      symbol: crypto.symbol,
    }));
    res.json({ topCryptos });
  } catch (error) {
    errorHandler(res, error.response?.data);
  }
};

const getSupportedVsCurrency = async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/simple/supported_vs_currencies`,
      {
        params: {},
      }
    );
    const supportedVsCurrencies = response?.data;
    res.json({ supportedVsCurrencies });
  } catch (error) {
    errorHandler(res, error.response?.data);
  }
};

const convertCurrency = async (req, res) => {
  try {
    const { sourceCrypto, amount, targetCurrency } = req.body;
    if (!(sourceCrypto && amount && targetCurrency)) {
      res.status(400).json({ message: "All fields required" });
    }
    const cryptoRatesUrl = `${process.env.BASE_URL}/simple/price?ids=${sourceCrypto}&vs_currencies=${targetCurrency}`;
    const cryptoRatesResponse = await axios.get(cryptoRatesUrl);
    const conversionRate =
      cryptoRatesResponse?.data[sourceCrypto][targetCurrency];
    const convertedAmount = amount * conversionRate;

    if (!convertedAmount) {
      res.status(500).json({ error: "Something went wrong" });
    } else res.json({ convertedAmount });
  } catch (error) {
    errorHandler(res, error.response?.data);
  }
};

module.exports = { getTopCryptos, convertCurrency, getSupportedVsCurrency };
