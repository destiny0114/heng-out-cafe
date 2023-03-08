import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import classNames from "classnames";

import styles from "@styles/MultiRangeSlider.module.css";

type MultiRangeSliderProps = { min: number; max: number; onChange: Function };

const MultiRangeSlider = ({ min, max, onChange }: MultiRangeSliderProps) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = useCallback((value: number) => Math.round(((value - min) / (max - min)) * 100), [min, max]);

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value); // Precede with '+' to convert the value from type string to type number

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div className={styles.slider__wrapper}>
      <h1>Filter By</h1>
      <h5>Price</h5>
      <div className={styles.slider__container}>
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          ref={minValRef}
          className={classNames(styles.thumb, minVal > max - 100 ? styles.thumb__zindex_3 : styles.thumb__zindex_5)}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const value = Math.min(+event.target.value, maxVal - 1);
            setMinVal(value);
            event.target.value = value.toString();
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          ref={maxValRef}
          className={classNames(styles.thumb, styles.thumb__zindex_4)}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const value = Math.max(+event.target.value, minVal + 1);
            setMaxVal(value);
            event.target.value = value.toString();
          }}
        />

        <div className={styles.slider}>
          <div className={styles.slider__track} />
          <div ref={range} className={styles.slider__range} />
          <div className={styles.slider__left_value}>RM {minVal}</div>
          <div className={styles.slider__right_value}>RM {maxVal}</div>
        </div>
      </div>
    </div>
  );
};

export default MultiRangeSlider;
