require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/database");
const healthRoutes = require("./routes/healthRoutes");
const apiV1Routes = require("./routes/v1");

const { register, httpRequestCounter } = require("./config/metrics");

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {

    res.on("finish", () => {

        httpRequestCounter.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status: res.statusCode
        });

    });

    next();

});

app.use("/health", healthRoutes);

app.use("/api/v1", apiV1Routes);

app.get("/metrics", async (req, res) => {

    res.set("Content-Type", register.contentType);

    res.end(await register.metrics());

});

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});