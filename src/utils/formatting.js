/**
 * Utility functions for formatting data
 */

/**
 * Formats a phone number to a consistent format
 * @param {string} phone - The phone number to format
 * @returns {string} - The formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Check if it's an Indian mobile number (10 digits)
  if (digitsOnly.length === 10) {
    return `+91 ${digitsOnly.slice(0, 5)} ${digitsOnly.slice(5)}`;
  }
  
  // International format with country code
  if (digitsOnly.length > 10) {
    const countryCode = digitsOnly.slice(0, digitsOnly.length - 10);
    const restDigits = digitsOnly.slice(digitsOnly.length - 10);
    return `+${countryCode} ${restDigits.slice(0, 5)} ${restDigits.slice(5)}`;
  }
  
  // For shorter numbers, just return as is
  return phone;
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
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  
  const options = {
    short: { month: 'short', day: 'numeric', year: 'numeric' },
    medium: { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' },
    long: { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    }
  };
  
  return dateObj.toLocaleDateString('en-IN', options[format] || options.medium);
};

/**
 * Formats a currency amount
 * @param {number} amount - The amount to format
 * @param {string} currency - The currency code (default: INR)
 * @returns {string} - The formatted currency amount
 */
export const formatCurrency = (amount, currency = 'INR') => {
  if (typeof amount !== 'number') {
    return '';
  }
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
};

/**
 * Formats a number with commas for thousands
 * @param {number} number - The number to format
 * @returns {string} - The formatted number
 */
export const formatNumber = (number) => {
  if (typeof number !== 'number') {
    return '';
  }
  
  return new Intl.NumberFormat('en-IN').format(number);
};

/**
 * Truncates text to a specified length with ellipsis
 * @param {string} text - The text to truncate
 * @param {number} maxLength - The maximum length
 * @returns {string} - The truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) {
    return text;
  }
  
  return `${text.slice(0, maxLength)}...`;
};

/**
 * Converts a file size in bytes to a human-readable format
 * @param {number} bytes - The file size in bytes
 * @param {number} decimals - The number of decimal places to show
 * @returns {string} - The formatted file size
 */
export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Formats a timespan to a human-readable format
 * @param {number} minutes - The time in minutes
 * @returns {string} - The formatted timespan
 */
export const formatTimespan = (minutes) => {
  if (!minutes || typeof minutes !== 'number') {
    return '';
  }
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) {
    return `${mins} min${mins !== 1 ? 's' : ''}`;
  }
  
  if (mins === 0) {
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  }
  
  return `${hours} hour${hours !== 1 ? 's' : ''} ${mins} min${mins !== 1 ? 's' : ''}`;
};

/**
 * Formats a relative time (e.g., "2 hours ago")
 * @param {Date|string} date - The date to format
 * @returns {string} - The relative time
 */
export const formatRelativeTime = (date) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return '';
  }
  
  const now = new Date();
  const diffMs = now - dateObj;
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHour = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHour / 24);
  const diffMonth = Math.round(diffDay / 30);
  const diffYear = Math.round(diffDay / 365);
  
  if (diffSec < 60) {
    return 'just now';
  }
  
  if (diffMin < 60) {
    return `${diffMin} minute${diffMin !== 1 ? 's' : ''} ago`;
  }
  
  if (diffHour < 24) {
    return `${diffHour} hour${diffHour !== 1 ? 's' : ''} ago`;
  }
  
  if (diffDay < 30) {
    return `${diffDay} day${diffDay !== 1 ? 's' : ''} ago`;
  }
  
  if (diffMonth < 12) {
    return `${diffMonth} month${diffMonth !== 1 ? 's' : ''} ago`;
  }
  
  return `${diffYear} year${diffYear !== 1 ? 's' : ''} ago`;
};