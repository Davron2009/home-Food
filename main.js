document.addEventListener("DOMContentLoaded", function () {
    const cart = [];
    const cartItemsList = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const totalPrice = document.getElementById("total-price");
    const modal = document.getElementById("order-modal");
    const closeModal = document.querySelector(".close-btn");
    const totalButton = document.getElementById("confirm-order");
    const orderSummary = document.getElementById("order-summary");
    const orderTotal = document.getElementById("order-total");

    function updateCart() {
        cartItemsList.innerHTML = "";
        let total = 0;
        
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                ${item.name} ($${item.price}) x ${item.quantity}
                 <button class="minus" data-index="${index}">-</button>
                <button class="pilus" data-index="${index}">+</button> 
                <button class="remove" data-index="${index}">❌</button>
            `;
            cartItemsList.appendChild(listItem);
        });

        cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
        totalPrice.innerText = total.toFixed(2);
    }

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const itemElement = this.closest(".item");
            const name = itemElement.getAttribute("data-name");
            const price = parseFloat(itemElement.getAttribute("data-price"));

            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            updateCart();
        });
    });

    cartItemsList.addEventListener("click", function (event) {
        const index = event.target.getAttribute("data-index");
        if (event.target.classList.contains("remove")) {
            cart.splice(index, 1);
        } else if (event.target.classList.contains("pilus")) {
            cart[index].quantity++;
        } else if (event.target.classList.contains("minus")) {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1);
            }
        }
        updateCart();
    });

    document.getElementById("confirm-order").addEventListener("click", function () {
        if (cart.length === 0) {
            alert("Savatcha bo'sh!");
        } else {
            alert("Buyurtma tasdiqlandi!");
            cart.length = 0;
            updateCart();
        }
    });
});
