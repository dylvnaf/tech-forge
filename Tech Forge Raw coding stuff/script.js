let cart = [];

const navCartCount = document.getElementById('nav-cart-count');
const cartCountElement = document.getElementById('cart-count');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const cartItemsList = document.getElementById('cart-items-list');
const cartTotalPrice = document.getElementById('cart-total-price');
const checkoutBtn = document.getElementById('checkout-btn');
const pfAmountInput = document.getElementById('pf-amount');
const pfItemNameInput = document.getElementById('pf-item-name');
const pfPaymentIdInput = document.getElementById('pf-payment-id');

// Setup event listeners for adding items
addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const id = productCard.getAttribute('data-id');
        const name = productCard.getAttribute('data-name');
        const price = parseFloat(productCard.getAttribute('data-price'));

        // Generate a unique instance timestamp so we can remove exact duplicates cleanly
        const cartItemId = 'item-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4);

        cart.push({ cartItemId, id, name, price });
        updateCartUI();
    });
});

// Separate function to remove an item from the array by its instance ID
function removeFromCart(cartItemId) {
    cart = cart.filter(item => item.cartItemId !== cartItemId);
    updateCartUI();
}

function updateCartUI() {
if (navCartCount) {
    navCartCount.innerText = cart.length;
}
    cartItemsList.innerHTML = "";

    let total = 0;
    let itemNames = [];

    if (cart.length === 0) {
        cartItemsList.innerHTML = `<p style="color: #8a99ad; margin: 10px 0;">Your cart is completely empty.</p>`;
        checkoutBtn.setAttribute('disabled', 'true');
        checkoutBtn.style.opacity = "0.5";
        checkoutBtn.style.cursor = "not-allowed";
        cartTotalPrice.innerText = "R 0.00";
        return;
    }

    // Loop and build structured dynamic UI items
    cart.forEach((item) => {
        total += item.price;
        itemNames.push(item.name);
        
        // Create an item wrapper element block
        const itemRow = document.createElement('div');
        itemRow.style.display = "flex";
        itemRow.style.justifyContent = "text-between";
        itemRow.style.alignItems = "center";
        itemRow.style.padding = "12px 0";
        itemRow.style.borderBottom = "1px solid #242936";
        
        // Left column text
        const textSpan = document.createElement('span');
        textSpan.style.color = "#ffffff";
        textSpan.innerText = `${item.name} - R ${item.price}.00`;
        
        // Right column remove element action link
        const removeBtn = document.createElement('button');
        removeBtn.innerText = "Remove";
        removeBtn.style.background = "none";
        removeBtn.style.border = "none";
        removeBtn.style.color = "#ff4a4a";
        removeBtn.style.cursor = "pointer";
        removeBtn.style.fontWeight = "bold";
        removeBtn.style.fontSize = "0.9rem";
        
        // Attach click action directly to this specific row instance
        removeBtn.addEventListener('click', () => {
            removeFromCart(item.cartItemId);
        });

        // Assemble row element blocks
        itemRow.appendChild(textSpan);
        // Quick visual separation trick
        const spaceSpacer = document.createElement('div');
        spaceSpacer.style.flexGrow = "1";
        itemRow.appendChild(spaceSpacer);
        itemRow.appendChild(removeBtn);
        
        cartItemsList.appendChild(itemRow);
    });

    // Update totals and forms
    cartTotalPrice.innerText = `R ${total}.00`;

    pfAmountInput.value = total.toFixed(2);
    pfItemNameInput.value = `Order: ${itemNames.join(', ')}`.substring(0, 100);
    pfPaymentIdInput.value = 'TF-' + Date.now();

    checkoutBtn.removeAttribute('disabled');
    checkoutBtn.style.opacity = "1";
    checkoutBtn.style.cursor = "pointer";
}