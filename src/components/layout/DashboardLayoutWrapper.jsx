// src/components/layout/DashboardLayoutWrapper.jsx
import React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Container } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { createTheme } from '@mui/material/styles';
import {
  Dashboard as DashboardIcon,
  Inventory as ProductsIcon,
  Settings as SettingsIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";

const NAVIGATION = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "products",
    title: "Products",
    icon: <ProductsIcon />,
    children: [
      {
        segment: "",
        title: "All Products",
      },
      {
        segment: "new",
        title: "Add Product",
        icon: <AddIcon />,
      },
    ],
  },
  {
    segment: "settings",
    title: "Settings",
    icon: <SettingsIcon />,
  },
];

// Custom theme for the dashboard
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Custom router implementation for React Router
function useToolpadRouter() {
  const navigate = useNavigate();
  const location = useLocation();

  return React.useMemo(() => {
    return {
      pathname: location.pathname,
      searchParams: new URLSearchParams(location.search),
      navigate: (url) => {
        if (typeof url === "string") {
          navigate(url);
        } else {
          // Handle navigation with search params
          const path = url.pathname || location.pathname;
          const search = url.searchParams
            ? `?${url.searchParams.toString()}`
            : "";
          navigate(`${path}${search}`);
        }
      },
    };
  }, [navigate, location]);
}

const DashboardLayoutWrapper = ({ children }) => {
  const { user, logout } = useAuth();
  const router = useToolpadRouter();
  const navigate = useNavigate();

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Handle sign in
  const handleSignIn = () => {
    navigate("/login");
  };

  // User session for the dashboard - this controls the avatar display
  const session = React.useMemo(() => {
    if (!user) return null;

    return {
      user: {
        name: user.name || user.displayName || "User",
        email: user.email || "",
        image: user.avatar ||
          user.photoURL ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user.name || user.displayName || "User"
          )}&background=2196f3&color=fff&size=128`,
      },
    };
  }, [user]);

  // Authentication object - this controls the sign in/out functionality
  const authentication = React.useMemo(() => {
    return {
      signIn: handleSignIn,
      signOut: handleSignOut,
    };
  }, []);

  // Branding configuration
  const branding = {
    logo: (
      <div
        style={{
          width: 32,
          height: 32,
          backgroundColor: "#2196f3",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: 600,
          fontSize: "1.1rem",
        }}
      >
        M
      </div>
    ),
    title: "MarketPlace",
    homeUrl: "/dashboard",
  };

  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={branding}
      router={router}
      session={session}
      authentication={authentication}
      theme={demoTheme}
    >
      <DashboardLayout>
        <Container maxWidth="xl" sx={{ py: 2 }}>
          {children}
        </Container>
      </DashboardLayout>
    </AppProvider>
  );
};

export default DashboardLayoutWrapper;