import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  FormControl,
  FormLabel,
  FormHelperText,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  Switch,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Grid,
  Divider,
  Collapse,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff,
  Info as InfoIcon
} from '@mui/icons-material';

/**
 * A reusable form builder component
 * @param {Object} props - Component props
 * @param {Array} props.fields - Array of field configurations
 * @param {Object} props.initialValues - Initial form values
 * @param {Function} props.onSubmit - Form submission handler
 * @param {Function} props.validate - Custom validation function
 * @param {String} props.submitLabel - Submit button label
 * @param {Boolean} props.loading - Loading state
 * @param {String} props.error - Form error message
 * @param {Object} props.gridProps - Props for the Grid container
 * @param {React.ReactNode} props.footer - Additional footer content
 * @param {Boolean} props.autoValidate - Whether to validate on change/blur
 * @returns {React.ReactElement}
 */
const FormBuilder = ({
  fields = [],
  initialValues = {},
  onSubmit,
  validate,
  submitLabel = 'Submit',
  loading = false,
  error = null,
  gridProps = { spacing: 3 },
  footer = null,
  autoValidate = true,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // State for form values, errors, and touched fields
  const [values, setValues] = useState({ ...initialValues });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [passwordVisibility, setPasswordVisibility] = useState({});
  
  // Reset form when initialValues change
  useEffect(() => {
    setValues({ ...initialValues });
    setErrors({});
    setTouched({});
  }, [initialValues]);
  
  // Handle field change
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    
    // Handle different input types
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setValues({
      ...values,
      [name]: fieldValue,
    });
    
    // Clear field error when modified
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
    
    // Mark field as touched
    if (!touched[name]) {
      setTouched({
        ...touched,
        [name]: true,
      });
    }
    
    // Auto-validate if enabled
    if (autoValidate) {
      validateField(name, fieldValue);
    }
  };
  
  // Handle field blur
  const handleBlur = (event) => {
    const { name, value } = event.target;
    
    // Mark field as touched
    setTouched({
      ...touched,
      [name]: true,
    });
    
    // Auto-validate if enabled
    if (autoValidate) {
      validateField(name, value);
    }
  };
  
  // Toggle password visibility
  const togglePasswordVisibility = (fieldName) => {
    setPasswordVisibility({
      ...passwordVisibility,
      [fieldName]: !passwordVisibility[fieldName],
    });
  };
  
  // Validate a single field
  const validateField = (fieldName, fieldValue) => {
    const fieldConfig = fields.find((f) => f.name === fieldName);
    
    if (!fieldConfig || !fieldConfig.validate) {
      return;
    }
    
    const fieldError = fieldConfig.validate(fieldValue, values);
    
    if (fieldError) {
      setErrors({
        ...errors,
        [fieldName]: fieldError,
      });
    } else {
      // Clear field error if it's valid
      const newErrors = { ...errors };
      delete newErrors[fieldName];
      setErrors(newErrors);
    }
  };
  
  // Validate the entire form
  const validateForm = () => {
    let formErrors = {};
    let isValid = true;
    
    // Validate each field
    fields.forEach((field) => {
      if (field.validate) {
        const fieldError = field.validate(values[field.name], values);
        
        if (fieldError) {
          formErrors[field.name] = fieldError;
          isValid = false;
        }
      }
    });
    
    // Custom form-level validation
    if (validate) {
      const customErrors = validate(values);
      
      if (customErrors && Object.keys(customErrors).length > 0) {
        formErrors = { ...formErrors, ...customErrors };
        isValid = false;
      }
    }
    
    setErrors(formErrors);
    return isValid;
  };
  
  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Mark all fields as touched
    const allTouched = fields.reduce((acc, field) => {
      acc[field.name] = true;
      return acc;
    }, {});
    
    setTouched(allTouched);
    
    // Validate the form
    const isValid = validateForm();
    
    if (isValid && onSubmit) {
      onSubmit(values);
    }
  };
  
  // Render a field based on its configuration
  const renderField = (fieldConfig) => {
    const {
      name,
      label,
      type = 'text',
      placeholder,
      helperText,
      options = [],
      required = false,
      disabled = false,
      fullWidth = true,
      autoFocus = false,
      multiline = false,
      rows = 4,
      size = 'medium',
      defaultValue,
      startAdornment,
      endAdornment,
      variant = 'outlined',
      hidden = false,
      gridProps = { xs: 12 },
      InputProps = {},
      SelectProps = {},
      dependsOn,
      tooltip,
      ...rest
    } = fieldConfig;
    
    // Check if field should be rendered based on dependencies
    if (dependsOn) {
      const { field, value, condition = 'equals' } = dependsOn;
      
      if (condition === 'equals' && values[field] !== value) {
        return null;
      }
      
      if (condition === 'notEquals' && values[field] === value) {
        return null;
      }
      
      if (condition === 'notEmpty' && !values[field]) {
        return null;
      }
      
      if (condition === 'empty' && values[field]) {
        return null;
      }
    }
    
    // Don't render hidden fields
    if (hidden) {
      return null;
    }
    
    // Get field value and error
    const value = values[name] !== undefined ? values[name] : defaultValue !== undefined ? defaultValue : '';
    const error = touched[name] && errors[name];
    
    // Prepare common props for input fields
    const commonProps = {
      id: name,
      name,
      value,
      onChange: handleChange,
      onBlur: handleBlur,
      error: !!error,
      disabled: disabled || loading,
      fullWidth,
      autoFocus,
      size,
      variant,
      required,
      placeholder,
      ...rest,
    };
    
    // Render different field types
    switch (type) {
      case 'text':
      case 'email':
      case 'number':
      case 'tel':
      case 'url':
      case 'date':
      case 'datetime-local':
      case 'time':
        return (
          <Grid item {...gridProps}>
            <TextField
              {...commonProps}
              type={type}
              label={label}
              multiline={multiline}
              rows={multiline ? rows : undefined}
              helperText={error || helperText}
              InputProps={{
                ...InputProps,
                startAdornment: startAdornment ? (
                  <InputAdornment position="start">
                    {startAdornment}
                  </InputAdornment>
                ) : undefined,
                endAdornment: endAdornment ? (
                  <InputAdornment position="end">
                    {endAdornment}
                  </InputAdornment>
                ) : undefined,
              }}
            />
            {tooltip && (
              <Typography 
                variant="caption" 
                color="text.secondary"
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  mt: 0.5,
                  ml: 1
                }}
              >
                <InfoIcon sx={{ fontSize: 14, mr: 0.5 }} />
                {tooltip}
              </Typography>
            )}
          </Grid>
        );
        
      case 'password':
        return (
          <Grid item {...gridProps}>
            <TextField
              {...commonProps}
              type={passwordVisibility[name] ? 'text' : 'password'}
              label={label}
              helperText={error || helperText}
              InputProps={{
                ...InputProps,
                startAdornment: startAdornment ? (
                  <InputAdornment position="start">
                    {startAdornment}
                  </InputAdornment>
                ) : undefined,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => togglePasswordVisibility(name)}
                      edge="end"
                      size={isMobile ? "small" : "medium"}
                    >
                      {passwordVisibility[name] ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {tooltip && (
              <Typography 
                variant="caption" 
                color="text.secondary"
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  mt: 0.5,
                  ml: 1
                }}
              >
                <InfoIcon sx={{ fontSize: 14, mr: 0.5 }} />
                {tooltip}
              </Typography>
            )}
          </Grid>
        );
        
      case 'select':
        return (
          <Grid item {...gridProps}>
            <FormControl 
              fullWidth={fullWidth} 
              error={!!error}
              disabled={disabled || loading}
              size={size}
              variant={variant}
            >
              <FormLabel
                htmlFor={name}
                required={required}
                sx={{ mb: 1, fontSize: '0.875rem', fontWeight: 500 }}
              >
                {label}
              </FormLabel>
              <Select
                {...commonProps}
                {...SelectProps}
                labelId={`${name}-label`}
                displayEmpty={!!placeholder}
                inputProps={{
                  id: name,
                }}
              >
                {placeholder && (
                  <MenuItem value="" disabled>
                    {placeholder}
                  </MenuItem>
                )}
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {(error || helperText) && (
                <FormHelperText>{error || helperText}</FormHelperText>
              )}
              {tooltip && (
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    mt: 0.5
                  }}
                >
                  <InfoIcon sx={{ fontSize: 14, mr: 0.5 }} />
                  {tooltip}
                </Typography>
              )}
            </FormControl>
          </Grid>
        );
        
      case 'checkbox':
        return (
          <Grid item {...gridProps}>
            <FormControl 
              fullWidth={fullWidth} 
              error={!!error}
              disabled={disabled || loading}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    id={name}
                    name={name}
                    checked={!!value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={disabled || loading}
                    size={size}
                    {...rest}
                  />
                }
                label={label}
              />
              {(error || helperText) && (
                <FormHelperText>{error || helperText}</FormHelperText>
              )}
              {tooltip && (
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    mt: 0.5,
                    ml: 3.5
                  }}
                >
                  <InfoIcon sx={{ fontSize: 14, mr: 0.5 }} />
                  {tooltip}
                </Typography>
              )}
            </FormControl>
          </Grid>
        );
        
      case 'radio':
        return (
          <Grid item {...gridProps}>
            <FormControl 
              fullWidth={fullWidth} 
              error={!!error}
              disabled={disabled || loading}
              component="fieldset"
            >
              <FormLabel
                id={`${name}-label`}
                required={required}
                sx={{ mb: 1, fontSize: '0.875rem', fontWeight: 500 }}
              >
                {label}
              </FormLabel>
              <RadioGroup
                aria-labelledby={`${name}-label`}
                id={name}
                name={name}
                value={value || ''}
                onChange={handleChange}
                onBlur={handleBlur}
                {...rest}
              >
                {options.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio size={size} />}
                    label={option.label}
                    disabled={disabled || loading || option.disabled}
                  />
                ))}
              </RadioGroup>
              {(error || helperText) && (
                <FormHelperText>{error || helperText}</FormHelperText>
              )}
              {tooltip && (
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    mt: 0.5
                  }}
                >
                  <InfoIcon sx={{ fontSize: 14, mr: 0.5 }} />
                  {tooltip}
                </Typography>
              )}
            </FormControl>
          </Grid>
        );
        
      case 'switch':
        return (
          <Grid item {...gridProps}>
            <FormControl 
              fullWidth={fullWidth} 
              error={!!error}
              disabled={disabled || loading}
            >
              <FormControlLabel
                control={
                  <Switch
                    id={name}
                    name={name}
                    checked={!!value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={disabled || loading}
                    size={size}
                    {...rest}
                  />
                }
                label={label}
              />
              {(error || helperText) && (
                <FormHelperText>{error || helperText}</FormHelperText>
              )}
              {tooltip && (
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    mt: 0.5,
                    ml: 3.5
                  }}
                >
                  <InfoIcon sx={{ fontSize: 14, mr: 0.5 }} />
                  {tooltip}
                </Typography>
              )}
            </FormControl>
          </Grid>
        );
        
      case 'divider':
        return (
          <Grid item {...gridProps}>
            <Box sx={{ py: 1 }}>
              {label && (
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  gutterBottom
                  sx={{ color: 'text.primary', mb: 1 }}
                >
                  {label}
                </Typography>
              )}
              <Divider />
              {helperText && (
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                  {helperText}
                </Typography>
              )}
            </Box>
          </Grid>
        );
        
      case 'custom':
        if (fieldConfig.render) {
          return (
            <Grid item {...gridProps}>
              {fieldConfig.render({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
              })}
            </Grid>
          );
        }
        return null;
        
      default:
        return null;
    }
  };
  
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      {/* Form error message */}
      {error && (
        <Typography 
          color="error" 
          sx={{ 
            mb: 3,
            fontSize: { xs: '0.875rem', sm: '1rem' }
          }}
        >
          {error}
        </Typography>
      )}
      
      {/* Form fields */}
      <Grid container {...gridProps}>
        {fields.map((fieldConfig) => renderField(fieldConfig))}
      </Grid>
      
      {/* Submit button */}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          fullWidth={isMobile}
          sx={{ 
            borderRadius: 8,
            px: 4,
            py: { xs: 1, sm: 1.5 }
          }}
        >
          {loading ? 'Submitting...' : submitLabel}
        </Button>
      </Box>
      
      {/* Optional footer content */}
      {footer && <Box sx={{ mt: 3 }}>{footer}</Box>}
    </Box>
  );
};

export default FormBuilder;