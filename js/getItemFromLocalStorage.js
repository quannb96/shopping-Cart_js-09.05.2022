// get item Products from localStorage >>>
function getProductsFromLocalStorage() {
  let getLocalStorage = localStorage.getItem("products");
  if (getLocalStorage == null) {
    products = [];
  } else {
    products = JSON.parse(getLocalStorage);
  }
  return products;
}

// get item Cart from localStorage >>>
function getCartFromLocalStorage() {
  let getLocalStorage = localStorage.getItem("cart");
  if (getLocalStorage == null || products == null) {
    cart = [];
  } else {
    cart = JSON.parse(getLocalStorage);
  }
  return cart;
}
