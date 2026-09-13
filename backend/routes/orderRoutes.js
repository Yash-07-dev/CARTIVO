const express = require("express");


const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');


const { createOrder, getOrders, getOrderById, updateOrderStatus, myOrders } = require('../controllers/orderControllers');

const router =  express.Router();   

router.route('/').post(protect, createOrder).get(protect, admin, getOrders);   // routes for admin to get all orders and for user to create order

router.route('/myorders').get(protect,myOrders);  // route for user to get his/her orders
router.route('/:id/status').get(protect, getOrderById).put(protect, admin, updateOrderStatus);   // route for admin to update order status and for user to get order by id

module.exports = router;