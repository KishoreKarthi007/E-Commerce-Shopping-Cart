let productHTML=``;

products.forEach( product => {
    const html=`
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
           ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            <sup>₹</sup>${product.price}
          </div>

          <div class="product-quantity-container">
            <select class="js-product-quantity-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `;
    productHTML+=html;
});

document.querySelector(".js-product-data")
    .innerHTML=productHTML;

let quantityCount=0;
let productQuantity=0;
document.querySelectorAll(".js-add-to-cart")
    .forEach(button => {
        button.addEventListener('click',()=>{
            const productId=button.dataset.productId;
            const quantitySelect=document.querySelector(`.js-product-quantity-${productId}`);
            const quantity=Number(quantitySelect.value);
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

            quantityCount+=quantity;
            document.querySelector(".js-cart-quantity")
              .innerHTML=quantityCount;
            
        });        
    });




  
    



