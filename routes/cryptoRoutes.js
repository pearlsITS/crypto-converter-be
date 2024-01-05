const express = require('express');
const cryptoController = require('../controllers/cryptoController');

const router = express.Router();

router.get('/top-cryptos', cryptoController.getTopCryptos);
router.get('/supported-vs-currencies', cryptoController.getSupportedVsCurrency);
router.post('/convert', cryptoController.convertCurrency);

module.exports = router;
