// src/hooks/useToast.js
import toast from 'react-hot-toast';

export const useToast = () => {
  // Basic toast functions
  const showSuccess = (message, options = {}) => {
    return toast.success(message, {
      duration: 3000,
      ...options,
    });
  };

  const showError = (message, options = {}) => {
    return toast.error(message, {
      duration: 5000,
      ...options,
    });
  };

  const showLoading = (message = 'Loading...', options = {}) => {
    return toast.loading(message, options);
  };

  const showInfo = (message, options = {}) => {
    return toast(message, {
      icon: 'ℹ️',
      duration: 4000,
      ...options,
    });
  };

  const showWarning = (message, options = {}) => {
    return toast(message, {
      icon: '⚠️',
      duration: 4000,
      style: {
        background: '#F59E0B',
        color: '#FFF',
      },
      ...options,
    });
  };

  // Specialized toast functions for common use cases
  const showFileUploadSuccess = (fileName) => {
    return showSuccess(`${fileName} uploaded successfully!`, {
      icon: '📁',
    });
  };

  const showFileUploadError = (error) => {
    return showError(`Upload failed: ${error}`, {
      icon: '❌',
    });
  };

  const showStepComplete = (stepName) => {
    return showSuccess(`${stepName} completed!`, {
      icon: '✅',
      duration: 2000,
    });
  };

  const showWelcome = (message = 'Welcome! Let\'s get started.') => {
    return showSuccess(message, {
      icon: '👋',
      duration: 3000,
    });
  };

  const showProfileComplete = () => {
    return showSuccess('Profile completed successfully! Redirecting...', {
      icon: '🎉',
      duration: 4000,
    });
  };

  // Promise-based toast for API calls
  const showPromise = (promise, messages) => {
    const defaultMessages = {
      loading: 'Loading...',
      success: 'Success!',
      error: 'Something went wrong!',
    };

    return toast.promise(promise, {
      ...defaultMessages,
      ...messages,
    });
  };

  // Utility functions
  const dismiss = (toastId) => {
    if (toastId) {
      toast.dismiss(toastId);
    } else {
      toast.dismiss();
    }
  };

  const dismissAll = () => {
    toast.dismiss();
  };

  const isActive = (toastId) => {
    return toast.isActive(toastId);
  };

  // Form validation toast helpers
  const showFormErrors = (errors) => {
    const errorMessages = Object.values(errors).filter(Boolean);
    if (errorMessages.length > 0) {
      const message = errorMessages.length === 1 
        ? errorMessages[0] 
        : `Please fix ${errorMessages.length} validation errors`;
      showError(message);
    }
  };

  const showRequiredFieldsError = (fields = []) => {
    if (fields.length === 0) {
      showError('Please fill in all required fields');
    } else if (fields.length === 1) {
      showError(`${fields[0]} is required`);
    } else {
      showError(`Please fill in: ${fields.join(', ')}`);
    }
  };

  // Network/API related toasts
  const showNetworkError = () => {
    showError('Network error. Please check your connection and try again.', {
      duration: 6000,
    });
  };

  const showServerError = () => {
    showError('Server error. Please try again later.', {
      duration: 6000,
    });
  };

  const showSaveSuccess = (itemName = 'Item') => {
    showSuccess(`${itemName} saved successfully!`);
  };

  const showDeleteSuccess = (itemName = 'Item') => {
    showSuccess(`${itemName} deleted successfully!`);
  };

  const showUpdateSuccess = (itemName = 'Item') => {
    showSuccess(`${itemName} updated successfully!`);
  };

  return {
    // Basic functions
    showSuccess,
    showError,
    showLoading,
    showInfo,
    showWarning,
    
    // Specialized functions
    showFileUploadSuccess,
    showFileUploadError,
    showStepComplete,
    showWelcome,
    showProfileComplete,
    showPromise,
    
    // Form helpers
    showFormErrors,
    showRequiredFieldsError,
    
    // Network helpers
    showNetworkError,
    showServerError,
    
    // CRUD helpers
    showSaveSuccess,
    showDeleteSuccess,
    showUpdateSuccess,
    
    // Utility functions
    dismiss,
    dismissAll,
    isActive,
    
    // Direct access to toast for custom use cases
    toast,
  };
};

export default useToast;