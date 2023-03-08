import { useEffect, useRef } from "react";
import { gsap } from "@libs/gsap";
import styles from "@styles/About.module.css";

export default function AboutPage() {
  const page = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const placeRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const aboutTimeLine = useRef<gsap.core.Timeline>(gsap.timeline());

  useEffect(() => {
    const ctx = gsap.context(() => {
      aboutTimeLine.current
        .from(frameRef.current, { x: -500, opacity: 0, duration: 2 })
        .to(placeRef.current, { opacity: 1, duration: 2 })
        .to(contentRef.current, { opacity: 1 });
    }, page);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <main ref={page} className={styles.hero}>
      <section className={styles.artwork}>
        <div ref={frameRef} className={styles.frame}></div>
        <img ref={placeRef} src="/static/about.jpg" alt="about" />
      </section>
      <section className={styles.about}>
        <div ref={contentRef}>
          <h1>About Heng Out Cafe</h1>
          <p>
            Born out of a passion to create that perfect café-styled environment where good coffee and sublime food are not merely enjoyed, but
            appreciated.
          </p>
        </div>
      </section>
    </main>
  );
}
