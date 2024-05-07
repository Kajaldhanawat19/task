import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CustomerManagement.css'; // Import CSS file for styling

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Fetch customers from backend
    const fetchCustomers = async () => {
      const response = await axios.get('/api/customers');
      setCustomers(response.data);
    };
    fetchCustomers();
  }, []);

  return (
    <div className="customer-management-container">
      <h2>Customer Management</h2>
      <table className="customer-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.mobileNumber}</td>
              <td>{customer.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerManagement;
