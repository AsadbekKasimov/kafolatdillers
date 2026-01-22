// auth.js - Проверка пользователя через Google Sheets

class TelegramAuth {
    constructor() {
        // ВАЖНО: Замените на URL вашего Google Apps Script Web App
        this.SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby4In5ZWVvmcDGMGWdmpyEXvRafFMIorCY53Bmaq3mQ7_aeTbwCMydwzQpeqaC92ppi/exec';
        this.tg = window.Telegram.WebApp;
    }

    /**
     * Инициализация и проверка пользователя
     */
    async init() {
        try {
            this.showLoading();
            
            // Получаем данные пользователя из Telegram
            const initData = this.tg.initDataUnsafe;
            
            if (!initData.user) {
                this.showError('Не удалось получить данные пользователя');
                return;
            }

            const telegramId = initData.user.id.toString();
            console.log('Проверка пользователя:', telegramId);
            
            // Проверяем пользователя в Google Sheets
            const user = await this.checkUser(telegramId);
            
            if (user && user.active) {
                // Пользователь найден и активен - показываем приложение
                this.showApp(user);
            } else if (user && !user.active) {
                // Пользователь найден, но неактивен
                this.showError('Ваш аккаунт неактивен. Обратитесь к администратору.');
            } else {
                // Пользователь не найден
                this.showError('Доступ запрещен. Вы не зарегистрированы в системе.');
            }
            
        } catch (error) {
            console.error('Ошибка аутентификации:', error);
            this.showError('Ошибка подключения к серверу');
        }
    }

    /**
     * Проверка пользователя в Google Sheets
     */
    async checkUser(telegramId) {
        try {
            const url = `${this.SCRIPT_URL}?action=checkUser&telegram_id=${telegramId}`;
            console.log('Отправка запроса:', url);
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                redirect: 'follow'
            });

            console.log('Статус ответа:', response.status);
            console.log('Response OK:', response.ok);

            if (!response.ok) {
                throw new Error(`HTTP ошибка! Статус: ${response.status}`);
            }

            const data = await response.json();
            console.log('Ответ сервера:', data);
            
            // Проверяем структуру ответа
            if (!data) {
                console.error('Пустой ответ от сервера');
                return null;
            }
            
            if (data.success === true) {
                console.log('Успешная проверка, пользователь:', data.user);
                return data.user;
            } else {
                console.log('Проверка не прошла:', data.message);
                return null;
            }
            
        } catch (error) {
            console.error('Ошибка при проверке пользователя:', error);
            console.error('Детали ошибки:', error.message);
            throw error;
        }
    }

    /**
     * Показать экран загрузки
     */
    showLoading() {
        const loading = document.getElementById('loading');
        const error = document.getElementById('error');
        const app = document.getElementById('app');
        
        // Принудительно скрываем app и error
        if (loading) {
            loading.style.display = 'flex';
            loading.style.visibility = 'visible';
        }
        if (error) {
            error.style.display = 'none';
            error.style.visibility = 'hidden';
        }
        if (app) {
            app.style.display = 'none';
            app.style.visibility = 'hidden';
        }
    }

    /**
     * Показать приложение
     */
    showApp(user) {
        console.log('Доступ разрешен:', user);
        
        const loading = document.getElementById('loading');
        const error = document.getElementById('error');
        const app = document.getElementById('app');
        
        if (loading) {
            loading.style.display = 'none';
            loading.style.visibility = 'hidden';
        }
        if (error) {
            error.style.display = 'none';
            error.style.visibility = 'hidden';
        }
        if (app) {
            app.style.display = 'block';
            app.style.visibility = 'visible';
        }
        
        // Обновляем UI с данными пользователя
        this.updateUI(user);
        
        // Сохраняем пользователя в localStorage
        localStorage.setItem('telegram_user', JSON.stringify(user));
        
        // Уведомляем Telegram что приложение готово
        this.tg.ready();
        this.tg.expand();
    }

    /**
     * Показать ошибку доступа
     */
    showError(message) {
        console.error('Доступ запрещен:', message);
        
        const loading = document.getElementById('loading');
        const error = document.getElementById('error');
        const app = document.getElementById('app');
        const errorMessage = document.getElementById('error-message');
        
        if (loading) {
            loading.style.display = 'none';
            loading.style.visibility = 'hidden';
        }
        if (error) {
            error.style.display = 'flex';
            error.style.visibility = 'visible';
        }
        if (app) {
            app.style.display = 'none';
            app.style.visibility = 'hidden';
        }
        if (errorMessage) {
            errorMessage.textContent = message;
        }
        
        // Уведомляем Telegram
        this.tg.ready();
        
        // Закрываем приложение через 3 секунды
        setTimeout(() => {
            this.tg.close();
        }, 3000);
    }

    /**
     * Обновление UI с данными пользователя
     */
    updateUI(user) {
        // Обновляем имя пользователя
        const userName = document.getElementById('user-name');
        if (userName) {
            userName.textContent = user.name || 'Пользователь';
        }

        // Обновляем регион
        const userRegion = document.getElementById('user-region');
        if (userRegion) {
            userRegion.textContent = user.region || '';
        }

        // Показываем панель администратора если пользователь - админ
        if (user.role === 'admin') {
            const adminElements = document.querySelectorAll('.admin-only');
            adminElements.forEach(el => {
                el.style.display = 'block';
            });
        }
    }

    /**
     * Получить текущего пользователя
     */
    getCurrentUser() {
        const userStr = localStorage.getItem('telegram_user');
        return userStr ? JSON.parse(userStr) : null;
    }

    /**
     * Выход
     */
    logout() {
        localStorage.removeItem('telegram_user');
        this.tg.close();
    }
}

// Создаем глобальный экземпляр
const auth = new TelegramAuth();

// Запускаем проверку при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
    auth.init();
});

// Экспорт для использования в других файлах
window.TelegramAuth = auth;
