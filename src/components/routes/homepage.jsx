import styles from "../../styles/routes/homepage.module.css";

function Homepage() {
  return (
    <div className={styles.content}>
      <h1 className={styles.title}>Welcome to My shopping page!</h1>
      <h2 className={styles.subtitle}>
        search for products or click on the buttons above to navigate!
      </h2>
    </div>
  );
}

export default Homepage;
