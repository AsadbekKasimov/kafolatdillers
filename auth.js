const tg = window.Telegram.WebApp;
tg.ready();

const user = tg.initDataUnsafe.user;

// если открыто не из Telegram
if (!user) {
  document.body.innerHTML = "⛔ Нет доступа";
  throw new Error("Not Telegram WebApp");
}

// 🔗 ВСТАВЬ СЮДА URL ТВОЕГО APPS SCRIPT
const CHECK_ACCESS_URL = "https://script.google.com/macros/s/AKfycbxIRw2o_hsm3h96fBEnsVcN7dr8CtheRHvuKjiMJrnp1arsbcKdssitZAg3FMG8C2wi/exec";

fetch(CHECK_ACCESS_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    telegram_id: user.id
  })
})
.then(res => res.json())
.then(data => {
  if (!data.allowed) {
    document.body.innerHTML = "⛔ Нет доступа";
    return;
  }

  // доступ есть — показываем контент
  const form = document.getElementById("orderForm");
  if (form) {
    form.style.display = "block";
  }
})
.catch(() => {
  document.body.innerHTML = "⚠️ Ошибка проверки доступа";
});
