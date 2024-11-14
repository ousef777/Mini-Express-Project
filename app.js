const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT;
const app = express();
const cors = require('cors');
const path = require('path');

const Routes = require('./Routes');
const connectDb = require('./database');
const morgan = require('morgan');
connectDb();

app.use(express.json());

app.use(morgan("dev"));
app.use(cors());
app.use("/media", express.static(path.join(__dirname, "media")));

app.use('/', Routes);

app.use('*', (req, res) =>
    res.status(404).json({
        message: `${req.method} ${req.url}: Route not found`
    }));

app.listen(PORT, () => {
    console.log(`The application is running on http://localhost:${PORT}`);
});