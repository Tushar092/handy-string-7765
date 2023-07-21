// const containerElement = document.querySelector('.productData');
// const sortElement = document.querySelector('#sort');
// const filterElement = document.querySelector('#filter');

// function displayProducts() {
//   fetch("http://localhost:4000/product/")
//     .then(response => response.json())
//     .then(data => {
//       display(data)
//     })
//     .catch(error => {
//       console.error(error);
//     });
// }
// displayProducts()
// function display(data) {
//   containerElement.innerHTML = "";

//   if (Array.isArray(data)) {
//     data.forEach(product => {
//       const productElement = document.createElement("div");
//       productElement.classList.add("product");

//       const filenameElement = document.createElement("img");
//       filenameElement.classList.add("product-filename");
//       filenameElement.src = product-filename;
//       filenameElement.alt = product.title;
//       productElement.appendChild(filenameElement);

//       const titleElement = document.createElement("h2");
//       titleElement.classList.add("product-title");
//       titleElement.textContent = product.title;
//       productElement.appendChild(titleElement);

//       const descriptionElement = document.createElement("p");
//       descriptionElement.classList.add("product-description");
//       descriptionElement.textContent = `${product.description}`;
//       productElement.appendChild(descriptionElement);

//       const priceElement = document.createElement("h2");
//       priceElement.classList.add("product-price");
//       priceElement.textContent = `₹${product.price}`;
//       productElement.appendChild(priceElement);

//       const ratingElement = document.createElement("p");
//       ratingElement.classList.add("product-rating");
//       ratingElement.textContent = `₹${product.rating}`;
//       productElement.appendChild(ratingElement);

//       // Add "Add to Cart" button
//       const buttonElement = document.createElement("button");
//       buttonElement.textContent = "Add to Cart";
//       buttonElement.addEventListener("click", () => {
//         addToCart(product);
//       });
//       productElement.appendChild(buttonElement);

//       containerElement.appendChild(productElement);
//     });
//   }

// }


// const sortSelect = document.getElementById('sort1');

// sortSelect.addEventListener('change', async () => {
//   const selectedSort = sortSelect.value;

//   // fetch("http://localhost:8800/product/")
//   //     .then(response => response.json())
//   //     .then(data => {
//   //         let sortedProducts = [];

//   //         if (selectedSort === 'dec') {
//   //             sortedProducts = data.sort((a, b) => b.price - a.price);
//   //         } else if (selectedSort === 'asc') {
//   //             sortedProducts = data.sort((a, b) => a.price - b.price);
//   //         } else {
//   //             sortedProducts = data;
//   //         }

//   //         containerElement.innerHTML = '';
//   //         sortedProducts.forEach(product => {
//   //             // const productElement = createProductElement(product);
//   //             containerElement.appendChild(productElement);
//   //         });
//   // })
//   try {
//     let res = await fetch("http://localhost:4000/product/");
//     let result = await res.json();
//     //    result=result.sort((a,b)=>{a.price-b.price})
//     if (selectedSort === 'asc') {
//       let arr = result.sort((a, b) => {
//         return a.price - b.price
//       });
//       display(arr)
//     } else {
//       let arr = result.sort((a, b) => {
//         return b.price - a.price
//       });
//       display(arr)
//     }

//   } catch (error) {
//     console.error(error);
//   }
//   ;
// });




// // function addToCart(product) {
// //   // Implement adding product to cart here
// //   console.log(`Product "${product.name}" added to cart`);
// //   alert("product added successfully")
// // }

// function addToCart(product) {
// // Retrieve cart items from local storage
// let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];


// // Add product to cart
// product.quantity=1
// console.log(product)
// cartItems.push(product);

// // Store cart items in local storage
// localStorage.setItem('cartItems', JSON.stringify(cartItems));

// console.log(`Product "${product.title}" added to cart`);
// alert("Product added to cart successfully");
// }




//   // displayProducts();







//     // Get all the links
// const navLinks = document.querySelectorAll('nav ul li a');

// // Loop through the links and add the click event listener
// navLinks.forEach(link => {
//   link.addEventListener('click', function() {
//     // Remove the active class from all the links
//     navLinks.forEach(link => link.classList.remove('active'));
//     // Add the active class to the clicked link
//     link.classList.add('active');
//   });
// });

// // Get the back to top button
// const backToTopButton = document.getElementById('back');

// // Add the click event listener to the back to top button
// backToTopButton.addEventListener('click', function() {
//   // Scroll to the top of the page
//   window.scrollTo({ top: 0, behavior: 'smooth' });
// });


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
let filterby = document.getElementById("filter");
filterby.addEventListener("change", () => {
  FetchData();
});
function FilterData(data) {
  if (filterby.value === "") {
    DisplayData(data);
  } else {
    data = data.filter((ele) => {
      return ele.category == filterby.value;
    });
    DisplayData(data);
  }
  // console.log("data",data)
}
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
    if (Cart[i].id == product.id) {
      return true;
    }
  }
  return false;
}