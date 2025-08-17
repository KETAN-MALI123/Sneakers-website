const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

const products = [
  {
    id: 1,
    title: "Air Jorden",
    price: 55000,
    colors: [
      {
        code: "black",
        img: "./img/air (1).png",
      },
      {
        code: "darkblue",
        img: "./img/air2.png",
      },
    ],
  },
  {
    id: 2,
    title: "Air Jordan High",
    price: 90000,
    colors: [
      {
        code: "lightgray",
        img: "./img/jordan (11).png",
      },
      {
        code: "green",
        img: "./img/jordan2.png",
      },
    ],
  },
  {
    id: 3,
    title: "U.S.polo",
    price: 70000,
    colors: [
      {
        code: "lightgray",
        img: "./img/blazer.png",
      },
      {
        code: "green",
        img: "./img/blazer2.png",
      },
    ],
  },
  {
    id: 4,
    title: "Nike Court",
    price: 72000,
    colors: [
      {
        code: "black",
        img: "./img/crater.png",
      },
      {
        code: "lightgray",
        img: "./img/crater2.png",
      },
    ],
  },
  {
    id: 5,
    title: "Unisex",
    price: 92000,
    colors: [
      {
        code: "gray",
        img: "./img/hippie.png",
      },
      {
        code: "black",
        img: "./img/hippie2.png",
      },
    ],
  },
];

let choosenProduct = products[0];

const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");

menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    wrapper.style.transform = `translateX(${-100 * index}vw)`;
    choosenProduct = products[index];

    currentProductTitle.textContent = choosenProduct.title;
    currentProductPrice.textContent = "₹" + choosenProduct.price;
    currentProductImg.src = choosenProduct.colors[0].img;

    currentProductColors.forEach((color, index) => {
      color.style.backgroundColor = choosenProduct.colors[index].code;
    });
  });
});

currentProductColors.forEach((color, index) => {
  color.addEventListener("click", () => {
    currentProductImg.src = choosenProduct.colors[index].img;
  });
});

currentProductSizes.forEach((size, index) => {
  size.addEventListener("click", () => {
    currentProductSizes.forEach((size) => {
      size.style.backgroundColor = "white";
      size.style.color = "black";
    });
    size.style.backgroundColor = "black";
    size.style.color = "white";
  });
});

const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

productButton.addEventListener("click", () => {
  payment.style.display = "flex";
});

close.addEventListener("click", () => {
  payment.style.display = "none";
});

document.addEventListener("DOMContentLoaded", function () {
  const checkoutButton = document.querySelector(".payButton");
  const paymentModal = document.querySelector(".payment");
  const closeButton = document.querySelector(".close");
  const inputs = document.querySelectorAll(".payInput");

  checkoutButton.addEventListener("click", function () {
    let allFilled = true;

    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        allFilled = false;
        input.style.border = "2px solid red";
      } else {
        input.style.border = "1px solid #ccc";
      }
    });

    if (!allFilled) {
      showErrorMessage("Please fill all the above information!");
      return;
    }

    paymentModal.style.display = "none";

    setTimeout(() => {
      const thankYouMessage = document.createElement("div");
      thankYouMessage.innerHTML = `
        <div style="
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          padding: 20px;
          box-shadow: 0px 0px 10px rgba(0,0,0,0.3);
          text-align: center;
          border-radius: 10px;
          z-index: 9999;
          width: 300px;
        ">
          <h2>Thank You!</h2>
          <p>Your order has been placed successfully.</p>
          <button id="closeMessage" style="
            padding: 10px 20px;
            background: green;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 10px;
          ">Close</button>
        </div>
      `;

      document.body.appendChild(thankYouMessage);

      document
        .getElementById("closeMessage")
        .addEventListener("click", function () {
          thankYouMessage.remove();
        });
    }, 500);
  });

  closeButton.addEventListener("click", function () {
    paymentModal.style.display = "none";
  });

  function showErrorMessage(message) {
    const existingError = document.querySelector(".errorMessage");
    if (existingError) {
      existingError.textContent = message;
      return;
    }

    const errorMessage = document.createElement("p");
    errorMessage.textContent = message;
    errorMessage.className = "errorMessage";
    errorMessage.style.color = "red";
    errorMessage.style.textAlign = "center";
    errorMessage.style.marginTop = "10px";
    checkoutButton.insertAdjacentElement("beforebegin", errorMessage);

    setTimeout(() => {
      errorMessage.remove();
    }, 3000);
  }
});

