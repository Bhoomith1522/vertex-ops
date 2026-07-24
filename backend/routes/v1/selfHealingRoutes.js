const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        module: "Self Healing"
    });
});

module.exports = router;