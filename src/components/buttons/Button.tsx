// src/components/buttons/Button.tsx
'use client';

import clsx from 'clsx'; // Changed from cn, assuming clsx is what you meant for class concatenation
import React, { ButtonHTMLAttributes, ReactNode } from 'react'; // ReactNode is part of React

// Define the allowed variants and sizes
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'; // ADDED 'ghost' and 'link'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

// Extend native button props for flexibility
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { // Use ButtonHTMLAttributes for native button props
  variant?: ButtonVariant; // USE THE ButtonVariant TYPE
  size?: ButtonSize;
  isLoading?: boolean; // Optional: For showing a loading state
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode; // Explicitly add children if not covered by ButtonHTMLAttributes sufficiently for your use case
}

// Predefine class maps outside the component
const sizeClasses: Record<ButtonSize, string> = { // Ensure all sizes are covered
  sm: 'px-3 py-1.5 text-xs rounded-sm', // Added example rounded
  md: 'px-4 py-2 text-sm rounded-md',
  lg: 'px-6 py-3 text-base rounded-md',
  xl: 'px-8 py-4 text-lg md:text-xl rounded-lg', // Added example rounded
};

const variantClasses: Record<ButtonVariant, string> = { // KEYS MUST MATCH ButtonVariant
  primary: 'bg-brand-yellow text-brand-black hover:bg-yellow-400 focus-visible:ring-brand-yellow disabled:opacity-60 disabled:cursor-not-allowed', // Example using brand colors
  secondary: 'bg-brand-gray-dark text-brand-white hover:bg-brand-gray-medium border border-brand-gray-medium focus-visible:ring-brand-gray-medium disabled:opacity-60 disabled:cursor-not-allowed', // Example
  outline: 'bg-transparent text-brand-yellow border border-brand-yellow hover:bg-brand-yellow/10 focus-visible:ring-brand-yellow disabled:opacity-60 disabled:cursor-not-allowed', // Example
  ghost: 'bg-transparent text-brand-yellow hover:bg-brand-yellow/10 focus-visible:ring-brand-yellow disabled:opacity-60 disabled:cursor-not-allowed', // Example
  link: 'bg-transparent text-brand-yellow hover:text-yellow-400 underline underline-offset-2 focus-visible:ring-brand-yellow disabled:opacity-60 disabled:cursor-not-allowed', // Example
};

const baseClasses =
  'inline-flex items-center justify-center font-semibold tracking-wide transition-colors duration-150 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-black disabled:pointer-events-none'; // Adjusted base classes

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  isLoading,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}) => {
  const computedDisabled = isLoading || disabled;

  return (
    <button 
      className={clsx(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant], // This will now work correctly
        isLoading && 'opacity-70 cursor-wait', // Style for loading state
        className,
      )}
      disabled={computedDisabled}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!isLoading && leftIcon && <span className="mr-2 -ml-1">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2 -mr-1">{rightIcon}</span>}
    </button>
  );
};

export default Button;