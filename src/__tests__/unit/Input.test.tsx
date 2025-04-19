import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Input from '@/system-toolkit/input';

describe('Input', () => {
  it('renders with label and placeholder', () => {
    render(
      <Input
        value=""
        onChange={() => {}}
        label="Email"
        placeholder="Enter email"
      />
    );

    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
  });

  it('calls onChange when typing', async () => {
    const handleChange = vi.fn();
    render(<Input value="" onChange={handleChange} />);
    await userEvent.type(screen.getByRole('textbox'), 'hello');
    expect(handleChange).toHaveBeenCalledTimes(5);
  });

  it('calls onClear when trailingIcon is clicked', async () => {
    const handleClear = vi.fn();
    render(
      <Input
        value="abc"
        onChange={() => {}}
        onClear={handleClear}
        trailingIcon={<span>X</span>}
      />
    );
    await userEvent.click(screen.getByText('X'));
    expect(handleClear).toHaveBeenCalled();
  });

  it('shows validation error for invalid email', () => {
    render(<Input value="invalid-email" type="email" onChange={() => {}} />);
    expect(screen.getByTestId('error')).toHaveTextContent('Please enter a valid email address');
  });

  it('does not show error for valid email', () => {
    render(<Input value="user@example.com" type="email" onChange={() => {}} />);
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
  });

  it('renders leading and trailing icons', () => {
    render(
      <Input
        value=""
        onChange={() => {}}
        leadingIcon={<span data-testid="icon-left">L</span>}
        trailingIcon={<span data-testid="icon-right">R</span>}
      />
    );

    expect(screen.getByTestId('icon-left')).toBeInTheDocument();
    expect(screen.getByTestId('icon-right')).toBeInTheDocument();
  });
});
