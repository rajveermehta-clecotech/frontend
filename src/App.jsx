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
import AddProduct from "./pages/products/AddProduct";
import ProductDetails from "./pages/products/ProductDetails";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  // <ProtectedRoute>
                  <Dashboard />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  // <ProtectedRoute>
                  <Profile />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/profile-completion"
                element={
                  // <ProtectedRoute>
                  <ProfileCompletion />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/products"
                element={
                  // <ProtectedRoute>
                  <Products />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/products/new"
                element={
                  // <ProtectedRoute>
                  <AddProduct />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/products/:id"
                element={
                  // <ProtectedRoute>
                  <ProductDetails />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/products/:id/edit"
                element={
                  // <ProtectedRoute>
                  <ProductDetails />
                  // </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  // <ProtectedRoute>
                  <Settings />
                  // </ProtectedRoute>
                }
              />

              {/* Default Route */}
              <Route path="/" element={<Navigate to="/login" replace />} />

              {/* 404 Page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </AuthProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;