let cart= JSON.parse(localStorage.getItem('cart'));

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

function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

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

function totalItems(){
    let totalItems=0;
    cart.forEach(cartItem => {
      totalItems+=cartItem.quantity;
    });
    document.querySelector(".js-total-items").innerHTML=totalItems + " Items";
  }


function updateCartQuantity(id,value){
    cart.forEach((cartItem)=>{
        if(cartItem.productId === id)
            cartItem.quantity=value;
    });

    
}

export {cart, addToCart, removeFromCart, totalItems,updateCartQuantity};