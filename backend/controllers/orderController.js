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

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "username email");
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// @route   GET /api/orders/:id (Admin Specific Order Details)

export const getOrderById = async (req, res) => {
  try {
    // Populate user field and product details within orderItems
    const order = await Order.findById(req.params.id)
      .populate("user", "username email")
      .populate("orderItems.product", "name price imageUrl"); // Populate product details for each item

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "Invalid Order ID" });
    }
    res.status(500).send("Server error");
  }
};

export const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "order not found" });
    }
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "Invalid Order ID" });
    }
    res.status(500).send("Server error");
  }
};
export const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "Invalid Order ID" });
    }
    res.status(500).send("Server error");
  }
};
