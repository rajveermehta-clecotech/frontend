// src/components/layout/DashboardLayoutWrapper.jsx
import React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Dashboard as DashboardIcon,
  Inventory as ProductsIcon,
  Person as ProfileIcon,
  Settings as SettingsIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import { getInitials } from "../../utils/common";

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
    segment: "profile",
    title: "Profile",
    icon: <ProfileIcon />,
  },
  {
    segment: "settings",
    title: "Settings",
    icon: <SettingsIcon />,
  },
];

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

  // User session for the dashboard
  const session = React.useMemo(() => {
    if (!user) return null;

    return {
      user: {
        name: user.name || "User",
        email: user.email || "",
        image:
          user.avatar ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=2196f3&color=fff`,
      },
    };
  }, [user]);

  // Authentication object
  const authentication = React.useMemo(() => {
    if (!session) return undefined;

    return {
      signIn: () => {
        navigate("/login");
      },
      signOut: handleSignOut,
    };
  }, [session, navigate]);

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
    >
      <DashboardLayout>
        <Box sx={{ width: "100%", maxWidth: "100%" }}>{children}</Box>
      </DashboardLayout>
    </AppProvider>
  );
};

export default DashboardLayoutWrapper;
