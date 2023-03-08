import styles from "@styles/FilterSideBar.module.css";
import { FILTER_CRITERIA as filterCriteria } from "@constant/criteria";

type FilterSideBarProps = {
  onFilterCriteriaClicked: (criteria: string) => void;
};

const FilterSideBar = ({ onFilterCriteriaClicked }: FilterSideBarProps) => {
  const renderedFilterCriteria = filterCriteria.map((part) => (
    <div key={part.label} className={styles.criteria}>
      <h1>{part.label}</h1>
      {part.criteria.map((criteria, i) => (
        <h1 key={criteria} onClick={() => onFilterCriteriaClicked(part.key[i])}>
          {criteria}
        </h1>
      ))}
    </div>
  ));

  return <div className={styles.criteria_wrapper}>{renderedFilterCriteria}</div>;
};

export default FilterSideBar;
