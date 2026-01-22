// ========== КОНФИГУРАЦИЯ ==========
// ВАЖНО: Замените этот URL на ваш URL из Google Apps Script
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyZzxeatuuDw4eiT5BFyH2VP35U-rIbqdTw3vDvBmcy8tujjVGmnmYuLLiKaGNnDchw/exec';

// ========== ПРОВЕРКА ДОСТУПА ==========
let dealerInfo = null;
let isAuthorized = false;

// Telegram WebApp initialization
const tg = window.Telegram.WebApp;
tg.expand();

// ОТЛАДКА: Показать информацию о Telegram WebApp
console.log('=== TELEGRAM WEBAPP DEBUG ===');
console.log('tg:', tg);
console.log('tg.initData:', tg.initData);
console.log('tg.initDataUnsafe:', tg.initDataUnsafe);
console.log('tg.initDataUnsafe?.user:', tg.initDataUnsafe?.user);
console.log('tg.initDataUnsafe?.user?.id:', tg.initDataUnsafe?.user?.id);
console.log('===========================');

// Проверка доступа при загрузке страницы
async function checkAccess() {
    try {
        // МЕТОД 1: Получаем chat_id из Telegram WebApp (основной)
        let chatId = tg.initDataUnsafe?.user?.id;
        
        // МЕТОД 2: Альтернативный способ (если первый не сработал)
        if (!chatId && tg.initDataUnsafe && tg.initDataUnsafe.user) {
            chatId = tg.initDataUnsafe.user.id;
        }
        
        // МЕТОД 3: Проверяем объект Telegram.WebApp напрямую
        if (!chatId && window.Telegram && window.Telegram.WebApp) {
            const webapp = window.Telegram.WebApp;
            if (webapp.initDataUnsafe && webapp.initDataUnsafe.user) {
                chatId = webapp.initDataUnsafe.user.id;
            }
        }
        
        // ОТЛАДКА: Показываем что получили
        console.log('Extracted chatId:', chatId);
        
        if (!chatId) {
            // Показываем детальную информацию об ошибке
            const debugInfo = `
                initData: ${tg.initData ? 'есть' : 'нет'}
                initDataUnsafe: ${tg.initDataUnsafe ? JSON.stringify(tg.initDataUnsafe) : 'нет'}
            `;
            console.error('Не удалось получить chat_id. Debug info:', debugInfo);
            
            showAccessDenied(
                'Не удалось получить ваш ID. Убедитесь, что вы открыли приложение через кнопку "🛒 Сделать заказ" в боте.'
            );
            return false;
        }
        
        // Показываем индикатор загрузки
        showLoadingScreen();
        
        // Проверяем, настроен ли Google Script URL
        if (GOOGLE_SCRIPT_URL === 'ВАШ_URL_ИЗ_GOOGLE_APPS_SCRIPT') {
            showAccessDenied(
                'Система авторизации не настроена. Обратитесь к администратору.'
            );
            return false;
        }
        
        // Проверяем доступ через Google Sheets
        console.log('Отправка запроса к Google Sheets:', `${GOOGLE_SCRIPT_URL}?chat_id=${chatId}`);
        const response = await fetch(`${GOOGLE_SCRIPT_URL}?chat_id=${chatId}`);
        
        console.log('Статус ответа:', response.status);
        const result = await response.json();
        console.log('Результат проверки:', result);
        
        if (result.success) {
            // Доступ разрешен
            dealerInfo = result.data;
            isAuthorized = true;
            console.log('✅ Доступ разрешен. Информация о диллере:', dealerInfo);
            hideLoadingScreen();
            initializeApp();
            return true;
        } else {
            // Доступ запрещен
            console.log('❌ Доступ запрещен:', result.message);
            showAccessDenied();
            return false;
        }
        
    } catch (error) {
        console.error('❌ Ошибка проверки доступа:', error);
        showAccessDenied('Произошла ошибка при проверке доступа. Попробуйте позже. Ошибка: ' + error.message);
        return false;
    }
}

