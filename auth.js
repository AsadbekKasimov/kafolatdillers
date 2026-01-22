// auth.js - Модуль аутентификации через Google Sheets
// Проверяет chat_id клиента напрямую с Google Sheets

class AuthManager {
    constructor() {
        // ВАЖНО: Замените эти значения на свои
        this.SPREADSHEET_ID = '1lBPp8N7j0faSoWjcWbKjQLnMwFS6YBIWZVJ94ZbhlYI'; // ID вашей Google таблицы
        this.API_KEY = 'AIzaSyBq7TLlKSv48J6mh98Sa3O08HT4SGQ2ERg'; // Ваш Google API ключ
        this.SHEET_NAME = 'Dillers'; // Название листа (по умолчанию Sheet1)
        
        this.tg = window.Telegram.WebApp;
        this.isAuthenticated = false;
        this.userData = null;
    }

    /**
     * Инициализация и проверка аутентификации
     * Вызывается при загрузке страницы
     */
    async init() {
        try {
            // Показываем loader
            this.showLoader();

            // Получаем данные пользователя из Telegram
            const telegramUser = this.tg.initDataUnsafe?.user;
            
            if (!telegramUser || !telegramUser.id) {
                console.error('Telegram user data not available');
                this.showAccessDenied();
                return false;
            }

            const chatId = telegramUser.id.toString();
            console.log('Checking auth for chat_id:', chatId);

            // Проверяем chat_id в Google Sheets
            const authResult = await this.checkChatIdInSheets(chatId);

            if (authResult.authorized) {
                // Пользователь авторизован
                this.isAuthenticated = true;
                this.userData = authResult.userData;
                
                // Обновляем UI
                this.updateProfileUI();
                this.hideLoader();
                
                console.log('User authorized:', this.userData);
                return true;
            } else {
                // Пользователь НЕ авторизован
                this.showAccessDenied();
                return false;
            }

        } catch (error) {
            console.error('Auth init error:', error);
            this.showError();
            return false;
        }
    }

