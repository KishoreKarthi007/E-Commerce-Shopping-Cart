import { cart, removeFromCart, totalItems, updateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { deliveryOptions } from "../data/deliveryOption.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";


//Function --> finding the overall shipping charges from the cart 
function shippingChargeFind() {
  let shippingCharge=0;
  cart.forEach(cartItem =>{
      deliveryOptions.forEach( deliveryItem =>{
        if(deliveryItem.deliveryId === cartItem.deliveryId)
            shippingCharge+=deliveryItem.deliveryPrice; 
      });  
  });
  return shippingCharge;
}

//Function --> finding the total quantities of all the items present in the cart
function totalItemPrice(){
let totalItemPrice=0;
cart.forEach((cartItem)=>{
const productId=cartItem.productId;
const productQuantity=cartItem.quantity;
let matchingItem;
products.forEach( productItem =>{
  if(productId === productItem.id)
      matchingItem=productItem;
});

totalItemPrice+=productQuantity*matchingItem.price;
});
return totalItemPrice;
}

//Function --> Order Summary Price Details
function orderSummary(totalItemPrice,shippingCharge){
  let totalBeforeTax=0;
  let totalTax=0;
  let totalAfterTax=0;
  totalBeforeTax=totalItemPrice+shippingCharge;
  totalTax=Number((totalBeforeTax*(1/100)).toFixed(2));
  totalAfterTax=totalBeforeTax + totalTax;
  document.querySelector(".js-total-items-price").innerHTML="₹"+totalItemPrice;
  document.querySelector(".js-total-shipping-price").innerHTML="₹"+shippingCharge;
  document.querySelector(".js-total-before-tax-price").innerHTML="₹"+totalBeforeTax;
  document.querySelector(".js-total-tax-price").innerHTML="₹"+totalTax;
  document.querySelector(".js-total-after-tax-price").innerHTML="₹"+totalAfterTax;
}

//Generating the Cart Summary HTML
let cartSummaryHTML=``;
cart.forEach((cartItem)=>{
    const productId=cartItem.productId;
    let matchingItem;

    products.forEach( productItem =>{
        if(productId === productItem.id)
            matchingItem=productItem;
    });
    
    cartSummaryHTML+= `
    <div class="cart-item-container js-cart-item-container-${matchingItem.id}" >
            <div class="delivery-date">
              Delivery date: <span class="js-delivery-date-${matchingItem.id}">Tuesday, June 21</span>
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
                ${deliveryHTML(cartItem,matchingItem.id)}
              </div>
            </div>
          </div>
    `;
    
    document.querySelector(".js-order-summary")
        .innerHTML=cartSummaryHTML;
});

//Generating the Delivery Options HTML
function deliveryHTML(cartItem,productId){  
  let deliveryHTML= ``;
  deliveryOptions.forEach((deliveryItem)=>{
    const today=dayjs();
    const deliveryDate=today.add(deliveryItem.deliveryDays,'days');
    const deliveryString=deliveryDate.format('dddd, MMMM DD');
    const deliveryPrice = (deliveryItem.deliveryPrice === 0) ?
                          "FREE" : deliveryItem.deliveryPrice;  
      
    const isChecked= (deliveryItem.deliveryId === cartItem.deliveryId) ? 1:0;
                      

    deliveryHTML+=
    `
      <div class="delivery-option">
            <input type="radio" ${isChecked ? 'checked':''}
              class="delivery-option-input"
              name="delivery-option-${productId}"
              value="${deliveryItem.deliveryId}"
              >
            <div>
              <div class="delivery-option-date js-delivery-string-${deliveryItem.deliveryId}">
                ${deliveryString}
              </div>
              <div class="delivery-option-price">
                <sup>₹</sup>${deliveryPrice} Shipping
              </div>
            </div>
          </div>
    `;
});

  return deliveryHTML;
}

//Interactive Delivery Options
cart.forEach(cartItem => {
  document.getElementsByName(`delivery-option-${cartItem.productId}`)
    .forEach(option =>{
      option.addEventListener('change',()=>{
        let deliveryString=document.querySelector(`.js-delivery-string-${cartItem.deliveryId}`).innerText;
        document.querySelector(`.js-delivery-date-${cartItem.productId}`).innerText=deliveryString;
        cartItem.deliveryId=option.value;
        orderSummary(totalItemPrice(),shippingChargeFind());
        
      });  
  });
});

//Interactive Delete Link Cart Summary
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
                    orderSummary(totalItemPrice(),shippingChargeFind());
                };                                              
            });
        });
    });

//Interactive Update Link Cart Summary
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
                containerEdit.classList.remove("show");
                containerEdit.classList.add("hide");
                containerUpdate.classList.remove("hide");
                containerUpdate.classList.add("show");
                document.querySelector(`.js-quantity-label-${updateId}`)
                  .innerHTML=inputValue;
                containerUpdate.classList.remove("show");
                containerEdit.classList.remove("hide");
                orderSummary(totalItemPrice(),shippingChargeFind());
              }); 
        });
});

totalItems();
orderSummary(totalItemPrice(),0);




