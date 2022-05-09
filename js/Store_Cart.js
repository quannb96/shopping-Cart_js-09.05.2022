const myCart = document.getElementById("myCart");
// Show Cart >>>
function showCartOnclick() {
  myCart.style.display = "block";
}
//  Hide Cart >>>
function hideCart() {
  myCart.style.display = "none";
}
// show Products List in Store Page
function showProductsInShop() {
  let products = getProductsFromLocalStorage();
  let showProducts = "";

  for (let index = 0; index < products.length; index++) {
    let product = products[index];

    showProducts += `<div class="col-md-3 my-3 itemsBox">
                  <div class="card border-success item">
                    <img src="${product.imgProduct}" height="316.3px" weight='auto' class="imgCart" />
                    <div class="card-body">
                      <h5 class="card-title titleCart">${product.nameProduct}</h5>
                      <p><span class="priceCart">${product.priceProduct}</span> <b>đ</b></p>
                      <button type="button" class="btn btn-outline-success btnCart" onclick="addToCart('${product.id}')">Add to Cart</button>
                    </div>
                  </div>
                </div>
                `;
  }
  document.getElementById("listProducts").innerHTML = showProducts;
}
// cart = [
//   {
//     product: { id: 1, nameProduct: "sp1", imgProduct: "url", priceProduct: 123 },
//     quantity: 1,
//   },
// ];

// click => add product to cart ( + quantity) >>>
function addToCart(id) {
  let cart = getCartFromLocalStorage();
  let products = getProductsFromLocalStorage();

  let product = products.find((p) => p.id === id);

  let item = cart.find((c) => c.product.id == id);
  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart)); // cart => string => localStorage
  showCart();
}

// show cart to HTML in Store Page >>>
function showCart() {
  let cart = getCartFromLocalStorage();
  let showCart = "";
  cart.map((item, i) => {
    showCart += `<tr>
                  <td>${i + 1}</td>
                  <td><img width="70px" src="${item.product.imgProduct}" /></td>
                  <td >${item.product.nameProduct}</td>
                  <td>${item.product.priceProduct} <b>đ</b></td>
                  <td class="totalQuantity">${item.quantity}</td>
                  <td class="subTotal">${
                    item.product.priceProduct * item.quantity
                  } <b>đ</b></td>
                  <td><button class="btn btn-outline-danger size14"  onclick=DeleteCart('${
                    item.product.id
                  }') >Delete</button></td>
                </tr>
                `;
  });
  myCart.querySelector("#list").innerHTML = showCart;
  updateSubTotal();
  updateNumCartItem();
}

// delete one item in cart >>
function DeleteCart(id) {
  let cart = getCartFromLocalStorage();
  cart = cart.filter((p) => p.product.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart();
}
// update subtotal when cart change >>>
function updateSubTotal() {
  const rows = myCart.querySelector("#list");
  const totals = rows.getElementsByClassName("subTotal");

  subTotal = 0;
  for (let i = 0; i < totals.length; i++) {
    const total = totals[i].textContent;
    subTotal += parseInt(total);
  }
  document.getElementById("allTotal").innerHTML = subTotal + " đ";
}

// display sum quantity of cart item at cartIcon >>>
function updateNumCartItem() {
  const rows = myCart.querySelector("#list");
  const quantityTotals = rows.getElementsByClassName("totalQuantity");

  mumProduct = 0;
  for (let num = 0; num < quantityTotals.length; num++) {
    const quantityTotal = quantityTotals[num].textContent;
    mumProduct += parseInt(quantityTotal);
  }
  document.querySelector(".numShopping").innerHTML = mumProduct;
}

// click to delete all item of cart >>>
function deleteAll() {
  if (confirm("Are you sure to delete all item of the cart?")) {
    let cart = getCartFromLocalStorage();
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    showCart();
  }
}

window.onload = () => {
  showProductsInShop(); // show products in Store Page
  showCart(); // show cart
};
