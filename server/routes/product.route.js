import express from 'express';;

import  { getProducts, getProductById, createProduct, updateProduct, getProductsByGender, SearchProducts } from '../controllers/product.controller.js';
import  { protectRoute, admin } from '../middleware/protectRoute.js';
const router = express.Router();

router.get('/', getProducts)
router.post('/',protectRoute, createProduct);
router.get('/category',getProductsByGender);
router.get('/search',SearchProducts);
router.get('/:id',getProductById)
router.put('/:id',protectRoute, admin, updateProduct);


export default router;
