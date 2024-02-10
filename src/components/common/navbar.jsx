import styles from "../../styles/common/navbar.module.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className={styles.navContainer}>
      <div className={styles.navTitle}>Test</div>
      <ul className={styles.navMenu}>
        <li className={styles.navItem}></li>
        <li className={styles.navItem}></li>
        <li className={styles.navItem}></li>
      </ul>
    </div>
  );
}

export default Navbar;
