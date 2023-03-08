import classNames from "classnames";
import styles from "@styles/Skeleton.module.css";

type SkeletonProps = { type: string };

const Skeleton = ({ type }: SkeletonProps) => {
  return <div className={classNames(styles.skeleton, styles[type])}></div>;
};

export default Skeleton;
