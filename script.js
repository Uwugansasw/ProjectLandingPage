import { products } from "./produk.js";

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navUl = document.querySelector("nav ul");

  if (hamburger && navUl) {
    hamburger.addEventListener("click", () => {
      navUl.classList.toggle("active");
    });

    navUl.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navUl.classList.remove("active");
      });
    });
  } else {
    console.error("Hamburger or nav ul not found in the DOM");
  }
});

function handleScroll() {
  const produkItems = document.querySelectorAll(".produk-item");
  produkItems.forEach((item) => {
    const itemPosition = item.getBoundingClientRect();
    const screenHeight = window.innerHeight;
    // Cek apakah elemen ada di viewport
    if (itemPosition.top < screenHeight * 0.9 && itemPosition.bottom > 0) {
      if (!item.classList.contains("visible")) {
        item.classList.add("visible");
      }
    } else {
      // Hapus kelas visible saat keluar viewport
      if (item.classList.contains("visible")) {
        item.classList.remove("visible");
      }
    }
  });
}

// Fungsi untuk render produk
function renderProducts() {
  const container = document.querySelector(".produk-container");
  container.innerHTML = ""; // Kosongkan container

  products.forEach((product, index) => {
    const productElement = document.createElement("div");
    productElement.classList.add("produk-item");
    // Set CSS variabel untuk delay
    productElement.style.setProperty("--produk-counter", index);

    productElement.innerHTML = `
          <img src="${product.image}" alt="${product.alt}" />
          <h3>${product.name}</h3>
          <p>${product.price}</p>
          <button class="produk-tombol">Tambah ke Keranjang</button>
      `;
    const button = productElement.querySelector(".produk-tombol");
    button.addEventListener("click", () => {
      alert(`Produk ${product.name} ditambahkan ke keranjang!`);
    });
    container.appendChild(productElement);
  });
}

// Jalankan render saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  handleScroll(); // Inisialisasi awal
});

// Update animasi saat scroll
document.addEventListener("scroll", handleScroll);

const lihatProdukButton = document.querySelector("#lihat-produk");
if (lihatProdukButton) {
  lihatProdukButton.addEventListener("click", () => {
    const produkSection = document.querySelector("#produk");
    if (produkSection) {
      produkSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}
