const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const  connectDB = require("./config/db");
const userRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

// app.set("view engine","ejs");

// app.set(express.static())



dotenv.config();
connectDB();

const app = express();

app.get("/", (req,res) => {
    res.send("shopnest backend working");
});

app.use(cors({
    // The root dev script starts the React app on port 3001.
    origin:[
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://localhost:3001',
        'http://127.0.0.1:3001'
    ],
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/auth", userRoutes);
app.use("/api/products",productRoutes );
app.use("/api/orders",orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/analytics",analyticsRoutes);





const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`server is running ${PORT}`);
});

//4:00:00
