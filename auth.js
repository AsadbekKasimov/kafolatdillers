const tg = window.Telegram.WebApp;

// 1. Проверяем, что открыто из Telegram
if (!tg.initDataUnsafe?.user?.id) {
  tg.close();
}

// 2. Берём chat_id
const chatId = tg.initDataUnsafe.user.id;

// 3. Загружаем диллеров из Google Sheets
const SHEET_URL = "https://docs.google.com/spreadsheets/d/1lBPp8N7j0faSoWjcWbKjQLnMwFS6YBIWZVJ94ZbhlYI/export?format=csv";

fetch(SHEET_URL)
  .then(r => r.text())
  .then(csv => {
    const lines = csv.trim().split("\n").slice(1);

    const dealers = lines
      .map(l => l.split(","))
      .filter(r => r[2]?.trim().toUpperCase() === "TRUE")
      .map(r => Number(r[0]));

    // 4. Проверка доступа
    if (!dealers.includes(chatId)) {
      alert("⛔️ Доступ запрещён");
      tg.close();
    }
  })
  .catch(() => {
    tg.close();
  });