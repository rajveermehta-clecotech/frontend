// src/config/api.js
const API_CONFIG = {
  BASE_URL: 'http://localhost:3000',
  ENDPOINTS: {
    // Authentication
    AUTH: {
      SIGNUP: '/api/auth/signup',
      LOGIN: '/api/auth/login',
      GOOGLE: '/api/auth/google',
      PROFILE: '/api/auth/profile',
      CHANGE_PASSWORD: '/api/auth/change-password',
    },
    // Vendor
    VENDOR: {
      ONBOARDING: {
        STEP1: '/api/vendor/onboarding/step1',
        STEP2: '/api/vendor/onboarding/step2',
        STEP3: '/api/vendor/onboarding/step3',
      },
      PROFILE: '/api/vendor/profile',
    },
    // Products
    PRODUCTS: '/api/products',
    // Inquiries
    INQUIRIES: {
      VENDOR: '/api/inquiries/vendor',
    },
  },
};

export default API_CONFIG;