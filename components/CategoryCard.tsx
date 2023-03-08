import styles from "@styles/CategoryCard.module.css";

export type CategoryCardProps = {
  icon: JSX.Element;
  label: string;
};

export const CategoryCard = ({ icon, label }: CategoryCardProps) => {
  return (
    <div className={styles.product}>
      {icon}
      <h1>{label}</h1>
    </div>
  );
};
