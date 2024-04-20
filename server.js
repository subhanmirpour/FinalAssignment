// file: server.js

const connectDb = require("./config/dbConnection");
const express = require("express");
const errorHandler = require("./middleware/errorHandler")

const dotenv = require ("dotenv").config();
connectDb();
const app = express();
const port = process.env.PORT;
const cors = require('cors');

app.use(cors()); 
app.listen(port, ()=> {
    console.log(`Server running on port ${port}`);
})
app.use(express.json());

app.use(errorHandler);
app.use("/api/tasks", require("./routes/taskRoutes")); 
app.use("/api/users", require("./routes/userRoutes"));
