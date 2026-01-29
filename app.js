// Telegram WebApp initialization
const tg = window.Telegram.WebApp;
tg.expand();



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
        { id: 70005, name: "Отдушка Ваниль", category: "fragrances", price: 36000, image: "https://asadbekkasimov.github.io/order/images/fs.png", description: "Сладкий ванильный аромат" },
        { id: 70006, name: "Отдушка Яблоко", category: "fragrances", price: 30000, image: "https://asadbekkasimov.github.io/order/images/fs.png", description: "Свежий яблочный аромат" },
        { id: 70007, name: "Отдушка Кокос", category: "fragrances", price: 37000, image: "https://asadbekkasimov.github.io/order/images/fs.png", description: "Экзотический кокосовый аромат" },
        { id: 70008, name: "Отдушка Жасмин", category: "fragrances", price: 39000, image: "https://asadbekkasimov.github.io/order/images/fs.png", description: "Изысканный аромат жасмина" },
        { id: 70009, name: "Отдушка Мята", category: "fragrances", price: 31000, image: "https://asadbekkasimov.github.io/order/images/fs.png", description: "Освежающий мятный аромат" },
        { id: 70010, name: "Отдушка Сандал", category: "fragrances", price: 40000, image: "https://asadbekkasimov.github.io/order/images/fs.png", description: "Древесный аромат сандала" }
    ]
};

// Flatten all products for easier access
const allProducts = Object.values(productsData).flat();


// State Management
let currentCategory = 'all';
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let currentProduct = null;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupEventListeners();
    updateCartBadge();
    loadUserProfile();
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

    // Category Buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentCategory = btn.dataset.category;
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            loadProducts();
        });
    });

    // Search
    document.getElementById('search-input').addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        filterProducts(query);
    });

    // Modal
    document.getElementById('modal-close').addEventListener('click', closeModal);
    document.getElementById('product-modal').addEventListener('click', (e) => {
        if (e.target.id === 'product-modal') closeModal();
    });

    // Quantity Controls
    document.getElementById('qty-minus').addEventListener('click', () => {
    const input = document.getElementById('qty-input');
    let val = parseInt(input.value, 10) || 1;
    if (val > 1) input.value = val - 1;
});

document.getElementById('qty-plus').addEventListener('click', () => {
    const input = document.getElementById('qty-input');
    let val = parseInt(input.value, 10) || 1;
    input.value = val + 1;
});


    // Add to Cart from Modal
    document.getElementById('modal-add-to-cart').addEventListener('click', addToCartFromModal);

    // Checkout
    document.getElementById('checkout-btn').addEventListener('click', checkout);



}

// Page Switching
function switchPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    
    document.getElementById(`${page}-page`).classList.add('active');
    document.querySelector(`[data-page="${page}"]`).classList.add('active');
    
    if (page === 'favorites') {
        loadFavorites();
    } else if (page === 'cart') {
        renderCart();
    } else if (page === 'profile') {
        loadUserOrders();
    }
}

// Products
function loadProducts() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';
    
    let products =
        currentCategory === 'all'
            ? allProducts
            : productsData[currentCategory] || [];

    products.forEach(product => {
        grid.appendChild(createProductCard(product));
    });
}


function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const isFavorite = favorites.includes(product.id);
    
const images = product.images || [product.image];

    card.innerHTML = `
        <button class="favorite-btn ${isFavorite ? 'active' : ''}" data-id="${product.id}">
            <svg viewBox="0 0 24 24" fill="${isFavorite ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
        </button>

    <div class="slider" data-index="0">
    <div class="slides">
        ${images.map(img => `
            <img src="${img}" class="slide">
        `).join('')}
    </div>
    <div class="dots">
        ${images.map((_, i) => `
            <span class="dot ${i === 0 ? 'active' : ''}"></span>
        `).join('')}
    </div>
</div>

        <div class="product-name">${product.name}</div>
        <div class="product-price">${formatPrice(product.price)}</div>
        <button class="product-add-btn">Добавить</button>
    `;
    
    card.querySelector('.product-add-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        addToCart(product);
    });
    
    card.querySelector('.favorite-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        toggleFavorite(product.id);
    });
    
    card.addEventListener('click', () => {
        openModal(product);
    });
    
    return card;
}

function filterProducts(query) {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';
    
    let products = currentCategory === 'all' 
        ? allProducts 
        : productsData[currentCategory];
    
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
    );
    
    filtered.forEach(product => {
        const card = createProductCard(product);
        grid.appendChild(card);
    });
}

// Modal
function openModal(product) {
    currentProduct = product;
    
const images = product.images || [product.image];

const slides = document.getElementById('modal-slides');
const dots = document.getElementById('modal-dots');

slides.innerHTML = images.map(img => `
    <img src="${img}" class="slide zoomable">
`).join('');

dots.innerHTML = images.map((_, i) => `
    <span class="dot ${i === 0 ? 'active' : ''}"></span>
`).join('');

document.getElementById('modal-slider').dataset.index = 0;
slides.style.transform = 'translateX(0)';

    document.getElementById('modal-title').textContent = product.name;
    document.getElementById('modal-description').textContent = product.description;
    document.getElementById('modal-price').textContent = formatPrice(product.price);
    document.getElementById('qty-input').value = 1;

	const qtyInput = document.getElementById('qty-input');

// защита от букв, 0, -, e
qtyInput.oninput = () => {
    let val = parseInt(qtyInput.value, 10);
    if (isNaN(val) || val < 1) qtyInput.value = 1;
    else qtyInput.value = val;
};

	
	document.getElementById('product-modal').classList.remove('hidden');


}

