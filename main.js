var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productCategoryInput = document.getElementById('productCategory');
var productDescInput = document.getElementById('productDesc');
var mainBtn = document.getElementById("button3");
var link = 0 ;
var productsContainer;
const itemsPerPage = 3; 
let currentPage = 1; 


    if (localStorage.getItem("products") == null){
        productsContainer = [];
    } else
    {
        productsContainer = JSON.parse(localStorage.getItem("products"));
        displayProduct(productsContainer);
    }

mainBtn.onclick=function (){
 
    if ( mainBtn.innerHTML == "Add"){
        var addProducts = {
            productName:productNameInput.value ,
            productPrice:productPriceInput.value ,
            productCategory:productCategoryInput.value ,
            productDesc:productDescInput.value 
        }
        
        productsContainer.push(addProducts);
        localStorage.setItem("products" , JSON.stringify(productsContainer));
        displayProduct(productsContainer);
        clearForm();

    }else {
        var updatedProducts = {
            productName:productNameInput.value ,
            productPrice:productPriceInput.value ,
            productCategory:productCategoryInput.value ,
            productDesc:productDescInput.value 
        }
        productsContainer.splice(link , 1 , updatedProducts);
        localStorage.setItem("products" , JSON.stringify(productsContainer));
        displayProduct(productsContainer);
        clearForm();
        mainBtn.innerHTML ="Add";
        
    }
    
}

function displayProduct(productsList, showPagination = true) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = showPagination ? productsList.slice(startIndex, endIndex) : productsList;

    let display = "";
    for (let i = 0; i < itemsToDisplay.length; i++) {
        display += `
    <tr>
        <td>${startIndex + (i + 1)}</td>
        <td>${itemsToDisplay[i].productName}</td>
        <td>${itemsToDisplay[i].productPrice}</td>
        <td>${itemsToDisplay[i].productCategory}</td>
        <td>${itemsToDisplay[i].productDesc}</td>
        <td><button onclick="updateProducts(${startIndex + i})" class="btn btn-warning">Update</button></td>
        <td><button onclick="deleteProduct(${startIndex + i})" class="btn btn-danger">Delete</button></td>
    </tr>`;
    }
    document.getElementById('tableRow').innerHTML = display;

    if (showPagination) {
        renderPagination(productsList);
    } else {
        document.getElementById("pagination").innerHTML = "";
        
    }
}

function renderPagination(productsList) {
    const totalPages = Math.ceil(productsList.length / itemsPerPage);
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.className = "btn btn-outline-info mx-1";
        button.onclick = () => {
            currentPage = i;
            displayProduct(productsList);
        };

        if (i === currentPage) {
            button.style.color = "white";
            button.classList.add("active");
        }

        paginationContainer.appendChild(button);
    }
}


function clearForm(){
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";
}


function deleteProduct(productIndex) {
    productsContainer.splice(productIndex, 1);
    localStorage.setItem("products", JSON.stringify(productsContainer));

    const totalPages = Math.ceil(productsContainer.length / itemsPerPage);
    if (currentPage > totalPages && totalPages > 0) {
        currentPage--; 
    }

    displayProduct(productsContainer);
}



document.querySelector('#searchInput').onkeyup = function () {
    const searchResult = [];
    for (let i = 0; i < productsContainer.length; i++) {
        if (productsContainer[i].productName.toLowerCase()
            .includes(event.target.value.toLowerCase())) {
            searchResult.push(productsContainer[i]);
        }
    }

    if (searchResult.length > 0) {
        currentPage = 1; 
        displayProduct(searchResult); 
    } else {
        document.getElementById('tableRow').innerHTML = `
            <tr>
                <td colspan="7" class="text-center">No results found.</td>
            </tr>`;
        document.getElementById('pagination').innerHTML = ""; 
    }
};


function updateProducts(index) {

    link = index;

    productNameInput.value = productsContainer[index].productName;
    productPriceInput.value = productsContainer[index].productPrice;
    productCategoryInput.value = productsContainer[index].productCategory;
    productDescInput.value = productsContainer[index].productDesc;
    mainBtn.innerHTML = "Update";
}