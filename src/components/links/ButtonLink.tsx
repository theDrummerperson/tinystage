import { LucideIcon } from 'lucide-react';
import * as React from 'react';

// import { IconType } from 'react-icons'; // REMOVED
import { cn } from '@/lib/utils';

import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/links/UnstyledLink';
const ButtonLinkVariant = [
  'primary',
  'outline',
  'ghost',
  'light',
  'dark',
] as const;
const ButtonLinkSize = ['sm', 'base'] as const;

type ButtonLinkProps = {
  isDarkBg?: boolean;
  variant?: (typeof ButtonLinkVariant)[number];
  size?: (typeof ButtonLinkSize)[number];
  leftIcon?: LucideIcon; // UPDATED TYPE
  rightIcon?: LucideIcon; // UPDATED TYPE
  leftIconClassName?: string; // ADDED
  rightIconClassName?: string; // ADDED
  // Removed classNames.leftIcon and classNames.rightIcon in favor of direct props
} & UnstyledLinkProps;

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'base',
      isDarkBg = false,
      leftIcon: LeftIconComponent, // Renamed
      rightIcon: RightIconComponent, // Renamed
      leftIconClassName,
      rightIconClassName,
      ...rest
    },
    ref,
  ) => {
    // Determine default icon class based on button size
    // This aims to make icons roughly proportional to the text size of the button.
    const iconSizeClass =
      size === 'sm' ? 'h-[0.875em] w-[0.875em]' : 'h-[1em] w-[1em]'; // Smaller for 'sm', 1em for 'base'

    return (
      <UnstyledLink
        ref={ref}
        {...rest}
        className={cn(
          'inline-flex items-center rounded font-medium',
          'focus-visible:ring-primary-500 focus:outline-none focus-visible:ring',
          'shadow-sm',
          'transition-colors duration-75',
          [
            size === 'base' && ['px-3 py-1.5', 'text-sm md:text-base'], // Text size sets baseline for '1em'
            size === 'sm' && ['px-2 py-1', 'text-xs md:text-sm'], // Text size sets baseline for '1em'
          ],
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
          className,
        )}
      >
        {LeftIconComponent && (
          <div
            className={cn([
              // Margin for the icon container
              size === 'base' && 'mr-1.5', // Adjusted margin slightly
              size === 'sm' && 'mr-1',
            ])}
          >
            {/* Pass combined className to the icon */}
            <LeftIconComponent
              className={cn(
                iconSizeClass, // Default size based on button size
                'text-current', // Icon should inherit color from button text
                leftIconClassName, // Allow overriding with specific classes
              )}
            />
          </div>
        )}
        {children}
        {RightIconComponent && (
          <div
            className={cn([
              // Margin for the icon container
              size === 'base' && 'ml-1.5', // Adjusted margin slightly
              size === 'sm' && 'ml-1',
            ])}
          >
            {/* Pass combined className to the icon */}
            <RightIconComponent
              className={cn(
                iconSizeClass, // Default size based on button size
                'text-current', // Icon should inherit color from button text
                rightIconClassName, // Allow overriding with specific classes
              )}
            />
          </div>
        )}
      </UnstyledLink>
    );
  },
);

export default ButtonLink;
