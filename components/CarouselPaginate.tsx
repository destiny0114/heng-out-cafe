import styles from "@styles/CarouselPaginate.module.css";

type PaginateProps = {
  children?: React.ReactNode;
};

type ButtonProps = {
  enabled: boolean;
  onClick: () => void | undefined;
};

export const PrevButton = ({ enabled, onClick }: ButtonProps) => (
  <button className={`${styles.embla__button} ${styles.embla__button__prev}`} onClick={onClick} disabled={!enabled}>
    <svg className={styles.embla__button__svg} viewBox="0 0 51 41">
      <path d="m1.614 20.489-.363.343-.325-.343.325-.344.363.344Zm18.902-19.28L1.978 20.833l-.727-.687L19.789.523l.727.687ZM1.978 20.146l18.538 19.622-.727.687L1.25 20.832l.727-.687Zm-.364-.156H51.05v1H1.614v-1Z" />
    </svg>
  </button>
);

export const NextButton = ({ enabled, onClick }: ButtonProps) => (
  <button className={`${styles.embla__button} ${styles.embla__button__next}`} onClick={onClick} disabled={!enabled}>
    <svg className={styles.embla__button__svg} viewBox="0 0 51 41">
      <path d="m50.291 20.489.364.343.325-.343-.325-.344-.364.344ZM31.36 1.21l18.57 19.622.726-.687L32.085.523l-.726.687Zm18.57 18.935L31.36 39.767l.726.687 18.57-19.622-.727-.687Zm.362-.156H.773v1H50.29v-1Z" />
    </svg>
  </button>
);

export const CarouselPaginate = ({ children }: PaginateProps) => {
  return (
    <div className={styles.paginate}>
      <div className={styles.embla__button__wrapper}>{children}</div>
    </div>
  );
};
