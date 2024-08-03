import express from 'express';
import { addToWishlist, getUserById, getWishlist, removeFromWishlist, updateUserById } from '../controllers/user.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/wishlist', protectRoute, addToWishlist);
router.get('/wishlist', protectRoute, getWishlist);
router.delete('/wishlist/:productId', protectRoute, removeFromWishlist);
router.get('/:userId', protectRoute, getUserById);
router.put('/:userId', protectRoute, updateUserById);

export default router;
