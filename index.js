const express = require('express');
const cryptoRoutes = require('./routes/cryptoRoutes');
const bodyParser = require("body-parser");
const cors = require("cors");
// require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.get('/',(req,res) => res.send( "Hello Crypto.!"))
app.use('/api', cryptoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
