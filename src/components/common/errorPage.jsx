import { Link } from "react-router-dom";
import styles from "../../styles/common/errorPage.module.css";
const ErrorPage = () => {
  return (
    <div className={styles.container}>
      <h1>Oh no, this route doesn&apos;t exist!</h1>
      <Link to="/">Click here to go back home</Link>
    </div>
  );
};

export default ErrorPage;