// Показать экран "Доступ запрещен"
function showAccessDenied(customMessage = null) {
    document.body.innerHTML = `
        <div style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 20px;
            text-align: center;
            background: #F5F5F7;
        ">
            <div style="
                background: white;
                border-radius: 20px;
                padding: 40px 30px;
                max-width: 400px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            ">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#FF3B30" stroke-width="2" style="margin-bottom: 20px;">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
                
                <h2 style="
                    font-size: 24px;
                    font-weight: 600;
                    color: #1C1C1E;
                    margin-bottom: 15px;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                ">Доступ запрещен</h2>
                
                <p style="
                    font-size: 16px;
                    color: #8E8E93;
                    line-height: 1.5;
                    margin-bottom: 25px;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                ">
                    ${customMessage || 'У вас нет доступа к каталогу. Для получения доступа свяжитесь с администратором.'}
                </p>
                
                <a href="https://t.me/khaja_01" style="
                    display: inline-block;
                    background: #FF3B30;
                    color: white;
                    padding: 14px 30px;
                    border-radius: 12px;
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 16px;
                    transition: background 0.2s;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                " onmouseover="this.style.background='#E62E24'" onmouseout="this.style.background='#FF3B30'">
                    Написать администратору
                </a>
                
                <div style="
                    margin-top: 20px;
                    padding: 15px;
                    background: #f8f8f8;
                    border-radius: 10px;
                    font-size: 12px;
                    color: #666;
                    text-align: left;
                    font-family: monospace;
                ">
                    <strong>Отладочная информация:</strong><br>
                    Chat ID: ${tg.initDataUnsafe?.user?.id || 'не определен'}<br>
                    Username: ${tg.initDataUnsafe?.user?.username || 'не указан'}<br>
                    First name: ${tg.initDataUnsafe?.user?.first_name || 'не указано'}<br>
                    <br>
                    <small>Отправьте эту информацию администратору если проблема сохраняется.</small>
                </div>
            </div>
        </div>
    `;
}

