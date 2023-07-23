let tbody = document.getElementById("tablebody");
let imageURL = "../Images/bell-icon.png";
let baseURL = `http://localhost:4000/product`;

async function fetchAndRender() {
    let res = await fetch(baseURL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    res = await res.json();
    getTable(res);
}

fetchAndRender();

const getTable = (pro) => {
    pro.forEach(element => {
        tbody.append(getRows(element));
    });
}

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
    quantity.textContent = "3";

    let price = document.createElement("td");
    price.textContent = item.price;

    pr.append(productinfo, quantity, price);

    return pr;
}