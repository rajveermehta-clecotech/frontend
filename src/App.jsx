// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { AuthProvider } from "./context/AuthContext";
// import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/error/ErrorBoundary";

// Import the new DashboardLayout instead of MainLayout
import DashboardLayoutWrapper from "./components/layout/DashboardLayoutWrapper";

// Updated import paths for theme-aware auth pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/profile/Profile";
import ProfileCompletion from "./pages/profile/ProfileCompletion";
import Settings from "./pages/settings/Settings";
import NotFound from "./pages/NotFound";

import "./index.css";
import Products from "./pages/products/Products";
import AddProduct from "./pages/products/AddProduct";
import ProductDetails from "./pages/products/ProductDetails";

function App() {
  return (
    <>
      <CssBaseline />
      <ErrorBoundary>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Public Routes - No Layout */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile-completion" element={<ProfileCompletion />} />

              {/* Protected Routes - With DashboardLayout */}
              <Route path="/*" element={
                // <ProtectedRoute>
                  <DashboardLayoutWrapper>
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/products/new" element={<AddProduct />} />
                      <Route path="/products/:id" element={<ProductDetails />} />
                      <Route path="/products/:id/edit" element={<ProductDetails />} />

                      {/* Default Route */}
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />

                      {/* 404 Page */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </DashboardLayoutWrapper>
                // </ProtectedRoute> 
              } />
            </Routes>
          </Router>
        </AuthProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;