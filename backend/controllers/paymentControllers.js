const razorpay = require("razorpay");
const crypto = require("crypto");
dotenv = require("dotenv");
dotenv.config();



const createdOrder = async (req, res) => {
    try {
        const instance = new razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const options = {
            amount: req.body.amount * 100, // amount in the smallest currency unit
            currency: "INR",
            receipt: `receipt_order_${Math.random() * 1000}`,
        };

        const order = await instance.orders.create(options);
        res.status(201).json(order);
    }
    catch (error) {
        console.error("CREATE ORDER ERROR:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const shasum = crypto.createHash("sha256");
        shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const digest = shasum.digest("hex");

        if (digest === razorpay_signature) {
            res.status(200).json({ message: "Payment verified successfully" });
        } else {
            res.status(400).json({ message: "Invalid signature" });
        }
    } catch (error) {
        console.error("VERIFY PAYMENT ERROR:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { createdOrder, verifyPayment };
