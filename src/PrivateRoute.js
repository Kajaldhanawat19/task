import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import PurchaseOrder from './Components/PurchaseOrder';
import ShippingDetailsManagement from './Components/ShippingDetailsManagement';
import Login from './Components/Login';
import PrivateRoute from './PrivateRoute';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <PrivateRoute path="/" element={<Dashboard />} isLoggedIn={isLoggedIn} />
          <PrivateRoute path="/purchase-order" element={<PurchaseOrder />} isLoggedIn={isLoggedIn} />
          <PrivateRoute path="/shipping-details" element={<ShippingDetailsManagement />} isLoggedIn={isLoggedIn} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