    /**
     * Проверка chat_id в Google Sheets
     */
    async checkChatIdInSheets(chatId) {
        try {
            // Формируем URL для Google Sheets API v4
            const range = `${this.SHEET_NAME}!A:D`; // Колонки A-D (name, chat_id, tel_number, region)
            const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.SPREADSHEET_ID}/values/${range}?key=${this.API_KEY}`;

            console.log('Fetching data from Google Sheets...');
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Google Sheets API error: ${response.status}`);
            }

            const data = await response.json();
            const rows = data.values || [];

            console.log('Total rows fetched:', rows.length);

            // Пропускаем заголовок (первую строку)
            const dataRows = rows.slice(1);

            // Ищем пользователя по chat_id
            for (let i = 0; i < dataRows.length; i++) {
                const row = dataRows[i];
                const rowChatId = row[1] ? row[1].toString().trim() : ''; // Колонка B

                if (rowChatId === chatId) {
                    // Пользователь найден!
                    return {
                        authorized: true,
                        userData: {
                            name: row[0] || 'Не указано',
                            chat_id: row[1] || '',
                            tel_number: row[2] || 'Не указано',
                            region: row[3] || 'Не указано'
                        }
                    };
                }
            }

            // Пользователь не найден
            return {
                authorized: false
            };

        } catch (error) {
            console.error('Error checking chat_id in sheets:', error);
            throw error;
        }
    }

    /**
     * Обновление UI профиля
     */
    updateProfileUI() {
        if (!this.userData) return;

        const nameElement = document.getElementById('user-name');
        const phoneElement = document.getElementById('user-phone');
        const cityElement = document.getElementById('user-city');

        if (nameElement) {
            nameElement.textContent = this.userData.name;
        }
        if (phoneElement) {
            phoneElement.textContent = this.userData.tel_number;
        }
        if (cityElement) {
            cityElement.textContent = this.userData.region;
        }
    }

    /**
     * Показать экран "Доступ запрещен"
     */
    showAccessDenied() {
        this.hideLoader();
        
        // Скрываем весь основной контент
        const mainContent = document.querySelector('.main-content');
        const bottomNav = document.querySelector('.bottom-nav');
        
        if (mainContent) mainContent.style.display = 'none';
        if (bottomNav) bottomNav.style.display = 'none';

        // Создаем и показываем экран блокировки
        const accessDeniedHTML = `
            <div id="access-denied-screen" style="
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: #F5F5F7;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
            ">
                <div style="
                    background: white;
                    border-radius: 20px;
                    padding: 40px 30px;
                    max-width: 400px;
                    width: 90%;
                    text-align: center;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                ">
                    <div style="
                        width: 80px;
                        height: 80px;
                        background: #FF3B30;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto 24px;
                    ">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </div>
                    
                    <h2 style="
                        font-size: 24px;
                        font-weight: 600;
                        color: #1C1C1E;
                        margin-bottom: 16px;
                    ">Доступ запрещен</h2>
                    
                    <p style="
                        font-size: 16px;
                        color: #8E8E93;
                        line-height: 1.5;
                        margin-bottom: 30px;
                    ">Не удалось получить ваш ID.<br>Пожалуйста, откройте приложение<br>через Telegram.</p>
                    
                    <button onclick="authManager.contactAdmin()" style="
                        width: 100%;
                        padding: 16px;
                        background: #FF3B30;
                        color: white;
                        border: none;
                        border-radius: 12px;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: background 0.2s;
                    " onmouseover="this.style.background='#E62E24'" onmouseout="this.style.background='#FF3B30'">
                        Написать администратору
                    </button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', accessDeniedHTML);
    }

    /**
     * Связаться с администратором
     */
    contactAdmin() {
        // Закрываем веб-приложение и возвращаем в чат с ботом
        this.tg.close();
    }

    /**
     * Показать экран ошибки
     */
    showError() {
        this.hideLoader();
        
        const errorHTML = `
            <div id="error-screen" style="
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: #F5F5F7;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
            ">
                <div style="
                    background: white;
                    border-radius: 20px;
                    padding: 40px 30px;
                    max-width: 400px;
                    width: 90%;
                    text-align: center;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                ">
                    <div style="
                        width: 80px;
                        height: 80px;
                        background: #FF9500;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto 24px;
                    ">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                    </div>
                    
                    <h2 style="
                        font-size: 24px;
                        font-weight: 600;
                        color: #1C1C1E;
                        margin-bottom: 16px;
                    ">Ошибка подключения</h2>
                    
                    <p style="
                        font-size: 16px;
                        color: #8E8E93;
                        line-height: 1.5;
                        margin-bottom: 30px;
                    ">Не удалось проверить доступ.<br>Проверьте интернет-соединение<br>и попробуйте снова.</p>
                    
                    <button onclick="location.reload()" style="
                        width: 100%;
                        padding: 16px;
                        background: #FF3B30;
                        color: white;
                        border: none;
                        border-radius: 12px;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                    ">
                        Попробовать снова
                    </button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', errorHTML);
    }

    /**
     * Показать loader
     */
    showLoader() {
        const loaderHTML = `
            <div id="auth-loader" style="
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: #F5F5F7;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9998;
            ">
                <div style="text-align: center;">
                    <div style="
                        width: 50px;
                        height: 50px;
                        border: 4px solid #E5E5EA;
                        border-top-color: #FF3B30;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                        margin: 0 auto 20px;
                    "></div>
                    <p style="
                        font-size: 16px;
                        color: #8E8E93;
                    ">Проверка доступа...</p>
                </div>
                <style>
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                </style>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', loaderHTML);
    }

    /**
     * Скрыть loader
     */
    hideLoader() {
        const loader = document.getElementById('auth-loader');
        if (loader) {
            loader.remove();
        }
    }

    /**
     * Получить данные пользователя
     */
    getUserData() {
        return this.userData;
    }

    /**
     * Проверить авторизацию
     */
    isAuthorized() {
        return this.isAuthenticated;
    }
}

// Создаем глобальный экземпляр
const authManager = new AuthManager();

// Автоматическая инициализация при загрузке страницы
window.addEventListener('DOMContentLoaded', async () => {
    await authManager.init();
});
