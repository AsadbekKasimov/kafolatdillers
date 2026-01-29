// Telegram WebApp initialization
const tg = window.Telegram.WebApp;

// КРИТИЧЕСКИ ВАЖНО: Эти настройки предотвращают закрытие при прокрутке
tg.expand(); // Расширить окно на весь экран
tg.enableClosingConfirmation(); // Добавить подтверждение перед закрытием
tg.disableVerticalSwipes(); // ОТКЛЮЧИТЬ вертикальные свайпы для закрытия

// Установить цвета темы
tg.setHeaderColor('#FFFFFF');
tg.setBackgroundColor('#F5F5F7');

// Дополнительная защита от случайного закрытия
if (tg.platform !== 'unknown') {
    tg.ready();
}

const productsData = {
    cleaning: [
        { id: 10001, name: "Жидкое средство для стирки Aroma 3.15 l * 4 шт", category: "cleaning", price: 180000, 
	images:["https://asadbekkasimov.github.io/order/images/c1.jpg",
		"https://asadbekkasimov.github.io/order/images/c1_2.jpg",
		"https://asadbekkasimov.github.io/order/images/c1_3.jpg"], 
	description: "Жидкое средство для стирки Aroma 3.15l * 4 шт" },

        { id: 10002, name: "Кондиционер для белья 1440 ml * 8 шт", category: "cleaning", price: 211000, image: "https://asadbekkasimov.github.io/order/images/c2.jpg", description: "Кондиционер для белья 1440 ml * 8 шт " },
        { id: 10003, name: "Гель густой 1 kg * 12 шт", category: "cleaning", price: 150000, image: "https://asadbekkasimov.github.io/order/images/c3.jpg", description: "Гель густой 1 kg * 12 шт" },
        { id: 10004, name: "Жидкое средство для стирки Kafolat 1 l * 6 шт", category: "cleaning", price: 105600, image: "https://asadbekkasimov.github.io/order/images/c4.jpg", description: "Жидкое средство для стирки Kafolat 1 l * 6 шт" },
        { id: 10005, name: "Антижир Kafolat 500 ml * 12 шт", category: "cleaning", price: 112200, image: "https://asadbekkasimov.github.io/order/images/c5.jpg", description: "Антижир Kafolat 500 ml * 12 шт" },
        { id: 10006, name: "Шампунь Nalan 400 ml * 16 шт", category: "cleaning", price: 105600, image: "https://asadbekkasimov.github.io/order/images/c6.jpg", description: "Шампунь Nalan 400 ml * 16 шт" },
        { id: 10007, name: "Освежитель воздуха 400 mk * 18 шт", category: "cleaning", price: 135000, image: "https://asadbekkasimov.github.io/order/images/c7.jpg", description: "Освежитель воздуха 400 мл * 18 шт" },
        { id: 10008, name: "Средство для мыть стекол 575 ml * 16 шт", category: "cleaning", price: 70400, image: "https://asadbekkasimov.github.io/order/images/c8.jpg", description: "Средство для мыть стекол 575 ml * 16 шт" },
        { id: 10009, name: "Жидкое мыло 500 мл * 8 шт", category: "cleaning", price: 40000, image: "https://asadbekkasimov.github.io/order/images/c9.jpg", description: "Жидкое мыло 500 мл * 8 шт" },
        { id: 10010, name: "Кислородный очиститель 300 g * 12 шт", category: "cleaning", price: 144000, image: "https://asadbekkasimov.github.io/order/images/c10.jpg", description: "Кислородный очиститель 300 g * 12 шт" },
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

// Global state
let cart = [];
let favorites = [];
let currentCategory = 'all';

// Load cart and favorites from localStorage
function loadCart() {
    const saved = localStorage.getItem('cart');
    if (saved) {
        cart = JSON.parse(saved);
        updateCartBadge();
    }
}

function loadFavorites() {
    const saved = localStorage.getItem('favorites');
    if (saved) {
        favorites = JSON.parse(saved);
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    loadFavorites();
    renderProducts();
    setupEventListeners();
    loadUserProfile();
    loadOrders();
    updateCartBadge();
});

// Event Listeners
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const page = btn.dataset.page;
            switchPage(page);
        });
    });

    // Categories
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            renderProducts();
        });
    });

    // Search
    document.getElementById('search-input').addEventListener('input', (e) => {
        renderProducts(e.target.value);
    });

    // Modal close
    document.getElementById('modal-close').addEventListener('click', closeModal);
    document.getElementById('product-modal').addEventListener('click', (e) => {
        if (e.target.id === 'product-modal') closeModal();
    });

    // Quantity controls
    document.getElementById('qty-minus').addEventListener('click', () => {
        const input = document.getElementById('qty-input');
        if (input.value > 1) input.value = parseInt(input.value) - 1;
    });

    document.getElementById('qty-plus').addEventListener('click', () => {
        const input = document.getElementById('qty-input');
        input.value = parseInt(input.value) + 1;
    });

    // Add to cart from modal
    document.getElementById('modal-add-to-cart').addEventListener('click', addToCartFromModal);

    // Checkout
    document.getElementById('checkout-btn').addEventListener('click', checkout);
}

