var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productCategoryInput = document.getElementById('productCategory');
var productDescInput = document.getElementById('productDesc');
var mainBtn = document.getElementById("button3");
var link = 0 ;
var productsContainer;

    if (localStorage.getItem("products") == null){
        productsContainer = [];
    } else
    {
        productsContainer = JSON.parse(localStorage.getItem("products"));
        displayProduct(productsContainer);
    }

// console.log(productNameInput , productPriceInput , productCategoryInput , productDescInput  );

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

function displayProduct(productsList){
    var display="";
    for ( var i=0 ; i<productsList.length ; i++){
        display+= `
    <tr>
        <td>${i}</td>
        <td>${productsList[i].productName}</td>
        <td>${productsList[i].productPrice}</td>
        <td>${productsList[i].productCategory}</td>
        <td>${productsList[i].productDesc}</td>
        <td><button onclick="updateProducts(${i})"  class="btn btn-warning">Update</button></td>
        <td><button onclick="deleteProduct(${i})"  class="btn btn-danger">Delete</button></td>
    </tr>`
            ;
    }
    document.getElementById('tableRow').innerHTML= display;
}

function clearForm(){
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescInput.value = "";
}

function deleteProduct(productIndex)
{
    productsContainer.splice(productIndex,1);
    localStorage.setItem("products" , JSON.stringify(productsContainer));
    displayProduct(productsContainer);
}
document.querySelector('#searchInput').onkeyup = function(){
    var searchResult = [];
    for (var i = 0; i < productsContainer.length; i++) {
        if (productsContainer[i].productName.toLowerCase()
        .includes(event.target.value.toLowerCase()) )
        {
            searchResult.push(productsContainer[i]);
        }
        displayProduct(searchResult);
        
    }

}

function updateProducts(index) {

    link = index;

    productNameInput.value = productsContainer[index].productName;
    productPriceInput.value = productsContainer[index].productPrice;
    productCategoryInput.value = productsContainer[index].productCategory;
    productDescInput.value = productsContainer[index].productDesc;
    mainBtn.innerHTML = "Update";
    // console.log(productNameInput.value , productPriceInput.value , productCategoryInput.value , productDescInput.value);


}