import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "@styles/ProductModal.module.css";
import CloseIcon from "@assets/images/close.svg";

type ProductModalProps = {
  show: boolean;
  onClose: () => void | undefined;
  children: React.ReactNode;
};

const ProductModal = ({ show, onClose, children }: ProductModalProps) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modelContent = show ? (
    <div className={styles.overlay}>
      <svg className={styles.art} xmlns="http://www.w3.org/2000/svg" width="358" height="421" fill="none" viewBox="0 0 358 421">
        <path
          fill="#97B0C1"
          fillRule="evenodd"
          d="M338.984-231.695c128.405 5.377 211.323 118.806 252.49 240.552 43.217 127.808 58.918 281.179-48.447 362.88-112.763 85.809-268.429 48.85-382.944-34.605-113.91-83.015-190.59-218.093-148.302-352.55 43.365-137.885 182.786-222.325 327.203-216.277Z"
          clipRule="evenodd"
        />
      </svg>
      <div className={styles.modal}>
        <div className={styles.header}>
          <button onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(modelContent, document.getElementById("modal-root") as HTMLElement);
  } else {
    return null;
  }
};

export default ProductModal;
