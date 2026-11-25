const express = require("express");
const Order = require("../models/Order");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// Naya order banana (sirf login user)
router.post("/", protect, async (req, res) => {
  try {
    const { orderItems, shippingAddress } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    // Price database se lete hain, frontend par bharosa nahi karte
    let totalPrice = 0;
    const items = [];

    for (const item of orderItems) {
      const product = await Product.findById(item._id);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product not found: ${item.name}` });
      }
      if (product.countInStock < item.qty) {
        return res
          .status(400)
          .json({ message: `Not enough stock for ${product.name}` });
      }

      items.push({
        product: product._id,
        name: product.name,
        price: product.price,
        qty: item.qty,
      });
      totalPrice += product.price * item.qty;
    }

    const order = await Order.create({
      user: req.user._id,
      orderItems: items,
      shippingAddress,
      totalPrice,
    });

    // Stock kam karna
    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { countInStock: -item.qty },
      });
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Apne orders dekhna
router.get("/myorders", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Saare orders dekhna (sirf admin)
router.get("/", protect, admin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Order ka status badalna (sirf admin)
router.put("/:id/status", protect, admin, async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Pending", "Shipped", "Delivered"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;