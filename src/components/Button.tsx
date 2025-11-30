import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const baseStyles =
    'relative overflow-hidden transition-all duration-300 font-bold px-6 py-2 rounded flex items-center justify-center gap-2 group';

  const variants = {
    primary: 'bg-brand-yellow text-brand-black hover:bg-yellow-300',
    outline:
      'bg-transparent text-brand-yellow border-2 border-brand-yellow hover:-translate-y-0.5',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      <span className='relative z-10'>{children}</span>
      {variant === 'outline' && (
        <div className='absolute inset-0 bg-white/10 transform -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-full' />
      )}
    </button>
  );
};
