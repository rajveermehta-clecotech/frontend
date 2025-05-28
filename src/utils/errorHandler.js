// src/utils/errorHandler.js

/**
 * Error types
 */
export const ERROR_TYPES = {
  NETWORK: 'NETWORK_ERROR',
  AUTHENTICATION: 'AUTHENTICATION_ERROR',
  VALIDATION: 'VALIDATION_ERROR',
  PERMISSION: 'PERMISSION_ERROR',
  NOT_FOUND: 'NOT_FOUND_ERROR',
  SERVER: 'SERVER_ERROR',
  UNKNOWN: 'UNKNOWN_ERROR',
};

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  [ERROR_TYPES.NETWORK]: 'Network error. Please check your internet connection.',
  [ERROR_TYPES.AUTHENTICATION]: 'Authentication failed. Please login again.',
  [ERROR_TYPES.VALIDATION]: 'Please check your input and try again.',
  [ERROR_TYPES.PERMISSION]: 'You do not have permission to perform this action.',
  [ERROR_TYPES.NOT_FOUND]: 'The requested resource was not found.',
  [ERROR_TYPES.SERVER]: 'Server error. Please try again later.',
  [ERROR_TYPES.UNKNOWN]: 'An unexpected error occurred. Please try again.',
};

/**
 * Parse error response and return appropriate error type and message
 * @param {Object} error - Error object from API
 * @returns {Object} - { type: string, message: string, details?: any }
 */
export const parseError = (error) => {
  // Network error
  if (!error.response) {
    return {
      type: ERROR_TYPES.NETWORK,
      message: ERROR_MESSAGES[ERROR_TYPES.NETWORK],
    };
  }

  const { status, data } = error.response;
  
  // Get error message from response
  const message = data?.message || error.message || ERROR_MESSAGES[ERROR_TYPES.UNKNOWN];
  
  // Handle different status codes
  switch (status) {
    case 401:
      return {
        type: ERROR_TYPES.AUTHENTICATION,
        message: message || ERROR_MESSAGES[ERROR_TYPES.AUTHENTICATION],
      };
      
    case 403:
      return {
        type: ERROR_TYPES.PERMISSION,
        message: message || ERROR_MESSAGES[ERROR_TYPES.PERMISSION],
      };
      
    case 404:
      return {
        type: ERROR_TYPES.NOT_FOUND,
        message: message || ERROR_MESSAGES[ERROR_TYPES.NOT_FOUND],
      };
      
    case 422:
    case 400:
      return {
        type: ERROR_TYPES.VALIDATION,
        message: message || ERROR_MESSAGES[ERROR_TYPES.VALIDATION],
        details: data?.errors || null,
      };
      
    case 500:
    case 502:
    case 503:
    case 504:
      return {
        type: ERROR_TYPES.SERVER,
        message: message || ERROR_MESSAGES[ERROR_TYPES.SERVER],
      };
      
    default:
      return {
        type: ERROR_TYPES.UNKNOWN,
        message: message || ERROR_MESSAGES[ERROR_TYPES.UNKNOWN],
      };
  }
};

/**
 * Create user-friendly error message
 * @param {Object} error - Parsed error object
 * @returns {string} - User-friendly error message
 */
export const createErrorMessage = (error) => {
  const { type, message, details } = error;
  
  // If there are validation errors, format them
  if (type === ERROR_TYPES.VALIDATION && details) {
    const errorMessages = Object.entries(details)
      .map(([field, messages]) => {
        if (Array.isArray(messages)) {
          return messages.join(', ');
        }
        return messages;
      })
      .filter(Boolean);
      
    if (errorMessages.length > 0) {
      return errorMessages.join('. ');
    }
  }
  
  return message;
};

/**
 * Handle API error and return formatted error object
 * @param {Object} error - Error from API call
 * @returns {Object} - Formatted error object
 */
export const handleApiError = (error) => {
  const parsedError = parseError(error);
  const message = createErrorMessage(parsedError);
  
  return {
    ...parsedError,
    message,
  };
};

/**
 * Log error to console in development
 * @param {string} context - Context where error occurred
 * @param {Object} error - Error object
 */
export const logError = (context, error) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${context}]`, error);
  }
};

/**
 * Show error notification
 * @param {Object} error - Error object
 * @param {Function} showNotification - Function to show notification
 */
export const showErrorNotification = (error, showNotification) => {
  const { message, type } = handleApiError(error);
  
  showNotification({
    type: 'error',
    message,
    duration: type === ERROR_TYPES.NETWORK ? 10000 : 5000,
  });
};

/**
 * Retry failed API call
 * @param {Function} apiCall - API call function
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} delay - Delay between retries in ms
 * @returns {Promise} - Promise that resolves with API response
 */
export const retryApiCall = async (apiCall, maxRetries = 3, delay = 1000) => {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await apiCall();
    } catch (error) {
      lastError = error;
      
      // Don't retry on authentication or validation errors
      const parsedError = parseError(error);
      if ([ERROR_TYPES.AUTHENTICATION, ERROR_TYPES.VALIDATION, ERROR_TYPES.PERMISSION].includes(parsedError.type)) {
        throw error;
      }
      
      // Wait before retrying
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
      }
    }
  }
  
  throw lastError;
};

/**
 * Check if error is of specific type
 * @param {Object} error - Error object
 * @param {string} type - Error type to check
 * @returns {boolean} - True if error is of specified type
 */
export const isErrorType = (error, type) => {
  const parsedError = parseError(error);
  return parsedError.type === type;
};

/**
 * Extract validation errors from API response
 * @param {Object} error - Error object
 * @returns {Object} - Validation errors object
 */
export const extractValidationErrors = (error) => {
  const parsedError = parseError(error);
  
  if (parsedError.type === ERROR_TYPES.VALIDATION && parsedError.details) {
    return parsedError.details;
  }
  
  return {};
};