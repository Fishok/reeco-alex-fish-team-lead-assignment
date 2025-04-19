import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Toggle from '../../system-toolkit/Toggle';

describe('Toggle', () => {
  it('renders active state', () => {
    const { container } = render(<Toggle isOn={true} onToggle={() => {}} />);
    expect(container.firstChild).toHaveClass('bg-green-600');
  });

  it('calls onToggle when clicked', async () => {
    const onToggle = vi.fn();
    const { getByTestId } = render(<Toggle isOn={false} onToggle={onToggle} />);
    await userEvent.click(getByTestId('toggle'));
    expect(onToggle).toHaveBeenCalled();
  });
});
