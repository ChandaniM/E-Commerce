let productService = require("../services/productService")
// get all this list only for customer
const  getAllProduct = async(req,res)=>{
    try{
        let response = await productService.getAllProductList();
        res.status(200).send(response);
    }catch{
        res.status(500).send(error);

    }
}
//  this should be done by only customer
const addToCartController  = async (req,res)=>{
    try {
        let data = req.body;
        let response = await productService.addToCart(data);
        res.status(200).send(response);

    } catch (error) {
        res.status(500).send(error);
    }
}
// this should be done by only vendor or admin
const addProductController = async (req,res)=>{
    try {
        let data = req.body;
        let response = await productService.addProduct(data);
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Add to wishlist item
const addToWishlistController = async (req,res)=>{
    try {
        let data  = req.body;
        console.log(data , 'this is for addToWishlistController');
        let response = await productService.addToWishlist(data);
        console.log(response , 'this is wishlist resposne ');
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error);
    }
}
module.exports = {
    getAllProduct,
    addProductController,
    addToCartController,
    addToWishlistController
}