/**
 * Utility functions for form validation
 */

/**
 * Validates an email address
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

/**
 * Validates a password for strength requirements
 * @param {string} password - The password to validate
 * @returns {object} - Validation result with details
 */
export const validatePassword = (password) => {
  const result = {
    isValid: false,
    errors: [],
    strength: 0, // 0-100
  };

  // Check length
  if (!password || password.length < 8) {
    result.errors.push('Password must be at least 8 characters');
  } else {
    result.strength += 25;
  }

  // Check for lowercase letters
  if (!/[a-z]/.test(password)) {
    result.errors.push('Password must contain at least one lowercase letter');
  } else {
    result.strength += 25;
  }

  // Check for uppercase letters
  if (!/[A-Z]/.test(password)) {
    result.errors.push('Password must contain at least one uppercase letter');
  } else {
    result.strength += 25;
  }

  // Check for numbers or special characters
  if (!/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    result.errors.push('Password must contain at least one number or special character');
  } else {
    result.strength += 25;
  }

  result.isValid = result.errors.length === 0;
  return result;
};

/**
 * Validates a phone number
 * @param {string} phone - The phone number to validate
 * @returns {boolean} - Whether the phone number is valid
 */
export const isValidPhone = (phone) => {
  // Basic validation for most common formats
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone);
};

/**
 * Validates an Indian pincode
 * @param {string} pincode - The pincode to validate
 * @returns {boolean} - Whether the pincode is valid
 */
export const isValidPincode = (pincode) => {
  const pincodeRegex = /^[1-9][0-9]{5}$/;
  return pincodeRegex.test(pincode);
};

/**
 * Validates a GSTIN (Goods and Services Tax Identification Number)
 * @param {string} gstin - The GSTIN to validate
 * @returns {boolean} - Whether the GSTIN is valid
 */
export const isValidGSTIN = (gstin) => {
  const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return gstinRegex.test(gstin);
};

/**
 * Validates a URL
 * @param {string} url - The URL to validate
 * @returns {boolean} - Whether the URL is valid
 */
export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};