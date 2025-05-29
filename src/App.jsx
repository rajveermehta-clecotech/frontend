// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/error/ErrorBoundary";

// Import the new MainLayout instead of AppLayout
import MainLayout from "./components/layout/MainLayout";

// Update these import paths to match your actual file structure
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/profile/Profile";
import ProfileCompletion from "./pages/profile/ProfileCompletion";
import Settings from "./pages/settings/Settings";
import NotFound from "./pages/NotFound";

import theme from "./theme";
import "./index.css";
import Products from "./pages/products/Products";
// import AddProduct from "./pages/products/AddProduct";
// import ProductDetails from "./pages/products/ProductDetails";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Public Routes - No Layout */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile-completion" element={<ProfileCompletion />} />

              {/* Protected Routes - With MainLayout */}
              <Route path="/*" element={
                // <ProtectedRoute>
                  <MainLayout>
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/products" element={<Products />} />
                       <Route path="/profile" element={<Profile />} />
                       <Route path="/settings" element={<Settings />} />
                      {/* <Route path="/profile" element={<Profile />} />
                      <Route path="/products/new" element={<AddProduct />} />
                      <Route path="/products/:id" element={<ProductDetails />} />
                      <Route path="/products/:id/edit" element={<ProductDetails />} />
                       */}
                      
                      {/* Default Route */}
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      
                      {/* 404 Page */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </MainLayout>
                // </ProtectedRoute>
              } />
            </Routes>
          </Router>
        </AuthProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;