// Page switching
function switchPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    
    document.getElementById(`${page}-page`).classList.add('active');
    document.querySelector(`.nav-btn[data-page="${page}"]`).classList.add('active');

    if (page === 'favorites') {
        renderFavorites();
    } else if (page === 'cart') {
        renderCart();
    }
}

// Products rendering
function renderProducts(searchQuery = '') {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';

    let products = [];
    if (currentCategory === 'all') {
        products = Object.values(productsData).flat();
    } else {
        products = productsData[currentCategory] || [];
    }

    if (searchQuery) {
        products = products.filter(p => 
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    products.forEach(product => {
        const card = createProductCard(product);
        grid.appendChild(card);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    const isFavorite = favorites.some(f => f.id === product.id);
    
    // Используем первое изображение из массива images или просто image
    const imageUrl = product.images ? product.images[0] : product.image;

    card.innerHTML = `
        <button class="favorite-btn ${isFavorite ? 'active' : ''}" onclick="toggleFavorite(${product.id})">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
        </button>
        <img src="${imageUrl || 'https://via.placeholder.com/150'}" alt="${product.name}" class="product-image" loading="lazy">
        <div class="product-name">${product.name}</div>
        <div class="product-price">${formatPrice(product.price)}</div>
        <button class="product-add-btn" onclick="event.stopPropagation();">Добавить</button>
    `;

    card.addEventListener('click', () => openProductModal(product));
    
    // Add to cart from card button
    const addBtn = card.querySelector('.product-add-btn');
    addBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        quickAddToCart(product);
    });

    return card;
}

// Quick add to cart (quantity = 1)
function quickAddToCart(product) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    saveCart();
    updateCartBadge();
    
    // Visual feedback
    const btn = event.target;
    btn.textContent = '✓ Добавлено';
    setTimeout(() => {
        btn.textContent = 'Добавить';
    }, 1000);
}

// Product modal
function openProductModal(product) {
    const modal = document.getElementById('product-modal');
    
    // Если есть массив изображений
    if (product.images && product.images.length > 0) {
        const slider = document.getElementById('modal-slider');
        const slides = document.getElementById('modal-slides');
        const dots = document.getElementById('modal-dots');
        
        slider.dataset.index = '0';
        slides.innerHTML = product.images.map(img => 
            `<img src="${img}" alt="${product.name}" class="slide zoomable">`
        ).join('');
        
        dots.innerHTML = product.images.map((_, i) => 
            `<div class="dot ${i === 0 ? 'active' : ''}"></div>`
        ).join('');
    } else {
        // Если только одно изображение
        const slider = document.getElementById('modal-slider');
        const slides = document.getElementById('modal-slides');
        const dots = document.getElementById('modal-dots');
        
        slider.dataset.index = '0';
        slides.innerHTML = `<img src="${product.image || 'https://via.placeholder.com/300'}" alt="${product.name}" class="slide zoomable">`;
        dots.innerHTML = `<div class="dot active"></div>`;
    }
    
    document.getElementById('modal-title').textContent = product.name;
    document.getElementById('modal-description').textContent = product.description;
    document.getElementById('modal-price').textContent = formatPrice(product.price);
    document.getElementById('qty-input').value = 1;
    
    modal.dataset.productId = product.id;
    modal.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('product-modal').classList.add('hidden');
}

function addToCartFromModal() {
    const modal = document.getElementById('product-modal');
    const productId = parseInt(modal.dataset.productId);
    const quantity = parseInt(document.getElementById('qty-input').value);
    
    const product = Object.values(productsData)
        .flat()
        .find(p => p.id === productId);
    
    if (!product) return;
    
    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }
    
    saveCart();
    updateCartBadge();
    closeModal();
}