function closeModal() {
    document.getElementById('product-modal').classList.add('hidden');
    currentProduct = null;
}

function addToCartFromModal() {
    if (!currentProduct) return;
    
    let quantity = parseInt(document.getElementById('qty-input').value, 10);
	if (isNaN(quantity) || quantity < 1) quantity = 1;

    addToCart(currentProduct, quantity);
    closeModal();
}

// Cart
function addToCart(product, quantity = 1) {
    // Определяем категорию товара по ID
    function getProductCategory(productId) {
        if (productId >= 10000 && productId < 20000) return 'cleaning';
        if (productId >= 20000 && productId < 30000) return 'plasticpe';
        if (productId >= 30000 && productId < 40000) return 'plasticpet';
        if (productId >= 40000 && productId < 50000) return 'plasticpp';
        if (productId >= 50000 && productId < 60000) return 'plastictd';
        if (productId >= 60000 && productId < 70000) return 'chemicals';
        if (productId >= 70000 && productId < 80000) return 'fragrances';
        return 'unknown';
    }
    
    // Получаем категорию добавляемого товара
    const newProductCategory = getProductCategory(product.id);
    
    // ПРОВЕРКА НА СМЕШИВАНИЕ КАТЕГОРИЙ УБРАНА - теперь можно добавлять товары из любых категорий
    
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            image: (product.images && product.images[0]) || product.image,
            category: newProductCategory
        });
    }
    
    saveCart();
    updateCartBadge();
    
    // Show feedback
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = '✓ Добавлено';
    btn.style.background = '#ff0000';
    btn.style.color = 'white';
    setTimeout(() => {
        btn.textContent = originalText
	btn.style.background = '';
	btn.style.color = '';;
    }, 1000);
}


function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartBadge();
    renderCart();
}

function updateCartQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
        renderCart();
    }
}

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
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${formatPrice(item.price)}</div>
                <div class="cart-item-controls">
                    <button class="cart-qty-btn" data-id="${item.id}" data-change="-1">-</button>
                    <span class="cart-qty">${item.quantity}</span>
                    <button class="cart-qty-btn" data-id="${item.id}" data-change="1">+</button>
                    <button class="cart-item-remove" data-id="${item.id}">Удалить</button>
                </div>
            </div>
        `;
        
        cartItem.querySelectorAll('.cart-qty-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                const change = parseInt(btn.dataset.change);
                updateCartQuantity(id, change);
            });
        });
        
        cartItem.querySelector('.cart-item-remove').addEventListener('click', () => {
            const id = parseInt(cartItem.querySelector('.cart-item-remove').dataset.id);
            removeFromCart(id);
        });
        
        container.appendChild(cartItem);
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cart-total-amount').textContent = formatPrice(total);
    summary.classList.remove('hidden');
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    badge.textContent = count;
    
    if (count > 0) {
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
}

// Favorites
function toggleFavorite(productId) {
    const index = favorites.indexOf(productId);
    
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(productId);
    }
    
    saveFavorites();
    
    // Update UI
    if (document.getElementById('catalog-page').classList.contains('active')) {
        loadProducts();
    } else if (document.getElementById('favorites-page').classList.contains('active')) {
        loadFavorites();
    }
}

function loadFavorites() {
    const grid = document.getElementById('favorites-grid');
    
    if (favorites.length === 0) {
        grid.innerHTML = '<div class="empty-state"><p>У вас пока нет избранных товаров</p></div>';
        return;
    }
    
    grid.innerHTML = '';
    
    favorites.forEach(id => {
        const product = allProducts.find(p => p.id === id);
        if (product) {
            const card = createProductCard(product);
            grid.appendChild(card);
        }
    });
}

function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Profile
function loadUserProfile() {
    const user = tg.initDataUnsafe?.user;
    
    if (user) {
        document.getElementById('user-name').textContent = user.first_name + (user.last_name ? ' ' + user.last_name : '');
        document.getElementById('user-phone').textContent = user.username ? '@' + user.username : 'Не указан';
        document.getElementById('user-city').textContent = 'Ташкент'; // Default or from backend
    } else {
        document.getElementById('user-name').textContent = 'Гость';
        document.getElementById('user-phone').textContent = 'Не указан';
        document.getElementById('user-city').textContent = 'Не указан';
    }
}

function loadUserOrders() {
    const ordersList = document.getElementById('orders-list');
    
    // Mock orders - в реальности данные будут приходить с бэкенда
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    if (orders.length === 0) {
        ordersList.innerHTML = '<p class="empty-state">У вас пока нет заказов</p>';
        return;
    }
    
    ordersList.innerHTML = '';
    
    orders.forEach(order => {
        const orderEl = document.createElement('div');
        orderEl.className = 'order-item';
        orderEl.innerHTML = `
            <div class="order-id">Заказ #${order.id}</div>
            <div class="order-date">${order.date} • ${formatPrice(order.total)}</div>
        `;
        ordersList.appendChild(orderEl);
    });
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
