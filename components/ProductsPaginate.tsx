import styles from "@styles/ProductsPaginate.module.css";

type PaginateProps = {
  children?: React.ReactNode;
  onClick: () => void | undefined;
};

export const ProductsPaginate = ({ onClick }: PaginateProps) => {
  return (
    <div className={styles.paginate}>
      <div className={styles.embla__button__wrapper}>
        <button onClick={onClick}>Load More</button>
      </div>
    </div>
  );
};
