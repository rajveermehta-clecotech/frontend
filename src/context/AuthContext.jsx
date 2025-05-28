// src/context/AuthContext.jsx
import { createContext, useContext, useReducer, useEffect } from "react";
import api from "../services/api/authApi";

// Initial state
const initialState = {
  isAuthenticated: false,
  profileCompletionRequired: false,
  user: null,
  loading: true, // Start with loading true to prevent flicker
  error: null,
};

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case "AUTH_INIT":
      return { ...state, loading: true };
    case "AUTH_CHECKED":
      return { ...state, loading: false, isAuthenticated: false };
    case "LOGIN_REQUEST":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };
    case "SIGNUP_REQUEST":
      return { ...state, loading: true, error: null };
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null,
      };
    case "SIGNUP_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "LOGOUT":
      return { ...initialState, loading: false };
    case "UPDATE_PROFILE_SUCCESS":
      return {
        ...state,
        user: action.payload,
      };
    case "UPDATE_PROFILE_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    case "SET_PROFILE_COMPLETION_REQUIRED":
      return {
        ...state,
        profileCompletionRequired: action.payload,
      };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check localStorage for saved auth token on initial load
  useEffect(() => {
    const checkAuth = async () => {
      dispatch({ type: "AUTH_INIT" });
      const token = localStorage.getItem("token");

      if (token) {
        try {
          await loadUserData();
        } catch (error) {
          console.error("Failed to load user data:", error);
          // Mark authentication as checked but failed
          dispatch({ type: "AUTH_CHECKED" });
        }
      } else {
        // No token found, mark authentication as checked
        dispatch({ type: "AUTH_CHECKED" });
      }
    };

    checkAuth();
  }, []);

  // Function to load user data from token
  const loadUserData = async () => {
    try {
      const response = await api.get("/auth/me");

      if (response.data.status === "success") {
        const user = response.data.data.user;

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: user,
        });

        // Check if profile completion is required for vendors
        if (user.role === "vendor") {
          const profileCompletion = user.vendorProfile?.profileCompletion || 0;

          dispatch({
            type: "SET_PROFILE_COMPLETION_REQUIRED",
            payload: profileCompletion < 100,
          });
        }

        return user;
      } else {
        localStorage.removeItem("token");
        dispatch({
          type: "LOGIN_FAILURE",
          payload: "Session expired. Please login again.",
        });
        throw new Error("Session expired");
      }
    } catch (error) {
      localStorage.removeItem("token");
      dispatch({
        type: "LOGIN_FAILURE",
        payload:
          error.response?.data?.message ||
          error.message ||
          "Error loading user data",
      });
      throw error;
    }
  };

  // Login function
  const login = async (email, password) => {
    dispatch({ type: "LOGIN_REQUEST" });

    try {
      const response = await api.post("/auth/login", { email, password });

      if (response.data.status === "success") {
        // Store token in localStorage
        localStorage.setItem("token", response.data.data.token);

        const user = response.data.data.user;

        // Store user in state
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: user,
        });

        // Check if profile completion is required for vendors
        if (user.role === "vendor") {
          const profileCompletion = user.vendorProfile?.profileCompletion || 0;

          dispatch({
            type: "SET_PROFILE_COMPLETION_REQUIRED",
            payload: profileCompletion < 100,
          });
        }

        return { success: true };
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: response.data.message || "Login failed",
        });
        return {
          success: false,
          error: response.data.message || "Login failed",
        };
      }
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload:
          error.response?.data?.message ||
          error.message ||
          "Invalid credentials",
      });
      return {
        success: false,
        error: error.response?.data?.message || error.message || "Login failed",
      };
    }
  };

  // Signup function
  const signup = async (userData) => {
    dispatch({ type: "SIGNUP_REQUEST" });

    try {
      const response = await api.post("/auth/register", userData);

      if (response.data.status === "success") {
        // Store token in localStorage
        localStorage.setItem("token", response.data.data.token);

        const user = response.data.data.user;

        // Store user in state
        dispatch({
          type: "SIGNUP_SUCCESS",
          payload: user,
        });

        // For vendors, profile completion is required
        if (userData.role === "vendor") {
          dispatch({
            type: "SET_PROFILE_COMPLETION_REQUIRED",
            payload: true,
          });
        }

        return { success: true };
      } else {
        dispatch({
          type: "SIGNUP_FAILURE",
          payload: response.data.message || "Signup failed",
        });
        return {
          success: false,
          error: response.data.message || "Signup failed",
        };
      }
    } catch (error) {
      dispatch({
        type: "SIGNUP_FAILURE",
        payload:
          error.response?.data?.message || error.message || "Signup failed",
      });
      return {
        success: false,
        error:
          error.response?.data?.message || error.message || "Signup failed",
      };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  // Update user profile
  const updateUserProfile = async (profileData) => {
    try {
      const response = await api.put("/auth/profile", profileData);

      if (response.data.status === "success") {
        const updatedUser = response.data.data.user;

        dispatch({
          type: "UPDATE_PROFILE_SUCCESS",
          payload: updatedUser,
        });

        // Check if profile is now complete
        if (updatedUser.role === "vendor") {
          const profileCompletion =
            updatedUser.vendorProfile?.profileCompletion || 0;

          dispatch({
            type: "SET_PROFILE_COMPLETION_REQUIRED",
            payload: profileCompletion < 100,
          });
        }

        return { success: true };
      } else {
        dispatch({
          type: "UPDATE_PROFILE_FAILURE",
          payload: response.data.message || "Profile update failed",
        });
        return {
          success: false,
          error: response.data.message || "Profile update failed",
        };
      }
    } catch (error) {
      dispatch({
        type: "UPDATE_PROFILE_FAILURE",
        payload:
          error.response?.data?.message ||
          error.message ||
          "Profile update failed",
      });
      return {
        success: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Profile update failed",
      };
    }
  };

  // Google login function
  const loginWithGoogle = async (idToken, role = "buyer") => {
    dispatch({ type: "LOGIN_REQUEST" });

    try {
      const response = await api.post("/auth/google", { idToken, role });

      if (response.data.status === "success") {
        // Store token in localStorage
        localStorage.setItem("token", response.data.data.token);

        const user = response.data.data.user;

        // Store user in state
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: user,
        });

        // Check if profile completion is required for vendors
        if (user.role === "vendor") {
          const profileCompletion = user.vendorProfile?.profileCompletion || 0;

          dispatch({
            type: "SET_PROFILE_COMPLETION_REQUIRED",
            payload: profileCompletion < 100,
          });
        }

        return { success: true };
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: response.data.message || "Google login failed",
        });
        return {
          success: false,
          error: response.data.message || "Google login failed",
        };
      }
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload:
          error.response?.data?.message ||
          error.message ||
          "Google login failed",
      });
      return {
        success: false,
        error: error.response?.data?.message || error.message || "Google login failed",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        signup,
        logout,
        updateUserProfile,
        clearError,
        loginWithGoogle, // Add this new method
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;