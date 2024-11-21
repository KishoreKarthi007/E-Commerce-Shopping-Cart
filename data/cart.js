//Save Data to Local Storage
let cart= JSON.parse(localStorage.getItem('cart'));

//Empty Cart Handling using default cart
if(!cart) {
    cart=[
        {
            productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            deliveryId:'1',
            quantity:3
        },
        {
            productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
            deliveryId:'2',
            quantity:1
        }
    ];
}

//Function --> set localstorage for the cart
function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

//Function --> Add the product to the cart
function addToCart(productId,quantity) {
    let matchingItem;
    cart.forEach( item => {
        if(item.id === productId)
            matchingItem=item;
    });

    if(matchingItem){ 
        matchingItem.quantity += quantity; 
    } else{
        cart.push({
            productId:productId,
            deliveryId:'1',
            quantity:quantity
        });
    }

    saveToStorage();
};

function removeFromCart(productId) {
    const newCart=[];

    cart.forEach((cartItem)=>{
        if(productId !== cartItem.productId)
            newCart.push(cartItem);
    });

    cart=newCart;

    saveToStorage();
}

//Function --> Remove the product to the cart
function totalItems(){
    let totalItems=0;
    cart.forEach(cartItem => {
        totalItems+=cartItem.quantity;
    });
    document.querySelector(".js-total-items")
        .innerHTML=totalItems + " Items";
    document.querySelector(".js-payment-summary-item")
        .innerHTML="Items (" + totalItems +"):";  
}

//Function --> Update quantity of product in the cart
function updateCartQuantity(id,value){
    cart.forEach((cartItem)=>{
        if(cartItem.productId === id)
            cartItem.quantity=value;
    });
    totalItems();
}

export {cart, addToCart, removeFromCart, totalItems,updateCartQuantity};