document.getElementById("subscribe-btn").addEventListener("click", function () {
  const emailInput = document.getElementById("newsletter-email");
  const popup = document.getElementById("popup-message");
  const email = emailInput.value.trim();

  emailInput.classList.remove("error");
  popup.classList.remove("error");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") {
    emailInput.classList.add("error");
    popup.textContent = "Email field cannot be empty!";
    popup.classList.add("error");
    popup.style.display = "block";
  } else if (!emailRegex.test(email)) {
    emailInput.classList.add("error");
    popup.textContent = "Please enter a valid email address!";
    popup.classList.add("error");
    popup.style.display = "block";
  } else {
    popup.textContent = "Thanks for Subscribing!";
    popup.classList.remove("error");
    popup.style.display = "block";
    emailInput.value = "";
  }

  setTimeout(() => {
    popup.style.display = "none";
  }, 2000);
});

const cartButtons = document.querySelectorAll(".cartButton");

cartButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();

    const shoe = document.querySelector(".butterfly");
    const cartIcon = document.querySelector(".fa-cart-shopping");

    const buttonRect = this.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    const start = {
      x: buttonRect.left + buttonRect.width / 2 - 12 + window.scrollX,
      y: buttonRect.top + buttonRect.height / 2 - 12 + window.scrollY,
    };

    const end = {
      x: cartRect.left + cartRect.width / 2 - 12 + window.scrollX,
      y: cartRect.top - 15 + window.scrollY,
    };

    shoe.style.cssText = `
      left: ${start.x}px;
      top: ${start.y}px;
      opacity: 1;
      transform: scale(1) rotate(0deg);
      transition: none;
    `;

    const duration = 800;
    const startTime = performance.now();

    const cp1 = {
      x: start.x - 50,
      y: start.y - 20,
    };
    const cp2 = {
      x: end.x - 30,
      y: end.y - 100,
    };

    function animate(timestamp) {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const x =
        (1 - progress) ** 3 * start.x +
        3 * (1 - progress) ** 2 * progress * cp1.x +
        3 * (1 - progress) * progress ** 2 * cp2.x +
        progress ** 3 * end.x;

      const y =
        (1 - progress) ** 3 * start.y +
        3 * (1 - progress) ** 2 * progress * cp1.y +
        3 * (1 - progress) * progress ** 2 * cp2.y +
        progress ** 3 * end.y;

      shoe.style.left = `${x}px`;
      shoe.style.top = `${y}px`;

      const angle = progress * 720;
      shoe.style.transform = `scale(${1 - progress * 0.3}) rotate(${angle}deg)`;

      if (progress > 0.7) {
        shoe.style.opacity = `${1 - (progress - 0.7) / 0.3}`;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        shoe.style.opacity = "0";
      }
    }

    requestAnimationFrame(animate);
  });
});

