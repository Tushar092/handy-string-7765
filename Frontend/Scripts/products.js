

async function FetchData() {
  try {
    let res = await fetch("http://localhost:4000/product/");
    res = await res.json();
    // FilterData(res.data);
    console.log(res)
    DisplayData(res);
  } catch (err) {
    console.log("error", err);
  }
}

FetchData();

let filterSelect = document.getElementById('filter');

filterSelect.addEventListener('change', async () => {
  let selectedFilter = filterSelect.value;

  try {
    let response = await fetch("http://localhost:4000/product/");
    let data = await response.json();
    let filteredProducts = [];

    if (selectedFilter === 'dec') {
      filteredProducts = data.sort((a, b) => b.price - a.price);
    } else if (selectedFilter === 'asc') {
      filteredProducts = data.sort((a, b) => a.price - b.price);
    } else {
      filteredProducts = data;
    }

    // Clear the container before appending the filtered products.
    Container.innerHTML = '';
    DisplayData(filteredProducts);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

let Cart = JSON.parse(localStorage.getItem("cart")) || [];

let Container = document.getElementById("product-container");
function DisplayData(data) {
  Container.innerHTML = "";
  for (let i = data.length - 1; i >= 0; i--) {
    let Card = document.createElement("div");
    let Filename = document.createElement("img");
    let Title = document.createElement("h2");
    let Description = document.createElement("p");
    let Price = document.createElement("h3");
    let Rating = document.createElement("p");
    let AddtoCart = document.createElement("button");
    Filename.src = data[i].filename;
    Title.textContent = data[i].title;
    Description.textContent = data[i].description;
    Price.textContent = `$${data[i].price}`;
    Rating.textContent = data[i].rating;
    AddtoCart.textContent = "Add To Cart";

    AddtoCart.addEventListener("click", () => {
      if (checkDuplicate(data[i])) {
        alert("Product Already in Cart");
      } else {
        Cart.push({ ...data[i], quantity: 1 });
        localStorage.setItem("cart", JSON.stringify(Cart));
        alert("Product Added To Cart");
      }
    });

    Card.append(Filename, Title, Description, Price, Rating, AddtoCart);
    Container.append(Card);
  }

  // console.log("display", data);
}

function checkDuplicate(product) {
  for (let i = 0; i < Cart.length; i++) {
    if (Cart[i]._id == product._id) {
        console.log(Cart[i], product)
      return true;
    }
  }
  return false;
}

 // Get the back to top button
const backToTopButton = document.getElementById('back');

// Add the click event listener to the back to top button
backToTopButton.addEventListener('click', function() {
  // Scroll to the top of the page
  window.scrollTo({ top: 0, behavior: 'smooth' });
});



function addToCart(product) {
  //   // Implement adding product to cart here
    console.log(`Product "${product.title}" added to cart`);
    alert("product added successfully")
  }

  
  function addToCart(product) {
  // Retrieve cart items from local storage
  // let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  let Cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  // Add product to cart
  product.quantity=1
  console.log(product)
  Cart.push(product);
  
  // Store cart items in local storage
  // localStorage.setItem('cartItems', JSON.stringify(cartItems));
  localStorage.setItem('cart', JSON.stringify(Cart));
  
  console.log(`Product "${product.title}" added to cart`);
  alert("Product added to cart successfully");
  }
  
  DisplayData();