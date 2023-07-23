const express = require("express");
const { connection } = require("../db");
const { userRouter } = require("../routes/user.router");
const { productRouter } = require("../routes/product.router");
const cors = require("cors");
const passport = require("./Oauth");
// const { tracker } = require("./middlewares/tracker.middleware");
require("dotenv").config();

PORT = process.env.PORT || 4500;

const app = express();
app.use(express.json());
app.use(cors());

// app.use(tracker)

app.use("/user", userRouter);

app.use("/product", productRouter)

app.get("/", (req, res) => {
    res.send("Home Page");
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }), (req, res) => {
    res.send("Google OAuth completed");
});

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false}),
    function (req, res) {
        res.redirect('/');
    });

app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log("Connecte to the DB");
        console.log(`Server is running on ${PORT}`);
    } catch (error) {
        console.log(error);
    }
});