# Bot Sticker WhatsApp

Bot sticker Whatsapp ini berbasis [Baileys.](https://github.com/WhiskeySockets/Baileys)

## 🚀 Fitur

- Convert gambar/vidio menjadi Sticker
- Gunakan perintah `.start` untuk memulai
- Support Termux versi terbaru

## 📱 Instalasi dengan Termux (Android)

Ikuti langkah-langkah berikut unutk menjalankan bot whatsapp di Termux.

#### ✅ 1. Update dan Upgrade Termux

```bash
pkg update && pkg upgrade
```

#

#### 🧱 2. Install Node.js, Git dan FFmpeg

```bash
pkg install nodejs git ffmpeg
```

> Penjelasan singkat:

    nodejs = Menjalankan aplikasi bot
    git = Untuk clone dari Github
    ffmpeg = Wajib untuk fitur sticker & media

#

#### 📤 3. Clone Repository

```bash
git clone https://github.com/Tayx69/bot-sticker-wa.git
```

Lalu buka hasil clone:

```bash
cd bot-sticker-wa
```

#

#### 📦 4. Install Dependency / Module Node.js

```bash
npm install
```

Ini akan menginstall semua dependency / module dari `package.json` dan membuat folder `node_modules`

###### ⚠️ Warning

`npm install` bisa error ketika dijalankan di Penyimpanan Internal dan apa bila tidak ada folder `node_modules` saya sarankan:

```bash
cd ~
git clone https://github.com/Tayx69/bot-sticker-wa.git
cd bot-sticker-wa
npm install
```

#

#### 🚀 5. Jalankan bot

```bash
node run.js
```

Kamu harus Scan QR agar bot bisa login di Whatsapp

💡 Disarankan menggunakan 2 device untuk tampilkan QR dan scan QR

#

#### 📌 Catatan

- Jangan hapus session Termux jika ingin selalu aktif
- Gunakan Termux versi terbaru jangan di Playstore
- Setelah scan QR kamu akan dapat folder `session` jangan dibagikan karna itu data login Whatsapp kamu
- Untuk jalankan ulang cukup:

```bash
cd ~
cd bot-sticker-wa
node run.js
```
