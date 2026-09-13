const mongoose = require('mongoose');

const productSchema = new mongoose.Schema ({

    name: { type:String, required:true},
    description: {type: String,required: true},
    price: {type: Number,required: true},
    category: {type: String,required: true},
    stock: {type: Number,required: true},  //type: SVGAnimatedNumber,
    images:[{ type: String}],
    createdAT: {type: Date, default: 0},
    rating: {type: Number, default: 0},
     numReviews: {type: Number, default: 0}
});

const Product = mongoose.model('Product' , productSchema);


module.exports = Product;