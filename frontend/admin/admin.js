const API = "http://localhost:5000/api/products";
const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

// SWITCH SECTIONS
function showSection(section) {
  document.getElementById("addSection").classList.add("hidden");
  document.getElementById("listSection").classList.add("hidden");

  if (section === "add") {
    document.getElementById("addSection").classList.remove("hidden");
  }

  if (section === "list") {
    document.getElementById("listSection").classList.remove("hidden");
    loadProducts();
  }
}

// GET PRODUCTS
async function loadProducts() {
  const res = await fetch(API);
  const data = await res.json();

  const list = document.getElementById("productList");
  list.innerHTML = "";

  data.forEach(p => {
    list.innerHTML += `
      <div class="product">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <p>💰 $${p.price}</p>

        <button onclick="deleteProduct('${p._id}')">Delete</button>
        <button onclick="editProduct('${p._id}', '${p.name}', '${p.description}', ${p.price})">Edit</button>
      </div>
    `;
  });
}

// ADD PRODUCT
async function addProduct() {
  const product = {
    name: name.value,
    description: description.value,
    price: price.value,
    image: image.value
  };

  await fetch(API, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(product)
  });

  alert("Product Added");
  loadProducts();
}

// DELETE
async function deleteProduct(id) {
  await fetch(`${API}/${id}`, { 
    method: "DELETE",
    headers: {
    "Authorization": `Bearer ${token}`
  }
});
  loadProducts();
}

// EDIT PRODUCT (simple prompt version for now)
async function editProduct(id, oldName, oldDesc, oldPrice) {

  const name = prompt("New name:", oldName);
  const description = prompt("New description:", oldDesc);
  const price = prompt("New price:", oldPrice);

  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ name, description, price })
  });

  loadProducts();
}

// INIT
showSection("list");
