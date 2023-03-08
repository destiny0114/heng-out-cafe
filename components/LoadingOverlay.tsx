import styles from "@styles/LoadingOverlay.module.css";

export const LoadingOverlay = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <span className={styles.loader}></span>
      </div>
    </div>
  );
};
