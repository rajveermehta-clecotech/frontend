import { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import api from "../services/api/authApi";

// Initial state
const initialState = {
  isAuthenticated: false,
  profileCompletionRequired: false,
  user: null,
  loading: true,
  error: null,
};

// Action types
const actionTypes = {
  AUTH_INIT: 'AUTH_INIT',
  AUTH_CHECKED: 'AUTH_CHECKED',
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  SIGNUP_REQUEST: 'SIGNUP_REQUEST',
  SIGNUP_SUCCESS: 'SIGNUP_SUCCESS',
  SIGNUP_FAILURE: 'SIGNUP_FAILURE',
  LOGOUT: 'LOGOUT',
  UPDATE_PROFILE_SUCCESS: 'UPDATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_FAILURE: 'UPDATE_PROFILE_FAILURE',
  SET_PROFILE_COMPLETION_REQUIRED: 'SET_PROFILE_COMPLETION_REQUIRED',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.AUTH_INIT:
      return { ...state, loading: true };
      
    case actionTypes.AUTH_CHECKED:
      return { ...state, loading: false, isAuthenticated: false };
      
    case actionTypes.LOGIN_REQUEST:
    case actionTypes.SIGNUP_REQUEST:
      return { ...state, loading: true, error: null };
      
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null,
      };
      
    case actionTypes.LOGIN_FAILURE:
    case actionTypes.SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };
      
    case actionTypes.LOGOUT:
      return { ...initialState, loading: false };
      
    case actionTypes.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
      
    case actionTypes.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
      
    case actionTypes.SET_PROFILE_COMPLETION_REQUIRED:
      return {
        ...state,
        profileCompletionRequired: action.payload,
      };
      
    case actionTypes.CLEAR_ERROR:
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
      dispatch({ type: actionTypes.AUTH_INIT });
      const token = localStorage.getItem("token");

      if (token) {
        try {
          await loadUserData();
        } catch (error) {
          console.error("Failed to load user data:", error);
          localStorage.removeItem("token");
          dispatch({ type: actionTypes.AUTH_CHECKED });
        }
      } else {
        dispatch({ type: actionTypes.AUTH_CHECKED });
      }
    };

    checkAuth();
  }, []);

  // Function to load user data from token
  const loadUserData = useCallback(async () => {
    try {
      const response = await api.get("/auth/me");

      if (response.data.status === "success") {
        const user = response.data.data.user;

        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          payload: user,
        });

        // Check if profile completion is required for vendors
        const isVendor = user.role === "vendor";
        const profileCompletion = user.vendorProfile?.profileCompletion || 0;

        if (isVendor) {
          dispatch({
            type: actionTypes.SET_PROFILE_COMPLETION_REQUIRED,
            payload: profileCompletion < 100,
          });
        }

        return user;
      } else {
        throw new Error("Session expired");
      }
    } catch (error) {
      localStorage.removeItem("token");
      dispatch({
        type: actionTypes.LOGIN_FAILURE,
        payload: error.response?.data?.message || error.message || "Error loading user data",
      });
      throw error;
    }
  }, []);

  // Login function
  const login = useCallback(async (email, password) => {
    dispatch({ type: actionTypes.LOGIN_REQUEST });

    try {
      const response = await api.post("/auth/login", { email, password });

      if (response.data.status === "success") {
        localStorage.setItem("token", response.data.data.token);
        const user = response.data.data.user;

        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          payload: user,
        });

        // Check profile completion for vendors
        const isVendor = user.role === "vendor";
        const profileCompletion = user.vendorProfile?.profileCompletion || 0;

        if (isVendor) {
          dispatch({
            type: actionTypes.SET_PROFILE_COMPLETION_REQUIRED,
            payload: profileCompletion < 100,
          });
        }

        return { success: true };
      } else {
        const errorMessage = response.data.message || "Login failed";
        dispatch({
          type: actionTypes.LOGIN_FAILURE,
          payload: errorMessage,
        });
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Invalid credentials";
      dispatch({
        type: actionTypes.LOGIN_FAILURE,
        payload: errorMessage,
      });
      return { success: false, error: errorMessage };
    }
  }, []);

  // Signup function
  const signup = useCallback(async (userData) => {
    dispatch({ type: actionTypes.SIGNUP_REQUEST });

    try {
      const response = await api.post("/auth/register", userData);

      if (response.data.status === "success") {
        localStorage.setItem("token", response.data.data.token);
        const user = response.data.data.user;

        dispatch({
          type: actionTypes.SIGNUP_SUCCESS,
          payload: user,
        });

        // For vendors, profile completion is required
        if (userData.role === "vendor") {
          dispatch({
            type: actionTypes.SET_PROFILE_COMPLETION_REQUIRED,
            payload: true,
          });
        }

        return { success: true };
      } else {
        const errorMessage = response.data.message || "Signup failed";
        dispatch({
          type: actionTypes.SIGNUP_FAILURE,
          payload: errorMessage,
        });
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Signup failed";
      dispatch({
        type: actionTypes.SIGNUP_FAILURE,
        payload: errorMessage,
      });
      return { success: false, error: errorMessage };
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    dispatch({ type: actionTypes.LOGOUT });
  }, []);

  // Clear error function
  const clearError = useCallback(() => {
    dispatch({ type: actionTypes.CLEAR_ERROR });
  }, []);

  // Update user profile
  const updateUserProfile = useCallback(async (profileData) => {
    try {
      const response = await api.put("/auth/profile", profileData);

      if (response.data.status === "success") {
        const updatedUser = response.data.data.user;

        dispatch({
          type: actionTypes.UPDATE_PROFILE_SUCCESS,
          payload: updatedUser,
        });

        // Check if profile is now complete
        const isVendor = updatedUser.role === "vendor";
        const profileCompletion = updatedUser.vendorProfile?.profileCompletion || 0;

        if (isVendor) {
          dispatch({
            type: actionTypes.SET_PROFILE_COMPLETION_REQUIRED,
            payload: profileCompletion < 100,
          });
        }

        return { success: true };
      } else {
        const errorMessage = response.data.message || "Profile update failed";
        dispatch({
          type: actionTypes.UPDATE_PROFILE_FAILURE,
          payload: errorMessage,
        });
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Profile update failed";
      dispatch({
        type: actionTypes.UPDATE_PROFILE_FAILURE,
        payload: errorMessage,
      });
      return { success: false, error: errorMessage };
    }
  }, []);

  // Google login function
  const loginWithGoogle = useCallback(async (idToken, role = "buyer") => {
    dispatch({ type: actionTypes.LOGIN_REQUEST });

    try {
      const response = await api.post("/auth/google", { idToken, role });

      if (response.data.status === "success") {
        localStorage.setItem("token", response.data.data.token);
        const user = response.data.data.user;

        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          payload: user,
        });

        // Check profile completion for vendors
        const isVendor = user.role === "vendor";
        const profileCompletion = user.vendorProfile?.profileCompletion || 0;

        if (isVendor) {
          dispatch({
            type: actionTypes.SET_PROFILE_COMPLETION_REQUIRED,
            payload: profileCompletion < 100,
          });
        }

        return { success: true };
      } else {
        const errorMessage = response.data.message || "Google login failed";
        dispatch({
          type: actionTypes.LOGIN_FAILURE,
          payload: errorMessage,
        });
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Google login failed";
      dispatch({
        type: actionTypes.LOGIN_FAILURE,
        payload: errorMessage,
      });
      return { success: false, error: errorMessage };
    }
  }, []);

  // Memoized context value
  const contextValue = {
    ...state,
    login,
    signup,
    logout,
    updateUserProfile,
    clearError,
    loginWithGoogle,
  };

  return (
    <AuthContext.Provider value={contextValue}>
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