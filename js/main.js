let prodName = document.getElementById('productName');
let prodCategory = document.getElementById('productCategory');
let prodPrice = document.getElementById('productPrice');
let prodDescription = document.getElementById('productDesc');
let addBtn = document.querySelector('.btn');
let searchInput = document.getElementById('searchInput');

let productContainer = [];
let mainIndex = 0;


/* ======= EVENTS ======= */
addBtn.addEventListener('click', ()=>{
  addProduct();
});

searchInput.addEventListener('keyup', () => {
  searchProduct();
})

/* =============== CONDITIONS =============== */

if (localStorage.getItem('products') != null) {
  productContainer = JSON.parse(localStorage.getItem('products'));
};


/* ========== FUNCTIONS ============ */
displayProduct();

function addProduct(){
  let productObj = {
    name : prodName.value,
    category : prodCategory.value,
    price : prodPrice.value,
    description : prodDescription.value
  };
  if (addBtn.innerHTML == 'Add Product') {
    productContainer.push(productObj);
  }
  else {
    productContainer.splice(mainIndex,1,productObj);
    addBtn.innerHTML = "Add Product";
  };
  localStorage.setItem('products', JSON.stringify(productContainer));
  displayProduct();
  clearInputs();
  console.log(productContainer);
};


function displayProduct(){
  let box = ``;
  for(let i = 0 ; i < productContainer.length ; i++){
    box += `
      <tr>
        <td>${i+1}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].description}</td>
        <td><button onClick="updateProduct(${i})" class="btn btn-outline-warning btn-sm">Update</button></td>
        <td><button onClick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm">Delete</button></td>
      </tr>
    `
  };
  
  document.getElementById('tbody').innerHTML = box;
};

function clearInputs() {
  prodName.value = "";
  prodCategory.value = "";
  prodPrice.value = "";
  prodDescription.value = "";
};

function deleteProduct(index){
  productContainer.splice(index,1);
  localStorage.setItem('products', JSON.stringify(productContainer));
  displayProduct();
};

function updateProduct(index) {
  mainIndex = index;
  prodName.value = productContainer[index].name;
  prodCategory.value = productContainer[index].category;
  prodPrice.value = productContainer[index].price;
  prodDescription.value = productContainer[index].description;
  addBtn.innerHTML = "Update Product";
};

function searchProduct(){
  let box2 = ``;
  for (let i = 0; i < productContainer.length; i++) {
    if(productContainer[i].name.toLowerCase().includes(searchInput.value.toLowerCase())){
      box2 += `
      <tr>
        <td>${i+1}</td>
        <td>${productContainer[i].name.replace(searchInput.value,'<span>'+searchInput.value+'</span>')}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].description}</td>
        <td><button onClick="updateProduct(${i})" class="btn btn-outline-warning btn-sm">Update</button></td>
        <td><button onClick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm">Delete</button></td>
      </tr>
    `;
    };
  };
  document.getElementById('tbody').innerHTML = box2;

};
