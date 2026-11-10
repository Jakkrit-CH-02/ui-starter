import { createContext, useContext, type Dispatch, type ReactNode, type SetStateAction } from "react";

export type ButtonColor = "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";

export type ModalContextType = {
  handleClose: () => void;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setTitleModal: Dispatch<SetStateAction<string>>;
  /** Opens a dialog with any content. */
  displayModal: (
    title: string,
    open: boolean,
    component: ReactNode,
    width?: number,
    footerComponent?: ReactNode,
    unmountOnClose?: boolean,
    isWarning?: boolean
  ) => void;
  /**
   * Confirm dialogs. `onConfirm` receives `data` back; the dialog stays open
   * until you call `handleClose`, so async work can finish first.
   */
  displayConfirmModal: <T>(
    onConfirm: (data?: T) => void,
    title?: string,
    description?: string,
    confirmButtonText?: string,
    cancelButtonText?: string,
    confirmButtonColor?: ButtonColor,
    data?: T,
    width?: number
  ) => void;
  displayConfirmDeleteModal: <T>(
    onConfirm: (data?: T) => void,
    resourceName?: string,
    data?: T,
    title?: string,
    width?: number
  ) => void;
  displayConfirmSubmitModal: <T>(
    onConfirm: (data?: T) => void,
    description?: string,
    data?: T,
    title?: string,
    width?: number
  ) => void;
  displayConfirmSaveModal: <T>(
    onConfirm: (data?: T) => void,
    description?: string,
    data?: T,
    title?: string,
    width?: number
  ) => void;
};

export const ModalContext = createContext<ModalContextType>({} as ModalContextType);
export const useModal = () => useContext(ModalContext);

/**
 * A second, independent modal layer. Wrap a subtree with
 * `<ModalProvider context={ModalContextExtra}>` to open a dialog on top of
 * the main one.
 */
export const ModalContextExtra = createContext<ModalContextType>({} as ModalContextType);
export const useModalExtra = () => useContext(ModalContextExtra);
