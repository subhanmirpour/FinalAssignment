const connectDb = require("./config/dbConnection");
const express = require("express");
const errorHandler = require("./middleware/errorHandler")

const dotenv = require ("dotenv").config();
connectDb();
const app = express();
const port = process.env.PORT;
app.listen(port, ()=> {
    console.log(`Server running on port ${port}`);
})
app.use(express.json());

app.use(errorHandler);
app.use("/api/students", require("./routes/studentRoutes")); 
app.use("/api/users", require("./routes/userRoutes"));
