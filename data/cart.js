const cart=[];

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
            id:productId,
            quantity:quantity
        });
    }
};

export {cart, addToCart};