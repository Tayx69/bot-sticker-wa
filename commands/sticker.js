const { downloadContentFromMessage } = require("@whiskeysockets/baileys");
const fs = require("fs");
const path = require("path");
const { randomUUID } = require("crypto");
const ffmpeg = require("fluent-ffmpeg");

module.exports = async (sock, msg) => {
  const imageMessage = msg.message?.imageMessage;
  const videoMessage = msg.message?.videoMessage;

  const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
  const quotedImage = quoted?.imageMessage;
  const quotedVideo = quoted?.videoMessage;

  let mediaType = null;
  let messageContent = null;

  if (quotedImage || quotedVideo) {
    mediaType = quotedImage ? "image" : "video";
    messageContent = quotedImage || quotedVideo;
  } else if (imageMessage || videoMessage) {
    mediaType = imageMessage ? "image" : "video";
    messageContent = imageMessage || videoMessage;
  }

  if (!mediaType || !messageContent) {
    return sock.sendMessage(msg.key.remoteJid, {
      text: "❌ Kirim gambar/video dengan caption *.sticker* atau reply media tersebut.",
    }, { quoted: msg });
  }

  const stream = await downloadContentFromMessage(messageContent, mediaType);

  const tempFile = path.join(__dirname, "../temp", randomUUID());
  const inputPath = tempFile + (mediaType === "image" ? ".jpg" : ".mp4");
  const outputPath = tempFile + ".webp";

  const buffer = [];
  for await (const chunk of stream) buffer.push(chunk);
  fs.writeFileSync(inputPath, Buffer.concat(buffer));

  try {
    await new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .outputOptions([
          "-vcodec", "libwebp",
          "-vf", mediaType === "image"
            ? "scale=512:512:force_original_aspect_ratio=decrease,fps=15"
            : "scale=512:512:force_original_aspect_ratio=decrease,fps=15,format=yuva420p",
          "-loop", "0",
          "-ss", "0",
          "-t", "6",
          "-preset", "default",
          "-an", "-vsync", "0"
        ])
        .toFormat("webp")
        .save(outputPath)
        .on("end", resolve)
        .on("error", reject);
    });

    await sock.sendMessage(msg.key.remoteJid, {
      sticker: fs.readFileSync(outputPath),
    }, { quoted: msg });

  } catch (err) {
    console.error("❌ Sticker Error:", err);
    await sock.sendMessage(msg.key.remoteJid, {
      text: "⚠️ Gagal mengubah media jadi stiker.",
    }, { quoted: msg });
  } finally {
    fs.unlinkSync(inputPath);
    if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
  }
};