import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Button from '@/system-toolkit/Button.tsx';


describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });

  it('does not call onClick when disabled', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick} disabled>Disabled</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('applies correct variant and size classes', () => {
    const { container } = render(<Button variant="secondary" size="lg">Test</Button>);
    const button = container.querySelector('button')!;
    expect(button.className).toMatch(/border-default/);
    expect(button.className).toMatch(/py-3/);
  });

  it('renders leading and trailing icons', () => {
    render(
      <Button
        leadingIcon={<span data-testid="icon-left">L</span>}
        trailingIcon={<span data-testid="icon-right">T</span>}
      >
        Go
      </Button>
    );
    expect(screen.getByTestId('icon-left')).toBeInTheDocument();
    expect(screen.getByTestId('icon-right')).toBeInTheDocument();
  });

  it('is disabled when disabled={true}', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
