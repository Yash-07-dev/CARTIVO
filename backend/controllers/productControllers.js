const Product = require('../model/Product');
const cloudinary = require('../config/cloudinary');

const getProducts = async (req,res) => {

    try{
        const products = await Product.find({});
        res.json(products);
    }
    catch(error){
        res.status(500).json({message: 'Server error'});

    }
};


const  getProductById = async (req, res) => {

    try{
        const product = await Product.findById(req.params.id);
        if(product) {
            res.json(product);
        }
        else{
            res.status(404).json({message: 'Product not found'});

        }
        
    }
    catch(error) {
        res.status(500).json({message: 'Server error'});
    }
};

// const createProduct = async (req,res) => {
  
//     try{
    
//         const { name,description, price, category, stock} = req.body;
//     let imageUrl = '';
//     if (req.file) {
//         const result = await cloudinary.uploader.upload(req.file.path);
//         console.log(result);
//         imageUrl = result.secure_url;

//     }

//     const product = new Product({
//         name,
//         description,
//         price,
//         category,
//         stock,
//         imageUrl
//     });

//     const savedProduct = await product.save();
//     res.status(201).json(savedProduct);
// } catch (error) {
       
    
//     res.status(500).json({message: 'Server error'});
//    }

// };

const createProduct = async (req, res) => {

    try {

        const {
            name,
            description,
            price,
            category,
            stock
        } = req.body;

        let imageUrl = "";


        // Upload image to Cloudinary
        if (req.file) {

            const result = await cloudinary.uploader.upload(
                req.file.path
            );

            console.log(result);

            imageUrl = result.secure_url;
        }


        // Create product AFTER getting image URL
        const product = new Product({
            name,
            description,
            price,
            category,
            stock,
            imageUrl
        });


        // Save product
        const savedProduct = await product.save();


        res.status(201).json(savedProduct);

    } catch (error) {

        console.error("CREATE PRODUCT ERROR:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// const updateProduct = async (req, res) => {
//      try {
//         const { name,description,price,category,stock} = req.body;
//         const product = await Product.findById(req.params.id);

//         if(product) {
//             product.name = name || product.name;
//             product.description = description || product.description;
//             product.price = price || product.price;
//             product.category = category || product.category;
//             product.stock = stock || product.stock;

//             if(req.file) {
//                 const result = await cloudinary.uploader.upload(req.file.path);
//                 console.imageUrl = result.secure_url;
//                 res.json(updateProduct);
//             }
//             else {
//                 res.status(404).json({message: 'Product not found'});
//             }
//         }
//      }

//      catch (error) {

//         res.status(500).json({ message : 'server error'});
//      }
// };

const updateProduct = async (req, res) => {

    try {

        const {
            name,
            description,
            price,
            category,
            stock
        } = req.body;


        const product = await Product.findById(
            req.params.id
        );


        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }


        product.name = name || product.name;

        product.description =
            description || product.description;

        product.price =
            price || product.price;

        product.category =
            category || product.category;

        product.stock =
            stock ?? product.stock;


        // Update image
        if (req.file) {

            const result =
                await cloudinary.uploader.upload(
                    req.file.path
                );

            product.imageUrl =
                result.secure_url;
        }


        const updatedProduct =
            await product.save();


        res.status(200).json(updatedProduct);

    } catch (error) {

        console.error("UPDATE PRODUCT ERROR:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const deleteProduct = async (req, res) => {
    
    try{
        const product = await Product.findById(req.params.id);

        if(product) {
            await product.deleteOne();
            res.json({message: 'product removed'});
        }
        else {
            res.status(500).json({message: 'product not found'});
        }
    }

    catch (error) {
         res.status(500).json({message: 'server error'});
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};




// 2 : 00: 11