document.querySelector(".limitedOffer").addEventListener("click", function (e) {
  e.preventDefault();
  const target = document.querySelector(this.getAttribute("href"));

  this.style.animation = "clickEffect 0.5s ease-out";

  if (target) {
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  setTimeout(() => {
    this.style.animation = "";
  }, 500);
});

document
  .getElementById("limitedOfferLink")
  .addEventListener("click", function (e) {
    e.preventDefault();
    const celebrationImg = document.getElementById("celebrationImage");

    celebrationImg.style.display = "block";
    celebrationImg.style.animation = "none";
    void celebrationImg.offsetWidth;
    celebrationImg.style.animation = "fadeInOut 3s ease-in-out";

    setTimeout(() => {
      celebrationImg.style.display = "none";
    }, 3000);

    document
      .getElementById("choose-style")
      .scrollIntoView({ behavior: "smooth" });
  });

const cartIcon = document.getElementById("cartIcon");
const cartPopup = document.getElementById("cartPopup");
const overlay = document.getElementById("overlay");
const closeCart = document.querySelector(".close-cart");
const cartItemsContainer = document.querySelector(".cart-items");
const cartCount = document.querySelector(".cart-count");
const totalPriceElement = document.querySelector(".total-price");

let cart = [];

cartIcon.addEventListener("click", () => {
  updateCartDisplay();
  cartPopup.style.display = "flex";
  overlay.style.display = "block";
  document.body.style.overflow = "hidden";
});

closeCart.addEventListener("click", closeCartPopup);
overlay.addEventListener("click", closeCartPopup);

function closeCartPopup() {
  cartPopup.style.display = "none";
  overlay.style.display = "none";
  document.body.style.overflow = "auto";
}

document.querySelectorAll(".cartButton").forEach((button, index) => {
  button.addEventListener("click", () => {
    const product = products[index];
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.colors[0].img,
    });
  });
});

function addToCart(product) {
  const existingItem = cart.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartDisplay();

  const msg = document.createElement("div");
  msg.textContent = `${product.name} added to cart`;
  Object.assign(msg.style, {
    position: "fixed",
    top: "70%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "12px 20px",
    borderRadius: "8px",
    fontSize: "16px",
    zIndex: "99999",
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
    opacity: "1",
    transition: "opacity 0.5s ease",
    textAlign: "center",
    fontWeight: "bold",
  });

  document.body.appendChild(msg);

  setTimeout(() => {
    msg.style.opacity = "0";
    setTimeout(() => msg.remove(), 500);
  }, 2000);
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id != productId);
  updateCartDisplay();
}

function updateQuantity(productId, change) {
  const id = Number(productId);
  const item = cart.find((item) => item.id === id);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(id);
    } else {
      updateCartDisplay();
    }
  }
}

function updateCartDisplay() {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<div class="empty-cart">Your cart is empty</div>';
    cartCount.textContent = "0";
    totalPriceElement.textContent = "₹0";
    return;
  }

  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;

    const itemElement = document.createElement("div");
    itemElement.className = "cart-item";
    itemElement.innerHTML = `
    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
    <div class="item-details">
        <h4>${item.name}</h4>
        <p>₹${item.price.toFixed(2)} × ${item.quantity} = ₹${(
      item.price * item.quantity
    ).toFixed(2)}</p>
        <div class="quantity-controls">
            <button class="quantity-btn minus" data-id="${item.id}">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="quantity-btn plus" data-id="${item.id}">+</button>
        </div>
    </div>
    <button class="remove-item" data-id="${item.id}">&times;</button>
`;

    cartItemsContainer.appendChild(itemElement);
  });

  totalPriceElement.textContent = `₹${total.toFixed(2)}`;
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

  document.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      removeFromCart(e.target.getAttribute("data-id"));
    });
  });

  document.querySelectorAll(".quantity-btn.minus").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      updateQuantity(e.target.getAttribute("data-id"), -1);
    });
  });

  document.querySelectorAll(".quantity-btn.plus").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      updateQuantity(e.target.getAttribute("data-id"), 1);
    });
  });
}

const checkoutBtn = document.querySelector(".checkout-btn");
const paymentForm = document.getElementById("paymentForm");
const closePayment = document.querySelector(".payment .close");
const cartPopupEl = document.getElementById("cartPopup");

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty. Please add items before checkout.");
    return;
  }

  closeCartPopup();
  paymentForm.style.display = "flex";
  paymentForm.scrollIntoView({ behavior: "smooth" });
});

closePayment.addEventListener("click", () => {
  paymentForm.style.display = "none";
  document.body.style.overflow = "auto";
});
