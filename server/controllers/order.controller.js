const Order = require('../models/Order.model');
const Product = require('../models/Product.model');
const User = require('../models/User.model');

/**
 * POST /api/orders
 * Create a new order from cart items.
 * Body: { items: [{ product, quantity, price }], deliveryAddress, paymentMethod }
 */
exports.createOrder = async (req, res) => {
  try {
    const { items, deliveryAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No items in order' });
    }

    // Calculate totals
    const orderItems = items.map(item => ({
      product: item.product,
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity
    }));

    const subtotal = orderItems.reduce((sum, item) => sum + item.total, 0);
    const deliveryFee = 40;
    const total = subtotal + deliveryFee;

    // Get seller from first product
    const firstProduct = await Product.findById(items[0].product);
    const sellerId = firstProduct ? firstProduct.seller : req.user._id;

    const order = new Order({
      buyer: req.user._id,
      seller: sellerId,
      items: orderItems,
      subtotal,
      deliveryFee,
      total,
      deliveryAddress: deliveryAddress || {},
      paymentMethod: paymentMethod || 'cod',
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'pending',
      status: 'confirmed'
    });

    await order.save();

    // Populate for response
    await order.populate('buyer', 'name phone customID');
    await order.populate('seller', 'name phone customID');
    await order.populate('items.product', 'name price unit images');

    // Decrease product stock
    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { quantity: -item.quantity }
      });
    }

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order,
      receipt: {
        orderNumber: order.orderNumber,
        buyer: {
          name: order.buyer.name,
          phone: order.buyer.phone,
          customID: order.buyer.customID
        },
        seller: {
          name: order.seller.name,
          phone: order.seller.phone,
          customID: order.seller.customID
        },
        items: order.items,
        subtotal: order.subtotal,
        deliveryFee: order.deliveryFee,
        total: order.total,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        status: order.status,
        createdAt: order.createdAt
      }
    });
  } catch (error) {
    console.error('❌ Create order error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

/**
 * GET /api/orders
 * Get orders for the current user (as buyer or seller).
 */
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ buyer: req.user._id }, { seller: req.user._id }]
    })
      .populate('buyer', 'name phone customID')
      .populate('seller', 'name phone customID')
      .populate('items.product', 'name price unit images')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

/**
 * GET /api/orders/:id
 */
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('buyer', 'name phone customID')
      .populate('seller', 'name phone customID')
      .populate('items.product', 'name price unit images');

    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

/**
 * PUT /api/orders/:id/status
 */
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('buyer', 'name phone customID')
      .populate('seller', 'name phone customID')
      .populate('items.product');

    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
