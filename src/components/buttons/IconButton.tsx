// Removed: import { IconType } from 'react-icons'; // Assuming this is problematic
import { ArrowPathIcon } from '@heroicons/react/20/solid'; // Spinner icon
import { LucideIcon } from 'lucide-react'; // For type definition
import * as React from 'react';

import { cn } from '@/lib/utils';

const IconButtonVariant = [
  'primary',
  'outline',
  'ghost',
  'light',
  'dark',
] as const;

// Define a more generic type for icons that accept className,
// or make it specific if you only intend to use Heroicons or Lucide.
// For this refactor, let's assume icons will be styled primarily via className.
// Heroicons are React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & { title?: string; titleId?: string } & React.RefAttributes<SVGSVGElement>>
// LucideIcon is (props: LucideProps) => JSX.Element
// A common ground is React.ComponentType<{ className?: string; [key: string]: any }>
type GenericIconType = React.ComponentType<{ className?: string }>;

type IconButtonProps = {
  isLoading?: boolean;
  isDarkBg?: boolean;
  variant?: (typeof IconButtonVariant)[number];
  // Use a more specific or a more generic type for the icon prop.
  // If you primarily use Heroicons, you could type it more specifically to them.
  // If you use Lucide, LucideIcon is fine.
  // For flexibility with libraries that take className for styling:
  icon?: GenericIconType | LucideIcon;
  iconClassName?: string; // Separate prop for icon's className for better control
  // Removed classNames.icon, replaced with iconClassName for simplicity
} & React.ComponentPropsWithRef<'button'>;

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      disabled: buttonDisabled,
      isLoading,
      variant = 'primary',
      isDarkBg = false,
      icon: IconComponent, // Renamed to avoid conflict if Icon was a global type
      iconClassName,
      ...rest
    },
    ref,
  ) => {
    const disabled = isLoading || buttonDisabled;

    // Base icon size, can be overridden by iconClassName
    // Aim for icon to be roughly 70-80% of the button's smallest dimension (padding dependent)
    // Default min-h/w of button is 28px (p-1), so ~16-20px icon (h-4/w-4 or h-5/w-5)
    // Default md: min-h/w of button is 34px (p-2), so ~20-24px icon (h-5/w-5 or h-6/w-6)
    const defaultIconStyling = 'h-[1em] w-[1em]'; // Using 1em to scale with button font-size by default

    return (
      <button
        ref={ref}
        type='button'
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center rounded font-medium',
          'focus-visible:ring-primary-500 focus:outline-none focus-visible:ring',
          'shadow-sm',
          'transition-colors duration-75',
          'min-h-[28px] min-w-[28px] p-1 text-sm md:min-h-[34px] md:min-w-[34px] md:p-2 md:text-base', // Added text-sm/md:text-base for '1em' to work
          [
            variant === 'primary' && [
              'bg-primary-500 text-white',
              'border-primary-600 border',
              'hover:bg-primary-600 hover:text-white',
              'active:bg-primary-700',
              'disabled:bg-primary-700',
            ],
            variant === 'outline' && [
              'text-primary-500',
              'border-primary-500 border',
              'hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100',
              isDarkBg &&
                'hover:bg-gray-900 active:bg-gray-800 disabled:bg-gray-800',
            ],
            variant === 'ghost' && [
              'text-primary-500',
              'shadow-none',
              'hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100',
              isDarkBg &&
                'hover:bg-gray-900 active:bg-gray-800 disabled:bg-gray-800',
            ],
            variant === 'light' && [
              'bg-white text-gray-700',
              'border border-gray-300',
              'hover:text-dark hover:bg-gray-100',
              'active:bg-white/80 disabled:bg-gray-200',
            ],
            variant === 'dark' && [
              'bg-gray-900 text-white',
              'border border-gray-600',
              'hover:bg-gray-800 active:bg-gray-700 disabled:bg-gray-700',
            ],
          ],
          'disabled:cursor-not-allowed',
          isLoading &&
            'relative text-transparent transition-none hover:text-transparent disabled:cursor-wait',
          className,
        )}
        {...rest}
      >
        {isLoading && (
          <div
            className={cn(
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
              {
                // Spinner color inherits from button's text color
                'text-white': ['primary', 'dark'].includes(variant),
                'text-black': ['light'].includes(variant), // Or specific gray if text-gray-700 from 'light' variant is too light
                'text-primary-500': ['outline', 'ghost'].includes(variant),
              },
            )}
          >
            <ArrowPathIcon
              className={cn(defaultIconStyling, 'animate-spin', iconClassName)}
            />
            {/* Spinner can also use iconClassName if specific spinner styling is needed */}
          </div>
        )}

        {IconComponent && !isLoading && (
          // Pass the combined className to the icon component
          // LucideIcon accepts className, Heroicons accept className
          <IconComponent
            className={cn(defaultIconStyling, 'relative', iconClassName)}
          />
          // Removed 'size' prop as we're standardizing on className for sizing
        )}
      </button>
    );
  },
);

export default IconButton;
