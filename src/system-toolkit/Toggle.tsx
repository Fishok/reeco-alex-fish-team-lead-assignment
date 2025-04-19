import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

type ToggleProps = {
  isOn: boolean;
  onToggle: () => void;
};

const Toggle: FC<ToggleProps> = ({ isOn, onToggle }) => {
  return (
    <div
      data-testid="toggle"
      onClick={onToggle}
      className={twMerge(
        'w-10 h-5 flex items-center rounded-full cursor-pointer transition-colors duration-300',
        isOn ? 'bg-green-600' : 'bg-naturals-300',
      )}
    >
      <div
        data-testid="toggle-thumb"
        className={twMerge(
          'w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300',
          isOn ? 'translate-x-5' : 'translate-x-1',
        )}
      />
    </div>
  );
};

export default Toggle;
