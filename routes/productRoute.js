const express = require('express');
const { 
    createProduct, 
    getSingleProduct, 
    getAllProduct,
    updateProduct,
    deleteProduct
} = require('../controller/productController');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../auth/auth');

router.route('/product').post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);
router.route('/product/:id').get(getSingleProduct);
router.route('/getallproduct').get(getAllProduct);
router.route('/product/:id')
                            .put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct)
                            .delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct)

module.exports = router;