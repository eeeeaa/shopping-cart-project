import styles from "../../styles/routes/searchListing.module.css";
import MenuGrids from "../common/menuGrids";
import { useDataFetching } from "../../utils/dataFetcher";
import PropTypes from "prop-types";

SearchListing.propTypes = {
  searchQuery: PropTypes.string,
  itemsInCart: PropTypes.arrayOf(PropTypes.object),
  setItemsInCart: PropTypes.func,
};

function SearchListing({ searchQuery, itemsInCart, setItemsInCart }) {
  const { data, error, loading } = useDataFetching(
    "https://fakestoreapi.com/products?limit=20"
  );

  const addItemToCart = (itemToAdd) => {
    let foundIndex = -1;
    const foundItem = itemsInCart.find((item, index) => {
      const res = item.title === itemToAdd.title;
      if (res) {
        foundIndex = index;
      }
      return res;
    });
    if (foundItem != null) {
      let clone = [...itemsInCart];
      if (foundIndex > -1) {
        clone[foundIndex] = { ...itemToAdd, qty: foundItem.qty + 1 };
        setItemsInCart(clone);
      }
    } else {
      setItemsInCart([...itemsInCart, { ...itemToAdd, qty: 1 }]);
    }
  };

  if (error) return <p>A network error was encountered</p>;

  if (loading) return <p>Loading...</p>;

  if (searchQuery.length > 0) {
    return (
      <div className={styles.container}>
        <MenuGrids
          menuList={data.filter((item) => {
            return item.title.includes(searchQuery);
          })}
          addItemToCart={addItemToCart}
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <MenuGrids menuList={data} addItemToCart={addItemToCart} />
    </div>
  );
}

export default SearchListing;