// Показать экран загрузки
function showLoadingScreen() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading-screen';
    loadingDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: #F5F5F7;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        ">
            <div style="
                width: 50px;
                height: 50px;
                border: 4px solid #E5E5EA;
                border-top-color: #FF3B30;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            "></div>
            <p style="
                margin-top: 20px;
                color: #8E8E93;
                font-size: 16px;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            ">Проверка доступа...</p>
        </div>
        <style>
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        </style>
    `;
    document.body.appendChild(loadingDiv);
}

// Скрыть экран загрузки
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.remove();
    }
}

// Инициализация приложения после успешной авторизации
function initializeApp() {
    // Обновляем профиль с информацией о диллере
    if (dealerInfo) {
        document.getElementById('user-name').textContent = dealerInfo.name || 'Не указано';
        document.getElementById('user-phone').textContent = dealerInfo.tel_number || 'Не указано';
        document.getElementById('user-city').textContent = dealerInfo.region || 'Не указано';
    }
    
    // Запускаем основное приложение
    loadProducts();
}

// Запуск проверки доступа при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
    // Даем время Telegram WebApp инициализироваться
    setTimeout(() => {
        checkAccess();
    }, 100);
});

// ========== ОСТАЛЬНОЙ КОД ПРИЛОЖЕНИЯ (БЕЗ ИЗМЕНЕНИЙ) ==========
// ... (весь код от строки 200 до конца остается как в оригинале)
        { id: 10011, name: "Средство для ручной стирки Хоз.мыло 5кг * 1 шт", category: "cleaning", price: 30000, image: "https://asadbekkasimov.github.io/order/images/c11.jpg", description: "Средство для ручной стирки Хоз.мыло" }
    ],
    plasticpe: [
        { id: 20001, name: "ПЭТ 750 ml", category: "plastic", price: 10000, image: "https://asadbekkasimov.github.io/order/images/p1.png", description: "ПЭТ 750 ml" },
        { id: 20002, name: "ПЭ Флакон 2 l", category: "plastic", price: 10000, image: "https://asadbekkasimov.github.io/order/images/p2.png", description: "ПЭ Флакон 2 l" },
        { id: 20003, name: "ПЭ Флакон 2 l", category: "plastic", price: 10000, image: "https://asadbekkasimov.github.io/order/images/p3.png", description: "ПЭ Флакон 2 l" },
        { id: 20004, name: "ПЭ Флакон 3 l", category: "plastic", price: 10000, image: "https://asadbekkasimov.github.io/order/images/p4.png", description: "ПЭ Флакон 3 l" },
        { id: 20005, name: "ПЭ Флакон 1.5 l", category: "plastic", price: 10000, image: "https://asadbekkasimov.github.io/order/images/p5.png", description: "ПЭ Флакон 1.5 l" },
        { id: 20006, name: "Дозатор 32 gold", category: "plastic", price: 10000, image: "https://asadbekkasimov.github.io/order/images/p6.png", description: "Дозатор 32 утка" },
        { id: 20007, name: "Дозатор 32 утка", category: "plastic", price: 10000, image: "https://asadbekkasimov.github.io/order/images/p7.png", description: "Дозатор 32 " },
        { id: 20008, name: "Дозатор 32", category: "plastic", price: 10000, image: "https://asadbekkasimov.github.io/order/images/p8.png", description: "Дозатор 32" },
        { id: 20009, name: "Триггер желтый", category: "plastic", price: 10000, image: "https://asadbekkasimov.github.io/order/images/p9.png", description: "Триггер желтый" },
        { id: 20010, name: "Дозатор красный", category: "plastic", price: 10000, image: "https://asadbekkasimov.github.io/order/images/p10.jpg", description: "Дозатор красный" }
    ],
	 plasticpet: [
        { id: 30001, name: "ПЭТ 750 ml", category: "plastic", price: 10000, image: "https://asadbekkasimov.github.io/order/images/p1.png", description: "ПЭТ 750 ml" },
        { id: 30002, name: "ПЭ Флакон 2 l", category: "plastic", price: 10000, image: "https://asadbekkasimov.github.io/order/images/p2.png", description: "ПЭ Флакон 2 l" },
        { id: 30003, name: "ПЭ Флакон 2 l", category: "plastic", price: 10000, image: "https://asadbekkasimov.github.io/order/images/p3.png", description: "ПЭ Флакон 2 l" },
        { id: 30004, name: "ПЭ Флакон 3 l", category: "plastic", price: 10000, image: "https://asadbekkasimov.github.io/order/images/p4.png", description: "ПЭ Флакон 3 l" },
        { id: 30005, name: "ПЭ Флакон 1.5 l", category: "plastic", price: 10000, image: "https://asadbekkasimov.github.io/order/images/p5.png", description: "ПЭ Флакон 1.5 l" },
        { id: 30006, name: "Дозатор 32 gold", category: "plastic", price: 10000, image: "https://asadbekkasimov.github.io/order/images/p6.png", description: "Дозатор 32 утка" },
        { id: 30007, name: "Дозатор 32 утка", category: "plastic", price: 10000, image: "https://asadbekkasimov.github.io/order/images/p7.png", description: "Дозатор 32 " },
        { id: 30008, name: "Дозатор 32", category: "plastic", price: 10000, image: "https://asadbekkasimov.github.io/order/images/p8.png", description: "Дозатор 32" },
        { id: 30009, name: "Триггер желтый", category: "plastic", price: 10000, image: "https://asadbekkasimov.github.io/order/images/p9.png", description: "Триггер желтый" },
        { id: 30010, name: "Дозатор красный", category: "plastic", price: 10000, image: "https://asadbekkasimov.github.io/order/images/p10.jpg", description: "Дозатор красный" }
    ],
	 plasticpp: [
        { id: 40001, name: "Ведро 1000 мл", category: "plastic", price: 10000, image: "", description: "ПЭТ 750 ml" },
        { id: 40002, name: "Ведро 700 мл", category: "plastic", price: 10000, image: "https://asadbekkasimov.github.io/order/images/p2.png", description: "" },
        { id: 40003, name: "Ведро 450 мл", category: "plastic", price: 10000, image: "https://asadbekkasimov.github.io/order/images/p3.png", description: "" },
        { id: 40004, name: "Ведро 350 мл", category: "plastic", price: 10000, image: "https://asadbekkasimov.github.io/order/images/p4.png", description: "" },
        { id: 40005, name: "Ведро 300 мл", category: "plastic", price: 10000, image: "https://asadbekkasimov.github.io/order/images/p5.png", description: "" },
        { id: 40006, name: "Ведро 250 мл", category: "plastic", price: 10000, image: "https://asadbekkasimov.github.io/order/images/p6.png", description: "Дозатор 32 утка" },
        { id: 40007, name: "Ведро 200 мл", category: "plastic", price: 10000, image: "https://asadbekkasimov.github.io/order/images/p7.png", description: "Дозатор 32 " },
        { id: 40008, name: "Ведро 150 мл", category: "plastic", price: 10000, image: "https://asadbekkasimov.github.io/order/images/p8.png", description: "Дозатор 32" },
        { id: 40009, name: "Ведро 100 мл", category: "plastic", price: 10000, image: "https://asadbekkasimov.github.io/order/images/p9.png", description: "Триггер желтый" },
        { id: 40010, name: "Ведро 50 мл", category: "plastic", price: 10000, image: "https://asadbekkasimov.github.io/order/images/p10.jpg", description: "Дозатор красный" }
    ],
	 plastictd: [
        { id: 50001, name: "ПЭТ 750 ml", category: "plastic", price: 10000, image: "", description: "ПЭТ 750 ml" },
        { id: 50002, name: "ПЭ Флакон 2 l", category: "plastic", price: 10000, image: "", description: "ПЭ Флакон 2 l" },
        { id: 50003, name: "ПЭ Флакон 2 l", category: "plastic", price: 10000, image: "", description: "ПЭ Флакон 2 l" },
        { id: 50004, name: "ПЭ Флакон 3 l", category: "plastic", price: 10000, image: "", description: "ПЭ Флакон 3 l" },
        { id: 50005, name: "ПЭ Флакон 1.5 l", category: "plastic", price: 10000, image: "", description: "ПЭ Флакон 1.5 l" },
        { id: 50006, name: "Дозатор 32 gold", category: "plastic", price: 10000, image: "", description: "Дозатор 32 утка" },
        { id: 50007, name: "Дозатор 32 утка", category: "plastic", price: 10000, image: "", description: "Дозатор 32 " },
        { id: 50008, name: "Дозатор 32", category: "plastic", price: 10000, image: "", description: "Дозатор 32" },
        { id: 50009, name: "Триггер желтый", category: "plastic", price: 10000, image: "", description: "Триггер желтый" },
        { id: 50010, name: "Дозатор красный", category: "plastic", price: 10000, image: "", description: "Дозатор красный" }
    ],
    chemicals: [
        { id: 60001, name: "SLES 70%", category: "chemicals", price: 20000, image: "https://sc04.alicdn.com/kf/U41de75a3a33d4cae8535c12e9b1799a7u/200L-Plastic-Drum-Blue-HDPE-Chemical-sealed-Oil-Barrel-200-Litre/KG-Blow-Molding-Bucket-Double-Lid-55-Gallon-Plastic-Drum.jpg", description: "Sodium Laureth Sulfate 70% Китай" },
        { id: 60002, name: "APG 8-10", category: "chemicals", price: 18000, image: "https://sc04.alicdn.com/kf/U41de75a3a33d4cae8535c12e9b1799a7u/200L-Plastic-Drum-Blue-HDPE-Chemical-sealed-Oil-Barrel-200-Litre/KG-Blow-Molding-Bucket-Double-Lid-55-Gallon-Plastic-Drum.jpg", description: "APG 8-10 Китай" },
        { id: 60003, name: "Cetyl alcohol", category: "chemicals", price: 30000, image: "https://sc04.alicdn.com/kf/U41de75a3a33d4cae8535c12e9b1799a7u/200L-Plastic-Drum-Blue-HDPE-Chemical-sealed-Oil-Barrel-200-Litre/KG-Blow-Molding-Bucket-Double-Lid-55-Gallon-Plastic-Drum.jpg", description: "Cetyl alcohol Малайзия" },
        { id: 60004, name: "Methyl Ester Sulfonate (MES)", category: "chemicals", price: 25000, image: "https://sc04.alicdn.com/kf/U41de75a3a33d4cae8535c12e9b1799a7u/200L-Plastic-Drum-Blue-HDPE-Chemical-sealed-Oil-Barrel-200-Litre/KG-Blow-Molding-Bucket-Double-Lid-55-Gallon-Plastic-Drum.jpg", description: "Methyl Ester Sulfonate (MES)" },
        { id: 60005, name: "Cocamidopropyl aminoxide", category: "chemicals", price: 22000, image: "https://sc04.alicdn.com/kf/U41de75a3a33d4cae8535c12e9b1799a7u/200L-Plastic-Drum-Blue-HDPE-Chemical-sealed-Oil-Barrel-200-Litre/KG-Blow-Molding-Bucket-Double-Lid-55-Gallon-Plastic-Drum.jpg", description: "Cocamidopropyl aminoxide" },
        { id: 60006, name: "LABSA (Линейная алкилбензолсульфокислота)", category: "chemicals", price: 15000, image: "https://sc04.alicdn.com/kf/U41de75a3a33d4cae8535c12e9b1799a7u/200L-Plastic-Drum-Blue-HDPE-Chemical-sealed-Oil-Barrel-200-Litre/KG-Blow-Molding-Bucket-Double-Lid-55-Gallon-Plastic-Drum.jpg", description: "LABSA (Линейная алкилбензолсульфокислота)" },
        { id: 60007, name: "Изопропиловый спирт", category: "chemicals", price: 28000, image: "https://sc04.alicdn.com/kf/U41de75a3a33d4cae8535c12e9b1799a7u/200L-Plastic-Drum-Blue-HDPE-Chemical-sealed-Oil-Barrel-200-Litre/KG-Blow-Molding-Bucket-Double-Lid-55-Gallon-Plastic-Drum.jpg", description: "Технический спирт" },
        { id: 60008, name: "Неонол", category: "chemicals", price: 12000, image: "https://sc04.alicdn.com/kf/U41de75a3a33d4cae8535c12e9b1799a7u/200L-Plastic-Drum-Blue-HDPE-Chemical-sealed-Oil-Barrel-200-Litre/KG-Blow-Molding-Bucket-Double-Lid-55-Gallon-Plastic-Drum.jpg", description: "Неонол" },
        { id: 60009, name: "CMEA", category: "chemicals", price: 18000, image: "https://sc04.alicdn.com/kf/U41de75a3a33d4cae8535c12e9b1799a7u/200L-Plastic-Drum-Blue-HDPE-Chemical-sealed-Oil-Barrel-200-Litre/KG-Blow-Molding-Bucket-Double-Lid-55-Gallon-Plastic-Drum.jpg", description: "CMEA" },
        { id: 60010, name: "AOS", category: "chemicals", price: 20000, image: "https://sc04.alicdn.com/kf/U41de75a3a33d4cae8535c12e9b1799a7u/200L-Plastic-Drum-Blue-HDPE-Chemical-sealed-Oil-Barrel-200-Litre/KG-Blow-Molding-Bucket-Double-Lid-55-Gallon-Plastic-Drum.jpg", description: "AOS" }
    ],
    fragrances: [
        { id: 70001, name: "Отдушка Лаванда", category: "fragrances", price: 35000, image: "https://asadbekkasimov.github.io/order/images/fs.png", description: "Натуральная отдушка лаванды" },
        { id: 70002, name: "Отдушка Цитрус", category: "fragrances", price: 32000, image: "https://asadbekkasimov.github.io/order/images/fs.png", description: "Свежий цитрусовый аромат" },
        { id: 70003, name: "Отдушка Роза", category: "fragrances", price: 38000, image: "https://asadbekkasimov.github.io/order/images/fs.png", description: "Нежный аромат розы" },
        { id: 70004, name: "Отдушка Морской бриз", category: "fragrances", price: 34000, image: "https://asadbekkasimov.github.io/order/images/fs.png", description: "Свежий морской аромат" },
        { id: 70005, name: "Отдушка Ваниль", category: "fragrances", price: 36000, image: "https://asadbekkasimov.github.io/order/images/fs.png", description: "Сладкий ванильный аромат" }
    ]
};

// State
let currentCategory = 'all';
let currentPage = 'catalog';
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let selectedProduct = null;

// Load products
function loadProducts() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';
    
    let products = [];
    if (currentCategory === 'all') {
        products = Object.values(productsData).flat();
    } else {
        products = productsData[currentCategory] || [];
    }
    
    products.forEach(product => {
        const card = createProductCard(product);
        grid.appendChild(card);
    });
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const isFavorite = favorites.some(f => f.id === product.id);
    
	// использовать первую картинку или fallback
	const img = product.images?.[0] || product.image || '';

    card.innerHTML = `
        <button class="favorite-btn ${isFavorite ? 'active' : ''}" onclick="toggleFavorite(event, ${product.id})">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
        </button>
        <img src="${img}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/200?text=No+Image'">
        <div class="product-name">${product.name}</div>
        <div class="product-price">${formatPrice(product.price)}</div>
        <button class="product-add-btn" onclick="openProductModal(event, ${product.id})">Подробнее</button>
    `;
    
    return card;
}

// Toggle favorite
function toggleFavorite(event, productId) {
    event.stopPropagation();
    
    const index = favorites.findIndex(f => f.id === productId);
    const btn = event.currentTarget;
    
    if (index > -1) {
        favorites.splice(index, 1);
        btn.classList.remove('active');
    } else {
        const product = findProduct(productId);
        if (product) {
            favorites.push(product);
            btn.classList.add('active');
        }
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    if (currentPage === 'favorites') {
        loadFavorites();
    }
}

// Find product by ID
function findProduct(id) {
    for (let category in productsData) {
        const product = productsData[category].find(p => p.id === id);
        if (product) return product;
    }
    return null;
}

// Open product modal
function openProductModal(event, productId) {
    event.stopPropagation();
    
    const product = findProduct(productId);
    if (!product) return;
    
    selectedProduct = product;
    
    const modal = document.getElementById('product-modal');
    
	// slider images
	const images = product.images || [product.image || ''];
	const slides = document.getElementById('modal-slides');
	const dots = document.getElementById('modal-dots');

	slides.innerHTML = images.map(img => 
	  `<img src="${img}" class="slide zoomable" onerror="this.src='https://via.placeholder.com/300?text=No+Image'">`
	).join('');

	dots.innerHTML = images.map((_, i) => 
	  `<span class="dot ${i === 0 ? 'active' : ''}"></span>`
	).join('');

	document.getElementById('modal-slider').dataset.index = '0';

    document.getElementById('modal-title').textContent = product.name;
    document.getElementById('modal-description').textContent = product.description;
    document.getElementById('modal-price').textContent = formatPrice(product.price);
    document.getElementById('qty-input').value = 1;
    
    modal.classList.remove('hidden');
}

// Close modal
document.getElementById('modal-close').addEventListener('click', () => {
    document.getElementById('product-modal').classList.add('hidden');
});

// Quantity controls
document.getElementById('qty-minus').addEventListener('click', () => {
    const input = document.getElementById('qty-input');
    const value = parseInt(input.value);
    if (value > 1) {
        input.value = value - 1;
    }
});

document.getElementById('qty-plus').addEventListener('click', () => {
    const input = document.getElementById('qty-input');
    const value = parseInt(input.value);
    input.value = value + 1;
});

// Add to cart from modal
document.getElementById('modal-add-to-cart').addEventListener('click', () => {
    if (!selectedProduct) return;
    
    const qty = parseInt(document.getElementById('qty-input').value);
    const existingItem = cart.find(item => item.id === selectedProduct.id);
    
    if (existingItem) {
        existingItem.quantity += qty;
    } else {
		const img = selectedProduct.images?.[0] || selectedProduct.image || '';
        cart.push({
            ...selectedProduct,
			image: img,
            quantity: qty
        });
    }
    
    saveCart();
    updateCartBadge();
    document.getElementById('product-modal').classList.add('hidden');
    
    // Show feedback
    tg.HapticFeedback.notificationOccurred('success');
});

// Save cart
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart badge
function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (totalItems > 0) {
        badge.textContent = totalItems;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
}

// Navigation
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const page = btn.dataset.page;
        switchPage(page);
    });
});

function switchPage(page) {
    currentPage = page;
    
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.page === page);
    });
    
    // Update pages
    document.querySelectorAll('.page').forEach(p => {
        p.classList.toggle('active', p.id === `${page}-page`);
    });
    
    // Load page content
    if (page === 'favorites') {
        loadFavorites();
    } else if (page === 'cart') {
        loadCart();
    } else if (page === 'profile') {
        loadProfile();
    }
}

// Load favorites
function loadFavorites() {
    const grid = document.getElementById('favorites-grid');
    grid.innerHTML = '';
    
    if (favorites.length === 0) {
        grid.innerHTML = '<div class="empty-state"><p>У вас пока нет избранных товаров</p></div>';
        return;
    }
    
    favorites.forEach(product => {
        const card = createProductCard(product);
        grid.appendChild(card);
    });
}

// Load cart
function loadCart() {
    const container = document.getElementById('cart-items');
    const summary = document.getElementById('cart-summary');
    
    if (cart.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>Ваша корзина пуста</p></div>';
        summary.classList.add('hidden');
        return;
    }
    
    container.innerHTML = '';
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='https://via.placeholder.com/80?text=No+Image'">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${formatPrice(item.price)}</div>
                <div class="cart-item-controls">
                    <button class="cart-qty-btn" onclick="updateCartQty(${item.id}, -1)">-</button>
                    <span class="cart-qty">${item.quantity}</span>
                    <button class="cart-qty-btn" onclick="updateCartQty(${item.id}, 1)">+</button>
                    <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Удалить</button>
                </div>
            </div>
        `;
        container.appendChild(cartItem);
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cart-total-amount').textContent = formatPrice(total);
    summary.classList.remove('hidden');
}

