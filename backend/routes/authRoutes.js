const express = require("express");
const router =  express.Router();

const {registerUser,loginUser,getUsers} = require("../controllers/authControllers");

const {protect} = require('../middleware/authMiddleware');
const {admin} = require('../middleware/adminMiddleware');


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/user", protect ,admin, getUsers);


// homework create verify email by otp

// router.post("verify-email", async (req, res) => {
//     const { email } = req.body;
    





module.exports = router;