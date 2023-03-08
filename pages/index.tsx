import { createRef, useEffect, useRef } from "react";
import styles from "@styles/Home.module.css";
import BreadIcon from "@assets/images/bread.svg";
import SandwichIcon from "@assets/images/sandwich.svg";
import DessertIcon from "@assets/images/dessert.svg";
import DrinksIcon from "@assets/images/drinks.svg";
import { CategoryCard, CategoryCardProps } from "@components/CategoryCard";
import { Carousel } from "@components/Carousel";
import { gsap, ScrollTrigger } from "@libs/gsap";
import useRefs from "hooks/useRefs";

const categoryCards: CategoryCardProps[] = [
  {
    icon: <BreadIcon />,
    label: "Breads",
  },
  {
    icon: <SandwichIcon />,
    label: "Sandwichs",
  },
  {
    icon: <DessertIcon />,
    label: "Desserts",
  },
  {
    icon: <DrinksIcon />,
    label: "Drinks",
  },
];

export default function HomePage() {
  const page = useRef<HTMLElement>(null);
  const { elements: introHeadings, addToRefs: headingRefs } = useRefs<HTMLElement[]>([]);
  const introLineRef = useRef<HTMLElement>(null);
  const categoriesRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const galleryHeadingRef = useRef<HTMLHeadingElement>(null);
  const galleryLineRef = useRef<HTMLElement>(null);
  const { elements: galleryImages, addToRefs: galleryImageRefs } = useRefs<HTMLElement[]>([]);
  const galleryContentRef = useRef<HTMLParagraphElement>(null);
  const placeRef = useRef<HTMLElement>(null);
  const placeHeadingRef = useRef<HTMLHeadingElement>(null);
  const placeLineRef = useRef<HTMLElement>(null);
  const { elements: placeReviews, addToRefs: placeReviewRefs } = useRefs<HTMLElement[]>([]);
  const specialtiesRef = useRef<HTMLElement>(null);
  const specialtiesDividerRef = useRef<HTMLHeadingElement>(null);
  const specialtiesHeadingRef = useRef<HTMLHeadingElement>(null);
  const specialtiesCarouselRef = createRef<HTMLDivElement>();
  const introTextTimeLine = useRef<gsap.core.Timeline>(gsap.timeline());
  const categoryCardsTimeLine = useRef<gsap.core.Timeline>(gsap.timeline());
  const galleryTimeLine = useRef<gsap.core.Timeline>(gsap.timeline());
  const placeTimeLine = useRef<gsap.core.Timeline>(gsap.timeline());
  const specialtiesTimeLine = useRef<gsap.core.Timeline>(gsap.timeline());

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: categoriesRef.current,
        start: "top bottom-=50",
        toggleActions: "play none none reset",
        animation: categoryCardsTimeLine.current,
      });

      ScrollTrigger.create({
        trigger: galleryRef.current,
        start: "top bottom",
        toggleActions: "play none none reset",
        animation: galleryTimeLine.current,
      });

      ScrollTrigger.create({
        trigger: placeRef.current,
        start: "top bottom",
        toggleActions: "play none none reset",
        animation: placeTimeLine.current,
      });

      ScrollTrigger.create({
        trigger: specialtiesRef.current,
        start: "top bottom",
        toggleActions: "play none none reset",
        animation: specialtiesTimeLine.current,
      });

      introTextTimeLine.current
        .to(introHeadings, { y: 0, duration: 1, delay: 0.2, stagger: 1 })
        .to(introLineRef.current, { width: "50%", delay: 0.3 });

      categoryCardsTimeLine.current.fromTo(
        [categoriesRef.current?.children],
        { opacity: 0 },
        {
          opacity: 1,
          duration: 2,
          stagger: 0.5,
        }
      );

      galleryTimeLine.current
        .to(galleryHeadingRef.current, { opacity: 1, duration: 1 })
        .to(galleryLineRef.current, { width: "15%" })
        .from(galleryImages[0], { x: -500, opacity: 0 })
        .from([galleryImages[1], galleryImages[2]], { x: 500, opacity: 0, stagger: 0.5 })
        .from(galleryContentRef.current, { opacity: 0, delay: 0.5 });

      placeTimeLine.current
        .to(placeHeadingRef.current, { opacity: 1, duration: 1 })
        .to(placeLineRef.current, { width: "45%" })
        .to([placeReviews], { opacity: 1, stagger: 1 });

      specialtiesTimeLine.current
        .to(specialtiesDividerRef.current, { flex: 1, duration: 2 })
        .to(specialtiesHeadingRef.current, { opacity: 1 })
        .to(specialtiesCarouselRef.current, { opacity: 1 });
    }, page);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <main ref={page} className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.intro_text}>
          <h1>
            <span ref={headingRefs} className={styles.content}>
              Delicious bread Full of Love
            </span>
          </h1>
          <span ref={introLineRef} className={styles.spacer}></span>
          <h5>
            <span ref={headingRefs} className={styles.content}>
              Always share your bread of happiness with your special people.
            </span>
          </h5>
        </div>
      </section>
      <section ref={categoriesRef} className={styles.categories}>
        {categoryCards.map((card, i) => (
          <CategoryCard key={i} icon={card.icon} label={card.label} />
        ))}
      </section>
      <section ref={galleryRef} className={styles.gallery}>
        <h1>
          <span ref={galleryHeadingRef} className={styles.title}>
            What We Do
          </span>
          <span ref={galleryLineRef} className={styles.spacer}></span>
        </h1>
        <div className={styles.images_grid}>
          <img ref={galleryImageRefs} src="/static/gallery-1.jpg" alt="gallery" />
          <img ref={galleryImageRefs} src="/static/gallery-2.jpg" alt="gallery" />
          <img ref={galleryImageRefs} src="/static/gallery-3.jpg" alt="gallery" />
          <p ref={galleryContentRef}>
            Oven bake ready and simple to prepare, our bakers have ensured all the hard work has been done so you can enjoy amazing bakes straight
            from your oven, every time.
          </p>
        </div>
      </section>
      <section ref={placeRef} className={styles.place}>
        <div className={styles.block}></div>

        <div className={styles.content}>
          <h1>
            <span ref={placeHeadingRef} className={styles.title}>
              Plan a visit
            </span>
            <span ref={placeLineRef} className={styles.spacer}></span>
          </h1>
          <div ref={placeReviewRefs} className={styles.review}>
            Home to a warm and welcoming vibe where life’s simplicities are delighted in, Heng Out Cafe affords the perfect setting for experiences to
            be had and memories to be made.
          </div>
          <div ref={placeReviewRefs} className={styles.review}>
            Complete with chic interiors to settle into, Heng Out Cafe will allow for enjoyable moments regardless of the time of the day that one
            chooses to call by.
          </div>
          <div ref={placeReviewRefs} className={styles.review}>
            At our cafe in Borehamwood, one can pick and choose from a wide array of freshly ground coffees, cold beverages and splendid café-themed
            cuisine that will more or less set the mood and tone for the discerning gourmet connoisseur.
          </div>
          <div className={styles.place_image}>
            <img src="/static/place.jpg" alt="place" />
          </div>
        </div>
      </section>
      <section ref={specialtiesRef} className={styles.specialties}>
        <h1>
          <span ref={specialtiesDividerRef} className={styles.divider}></span>
          <span ref={specialtiesHeadingRef} className={styles.title}>
            Our Specialties
          </span>
        </h1>
        <Carousel ref={specialtiesCarouselRef} />
      </section>
    </main>
  );
}
