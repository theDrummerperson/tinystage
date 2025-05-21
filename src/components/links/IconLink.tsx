// src/components/links/IconLink.tsx
import { LucideIcon } from 'lucide-react'; // For type definition if you use Lucide
import * as React from 'react';

import { cn } from '@/lib/utils';

import UnstyledLink, {
  UnstyledLinkProps,
} from '@/components/links/UnstyledLink'; // Assuming it uses UnstyledLink
const IconLinkVariant = [
  'primary',
  'outline',
  'ghost',
  'dark',
  'light',
] as const;

type IconLinkProps = {
  variant?: (typeof IconLinkVariant)[number];
  isDarkBg?: boolean; // If variant appearance changes on dark backgrounds
  icon: LucideIcon; // The icon component to render
  iconClassName?: string; // For custom styling of the icon itself
  // Add other props specific to IconLink if any (e.g., size for the button itself)
} & Omit<UnstyledLinkProps, 'children'>; // Omit children as it's an icon-only link

const IconLink = React.forwardRef<HTMLAnchorElement, IconLinkProps>(
  (
    {
      className,
      icon: IconComponent, // Renamed
      iconClassName,
      variant = 'ghost', // Default to ghost for a common icon link style
      isDarkBg = false,
      ...rest
    },
    ref,
  ) => {
    // Define base and variant-specific styles for the link itself
    // Similar to IconButton, but may have different padding/sizing
    const linkStyles = cn(
      'inline-flex items-center justify-center rounded-full p-2', // Example: round, p-2 for spacing
      'focus-visible:ring-primary-500 focus:outline-none focus-visible:ring',
      'transition-colors duration-150', // Faster transition for icon links often feels good
      // Variants (simplified example, adapt from IconButton if needed)
      [
        variant === 'primary' && [
          'bg-primary-500 text-white',
          'hover:bg-primary-600',
          'disabled:bg-primary-700',
        ],
        variant === 'outline' && [
          'text-primary-500',
          'border-primary-500 border',
          'hover:bg-primary-50 active:bg-primary-100',
          isDarkBg && 'hover:bg-gray-900 active:bg-gray-800',
        ],
        variant === 'ghost' && [
          'text-primary-500',
          'hover:bg-primary-50 active:bg-primary-100',
          isDarkBg && 'hover:bg-gray-900 active:bg-gray-800',
        ],
        variant === 'light' && [
          'bg-white text-gray-700',
          'border border-gray-300',
          'hover:bg-gray-100',
        ],
        variant === 'dark' && [
          'bg-gray-700 text-white', // Slightly lighter dark for icon links
          'hover:bg-gray-600',
        ],
      ],
      'disabled:cursor-not-allowed disabled:opacity-60',
      className,
    );

    // Default icon styling (e.g., size). Can be overridden by iconClassName.
    // IconLinks often have slightly larger icons relative to their padding.
    const defaultIconStyling = 'h-[1.25em] w-[1.25em]'; // e.g., 20px if font-size is 16px

    return (
      <UnstyledLink ref={ref} className={linkStyles} {...rest}>
        {IconComponent && (
          <IconComponent
            className={cn(
              defaultIconStyling,
              'text-current', // Inherit color from link's variant styles
              iconClassName,
            )}
            // No 'size' prop here, sizing controlled by className
          />
        )}
      </UnstyledLink>
    );
  },
);

export default IconLink;
