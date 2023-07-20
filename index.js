const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/user.router");
const { authenticate } = require("./middlewares/auth.middleware");
const { productRouter } = require("./routes/product.router");
const cors = require("cors");
const { tracker } = require("./middlewares/tracker.middleware");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(tracker)

app.use("/user", userRouter);
app.use(authenticate);
app.use("/product", productRouter)

app.get("/", (req,res) => {
    res.send("Home Page")
})



PORT=process.env.PORT || 4500;

app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log("Connecte to the DB");
        console.log(`Server is running on ${PORT}`);
    } catch (error) {
        console.log(error.message);
    }
});