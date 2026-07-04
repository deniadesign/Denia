let cart = [];

// TOGGLE CART
function toggleCart(){
  document.getElementById("cartPopup").classList.toggle("hidden");
}

// ADD TO CART
function addToCart(name, price){
  let item = cart.find(p => p.name === name);

  if(item){
    item.qty++;
  } else {
    cart.push({name, price, qty:1});
  }

  updateCart();
}

// UPDATE CART
function updateCart(){
  let count = 0;
  let total = 0;

  let cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";

  cart.forEach((item, index)=>{
    count += item.qty;
    total += item.price * item.qty;

    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name}</span>

        <div>
          <button onclick="minQty(${index})">-</button>
          <span>${item.qty}</span>
          <button onclick="plusQty(${index})">+</button>
          <button onclick="removeItem(${index})">❌</button>
        </div>

        <b>Rp ${(item.price * item.qty).toLocaleString("id-ID")}</b>
      </div>
    `;
  });

  document.getElementById("cartCount").innerText = count;
  document.getElementById("cartTotal").innerText =
    "Rp " + total.toLocaleString("id-ID");
}

// + QTY
function plusQty(index){
  cart[index].qty++;
  updateCart();
}

// - QTY
function minQty(index){
  cart[index].qty--;

  if(cart[index].qty <= 0){
    cart.splice(index,1);
  }

  updateCart();
}

// REMOVE ITEM
function removeItem(index){
  cart.splice(index,1);
  updateCart();
}

// CLEAR CART
function clearCart(){
  cart = [];
  updateCart();
}

// CHECKOUT WHATSAPP
function checkout(){
  if(cart.length === 0){
    alert("Keranjang masih kosong!");
    return;
  }

  let pesan = "Halo DeniaDesign, saya mau order:%0A%0A";

  cart.forEach(item=>{
    pesan += `- ${item.name} (${item.qty} x Rp ${item.price})%0A`;
  });

  let total = cart.reduce((a,b)=>a + b.price*b.qty,0);

  pesan += `%0ATotal: Rp ${total.toLocaleString("id-ID")}`;

  let nomor = "6283822941348";

  window.open(
    "https://wa.me/" + nomor + "?text=" + encodeURIComponent(pesan),
    "_blank"
  );
}