const API = "http://localhost:5000/api/products";

async function loadProducts() {
  const res = await fetch(API);
  const products = await res.json();

  const container = document.getElementById("products");

  container.innerHTML = "";

  products.forEach(p => {
    const whatsappMsg = `Hello, I want to order ${p.name} - $${p.price}`;
    const whatsappLink = `https://wa.me/256779001347?text=${encodeURIComponent(whatsappMsg)}`;

    container.innerHTML += `
      <div class="product">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <p>$${p.price}</p>
        <a href="${whatsappLink}" target="_blank">Order on WhatsApp</a>
      </div>
    `;
  });
}

loadProducts();
