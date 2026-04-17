const API = "http://localhost:5000/api/products";

// GET PRODUCTS
async function loadProducts() {
  const res = await fetch(API);
  const data = await res.json();

  const list = document.getElementById("productList");
  list.innerHTML = "";

  data.forEach(product => {
    list.innerHTML += `
      <div class="product">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>💰 $${product.price}</p>
        <button onclick="deleteProduct('${product._id}')">Delete</button>
      </div>
    `;
  });
}

// ADD PRODUCT
async function addProduct() {
  const product = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    price: document.getElementById("price").value,
    image: document.getElementById("image").value,
  };

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product)
  });

  loadProducts();
}

// DELETE PRODUCT
async function deleteProduct(id) {
  await fetch(`${API}/${id}`, {
    method: "DELETE"
  });

  loadProducts();
}

// INIT
loadProducts();
