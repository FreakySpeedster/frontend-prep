import { useCart } from './CartContext';

export default function ShoppingCart() {
    const {cart, addItem, removeItem, clearCart} = useCart();
    console.log(cart);
    return (
        <div>
            {cart.length === 0 && <span>No items added</span>}
            {cart.map((cartItem) => (
                <div key={cartItem.id}> 
                    <span>{cartItem.name}</span>
                    <span>{cartItem.price}</span>
                    <span style={{paddingLeft: '10px'}}>{cartItem.quantity}</span>
                    <button onClick={() => removeItem(cartItem.id)}>Remove</button>
                </div>
            ))}
            <button onClick={clearCart}>Clear All</button>
            <button onClick={() => addItem({id: 1, name: 'Watch', price: 'Rs. 5000', quantity: 1})}>Add New Item</button>
        </div>
    );
}

// 1. Create a component for listing out Ecommerce page
// 2. For each ecommerce item render an add to cart button.
// 3. On clicking add button, add item to shopping cart.
// 4. Create shopping cart component, show name, quantity and remove button.