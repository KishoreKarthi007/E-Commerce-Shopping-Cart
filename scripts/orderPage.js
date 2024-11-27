import { cart, removeFromCart, totalItems, updateCartQuantity,emptyCart } from "../data/cart.js";
import {order,addToOrder} from "../data/order.js";
import { products } from "../data/products.js";

//Generating the Order Container HTML
let orderContainerHTML=``;
order.forEach((orderItem)=>{

    orderContainerHTML+= `
    <div class="order-container">
        <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${orderItem.orderPlacedDate}</div>
              </div>
                <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div><sup>₹</sup>${orderItem.totalPrice}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${orderItem.orderId}</div>
            </div>
        </div>
        <div class="order-details-grid">
    `;

    orderItem.orderDetails.forEach(orderProduct =>{
        let orderProductHtml='';
        let matchingItem;

        products.forEach( productItem =>{
            if(productItem.id === orderProduct.productId)
                matchingItem=productItem;  
        });
        
        orderProductHtml=`
            <div class="product-image-container">
              <img src="${matchingItem.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingItem.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${orderProduct.orderArrivalDate}
              </div>
              <div class="product-quantity">
                Quantity: ${orderProduct.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary js-track-package" data-order-id="${orderItem.orderId}" data-product-id="${matchingItem.id}">
                  Track package
                </button>
              </a>
            </div>
        `

        orderContainerHTML+=orderProductHtml
    });
    orderContainerHTML+= `
        </div>
    </div>
    `
});
document.querySelector(".js-orders-html")
.innerHTML=orderContainerHTML;

//Interactive Tracking Button
document.querySelectorAll(".js-track-package")
  .forEach(button => {
      button.addEventListener('click',()=>{
        const productId=button.dataset.productId;
        const orderId=button.dataset.orderId;
        localStorage.setItem('trackingOrderId', orderId);
        localStorage.setItem('trackingProductId', productId);
      });        
  });

