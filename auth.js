
const tg = window.Telegram.WebApp;

if (!tg.initDataUnsafe?.user?.id) {
  tg.close();
}

const chatId = String(tg.initDataUnsafe.user.id).trim(); // ✅ строка

const SHEET_URL = "https://docs.google.com/spreadsheets/d/1lBPp8N7j0faSoWjcWbKjQLnMwFS6YBIWZVJ94ZbhlYI/export?format=csv";

fetch(SHEET_URL)
  .then(r => r.text())
  .then(csv => {
    const lines = csv.trim().split("\n").slice(1);

    const dealers = lines
      .map(l => l.split(",")[0].replace(/"/g,'').trim()) // ✅ строка без кавычек
      .filter(id => id) // убрать пустые
      ;

    if (!dealers.includes(chatId)) {
      alert("⛔️ Доступ запрещён");
      tg.close();
    }
  })
  .catch(() => {
    tg.close();
  });
