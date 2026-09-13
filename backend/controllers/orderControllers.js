const Order = require('../model/Order');

const sendEmail = require('../utils/sendEmail');

// create a new order

const createOrder = async (req, res) => {
    try {
        const {
            items,
            totalAmount,
            address,
            paymentId
        } = req.body;

        // Validation
        if (!items || items.length === 0) {
            return res.status(400).json({
                message: "No order items"
            });
        }

        if (!totalAmount || !address || !paymentId) {
            return res.status(400).json({
                message: "Missing order information"
            });
        }

        // Create order
        const order = new Order({
            user: req.user._id,
            items,
            totalAmount,
            address,
            paymentId
        });

        await order.save();

        res.status(201).json({
            message: "Order created successfully",
            order
        });

    } catch (error) {
        console.error("CREATE ORDER ERROR:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

const myOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('items.productId', 'name price');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'name email').populate('items.productId', 'name price');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email').populate('items.productId', 'name price'); 
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);
        if (order) {
            order.status = status;
            await order.save();
            res.json({ message: 'Order status updated successfully', order });
        }
        else {
            res.status(404).json({ message: 'Order not found' });
        }


    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {

    createOrder,
    myOrders,
    getOrders,
    getOrderById,
    updateOrderStatus,
};


// 2:57:00 test all api in postman
