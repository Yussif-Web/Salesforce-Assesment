let carts = document.querySelectorAll('.add-cart');
let products = [
    {
        name:"banana",
        tag: "fruit",
        price: 10,
        InCart: 0
    },

    {
        name:"banana",
        tag: "fruit",
        price: 15,
        InCart: 0
    },
    {
        name:"banana",
        tag: "fruit",
        price: 20,
        InCart: 0
    },

    {
        name:"banana",
        tag: "fruit",
        price: 3.0,
        InCart: 0
    },
    {
        name:"banana",
        tag: "fruit",
        price: 80,
        InCart: 0
    },

    
];

for (let i= 0; i < carts.length; i++){
    carts[i].addEventListener('click',()=>{

        cartNumbers(products[i]);
        sumCost(products[i])
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product){
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if(productNumbers){
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.cart span').textContent = 1;
}else{
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.cart span').textContent = 1;
}
setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem('productsIncart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){
        if(cartItems[product.tag] == undefined){
            cartItems={
                ...cartItems,
                [product.tag]:product
            }
        }
        cartItems[product.tag].InCart +=1;
    } else{
    product.InCart = 1;
    cartItems = {
        [product.tag]:product
    }
}
    
    localStorage.setItem("productsIncart", JSON.stringify (cartItems));
}

function sumCost(product){
    let cartCost = localStorage.getItem('sumCost');

    if(cartCost !=null){
        cartCost = parseInt('cartCost');
       localStorage.setItem("sumCost", cartCost + product.price);
    }else {
        localStorage.setItem("sumCost", product.price);
    } 
}

function displayCart(){
      let cartItems = localStorage.getItem("productsIncart");
      cartItems =JSON.parse(cartItems);
      let productContainer = document.querySelector(".products");
      let cartCost = localStorage.getItem('sumCost');


    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item =>{
            productContainer.innerHTML += `
            <div class="product">
            <ion-icon name="close-circle"></ion-icon>
            <img src = "./images/${item.tag}.jpg">
            <span>${item.name}</span>
            </div>

            <div class = "price">$${item.price}.00</div>
            <div class = "quantity">
            <ion-icon name="arrow-dropleft-circle"></ion-icon>
            <span>${item.InCart}</span>
            <ion-icon name="arrow-dropright-circle"></ion-icon>
            </div>
            <div class="total">
              $${item.InCart * item.price},00
            </div>
            `;
        });

        productContainer.innerHTML+=`
        <div class="basketTotalContainer">
        <h4 class="basketTotalTitle">Basket Total</h4>
        <h4 class="basketTotal">$${cartCost}.00</h4>
        </div>
        `;
    }
}

onLoadCartNumbers();
displayCart();
