import styles from "../../styles/routes/searchListing.module.css";
import MenuGrids from "../common/menuGrids";
import { useDataFetching } from "../../utils/dataFetcher";
import PropTypes from "prop-types";

SearchListing.propTypes = {
  searchQuery: PropTypes.string,
};

function SearchListing({ searchQuery }) {
  const { data, error, loading } = useDataFetching(
    "https://fakestoreapi.com/products?limit=20"
  );
  if (error) return <p>A network error was encountered</p>;

  if (loading) return <p>Loading...</p>;

  if (searchQuery.length > 0) {
    return (
      <div className={styles.container}>
        <MenuGrids
          menuList={data.filter((item) => {
            return item.title.includes(searchQuery);
          })}
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <MenuGrids menuList={data} />
    </div>
  );
}

export default SearchListing;
