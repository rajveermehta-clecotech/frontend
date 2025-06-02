import React from 'react';
import { cn } from '../../utils/helpers';

export const Badge = React.forwardRef(({ 
  className, 
  variant = 'default', 
  ...props 
}, ref) => {
  const variants = {
    default: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200',
    success: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200',
    destructive: 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200',
    secondary: 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200',
    outline: 'text-gray-700 border-gray-300 hover:bg-gray-50'
  };

  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        variants[variant],
        className
      )}
      {...props}
    />
  );
});

Badge.displayName = "Badge";