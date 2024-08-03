import User from '../models/user.model.js';
import Product from '../models/product.model.js';


//getUserById
export const getUserById = async (req,res) => {
  const {userId} = req.params;
  
  try {
    const user = await User.findById(userId).select("-password");

    if(!user){
      res.status(404).json({message:"User not found.!"});
    }

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({message : error})
    console.log(error.mesage);
  }
}


//getUserById
export const updateUserById = async (req,res) => {
  
  const updateData = req.body;

  try {

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, { new: true, runValidators: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Exclude password from the response
    const { password, ...userWithoutPassword } = updatedUser.toObject();
    
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

// Add product to wishlist
export const addToWishlist = async (req, res) => {
  const { productId } = req.body;

  try {
    const user = await User.findById(req.user._id);
    const product = await Product.findById(productId);

    if (!user || !product) {
      return res.status(404).json({ message: 'User or Product not found' });
    }

    if (user.wishlist.includes(productId)) {
      return res.status(200).json({ message: 'Product already in wishlist' });
    }

    user.wishlist.push(productId);
    await user.save();

    res.status(200).json({ message: 'Product added to wishlist' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get user's wishlist
export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove product from wishlist
export const removeFromWishlist = async (req, res) => {
  const { productId } = req.params;

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
    await user.save();

    res.status(200).json({ message: 'Product removed from wishlist' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
