const chalk = require("chalk"); // Harus versi 4
const figlet = require("figlet");

console.log(
  chalk.green(
    figlet.textSync("Bot WA Sticker", {
      font: "Standard",
      horizontalLayout: "default",
      verticalLayout: "default",
    })
  )
);

// Tampilkan log tambahan
console.log(chalk.blue("🤖 Bot Sticker by Tayx69"));
console.log(chalk.yellow("🚀 Memulai koneksi ke WhatsApp..."));

require("./index");