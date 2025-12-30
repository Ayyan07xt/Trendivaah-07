// INITIALIZE EMAILJS WITH YOUR PUBLIC KEY
(function() {
    emailjs.init("PWX95xRab_1cjM8Lh"); 
})();

const cats = ['Shirts', 'T-Shirts', 'Jeans', 'Winter Collection', 'Formals'];
const container = document.getElementById('categories');
let currentUser = null;
let selectedProduct = { name: "", price: "" };

// LOAD PRODUCTS DYNAMICALLY
cats.forEach(cat => {
    let section = document.createElement('section');
    section.innerHTML = `<h2 class="section-title">${cat}</h2>`;
    let slider = document.createElement('div');
    slider.className = 'slider';
    
    for (let i = 1; i <= 10; i++) {
        let priceValue = (Math.floor(Math.random() * 2000) + 999);
        let price = "₹" + priceValue;
        let card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="https://picsum.photos/seed/${cat+i}/400/600" alt="item">
            <div class="p-details">
                <h4>${cat} Edition ${i}</h4>
                <p class="gold-text">${price}</p>
                <div class="stars">⭐⭐⭐⭐⭐</div>
            </div>
        `;
        card.onclick = () => openProduct(`${cat} Edition ${i}`, price, `https://picsum.photos/seed/${cat+i}/400/600`);
        slider.appendChild(card);
    }
    section.appendChild(slider);
    container.appendChild(section);
});

// NAVIGATION
function toggleMenu() {
    document.getElementById('navMenu').classList.toggle('active');
}

// MODAL CONTROLS
function openProduct(name, price, img) {
    selectedProduct = { name, price };
    document.getElementById('modalTitle').innerText = name;
    document.getElementById('modalPrice').innerText = price;
    document.getElementById('modalImg').src = img;
    document.getElementById('productModal').style.display = 'block';
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

// AUTH LOGIC
function openAuth() {
    document.getElementById('authModal').style.display = 'block';
}

function switchAuth(type) {
    const isLogin = type === 'login';
    document.getElementById('loginTab').className = isLogin ? 'active' : '';
    document.getElementById('signupTab').className = isLogin ? '' : 'active';
    document.getElementById('nameField').style.display = isLogin ? 'none' : 'block';
    document.getElementById('authBtn').innerText = isLogin ? 'Login' : 'Sign Up';
}

function handleAuth(e) {
    e.preventDefault();
    currentUser = document.getElementById('authEmail').value;
    document.getElementById('loginNav').innerText = "Account (" + currentUser.split('@')[0] + ")";
    closeModal('authModal');
    alert("Welcome to Trendivaah, " + currentUser);
}

// CHECKOUT LOGIC
function openCheckout() {
    if (!currentUser) {
        alert("Action Required: Please Login to Trendivaah to place an order.");
        closeModal('productModal');
        openAuth();
        return;
    }
    document.getElementById('productModal').style.display = 'none';
    document.getElementById('summaryName').innerText = selectedProduct.name;
    document.getElementById('summaryPrice').innerText = selectedProduct.price;
    document.getElementById('checkoutOverlay').style.display = 'flex';
}

function closeCheckout() {
    document.getElementById('checkoutOverlay').style.display = 'none';
}

// SENDING REAL RECEIPT VIA EMAILJS
function confirmPurchase() {
    const btn = event.target;
    btn.innerText = "Processing...";
    btn.disabled = true;

    const templateParams = {
        to_email: 'ayyantakildar83@gmail.com', 
        from_name: "TRENDIVAAH System",
        customer_email: currentUser,
        product_name: selectedProduct.name,
        total_price: selectedProduct.price,
        shipping_address: document.getElementById('shipAddr').value || "No address provided",
        contact_number: document.getElementById('shipPhone').value
    };

    emailjs.send('service_fmye969', 'template_gqozdiy', templateParams)
        .then(() => {
            alert("ORDER SUCCESSFUL! A digital receipt has been sent to ayyantakildar83@gmail.com");
            btn.innerText = "Confirm Order";
            btn.disabled = false;
            closeCheckout();
        }, (err) => {
            console.error("EmailJS Error:", err);
            alert("Order failed to process. Please check your internet or EmailJS quota.");
            btn.innerText = "Confirm Order";
            btn.disabled = false;
        });
}

function orderWhatsApp() {
    let msg = `Hello Trendivaah! I'm interested in buying: ${selectedProduct.name} for ${selectedProduct.price}. Is it available?`;
    window.open(`https://wa.me/7757007795?text=${encodeURIComponent(msg)}`);
}

function addToCart() {
    let count = document.querySelector('.count');
    count.innerText = parseInt(count.innerText) + 1;
    alert("Item added to your TRENDIVAAH bag!");
}


