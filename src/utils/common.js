/**
 * Common utility functions for formatting and helpers
 */

/**
 * Formats a currency amount
 * @param {number} amount - The amount to format
 * @param {string} currency - The currency code (default: INR)
 * @returns {string} - The formatted currency amount
 */
export const formatCurrency = (amount, currency = 'INR') => {
    if (typeof amount !== 'number' || isNaN(amount)) return '';
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(amount);
};

/**
 * Formats a date to a human-readable string
 * @param {Date|string} date - The date to format
 * @param {string} format - The format to use (short, medium, long)
 * @returns {string} - The formatted date
 */
export const formatDate = (date, format = 'medium') => {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return '';

    const options = {
        short: { month: 'short', day: 'numeric', year: 'numeric' },
        medium: { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' },
        long: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' },
    };
    return dateObj.toLocaleDateString('en-IN', options[format] || options.medium);
};

/**
 * Formats a relative time (e.g., "2 hours ago")
 * @param {Date|string} date - The date to format
 * @returns {string} - The relative time
 */
export const formatRelativeTime = (date) => {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return '';

    const now = new Date();
    const diffMs = now - dateObj;
    const diffSec = Math.round(diffMs / 1000);
    const diffMin = Math.round(diffSec / 60);
    const diffHour = Math.round(diffMin / 60);
    const diffDay = Math.round(diffHour / 24);
    const diffMonth = Math.round(diffDay / 30);
    const diffYear = Math.round(diffDay / 365);

    if (diffSec < 60) return 'just now';
    if (diffMin < 60) return `${diffMin} minute${diffMin !== 1 ? 's' : ''} ago`;
    if (diffHour < 24) return `${diffHour} hour${diffHour !== 1 ? 's' : ''} ago`;
    if (diffDay < 30) return `${diffDay} day${diffDay !== 1 ? 's' : ''} ago`;
    if (diffMonth < 12) return `${diffMonth} month${diffMonth !== 1 ? 's' : ''} ago`;
    return `${diffYear} year${diffYear !== 1 ? 's' : ''} ago`;
};

/**
 * Truncates text to a specified length with ellipsis
 * @param {string} text - The text to truncate
 * @param {number} maxLength - The maximum length
 * @returns {string} - The truncated text
 */
export const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text || '';
    return text.slice(0, maxLength) + '...';
};

/**
 * Formats file size to human-readable format
 * @param {number} bytes - File size in bytes
 * @param {number} decimals - Number of decimal places
 * @returns {string} - Formatted file size
 */
export const formatFileSize = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Validates file before upload
 * @param {File} file - The file to validate
 * @param {string} type - The file type ('image' or 'document')
 * @returns {Object} - Validation result { isValid: boolean, error?: string }
 */
export const validateFile = (file, type = 'image') => {
    if (!file) return { isValid: false, error: 'No file selected' };

    const ALLOWED_FILE_TYPES = {
        IMAGE: ['image/jpeg', 'image/png', 'image/gif'],
        DOCUMENT: ['application/pdf', 'image/jpeg', 'image/png'],
    };
    const FILE_SIZE_LIMITS = {
        IMAGE: 5 * 1024 * 1024, // 5MB
        DOCUMENT: 10 * 1024 * 1024, // 10MB
    };

    const allowedTypes = ALLOWED_FILE_TYPES[type.toUpperCase()];
    if (allowedTypes && !allowedTypes.includes(file.type)) {
        return { isValid: false, error: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}` };
    }

    const sizeLimit = FILE_SIZE_LIMITS[type.toUpperCase()];
    if (sizeLimit && file.size > sizeLimit) {
        return { isValid: false, error: `File size exceeds ${formatFileSize(sizeLimit)} limit` };
    }

    return { isValid: true };
};

/**
 * Get initials from name
 * @param {string} name - Full name
 * @returns {string} - Initials
 */
export const getInitials = (name) => {
    if (!name) return '';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase();
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Deep clone object
 * @param {Object} obj - Object to clone
 * @returns {Object} - Cloned object
 */
export const deepClone = (obj) => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => deepClone(item));
    const clonedObj = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            clonedObj[key] = deepClone(obj[key]);
        }
    }
    return clonedObj;
};

/**
 * Generate random ID
 * @param {number} length - Length of ID
 * @returns {string} - Random ID
 */
export const generateRandomId = (length = 8) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} - Formatted number
 */
export const formatNumber = (num) => {
    if (num === null || num === undefined || isNaN(num)) return '0';
    return new Intl.NumberFormat('en-IN').format(num);
};

/**
 * Get file extension
 * @param {string} filename - File name
 * @returns {string} - File extension
 */
export const getFileExtension = (filename) => {
    if (!filename) return '';
    const parts = filename.split('.');
    return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
};

/**
 * Check if object is empty
 * @param {Object} obj - Object to check
 * @returns {boolean} - True if empty
 */
export const isEmptyObject = (obj) => {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
};

/**
 * Convert FormData to object
 * @param {FormData} formData - FormData instance
 * @returns {Object} - Plain object
 */
export const formDataToObject = (formData) => {
    const obj = {};
    for (const [key, value] of formData.entries()) {
        if (obj[key]) {
            if (!Array.isArray(obj[key])) obj[key] = [obj[key]];
            obj[key].push(value);
        } else {
            obj[key] = value;
        }
    }
    return obj;
};

/**
 * Sleep function for async operations
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise} - Promise that resolves after sleep
 */
export const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Get error message from API response
 * @param {Object} error - Error object
 * @returns {string} - Error message
 */
export const getErrorMessage = (error) => {
    if (error?.response?.data?.message) return error.response.data.message;
    if (error?.message) return error.message;
    return 'An unknown error occurred';
};

/**
 * Check if user is vendor
 * @param {Object} user - User object
 * @returns {boolean} - True if vendor
 */
export const isVendor = (user) => {
    return user?.accountType === 'VENDOR';
};

/**
 * Check if vendor profile is complete
 * @param {Object} vendor - Vendor object
 * @returns {boolean} - True if complete
 */
export const isVendorProfileComplete = (vendor) => {
    return vendor?.profileStep === 3 && vendor?.vendorType && vendor?.businessName && vendor?.gstNumber;
};

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
    const result = { isValid: false, errors: [], strength: 0 };

    if (!password || password.length < 8) {
        result.errors.push('Password must be at least 8 characters');
    } else {
        result.strength += 25;
    }

    if (!/[a-z]/.test(password)) {
        result.errors.push('Password must contain at least one lowercase letter');
    } else {
        result.strength += 25;
    }

    if (!/[A-Z]/.test(password)) {
        result.errors.push('Password must contain at least one uppercase letter');
    } else {
        result.strength += 25;
    }

    if (!/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.]/.test(password)) {
        result.errors.push('Password must contain at least one number or special character');
    } else {
        result.strength += 25;
    }

    result.isValid = result.errors.length === 0;
    return result;
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
 * Validates a GSTIN
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