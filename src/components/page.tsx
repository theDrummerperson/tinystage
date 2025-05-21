'use client';

import clsx from 'clsx';
import { ButtonHTMLAttributes, ReactNode } from 'react';

// Supported variants and sizes
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'light'
  | 'dark';
export type ButtonSize = 'sm' | 'md' | 'lg';

// Extend native button props for full flexibility
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

// Precompute size-based classes
const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

// Precompute variant-based classes
const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-orange-500 text-white hover:bg-orange-600',
  secondary:
    'bg-white text-orange-600 border border-orange-600 hover:bg-orange-50',
  outline:
    'bg-transparent text-orange-600 border border-orange-600 hover:bg-orange-50',
  ghost: 'bg-transparent text-orange-600 hover:bg-orange-50',
  light: 'bg-white text-orange-600 hover:bg-gray-100',
  dark: 'bg-gray-900 text-white hover:bg-gray-800',
};

// Base classes for all buttons
const baseClasses =
  'rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500';

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) => {
  const classes = clsx(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    className,
  );

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
