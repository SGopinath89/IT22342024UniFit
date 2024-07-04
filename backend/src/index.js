const express = require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./utils/config.js');
const routes = require('./routes/index.routes.js');
const connectDB = require('./database/config.js');

const app = express();

app.use(bodyParser.json());

app.use("/api",routes);
connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})