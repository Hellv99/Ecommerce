import Order from "../model/orderModel.js";
import Product from "../model/productModel.js";

export const addOrderItems = async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ message: "No order items" });
  } else {
    try {
      const userId = req.user.id; // From the JWT payload via auth middleware

      const order = new Order({
        user: userId,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
};

// @route   GET /api/orders/myorders
// @desc    Get logged in user orders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate(
      "user",
      "username email"
    );
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
