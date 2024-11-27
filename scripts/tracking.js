import { cart } from "../data/cart.js";
import {order,addToOrder} from "../data/order.js";
import { products } from "../data/products.js";


const orderId = localStorage.getItem('trackingOrderId');
const productId = localStorage.getItem('trackingProductId');

//Generating the Tracking Product HTML
let trackingProductHtml='';
let matchingOrder,matchingProduct,matchingOrderDetails;
order.forEach(orderItem => {
        if(orderItem.orderId === orderId)
            matchingOrder=orderItem;
});
products.forEach(productItem =>{
    if(productItem.id === productId)
            matchingProduct=productItem;
});
matchingOrder.orderDetails.forEach(orderProductItem =>{
    if(orderProductItem.productId === productId)
        matchingOrderDetails=orderProductItem;
});
    
trackingProductHtml=`
        <div class="order-tracking">
            <a class="back-to-orders-link link-primary" href="orders.html">
            View all orders
            </a>

            <div class="delivery-date">
            Arriving on ${matchingOrderDetails.orderArrivalDate}
            </div>

            <div class="product-info">
            ${matchingProduct.name}
            </div>

            <div class="product-info">
            Quantity: ${matchingOrderDetails.quantity}
            </div>

            <img class="product-image" src="${matchingProduct.image}">

            <div class="progress-labels-container">
            <div class="progress-label">
                Preparing
            </div>
            <div class="progress-label current-status">
                Shipped
            </div>
            <div class="progress-label">
                Delivered
            </div>
            </div>

            <div class="progress-bar-container">
            <div class="progress-bar"></div>
            </div>
        </div>

`;

document.querySelector(".js-tracking-product")
    .innerHTML=trackingProductHtml;