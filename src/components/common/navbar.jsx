import styles from "../../styles/common/navbar.module.css";
import CartDropdown from "./cartMenu";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

Searchbox.propTypes = {
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.func,
};

NavMenu.propTypes = {
  setSearchQuery: PropTypes.func,
  itemsInCart: PropTypes.arrayOf(PropTypes.object),
  setItemsInCart: PropTypes.func,
};

Navbar.propTypes = {
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.func,
  itemsInCart: PropTypes.arrayOf(PropTypes.object),
  setItemsInCart: PropTypes.func,
};

function Searchbox({ searchQuery, setSearchQuery }) {
  const navigate = useNavigate();
  const goToSearchPage = () =>
    navigate({
      pathname: "/search",
    });

  return (
    <div className={styles.searchBox}>
      <input
        className={styles.searchInput}
        type="text"
        name=""
        placeholder="Search"
        onChange={(e) => {
          setSearchQuery(e.target.value);
          goToSearchPage();
        }}
        value={searchQuery}
      />
      <button className={styles.searchButton}>S</button>
    </div>
  );
}

function NavMenu({ setSearchQuery, itemsInCart, setItemsInCart }) {
  return (
    <ul className={styles.navMenu}>
      <Link to="/">
        <li className={styles.navItem}>Home</li>
      </Link>
      <Link to="/search">
        <li className={styles.navItem} onClick={() => setSearchQuery("")}>
          Products
        </li>
      </Link>
      <li>
        <CartDropdown
          itemsInCart={itemsInCart}
          setItemsInCart={setItemsInCart}
        />
      </li>
    </ul>
  );
}

function Navbar({ searchQuery, setSearchQuery, itemsInCart, setItemsInCart }) {
  return (
    <div className={styles.navContainer}>
      <div className={styles.navLeftContent}>
        <div className={styles.navTitle}>Test</div>
        <Searchbox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <NavMenu
        setSearchQuery={setSearchQuery}
        itemsInCart={itemsInCart}
        setItemsInCart={setItemsInCart}
      />
    </div>
  );
}

export default Navbar;
