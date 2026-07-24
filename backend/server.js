require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const healthRoutes = require("./routes/healthRoutes");
const apiV1Routes = require("./routes/v1");


const app = express();
app.use(express.json());

const PORT = 5000;

app.use("/health", healthRoutes);
app.use("/api/v1", apiV1Routes);
connectDB();
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});