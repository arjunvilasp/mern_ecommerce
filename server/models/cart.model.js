import mongoose from 'mongoose';

const { Schema } = mongoose;

const cartItemSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
        min: 1
    },
    price: {
        type: Number,
        required: true
    }
}, { _id: false });

const cartSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [cartItemSchema],
    total: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

cartSchema.methods.calculateTotal = function() {
    this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return this.total;
};

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
