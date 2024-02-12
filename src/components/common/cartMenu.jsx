import styles from "../../styles/common/cartMenu.module.css";

function CartDropdown() {
  return (
    <>
      <input id={styles.menuToggle} type="checkbox" />
      <label className={styles.menuButtonContainer} htmlFor={styles.menuToggle}>
        <div className={styles.menuButton}></div>
      </label>
      <ul className={styles.menu}>
        <li>Test</li>
        <li>Test</li>
        <li>Test</li>
      </ul>
    </>
  );
}

export default CartDropdown;
