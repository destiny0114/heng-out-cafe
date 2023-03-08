import styles from "@styles/Carousel.module.css";
import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { CarouselPaginate, NextButton, PrevButton } from "@components/CarouselPaginate";
import { SLIDES_SCROLL, SLIDE_COUNT, slides, mediaByIndex } from "@constant/media";

export const Carousel = React.forwardRef<HTMLDivElement>((props, ref) => {
  const [viewportRef, embla] = useEmblaCarousel({
    slidesToScroll: SLIDES_SCROLL,
    skipSnaps: false,
    loop: true,
    align: "start",
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
    setSlideIndex(embla.selectedScrollSnap() + 1);
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();

    return () => {
      embla.off("select", onSelect);
    };
  }, [embla, onSelect]);

  return (
    <div ref={ref} className={styles.embla}>
      <div className={styles.embla__viewport} ref={viewportRef}>
        <div className={styles.embla__container}>
          {slides.map((index) => (
            <div className={styles.embla__slide} key={index}>
              <div className={styles.embla__slide__inner}>
                <img className={styles.embla__slide__img} src={mediaByIndex(index)} alt={index.toString()} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <CarouselPaginate>
        <PrevButton enabled={prevBtnEnabled} onClick={scrollPrev} />
        <NextButton enabled={nextBtnEnabled} onClick={scrollNext} />
        <h5 className={styles.paginate__text}>
          {slideIndex * SLIDES_SCROLL} / {SLIDE_COUNT}
        </h5>
      </CarouselPaginate>
    </div>
  );
});

Carousel.displayName = "Carousel";
