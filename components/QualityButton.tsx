import styles from "@styles/QualityButton.module.css";

type ButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
};

export const MinusButton = ({ onClick, disabled }: ButtonProps) => (
  <button className={styles.button} disabled={disabled} onClick={onClick || undefined}>
    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="none" viewBox="0 0 45 45">
      <path
        fill="#fff"
        d="M2.344 13.594c0-6.213 5.037-11.25 11.25-11.25h17.812c6.214 0 11.25 5.037 11.25 11.25v17.812c0 6.214-5.036 11.25-11.25 11.25H13.594c-6.213 0-11.25-5.036-11.25-11.25V13.594Z"
      />
      <path
        fill="#8F9DAB"
        fillRule="evenodd"
        d="M33.466 22.508a1.19 1.19 0 0 1-1.191 1.191H12.71a1.191 1.191 0 1 1 0-2.383h19.565c.658 0 1.191.534 1.191 1.192Z"
        clipRule="evenodd"
      />
    </svg>
  </button>
);

export const AddButton = ({ onClick, disabled }: ButtonProps) => (
  <button className={styles.button} disabled={disabled} onClick={onClick || undefined}>
    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="none" viewBox="0 0 45 45">
      <path
        fill="#fff"
        d="M2.344 13.594c0-6.213 5.037-11.25 11.25-11.25h17.812c6.214 0 11.25 5.037 11.25 11.25v17.812c0 6.214-5.036 11.25-11.25 11.25H13.594c-6.213 0-11.25-5.036-11.25-11.25V13.594Z"
      />
      <path
        fill="#8F9DAB"
        fillRule="evenodd"
        d="M22.546 11.857c.625 0 1.131.506 1.13 1.13v18.566a1.13 1.13 0 0 1-2.26 0V12.987c0-.624.506-1.13 1.13-1.13Z"
        clipRule="evenodd"
      />
      <path
        fill="#8F9DAB"
        fillRule="evenodd"
        d="M33.466 22.508a1.19 1.19 0 0 1-1.191 1.191H12.71a1.191 1.191 0 1 1 0-2.383h19.565c.658 0 1.191.534 1.191 1.192Z"
        clipRule="evenodd"
      />
    </svg>
  </button>
);
