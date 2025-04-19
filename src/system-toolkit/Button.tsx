import React from 'react';
import {twMerge} from 'tailwind-merge';

type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * Props for the `Button` component.
 */
type Props = {
  /**
   * The size of the button. Defaults to `'md'`.
   */
  size?: ButtonSize;

  /**
   * The visual style of the button. Defaults to `'primary'`.
   */
  variant?: 'primary' | 'secondary' | 'tertiary';

  /**
   * Whether the button is disabled.
   */
  disabled?: boolean;

  /**
   * Optional icon displayed before the button's children.
   */
  leadingIcon?: React.ReactElement;

  /**
   * Optional icon displayed after the button's children.
   */
  trailingIcon?: React.ReactElement;

  /**
   * Button content.
   */
  children: React.ReactNode;

  /**
   * Click event handler.
   */
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

  /**
   * Additional class names to apply to the button.
   */
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;


const Button: React.FC<Props> = ({
                                         size = 'md',
                                         variant = 'primary',
                                         leadingIcon,
                                         trailingIcon,
                                         disabled,
                                         children,
                                         onClick,
                                         className = '',

                                         ...props
                                       }) => {
  const baseClasses =
    'inline-flex items-center justify-center font- rounded-md focus:outline-none focus-visible:ring-2 ' +
    'focus-visible:ring-offset-2 transition';

  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-md',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-6 py-3 text-xl ',
  };

  const variantClasses: Record<typeof variant, string> = {
    primary: 'border border-primary bg-primary text-white hover:bg-naturals-850',
    secondary: 'border border-default bg-secondary text-black hover:border-naturals-400',
    tertiary: 'border border-secondary text-primary bg-transparent hover:bg-grayscale-50',
  };

  const disabledClasses: Record<typeof variant, string> = {
    primary: 'bg-default text-white cursor-not-allowed',
    secondary: 'bg-naturals-100 text-default cursor-not-allowed',
    tertiary: 'bg-transparent border-default text-default cursor-not-allowed',
  };


  const classes = twMerge(baseClasses, sizeClasses[size], (disabled ? disabledClasses[variant] : variantClasses[variant]), className);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (disabled) return;
    if (onClick) {
      onClick(e);
    }
  };


  return (
    <button
      className={classes}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {leadingIcon && <span
        className="mr-2">{leadingIcon}</span>}
      {children}
      {trailingIcon && <span
        className="ml-2">{trailingIcon}</span>}
    </button>
  );
};

export default Button;
