import { render, screen,  } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Modal from '@/system-toolkit/Modal.tsx';

describe('Modal', () => {
  it('renders with title and children', () => {
    render(
      <Modal close={() => {}} title="My Modal">
        <div data-testid="content">Hello modal</div>
      </Modal>
    );

    expect(screen.getByText('My Modal')).toBeInTheDocument();
    expect(screen.getByTestId('content')).toHaveTextContent('Hello modal');
  });

  it('calls close when Cancel button is clicked', async () => {
    const onClose = vi.fn();
    render(
      <Modal close={onClose} title="Title">
        Test
      </Modal>
    );

    await userEvent.click(screen.getByText('Cancel'));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls close when CloseIcon is clicked', async () => {
    const onClose = vi.fn();
    render(
      <Modal close={onClose} title="Title">
        Test
      </Modal>
    );

    const closeIcon = screen.getByTestId('close-icon'); // SVG icon as ReactComponent
    await userEvent.click(closeIcon);
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onConfirm when Ok button is clicked', async () => {
    const onConfirm = vi.fn();
    render(
      <Modal close={() => {}} onConfirm={onConfirm} title="Title">
        Test
      </Modal>
    );

    await userEvent.click(screen.getByText('Ok'));
    expect(onConfirm).toHaveBeenCalled();
  });

  it('disables confirm button when disableConfirm is true', () => {
    render(
      <Modal close={() => {}} disableConfirm title="Title">
        Test
      </Modal>
    );

    const confirmButton = screen.getByText('Ok');
    expect(confirmButton).toBeDisabled();
  });

  it('shows custom button texts', () => {
    render(
      <Modal
        close={() => {}}
        title="Custom"
        cancelText="Abort"
        confirmText="Confirm"
      >
        Test
      </Modal>
    );

    expect(screen.getByText('Abort')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });
});
