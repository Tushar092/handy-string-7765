const express = require("express");
const { connection } = require("./db");
require("dotenv").config();

const app = express();

app.use(express.json());

app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("Connecte to the DB");
        console.log("Running server");
    } catch (error) {
        console.log(error.message);
    }
});