// Favorites
function toggleFavorite(productId) {
    event.stopPropagation();
    
    const product = Object.values(productsData)
        .flat()
        .find(p => p.id === productId);
    
    if (!product) return;
    
    const index = favorites.findIndex(f => f.id === productId);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(product);
    }
    
    saveFavorites();
    renderProducts();
}

function renderFavorites() {
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

// Cart
function renderCart() {
    const container = document.getElementById('cart-items');
    const summary = document.getElementById('cart-summary');
    
    if (cart.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>Ваша корзина пуста</p></div>';
        summary.classList.add('hidden');
        return;
    }
    
    container.innerHTML = '';
    cart.forEach(item => {
        const cartItem = createCartItem(item);
        container.appendChild(cartItem);
    });
    
    updateCartTotal();
    summary.classList.remove('hidden');
}

function createCartItem(item) {
    const div = document.createElement('div');
    div.className = 'cart-item';
    
    // Используем первое изображение из массива или обычное
    const imageUrl = item.images ? item.images[0] : item.image;
    
    div.innerHTML = `
        <img src="${imageUrl || 'https://via.placeholder.com/80'}" alt="${item.name}" class="cart-item-image">
        <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">${formatPrice(item.price)}</div>
            <div class="cart-item-controls">
                <button class="cart-qty-btn" onclick="updateCartQuantity(${item.id}, -1)">-</button>
                <span class="cart-qty">${item.quantity}</span>
                <button class="cart-qty-btn" onclick="updateCartQuantity(${item.id}, 1)">+</button>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Удалить</button>
            </div>
        </div>
    `;
    
    return div;
}

function updateCartQuantity(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    
    item.quantity += change;
    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    saveCart();
    renderCart();
    updateCartBadge();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
    updateCartBadge();
}

function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cart-total-amount').textContent = formatPrice(total);
}

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

// Profile
function loadUserProfile() {
    const user = tg.initDataUnsafe?.user;
    if (user) {
        document.getElementById('user-name').textContent = 
            user.first_name + (user.last_name ? ' ' + user.last_name : '');
        document.getElementById('user-phone').textContent = user.username ? '@' + user.username : 'Не указан';
    }
}

function loadOrders() {
    const ordersList = document.getElementById('orders-list');
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    if (orders.length === 0) {
        ordersList.innerHTML = '<p class="empty-state">У вас пока нет заказов</p>';
        return;
    }
    
    ordersList.innerHTML = orders.slice(0, 5).map(order => `
        <div class="order-item">
            <div class="order-id">Заказ #${order.id}</div>
            <div class="order-date">${order.date} • ${order.items} товаров • ${formatPrice(order.total)}</div>
        </div>
    `).join('');
}

// Checkout
function checkout() {
    if (cart.length === 0) return;
    
    // Show confirmation dialog
    showConfirmationDialog();
}

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
        user_id: tg.initDataUnsafe?.user?.id || 0
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
