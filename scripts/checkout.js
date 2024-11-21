import { cart, removeFromCart, totalItems, updateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { deliveryOptions } from "../data/";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

let cartSummaryHTML=``;



cart.forEach((cartItem)=>{
    const productId=cartItem.productId;
    let matchingItem;

    products.forEach( productItem =>{
        if(productId === productItem.id)
            matchingItem=productItem;
    });
    function deliveryHTML(id){
      const today=dayjs();
      const deliveryDate=today.add(7,'days');
      const deliveryString=deliveryDate.format('dddd, MMMM DD');
      
   

      let html= 
      `
      <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      <sup>₹</sup>4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      <sup>₹</sup>9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
      `
    }
    cartSummaryHTML+= `
    <div class="cart-item-container js-cart-item-container-${matchingItem.id}" >
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src=${matchingItem.image}>

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingItem.name}
                </div>
                <div class="product-price">
                  <sup>₹</sup>${matchingItem.price}
                </div>
                <div class="product-quantity">
                <span>Quantity:</span>
                <div class="quantity-link-div js-quantity-link-div-${matchingItem.id}">
                    <span class="quantity-label js-quantity-update js-quantity-label-${matchingItem.id}">${cartItem.quantity}</span>
                    <span class="update-quantity-link link-primary js-update-quantity" data-delete-id="${matchingItem.id}">
                    Update
                    </span>
                </div>

                <div class="quantity-edit-div js-quantity-edit-div-${matchingItem.id}">
                    <input class="quantity-input js-quantity-input-${matchingItem.id}" type="number" min="1" max="10">
                    <span class="save-quantity-link js-save-quantity-link-${matchingItem.id} link-primary">Save</span>
                </div>


                  <span class="delete-quantity-link link-primary js-delete-quantity" data-delete-id="${matchingItem.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      <sup>₹</sup>4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      <sup>₹</sup>9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `;
    
    document.querySelector(".js-order-summary")
        .innerHTML=cartSummaryHTML;
});

document.querySelectorAll(".js-delete-quantity")
    .forEach(button=>{
        button.addEventListener("click",()=>{
            const deleteId=button.dataset.deleteId;
            cart.forEach(cartItem => {
                if(deleteId === cartItem.productId){
                    if(cartItem.quantity > 1){
                        cartItem.quantity-=1; 
                        document.querySelector(".js-quantity-update")
                        .innerHTML=cartItem.quantity;
                    }
                    else{
                        removeFromCart(deleteId); 
                        document.querySelector(`.js-cart-item-container-${deleteId}`).remove();
                    }
                    totalItems();
                };                                              
            });
        });
    });
    totalItems();
  
document.querySelectorAll(".js-update-quantity")
    .forEach(button=>{
        button.addEventListener("click",()=>{
            const updateId=button.dataset.deleteId;
            const containerUpdate = document.querySelector(
              `.js-quantity-link-div-${updateId}`
            );
            const containerEdit = document.querySelector(
              `.js-quantity-edit-div-${updateId}`
            );

            containerUpdate.classList.add("hide");
            containerEdit.classList.add("show");

            document.querySelector(`.js-save-quantity-link-${updateId}`)
              .addEventListener('click', (x)=>{
                let inputValue=Number(document.querySelector(`.js-quantity-input-${updateId}`).value);
                updateCartQuantity(updateId,inputValue);
                console.log(cart);
                containerEdit.classList.remove("show");
                containerEdit.classList.add("hide");
                containerUpdate.classList.remove("hide");
                containerUpdate.classList.add("show");
                document.querySelector(`.js-quantity-label-${updateId}`)
                  .innerHTML=inputValue;
                containerUpdate.classList.remove("show");
                containerEdit.classList.remove("hide");
              }); 
        });
    })
  