// Retrieve existing products from local storage or initialize an empty array
let products = JSON.parse(localStorage.getItem('products')) || [];

// Function to render products in the table
function renderProducts() {
    const tbody = document.querySelector('#productTable tbody');
    tbody.innerHTML = '';

    products.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.quantity}</td>
            <td>
                <button onclick="editProduct(${index})">Edit</button>
                <button onclick="deleteProduct(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Function to add a new product
function addProduct(name, price, quantity) {
    products.push({ name, price, quantity });
    localStorage.setItem('products', JSON.stringify(products));
    renderProducts();
}

// Function to validate form fields
function validateForm() {
    const productName = document.getElementById('productName').value.trim();
    const price = parseFloat(document.getElementById('price').value);
    const quantity = parseInt(document.getElementById('quantity').value);

    if (productName === '' || isNaN(price) || isNaN(quantity) || !Number.isInteger(quantity)) {
        alert('Please fill all fields correctly.');
        return;
    }

    addProduct(productName, price, quantity);
    document.getElementById('addProductForm').reset();
}

// Function to edit a product
function editProduct(index) {
    const product = products[index];
    document.getElementById('productName').value = product.name;
    document.getElementById('price').value = product.price;
    document.getElementById('quantity').value = product.quantity;

    // Remove the edited product from the array
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));

    // Re-render the table
    renderProducts();
}

// Function to delete a product
function deleteProduct(index) {
    // Remove the product from the array
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));

    // Re-render the table
    renderProducts();
}

// Render initial products
renderProducts();

