module.exports = async (sock, msg) => {
  const sender = msg.pushName || "Teman";
  const text = `
👋 Hai *${sender}*!
Saya adalah bot WhatsApp pribadi.

📌 Perintah tersedia:
• *.sticker* — Ubah gambar/video jadi stiker

Ketik perintah sesuai dengan yang tersedia.
  `.trim();

  await sock.sendMessage(msg.key.remoteJid, { text }, { quoted: msg });
};