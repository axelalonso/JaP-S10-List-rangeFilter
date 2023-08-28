const URL = "https://fakestoreapi.com/products";
const rangeFilterCountMin = document.getElementById("rangeFilterCountMin");
const rangeFilterCountMax = document.getElementById("rangeFilterCountMax");
const rangeFilterBtn = document.getElementById("rangeFilterCount");
const clearRangeFilterBtn = document.getElementById("clearRangeFilter");


document.addEventListener("DOMContentLoaded", () => {
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            displayProducts(data);

            rangeFilterBtn.addEventListener("click", () => {
                filtrar(data);
            });

            clearRangeFilterBtn.addEventListener("click", () => {
                clearFilter(data);
            });
        });
});

function filtrar(products) {
    const minPrice = parseFloat(rangeFilterCountMin.value) || 0;
    const maxPrice = parseFloat(rangeFilterCountMax.value) || Infinity;

    const filteredProducts = products.filter(product => {
        const productPrice = parseFloat(product.price);
        return productPrice >= minPrice && productPrice <= maxPrice;
    });

    displayProducts(filteredProducts);
}

function displayProducts(products) {
    const productosElement = document.getElementById("info");
    productosElement.innerHTML = "";

    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.className = "list-group-item d-flex justify-content-between";
        productElement.innerHTML = `
            <div class="col-7">
                <h3>${product.title}</h3>
                <p>${product.price}</p>
            </div>`;
        productosElement.appendChild(productElement);
    });
}

function clearFilter(products) {
    rangeFilterCountMin.value = "";
    rangeFilterCountMax.value = "";
    displayProducts(products);
}