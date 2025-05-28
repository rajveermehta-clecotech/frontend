// src/services/api/vendorApi.js
import api from './authApi';
import API_CONFIG from '../../config/api';

export const vendorApi = {
  // Onboarding Step 1 - Vendor Type
  onboardingStep1: async (vendorType) => {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.VENDOR.ONBOARDING.STEP1, {
        vendorType,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update vendor type' };
    }
  },

  // Onboarding Step 2 - Business Information
  onboardingStep2: async (formData) => {
    try {
      // Check if FormData or regular object
      const isFormData = formData instanceof FormData;
      const response = await api.post(
        API_CONFIG.ENDPOINTS.VENDOR.ONBOARDING.STEP2,
        formData,
        {
          headers: isFormData
            ? { 'Content-Type': 'multipart/form-data' }
            : { 'Content-Type': 'application/json' },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update business information' };
    }
  },

  // Onboarding Step 3 - Documents
  onboardingStep3: async (formData) => {
    try {
      // Check if FormData or regular object
      const isFormData = formData instanceof FormData;
      const response = await api.post(
        API_CONFIG.ENDPOINTS.VENDOR.ONBOARDING.STEP3,
        formData,
        {
          headers: isFormData
            ? { 'Content-Type': 'multipart/form-data' }
            : { 'Content-Type': 'application/json' },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update documents' };
    }
  },

  // Get vendor profile
  getProfile: async () => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.VENDOR.PROFILE);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch vendor profile' };
    }
  },

  // Update vendor profile
  updateProfile: async (formData) => {
    try {
      const isFormData = formData instanceof FormData;
      const response = await api.put(
        API_CONFIG.ENDPOINTS.VENDOR.PROFILE,
        formData,
        {
          headers: isFormData
            ? { 'Content-Type': 'multipart/form-data' }
            : { 'Content-Type': 'application/json' },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update vendor profile' };
    }
  },
};