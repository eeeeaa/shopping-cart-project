import styles from "../../styles/common/navbar.module.css";
import CartDropdown from "./cartMenu";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Searchbox() {
  const [searchVal, setSearchVal] = useState("");
  const navigate = useNavigate();
  const goToSearchPage = (value) =>
    navigate({
      pathname: "/search",
      search: `?searchkey=${value}`,
    });

  return (
    <div className={styles.searchBox}>
      <input
        className={styles.searchInput}
        type="text"
        name=""
        placeholder="Search"
        onChange={(e) => setSearchVal(e.target.value)}
        onKeyDown={() => goToSearchPage(searchVal)}
      />
      <button
        className={styles.searchButton}
        onClick={() => goToSearchPage(searchVal)}
      >
        S
      </button>
    </div>
  );
}

function NavMenu() {
  return (
    <ul className={styles.navMenu}>
      <Link to="/">
        <li className={styles.navItem}>Home</li>
      </Link>
      <li>
        <CartDropdown />
      </li>
    </ul>
  );
}

function Navbar() {
  return (
    <div className={styles.navContainer}>
      <div className={styles.navLeftContent}>
        <div className={styles.navTitle}>Test</div>
        <Searchbox />
      </div>
      <NavMenu />
    </div>
  );
}

export default Navbar;
