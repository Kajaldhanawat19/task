import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css'; // Import CSS file for styling

const Dashboard = () => {
  // State variables
  const [customerDetails, setCustomerDetails] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [shippingDetails, setShippingDetails] = useState([]);
  const [filteredPurchaseOrders, setFilteredPurchaseOrders] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [showOrderHistory, setShowOrderHistory] = useState(false);

  // Fetch data from backend on component mount
  useEffect(() => {
    fetchCustomerDetails();
    fetchPurchaseOrders();
    fetchShippingDetails();
  }, []);

  // Functions to fetch data from backend
  const fetchCustomerDetails = async () => {
    try {
      const response = await axios.get('/api/customer-details');
      setCustomerDetails(response.data);
    } catch (error) {
      console.error('Error fetching customer details:', error);
    }
  };

  const fetchPurchaseOrders = async () => {
    try {
      const response = await axios.get('/api/purchase-orders');
      setPurchaseOrders(response.data);
    } catch (error) {
      console.error('Error fetching purchase orders:', error);
    }
  };

  const fetchShippingDetails = async () => {
    try {
      const response = await axios.get('/api/shipping-details');
      setShippingDetails(response.data);
    } catch (error) {
      console.error('Error fetching shipping details:', error);
    }
  };

  // Function to filter purchase orders by city
  const filterPurchaseOrdersByCity = () => {
    if (selectedCity) {
      const filteredOrders = purchaseOrders.filter(order => {
        const customer = customerDetails.find(customer => customer.id === order.customerId);
        return customer.city === selectedCity;
      });
      setFilteredPurchaseOrders(filteredOrders);
    } else {
      setFilteredPurchaseOrders([]);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="section">
        <h2 className="section-title">All Customer Details</h2>
        <ul className="list-container">
          {customerDetails.map(customer => (
            <li key={customer.id} className="list-item">
              {customer.name} - {customer.email} - {customer.mobileNumber} - {customer.city}
            </li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2 className="section-title">All Purchase Orders</h2>
        <ul className="list-container">
          {purchaseOrders.map(order => (
            <li key={order.id} className="list-item">
              {order.productName} - Quantity: {order.quantity} - Price: {order.price} - Customer ID: {order.customerId}
            </li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2 className="section-title">All Shipping Details</h2>
        <ul className="list-container">
          {shippingDetails.map(detail => (
            <li key={detail.id} className="list-item">
              {detail.address} - {detail.city} - {detail.pincode} - Purchase Order ID: {detail.purchaseOrderId} - Customer ID: {detail.customerId}
            </li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2 className="section-title">Filter Purchase Orders by City</h2>
        <div className="filter-container">
          <select className="filter-select" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
            <option value="">Select City</option>
            {customerDetails.map(customer => (
              <option key={customer.id} value={customer.city}>{customer.city}</option>
            ))}
          </select>
          <button className="filter-button" onClick={filterPurchaseOrdersByCity}>Filter</button>
        </div>
        {filteredPurchaseOrders.length > 0 && (
          <ul className="list-container">
            {filteredPurchaseOrders.map(order => (
              <li key={order.id} className="list-item">
                {order.productName} - Quantity: {order.quantity} - Price: {order.price} - Customer ID: {order.customerId}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="section">
        <h2 className="section-title">Show Customer Order History</h2>
        <button className={`order-history-button ${showOrderHistory ? 'show-hide-button' : ''}`} onClick={() => setShowOrderHistory(!showOrderHistory)}>
          {showOrderHistory ? 'Hide Order History' : 'Show Order History'}
        </button>
        {showOrderHistory && (
          <ul className="list-container">
            {/* Logic to display customer order history */}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;