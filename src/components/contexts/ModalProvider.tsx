import { useCallback, useMemo, useState, type Context, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { AppDialog } from "../common/AppDialog";
import { ConfirmContent } from "../common/ConfirmContent";
import { ModalContext, type ButtonColor, type ModalContextType } from "./ModalContext";

const DEFAULT_WIDTH = 600;
const CONFIRM_WIDTH = 440;

type Props = {
  children?: ReactNode;
  context?: Context<ModalContextType>;
};

type ConfirmOptions<T> = {
  title: string;
  description: string;
  confirmText: string;
  cancelText?: string;
  confirmColor: ButtonColor;
  onConfirm?: (data?: T) => void;
  data?: T;
  width?: number;
};

export const ModalProvider = ({ children, context }: Props) => {
  const { t } = useTranslation();
  const [titleModal, setTitleModal] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [component, setComponent] = useState<ReactNode>(null);
  const [footerComponent, setFooterComponent] = useState<ReactNode>(null);
  const [widthModal, setWidthModal] = useState(DEFAULT_WIDTH);
  const [unmountOnClose, setUnmountOnClose] = useState(true);
  const [isWarning, setIsWarning] = useState(false);

  const handleClose = useCallback(() => setOpenModal(false), []);

  const displayModal = useCallback<ModalContextType["displayModal"]>(
    (title, open, content, width, footer, unmount = true, warning = false) => {
      setTitleModal(title);
      setOpenModal(open);
      setComponent(content);
      setWidthModal(width || DEFAULT_WIDTH);
      setFooterComponent(footer);
      setUnmountOnClose(unmount);
      setIsWarning(warning);
    },
    []
  );

  const displayConfirm = useCallback(
    <T,>(options: ConfirmOptions<T>) => {
      displayModal(
        options.title,
        true,
        <ConfirmContent
          description={options.description}
          data={options.data}
          onCancel={handleClose}
          onConfirm={options.onConfirm}
          confirmButtonText={options.confirmText}
          cancelButtonText={options.cancelText || t("common.cancel")}
          confirmButtonColor={options.confirmColor}
        />,
        options.width || CONFIRM_WIDTH
      );
    },
    [displayModal, handleClose, t]
  );

  const actions = useMemo<ModalContextType>(
    () => ({
      setOpenModal,
      setTitleModal,
      handleClose,
      displayModal,
      displayConfirmModal: (onConfirm, title, description, confirmText, cancelText, color, data, width) =>
        displayConfirm({
          title: title || t("common.confirm"),
          description: description || t("common.areYouSure"),
          confirmText: confirmText || t("common.confirm"),
          cancelText,
          confirmColor: color ?? "primary",
          onConfirm,
          data,
          width,
        }),
      displayConfirmDeleteModal: (onConfirm, resourceName, data, title, width) =>
        displayConfirm({
          title: title || t("common.remove"),
          description: resourceName
            ? t("common.confirmRemove", { name: resourceName })
            : t("common.confirmRemoveGeneric"),
          confirmText: t("common.remove"),
          confirmColor: "error",
          onConfirm,
          data,
          width,
        }),
      displayConfirmSubmitModal: (onConfirm, description, data, title, width) =>
        displayConfirm({
          title: title || t("common.submit"),
          description: description || t("common.confirmSubmit"),
          confirmText: t("common.submit"),
          confirmColor: "primary",
          onConfirm,
          data,
          width,
        }),
      displayConfirmSaveModal: (onConfirm, description, data, title, width) =>
        displayConfirm({
          title: title || t("common.save"),
          description: description || t("common.areYouSure"),
          confirmText: t("common.save"),
          confirmColor: "primary",
          onConfirm,
          data,
          width,
        }),
    }),
    [handleClose, displayModal, displayConfirm, t]
  );

  const Ctx = context ?? ModalContext;

  return (
    <Ctx.Provider value={actions}>
      {(openModal || !unmountOnClose) && (
        <AppDialog
          title={titleModal}
          open={openModal}
          onClose={handleClose}
          width={widthModal}
          footer={footerComponent}
          isWarning={isWarning}
          keepMounted={!unmountOnClose}
        >
          {component}
        </AppDialog>
      )}
      {children}
    </Ctx.Provider>
  );
};
