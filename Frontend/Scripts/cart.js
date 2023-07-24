let tbody = document.getElementById("tablebody");
let imageURL = "../Images/bell-icon.png";
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
let totalPrice = 0;
let baseURL = `http://localhost:4000/product`;

// async function fetchAndRender() {
//     let res = await fetch(baseURL, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json"
//         }
//     });
//     res = await res.json();
// }


// fetchAndRender();

const getTable = (pro) => {
    pro.forEach(element => {
        tbody.append(getRows(element));
    });
}

getTable(cartItems);

const getRows = (item) => {
    let pr = document.createElement("tr");

    let productinfo = document.createElement("div");
    let product = document.createElement("td");
    let image = document.createElement("img");
    image.src = item.filename;
    image.style.width = "10%";
    product.textContent = item.description;
    productinfo.style.width = "100%";
    productinfo.style.display = "flex";
    productinfo.style.alignItems = "center";
    productinfo.append(image, product);

    let quantity = document.createElement("td");
    const quantityContainer = document.createElement("div");
    quantityContainer.classList.add("quantity-container");

    const decreaseQuantityButton = document.createElement("button");
    decreaseQuantityButton.classList.add("quantity-button", "decrease-button");
    decreaseQuantityButton.textContent = "-";
    decreaseQuantityButton.addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity--;
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        displayCartItems(cartItems);
        totalPrices(item)
      }
      
    });

    const quantityElement = document.createElement("span");
    quantityElement.classList.add("quantity");
    quantityElement.textContent = item.quantity;
    quantityContainer.appendChild(quantityElement);

    const increaseQuantityButton = document.createElement("button");
    increaseQuantityButton.classList.add("quantity-button", "increase-button");
    increaseQuantityButton.textContent = "+";
    increaseQuantityButton.addEventListener("click", () => {
      item.quantity++;
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      displayCartItems(cartItems);
      totalPrices(item)
    });
    quantityContainer.appendChild(increaseQuantityButton, quantityElement, decreaseQuantityButton);
    quantity.appendChild(quantityContainer);

    let price = document.createElement("td");
    price.textContent = item.price;

    pr.append(productinfo, quantity, price);

    return pr;
}


// ---------------------------------------------------------------------------------------------------------------
// console.log(cartItems);

// Display cart items and total price

// const cartItemsContainer = document.querySelector(".cart-items");
// const totalPriceElement = document.querySelector("#grandTotal");

// displayCartItems(cartItems);

// function displayCartItems(cartItems) {
//   cartItemsContainer.innerHTML = "";
//   totalPrice=0;
//   cartItems.forEach((item) => {
//     const itemElement = document.createElement("div");
//     itemElement.classList.add("cart-item");

//     const imageElement = document.createElement("img");
//     imageElement.classList.add("item-image");
//     imageElement.src = item.image;
//     imageElement.alt = item.name;
//     itemElement.appendChild(imageElement);

//     const nameElement = document.createElement("h2");
//     nameElement.classList.add("item-name");
//     nameElement.textContent = item.name;
//     itemElement.appendChild(nameElement);

//     const titleElement = document.createElement("p");
//     titleElement.classList.add("item-title");
//     titleElement.textContent = item.title;
//     itemElement.appendChild(titleElement);

//     const priceElement = document.createElement("h2");
//     priceElement.classList.add("item-price");
//     priceElement.textContent = `$${item.price}`;
//     itemElement.appendChild(priceElement);
//     totalPrices(item)
//     // totalPrice += Number(item.price) * item.quantity;

//     const quantityContainer = document.createElement("div");
//     quantityContainer.classList.add("quantity-container");

//     const decreaseQuantityButton = document.createElement("button");
//     decreaseQuantityButton.classList.add("quantity-button", "decrease-button");
//     decreaseQuantityButton.textContent = "-";
//     decreaseQuantityButton.addEventListener("click", () => {
//       if (item.quantity > 1) {
//         item.quantity--;
//         localStorage.setItem("cartItems", JSON.stringify(cartItems));
//         displayCartItems(cartItems);
//         totalPrices(item)
//       }
      
//     });

//     quantityContainer.appendChild(decreaseQuantityButton);

//     const quantityElement = document.createElement("span");
//     quantityElement.classList.add("quantity");
//     quantityElement.textContent = item.quantity;
//     quantityContainer.appendChild(quantityElement);

//     const increaseQuantityButton = document.createElement("button");
//     increaseQuantityButton.classList.add("quantity-button", "increase-button");
//     increaseQuantityButton.textContent = "+";
//     increaseQuantityButton.addEventListener("click", () => {
//       item.quantity++;
//       localStorage.setItem("cartItems", JSON.stringify(cartItems));
//       displayCartItems(cartItems);
//       totalPrices(item)
//     });
//     quantityContainer.appendChild(increaseQuantityButton);

//     itemElement.appendChild(quantityContainer);

//     const removeButton = document.createElement("button");
//     removeButton.classList.add("remove-button");
//     removeButton.textContent = "Remove";
//     removeButton.addEventListener("click", () => {
//       const itemIndex = cartItems.indexOf(item);
//       cartItems.splice(itemIndex, 1);
//       localStorage.setItem("cartItems", JSON.stringify(cartItems));
//       displayCartItems(cartItems);
//     });
//     itemElement.appendChild(removeButton);

//     // const buyNowButton = document.createElement('button');
//     // buyNowButton.classList.add('buy-now-button');
//     // buyNowButton.textContent = 'Buy Now';

//     // buyNowButton.addEventListener('click', () => {
//     //   window.location.href="payment2.html"
//     //   console.log('Buy Now clicked');
//     // });

//     // itemElement.appendChild(buyNowButton);

//     cartItemsContainer.appendChild(itemElement);
//   });
  
//   totalPriceElement.textContent = ` ₹${totalPrice.toFixed(2)}`;
// }

// function totalPrices(item){

  
//   totalPrice += Number(item.price) * item.quantity;
//   // window.location.reload
// }


// console.log(grandTotal)