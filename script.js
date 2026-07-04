// ==============================
// DENIADESIGN CART SYSTEM
// ==============================

let cart = [];

function formatRupiah(number){
    return "Rp " + number.toLocaleString("id-ID");
}

function addToCart(name, price){

    const item = cart.find(i => i.name === name);

    if(item){
        item.qty++;
    }else{
        cart.push({
            name:name,
            price:price,
            qty:1
        });
    }

    updateCart();
}

function updateCart(){

    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach((item,index)=>{

        total += item.price * item.qty;
        count += item.qty;

        cartItems.innerHTML += `
        <div class="cart-item">
            <div>
                <strong>${item.name}</strong><br>
                ${formatRupiah(item.price)} × ${item.qty}
            </div>

            <div>
                <button onclick="minusItem(${index})">-</button>
                <button onclick="plusItem(${index})">+</button>
            </div>
        </div>
        `;
    });

    cartCount.innerText = count;
    cartTotal.innerText = formatRupiah(total);
}

function plusItem(index){
    cart[index].qty++;
    updateCart();
}

function minusItem(index){

    cart[index].qty--;

    if(cart[index].qty <= 0){
        cart.splice(index,1);
    }

    updateCart();
}

function clearCart(){

    if(confirm("Kosongkan keranjang?")){
        cart = [];
        updateCart();
    }

}

function toggleCart(){

    document
        .getElementById("cartPopup")
        .classList
        .toggle("hidden");

}

function checkout(){

    if(cart.length === 0){
        alert("Keranjang masih kosong.");
        return;
    }

    let text = "Halo DeniaDesign,%0A%0ASaya ingin memesan:%0A";

    let total = 0;

    cart.forEach(item=>{

        text += `• ${item.name} (${item.qty}x) - ${formatRupiah(item.price * item.qty)}%0A`;

        total += item.price * item.qty;

    });

    text += `%0A====================%0A`;
    text += `Total : ${formatRupiah(total)}`;

    window.open(
        `https://wa.me/6283822941348?text=${text}`,
        "_blank"
    );

}