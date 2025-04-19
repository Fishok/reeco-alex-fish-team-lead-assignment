import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import CloseIcon from '@/shared/icons/x-mark.svg?react';
import Button from './Button.tsx';

/**
 * Props for the `Modal` component.
 */
type ModalProps = {
  /**
   * Callback to close the modal.
   */
  close: () => void;

  /**
   * Title of the modal (can be string, JSX, etc.).
   */
  title: React.ReactNode;

  /**
   * Text for the confirm button. Defaults to `"Ok"`.
   */
  confirmText?: string;

  /**
   * Text for the cancel button. Defaults to `"Cancel"`.
   */
  cancelText?: string;

  /**
   * Optional function called when the confirm button is clicked.
   * Can be synchronous or return a Promise.
   */
  onConfirm?: () => void | Promise<void>;

  /**
   * Content of the modal body.
   */
  children: React.ReactNode;

  /**
   * If true, disables the confirm button.
   */
  disableConfirm?: boolean;
};

/**
 * A reusable modal component with confirm/cancel actions.
 *
 * Renders the modal in a portal to `document.body`, with a backdrop and header/footer sections.
 *
 * @param props - The modal configuration and content.
 * @returns The modal JSX element.
 */
const Modal: React.FC<ModalProps> = ({

                                       title,
                                       confirmText = 'Ok',
                                       cancelText = 'Cancel',
                                       close,
                                       children,
                                       onConfirm,
                                       disableConfirm,
                                     }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);


  return ReactDOM.createPortal(
    <div
      className="z-[100] fixed left-0 top-0 w-[100vw] h-[100vh] flex justify-center items-center bg-black/30 backdrop-blur-sm transition-opacity duration-300"
    >
      <div
        className="border border-naturals-200 rounded-lg overflow-hidden min-w-[525px] w-fit bg-white "
      >
        <div
          className="p-3 pl-4 flex justify-between text-primary border-b border-naturals-200 bg-naturals-50 items-center">
          <span>{title}</span>
          <CloseIcon data-testid="close-icon" className="cursor-pointer" onClick={close} />
        </div>
        <div>{children}</div>
        <div
          className={`p-3 flex justify-end border-t border-naturals-200`}
        >
          <div className="flex">
            <Button className="mr-2" variant="secondary" onClick={close}>
              {cancelText}
            </Button>
            <Button disabled={disableConfirm} onClick={onConfirm}>{confirmText}</Button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