// Update cart quantity
function updateCartQty(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== productId);
    }
    
    saveCart();
    updateCartBadge();
    loadCart();
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(i => i.id !== productId);
    saveCart();
    updateCartBadge();
    loadCart();
}

// Load profile
function loadProfile() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const ordersList = document.getElementById('orders-list');
    
    if (orders.length === 0) {
        ordersList.innerHTML = '<p class="empty-state">У вас пока нет заказов</p>';
        return;
    }
    
    ordersList.innerHTML = '';
    orders.slice(0, 5).forEach(order => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <div class="order-id">Заказ #${order.id}</div>
            <div class="order-date">${order.date} - ${order.items} товаров - ${formatPrice(order.total)}</div>
        `;
        ordersList.appendChild(orderItem);
    });
}

// Categories
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        currentCategory = btn.dataset.category;
        
        document.querySelectorAll('.category-btn').forEach(b => {
            b.classList.remove('active');
        });
        btn.classList.add('active');
        
        loadProducts();
    });
});

// Search
document.getElementById('search-input').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const grid = document.getElementById('products-grid');
    
    let products = [];
    if (currentCategory === 'all') {
        products = Object.values(productsData).flat();
    } else {
        products = productsData[currentCategory] || [];
    }
    
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm)
    );
    
    grid.innerHTML = '';
    filtered.forEach(product => {
        const card = createProductCard(product);
        grid.appendChild(card);
    });
});

// Checkout
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) return;
    
    // Show confirmation dialog
    showConfirmationDialog();
});

function showConfirmationDialog() {
    const modal = document.getElementById('confirmation-modal');
    modal.classList.remove('hidden');
}

function closeConfirmationDialog() {
    const modal = document.getElementById('confirmation-modal');
    modal.classList.add('hidden');
}

function confirmCheckout() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Prepare order data - ИЗМЕНЕНО: Теперь включаем URL изображения
    const orderData = {
        items: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            qty: item.quantity,
            image: item.image  // ДОБАВЛЕНО: Включаем URL изображения в данные заказа
        })),
        total: total,
        user_id: tg.initDataUnsafe?.user?.id || 0,
        dealer_info: dealerInfo  // Добавляем информацию о диллере
    };
    
    // Send data back to bot
    tg.sendData(JSON.stringify(orderData));
    
    // Save order to localStorage for history
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.unshift({
        id: Date.now(),
        date: new Date().toLocaleDateString('ru-RU'),
        total: total,
        items: cart.length
    });
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Clear cart
    cart = [];
    saveCart();
    updateCartBadge();
    
    // Close confirmation dialog
    closeConfirmationDialog();
    
    tg.close();
}

// Utils
function formatPrice(price) {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' сум';
}
/* ===== SLIDER SWIPE ===== */
document.addEventListener('touchstart', e => {
    const slider = e.target.closest('.slider');
    if (!slider) return;
    slider.startX = e.touches[0].clientX;
});

document.addEventListener('touchend', e => {
    const slider = e.target.closest('.slider');
    if (!slider) return;

    const slides = slider.querySelector('.slides');
    const dots = slider.querySelectorAll('.dot');
    const count = slides.children.length;

    let index = +slider.dataset.index;
    const diff = e.changedTouches[0].clientX - slider.startX;

    if (diff < -50 && index < count - 1) index++;
    if (diff > 50 && index > 0) index--;

    slider.dataset.index = index;
    slides.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach((d, i) => d.classList.toggle('active', i === index));
});
// zoom on tap
document.addEventListener('click', e => {
    const img = e.target.closest('.zoomable');
    if (!img) return;
    img.classList.toggle('zoomed');
});
