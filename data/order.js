import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

// Load Data from Local Storage
let order = JSON.parse(localStorage.getItem("order"));

// Default order array if localStorage is empty
if (!order) {
    order = [
        {
            orderId: "27cba69d-4c3d-4098-b42d-ac7fa62b7664",
            orderDetails: [
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    deliveryId: "1",
                    quantity: 3,
                    orderArrivalDate: "August 15",
                },
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    deliveryId: "3",
                    quantity: 3,
                    orderArrivalDate: "August 12",
                },
            ],
            totalPrice: 21159.5,
            orderPlacedDate: "August 12",
        }
    ];
}

// Save Data to Local Storage
function saveToStorage(data) {
    try {
        localStorage.setItem("order", JSON.stringify(data, replacer));
    } catch (error) {
        console.error("Error saving to localStorage:", error);
    }
}

// Custom Replacer for JSON.stringify to handle special objects
function replacer(key, value) {
    if (value && typeof value === "object" && value.constructor.name === "Dayjs") {
        return value.format("MMMM DD, YYYY"); // Format dayjs objects
    }
    return value;
}

// Add a New Order to the Order Array
function addToOrder(productPush, totalPrice) {
    order.push({
        orderId: crypto.randomUUID(), // Generate unique ID
        orderDetails: productPush, // Use provided product details
        totalPrice: totalPrice,
        orderPlacedDate: dayjs().format("dddd, MMMM DD"), // Current date
    });

    saveToStorage(order); // Save updated order to localStorage
}



// Export order array and function
export { order, addToOrder };
