import styles from "@styles/Footer.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.description}>
          <ul>
            <li>
              <h5>Main Menu</h5>
            </li>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/menu">Menu</Link>
            </li>
          </ul>
        </div>
        <div className={styles.description}>
          <ul>
            <li>
              <h5>Hours of Operation</h5>
            </li>
            <li>Food menu available until 3 p.m daily</li>
            <li>Tues–Fri: 8:30 a.m. – 4 p.m.</li>
            <li>Sat: 9 a.m. – 3 p.m.</li>
            <li>Sun-Mon: CLOSED</li>
          </ul>
        </div>
        <div className={styles.description}>
          <ul>
            <li>
              <h5>Address</h5>
            </li>
            <li>2037 Long Lake Rd, Block B, Unit 8B Sudbury, ON P3E 6J9</li>
          </ul>
        </div>
      </div>
      <div className={styles.copyright}>
        <h5>Copyright © 2022 Heng Out Cafe . All Rights Reserved</h5>
        <h5>
          <span>Made by </span>
          <span className={styles.creator}>
            <Link href="https://github.com/destiny0114">Keena Levine</Link>
          </span>
        </h5>
      </div>
    </footer>
  );
};

export default Footer;
