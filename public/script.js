const products = [
  {
    name: "Smart Watch",
    price: 5999,
    quality: "Excellent",
    features: ["Heart Rate", "Step Counter", "Waterproof"],
    images: ["images/smartwatch1.jpg", "images/smartwatch2.jpg", "images/smartwatch3.jpg"]
  },
  {
    name: "Leather Wallet",
    price: 1999,
    quality: "Good",
    features: ["Pure Leather", "6 Card Slots", "Durable"],
    images: ["images/wallet1.jpg", "images/wallet2.jpg", "images/wallet3.jpg"]
  },
  {
    name: "Wireless Headphones",
    price: 4999,
    quality: "Very Good",
    features: ["Bluetooth 5.2", "Noise Cancellation", "20h Battery"],
    images: ["images/headphone1.jpg", "images/headphone2.jpg", "images/headphone3.jpg"]
  },
  {
    name: "Realme Note 60",
    price: 39999,
    quality: "Excellent",
    features: ["6.5-inch Display", "5000mAh Battery", "Fast Charging"],
    images: ["images/realme1.jpg", "images/realme2.jpg", "images/realme3.jpg"]
  },
  {
    name: "Portable Speaker",
    price: 2999,
    quality: "Good",
    features: ["10W Output", "Bluetooth", "Shockproof"],
    images: ["images/speaker1.jpg", "images/speaker2.jpg", "images/speaker3.jpg"]
  },
  {
    name: "Laptop Pro",
    price: 89999,
    quality: "Excellent",
    features: ["i7 Processor", "16GB RAM", "512GB SSD"],
    images: ["images/laptop1.jpg", "images/laptop2.jpg", "images/laptop3.jpg"]
  }
];

// Function to display products
function displayProducts() {
  const container = document.getElementById("product-list");

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    productCard.innerHTML = `
      <div class="product-images">
        ${product.images.map(img => `<img src="${img}" alt="${product.name}" onclick="openImage('${img}')">`).join("")}
      </div>
      <h2>${product.name}</h2>
      <p class="price">Rs. ${product.price}</p>
      <p>Quality: ${product.quality}</p>
      <ul>
        ${product.features.map(f => `<li>${f}</li>`).join("")}
      </ul>
      <a href="order.html" class="order-btn">Order Now</a>
    `;

    container.appendChild(productCard);
  });
}

// Open image in new tab
function openImage(src) {
  window.open(src, "_blank");
}

displayProducts();
