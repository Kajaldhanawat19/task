import React, { useState } from 'react';
import './PurchaseOrder.css'; // Import CSS file for styling

const PurchaseOrder = () => {
  const [items, setItems] = useState([]);
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const addItemToCart = () => {
    if (productName && quantity > 0 && price > 0) {
      const newItem = {
        productName,
        quantity,
        price
      };
      setItems([...items, newItem]);
      setCartTotal(cartTotal + quantity * price);
      // Reset fields
      setProductName('');
      setQuantity(1);
      setPrice(0);
    }
  };

  const removeItemFromCart = (index) => {
    const newItems = [...items];
    const removedItem = newItems.splice(index, 1);
    setItems(newItems);
    setCartTotal(cartTotal - removedItem[0].quantity * removedItem[0].price);
  };

  const createPurchaseOrder = () => {
    // Logic to create purchase order with items in the cart
    // Send data to backend API to create purchase order
    console.log('Purchase order created:', items);
  };

  return (
    <div className="purchase-order-container">
      <h2>Shopping Cart</h2>
      <div className="input-group">
        <input type="text" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
        <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
        <button onClick={addItemToCart}>Add to Cart</button>
      </div>
      <div className="cart-items">
        <h3>Cart Items</h3>
        <ul>
          {items.map((item, index) => (
            <li key={index} className="cart-item">
              <span>{item.productName} - Quantity: {item.quantity} - Price: ${item.price}</span>
              <button onClick={() => removeItemFromCart(index)}>Remove</button>
            </li>
          ))}
        </ul>
        <p>Total: ${cartTotal.toFixed(2)}</p>
        <button onClick={createPurchaseOrder}>Create Purchase Order</button>
      </div>
    </div>
  );
};

export default PurchaseOrder;
