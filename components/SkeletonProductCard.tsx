import styles from "@styles/SkeletonProductCard.module.css";
import Skeleton from "@components/Skeleton";
import Shimmer from "@components/Shimer";

const SkeletonProductCard = () => {
  return (
    <div className={styles.skeleton_wrapper}>
      <div className={styles.skeleton_product_card}>
        <Skeleton type="thumbnail" />
        <Skeleton type="text" />
        <Skeleton type="button" />
      </div>
      <Shimmer />
    </div>
  );
};

export default SkeletonProductCard;
