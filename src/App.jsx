import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import InvoiceForm from './pages/invoiceForm';
import PrintContent from './pages/printContent';
import Login from './pages/auth';
import './app.css';

const isAuthenticated = () => {
  
  const cookie = document.cookie.split('; ').find(row => row.startsWith('authToken='));
  return cookie ? true : false;
};

const Protected = () => {
  return isAuthenticated() ? <InvoiceForm /> : <Navigate to="/auth" />;
};

const AuthRoute = () => {
  return isAuthenticated() ? <Navigate to="/" /> : <Login />;
};

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Protected routes */}
        <Route path="/" element={<Protected />} />
        <Route path="/print-invoice" element={<PrintContent />} />

        {/* Authentication route */}
        <Route path="/auth" element={<AuthRoute />} />
      </Routes>
    </Router>
  );
}
