import React, { useState } from 'react';
import { BrowserRouter as BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import PurchaseOrder from './Components/PurchaseOrder';
import ShippingDetailsManagement from './Components/ShippingDetailsManagement';
import Login from './Components/Login';
import PrivateRoute from './PrivateRoute';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

          {/* Private Routes */}
          <Route path="/" element={<Dashboard />} isLoggedIn={isLoggedIn} />
          <Route path="/purchase-order" element={<PurchaseOrder />} isLoggedIn={isLoggedIn} />
          <Route path="/shipping-details" element={<ShippingDetailsManagement />} isLoggedIn={isLoggedIn} />

          {/* Add more private routes as needed */}

          {/* Catch all unmatched routes */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
