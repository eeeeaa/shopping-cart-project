import styles from "../../styles/common/navbar.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [searchVal, setSearchVal] = useState("");
  const navigate = useNavigate();
  const goToSearchPage = (value) =>
    navigate({
      pathname: "/search",
      search: `?searchkey=${value}`,
    });

  return (
    <div className={styles.navContainer}>
      <div className={styles.navLeftContent}>
        <div className={styles.navTitle}>Test</div>
        <div className={styles.searchBox}>
          <input
            className={styles.searchInput}
            type="text"
            name=""
            placeholder="Search"
            onChange={(e) => setSearchVal(e.target.value)}
          />
          <button
            className={styles.searchButton}
            onClick={() => goToSearchPage(searchVal)}
          >
            S
          </button>
        </div>
      </div>
      <ul className={styles.navMenu}>
        <Link to="/">
          <li className={styles.navItem}>Home</li>
        </Link>
        <li className={styles.navItem}>Cart</li>
      </ul>
    </div>
  );
}

export default Navbar;
