const formAddProduct = document.getElementById('formAddProduct');
const productNameInput = document.getElementById('productName');
const productBrandInput = document.getElementById('productBrand');
const productDescriptionInput = document.getElementById('productDescription');
const productPriceInput = document.getElementById('productPrice');
const productImgInput = document.getElementById('productImg');
const productsTable = document.getElementById('productsTable');
const formEdit = document.getElementById('formEdit');
const productNameModalInput = document.getElementById('productNameModal');
const productBrandModalInput = document.getElementById('productBrandModal');
const productDescriptionModalInput = document.getElementById('productDescriptionModal');
const productPriceModalInput = document.getElementById('productPriceModal');
let editProductId = '';
const search = document.getElementById('search');
const searchForm = document.getElementById('searchForm');

const generateId = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
};


formAddProduct.onsubmit = (event) => {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    event.preventDefault();
    const productName = productNameInput.value;
    const productBrand = productBrandInput.value;
    const productDescription = productDescriptionInput.value;
    const productPrice = productPriceInput.value;
    const productImg = productImgInput.value;

    products.push({
        productName,
        productBrand,        
        productDescription,
        productPrice,
        productImg,       
        id: generateId(),
        createdAt: Date.now(),
    })
    const productsJson = JSON.stringify(products);
    localStorage.setItem('products', productsJson);
    formAddProduct.reset();
    displayAllProducts()
}

const getModal = (product) => {
    const createdAt = new Date(product.createdAt);
    let lastUpdate = (product.lastUpdate) || '-';
    if (lastUpdate !== '-') {
        lastUpdate = new Date(lastUpdate).toLocaleString();   
    }

    return `    <!-- Button trigger modal -->
                <button type="button" class="btn btn-info tableButtons" data-toggle="modal" data-target="#modal${product.id}">
                    Mostrar
                </button>
                              
                <!-- Modal -->
                <div class="modal fade" id="modal${product.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-fullscreen-md-down">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">${product.productName}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div><p>Descripción: ${product.productDescription}</p></div>
                                <div><p>Categoría: ${product.productBrand}</p></div>
                                <p>Precio del producto: ${product.productPrice}</p>
                                <p>Producto registrado el día: ${createdAt.toLocaleString()}</p>
                                <p>Última modificación: ${lastUpdate}</p>
                                <img src="${product.productImg}" class="card-img-top" alt="Esta es una imágen del producto">
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            `
}


function displayProducts(products) {
    
    const rows = [];

    for (let index = 0; index < products.length; index++) {
        const product = products[index];

        const tr = `
                        <tr class = "w-100">
                            <th scope="row">${index + 1}</th>
                            <td>${product.productName}</td>
                            <td>${product.productBrand}</td>
                            <td>$${product.productPrice}</td>
                            <td>
                                <div class="hiddenButtons">
                                    <div class="dropdown">
                                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Opciones
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                            <button type="button" class="dropdown-item btn btn-info" data-toggle="modal" data-target="#modal${product.id}">
                                                Mostrar
                                            </button>
                                            <button type="button" class="dropdown-item btn btn-info" data-toggle="modal" data-target="#editModal" onclick="loadForm('${product.id}')"><i class="far fa-edit"></i></button>
                                            <button onclick="deleteProduct('${product.id}')" class="dropdown-item btn btn-info"><i class="fas fa-trash-alt"></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="">
                                    <!-- Button trigger modal -->
                                    ${getModal(product)}
                                    <!-- Button trigger modal edit -->
                                    <button type="button" class="btn btn-warning text-white tableButtons" data-toggle="modal" data-target="#editModal" onclick="loadForm('${product.id}')"><i class="far fa-edit"></i></button>
                                    <button onclick="deleteProduct('${product.id}')" class="btn btn-danger tableButtons"><i class="fas fa-trash-alt"></i></button>
                                </div>
                            </td>
                        </tr>
                    `   ;
        rows.push(tr);
    }
    productsTable.innerHTML = rows.join('');
    $('#addProductModal').modal('hide');
}

function displayAllProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];

    displayProducts(products);
}
displayAllProducts()

function deleteProduct(productId) {
    // Traer la lista de Productos de localStorage.
    const products = JSON.parse(localStorage.getItem('products')) || [];
    // Eliminar un Producto, usando filter() para filtrar el Producto
    // que coincide con el id recibido por parámetros.
    const filteredProducts = products.filter((product) => product.id !== productId);
    // Guardar lista de Productos en localStorage.
    const productsJson = JSON.stringify(filteredProducts);
    localStorage.setItem('products', productsJson);
    // Actualizar la tabla en el html llamando a la función displayProduct(). 
    displayAllProducts();
}

const loadForm = (productId) => {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find((p) => p.id == productId);
    productNameModalInput.value = product.productName;
    productBrandModalInput.value = product.productBrand;
    productDescriptionModalInput.value = product.productDescription;
    productPriceModalInput.value = product.productPrice;
    editProductId = productId;
}

formEdit.onsubmit = (e) => {
    e.preventDefault()
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const productName = productNameModalInput.value;
    const productBrand = productBrandModalInput.value;
    const productDescription = productDescriptionModalInput.value;
    const productPrice = productPriceModalInput.value;
    const updatedProducts = products.map((p) => {
    
        if (p.id == editProductId) {
            const product = {
                ... p,
                productName,
                productBrand,
                productDescription,
                productPrice,
                lastUpdate: Date.now(),
            }
            return product
        } else {
            return p;
        }
    })
    const productsJson = JSON.stringify(updatedProducts);
    localStorage.setItem('products', productsJson);
    // Actualizar la tabla en el html llamando a la función displayTasks().
    formEdit.reset();
    displayAllProducts();
    $('#editModal').modal('hide');
}

searchForm.onsubmit = (e) => {
    e.preventDefault();
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const term = search.value;
    const filteredProducts = products.filter(p => (p.productName.toLowerCase().includes(term.toLowerCase())
     || p.productBrand.toLowerCase().includes(term.toLowerCase())
    ))

    displayProducts(filteredProducts);
}