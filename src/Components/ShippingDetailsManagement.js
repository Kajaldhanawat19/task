import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ShippingDetailManagement.css'; // Import CSS file for styling

const ShippingDetailsManagement = () => {
  const [shippingDetails, setShippingDetails] = useState([]);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');

  useEffect(() => {
    // Fetch shipping details from backend
    fetchShippingDetails();
  }, []);

  const fetchShippingDetails = async () => {
    try {
      const response = await axios.get('/api/shipping-details');
      setShippingDetails(response.data);
    } catch (error) {
      console.error('Error fetching shipping details:', error);
    }
  };

  const addShippingDetails = async () => {
    try {
      const newShippingDetails = { address, city, pincode };
      const response = await axios.post('/api/shipping-details', newShippingDetails);
      setShippingDetails([...shippingDetails, response.data]);
      setAddress('');
      setCity('');
      setPincode('');
    } catch (error) {
      console.error('Error adding shipping details:', error);
    }
  };

  const deleteShippingDetails = async (id) => {
    try {
      await axios.delete(`/api/shipping-details/${id}`);
      setShippingDetails(shippingDetails.filter(detail => detail.id !== id));
    } catch (error) {
      console.error('Error deleting shipping details:', error);
    }
  };

  return (
    <div className="shipping-details-container">
      <h2>Shipping Details Management</h2>
      <div className="input-group">
        <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
        <input type="text" placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} />
        <button onClick={addShippingDetails}>Add Shipping Details</button>
      </div>
      <div>
        <h3>Shipping Details List</h3>
        <ul className="shipping-details-list">
          {shippingDetails.map((detail) => (
            <li key={detail.id} className="shipping-details-item">
              {detail.address}, {detail.city}, {detail.pincode}
              <button onClick={() => deleteShippingDetails(detail.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShippingDetailsManagement;