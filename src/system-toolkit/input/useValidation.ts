import { useEffect, useState } from 'react';
import validator from 'email-validator';
import PasswordValidator from 'password-validator';

const passwordSchema = new PasswordValidator()
  .is().min(8)
  .is().max(100)
  .has().uppercase()
  .has().lowercase()
  .has().digits()
  .has().not().spaces();

export const useValidation = (value: string, type: 'email' | 'password' | 'text') => {
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!value) {
      setErrorMessage('');
      return;
    }

    if (type === 'email' && !validator.validate(value)) {
      setErrorMessage('Please enter a valid email address');
    } else if (type === 'password' && !passwordSchema.validate(value)) {
      setErrorMessage(
        'Password must be at least 8 characters long, include uppercase, lowercase, and a digit, and have no spaces.'
      );
    } else {
      setErrorMessage('');
    }
  }, [value, type]);

  return errorMessage;
};
