import React from 'react';
import { twMerge } from 'tailwind-merge';
import { useValidation } from './useValidation';

/**
 * Props for the `Input` component.
 */
type Props = {
  /**
   * The current value of the input.
   */
  value: string;

  /**
   * Optional label displayed above the input.
   */
  label?: React.ReactNode;

  /**
   * Placeholder text shown when the input is empty.
   * Defaults to `'Placeholder'`.
   */
  placeholder?: string;

  /**
   * Handler called when the input value changes.
   *
   * @param value - The updated input value.
   */
  onChange: (value: string) => void;

  /**
   * Optional function to call when clearing the input.
   */
  onClear?: () => void;

  /**
   * Optional icon displayed at the start of the input field.
   */
  leadingIcon?: React.ReactElement;

  /**
   * Optional icon displayed at the end of the input field.
   */
  trailingIcon?: React.ReactElement;

  /**
   * Type of input. Defaults to `'text'`.
   */
  type?: 'email' | 'password' | 'text';

  /**
   * Additional class names to apply to the outer wrapper.
   */
  className?: string;
};

/**
 * A styled input component with optional icons, validation, and error display.
 *
 * Supports validation via the `useValidation` hook and adjusts styling dynamically based on error state.
 *
 * @param props - Input configuration and behavior handlers.
 * @returns The rendered input element.
 */
const Input: React.FC<Props> = ({
                                       value,
                                       label,
                                       placeholder = 'Placeholder',
                                       onChange,
                                       onClear,
                                       leadingIcon,
                                       trailingIcon,
                                       className,
                                       type = 'text',
                                     }) => {
  const errorMessage = useValidation(value, type);

  return (
    <div className={twMerge('w-64', className)}>
      {label && (
        <div className="text-sm text-naturals-800 leading-[18px] mb-2">
          {label}
        </div>
      )}
      <div
        className={twMerge(
          `flex items-center w-full h-[32px] px-4 py-2 gap-2 border rounded-[4px] bg-secondary ${
            errorMessage ? 'border-red-500' : 'border-naturals-200'
          }`
        )}
      >
        {leadingIcon && (
          <div className="flex items-center justify-center">{leadingIcon}</div>
        )}
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent outline-none text-primary text-sm"
        />
        {trailingIcon && (
          <div className="cursor-pointer" onClick={onClear}>
            {trailingIcon}
          </div>
        )}
      </div>

      {errorMessage && (
        <span data-testid="error" className="text-red-500 text-xs">{errorMessage}</span>
      )}
    </div>
  );
};

export default Input;
