import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import classNames from "classnames";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import styles from "@styles/Navbar.module.css";
import Logo from "@assets/images/logo.svg";
import ProfileIcon from "@assets/images/profile.svg";
import CartIcon from "@assets/images/cart.svg";
import { gsap } from "@libs/gsap";
import useScrollPositon from "@hooks/useScrollPosition";

type NavbarProps = {
  notifyCart: boolean;
};

const Navbar = ({ notifyCart }: NavbarProps) => {
  const router = useRouter();
  const scrollPosition = useScrollPositon();
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const navBarStyles = useMemo(() => {
    if (router.pathname === "/") {
      if (scrollPosition > 50) {
        return classNames(styles.navbar, styles.fixed, styles.scrolled);
      }
      return classNames(styles.navbar, styles.fixed);
    }

    return styles.navbar;
  }, [router.pathname, scrollPosition]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo([logoRef.current, "li"], { y: -50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.25, duration: 1.5 });
    }, navRef);

    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
    };

    const handleStop = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <nav className={navBarStyles} ref={navRef}>
      <div className={styles.links}>
        <div className={styles.logo} ref={logoRef}>
          <Logo />
        </div>
        <ul>
          <li className={(router.pathname === "/" && styles.active) || ""}>
            <Link href="/">Home</Link>
          </li>
          <li className={(router.pathname === "/about" && styles.active) || ""}>
            <Link href="/about">About</Link>
          </li>
          <li className={(router.pathname === "/menu" && styles.active) || ""}>
            <Link href="/menu">Menu</Link>
          </li>
        </ul>
      </div>

      <div className={styles.actions}>
        <div className={styles.icon}>
          <Link href="/login">
            <ProfileIcon />
          </Link>
        </div>
        <div className={styles.icon}>
          <Link href="/cart">
            <div className={styles.cart_wrapper}>
              <CartIcon />
              {notifyCart && <div className={styles.cart_notification}></div>}
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
