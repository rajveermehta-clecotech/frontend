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
import ProfileCompletion from "./pages/profile/ProfileCompletion";
import Settings from "./pages/settings/Settings";
import NotFound from "./pages/NotFound";

import "./index.css";
import Products from "./pages/products/Products";
import GridDebugTest from "./pages/GridDebugTest";
import ToastProvider from "./components/providers/ToastProvider";
import ProductForm from "./pages/products/ProductForm";

function App() {
  return (
    <>
      <CssBaseline />
      <ErrorBoundary>
        <AuthProvider>
          <Router>
          <ToastProvider>

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
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/products/new" element={<ProductForm />} />
                      <Route path="/products/:id/edit" element={<ProductForm />} />
                      <Route path="/test" element={<GridDebugTest/>}/>

                      {/* Default Route */}
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />

                      {/* 404 Page */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </DashboardLayoutWrapper>
                // </ProtectedRoute> 
              } />
            </Routes>
            </ToastProvider>

          </Router>
        </AuthProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;