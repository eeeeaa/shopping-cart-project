import styles from "../../styles/routes/menuItemPage.module.css";
import PropTypes from "prop-types";
import LinesEllipsis from "react-lines-ellipsis";
import { formatPrice } from "../../utils/priceFormatter";
import { useParams } from "react-router-dom";
import { useDataFetching } from "../../utils/dataFetcher";
import { useNavigate } from "react-router-dom";
import ErrorPage from "../common/errorPage";
import LoadingPage from "../common/loadingPage";

MenuItemPage.propTypes = {
  itemsInCart: PropTypes.arrayOf(PropTypes.object),
  setItemsInCart: PropTypes.func,
};

function MenuItemPage({ itemsInCart, setItemsInCart }) {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { data, error, loading } = useDataFetching(
    `https://fakestoreapi.com/products/${productId}`
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

  if (error) return <ErrorPage errorMsg={error.message} />;

  if (loading) return <LoadingPage />;

  return (
    <div className={styles.container}>
      <img src={data.image} alt={data.title} className={styles.image} />
      <div className={styles.title}>
        <LinesEllipsis
          text={data.title}
          maxLine="3"
          ellipsis="..."
          trimRight
          basedOn="letters"
        />
      </div>

      <div className={styles.category}>
        <LinesEllipsis
          text={data.category}
          maxLine="3"
          ellipsis="..."
          trimRight
          basedOn="letters"
        />
      </div>

      <div className={styles.price}>
        <LinesEllipsis
          text={formatPrice(data.price)}
          maxLine="1"
          ellipsis="..."
          trimRight
          basedOn="letters"
        />
      </div>

      <div className={styles.description}>
        <LinesEllipsis
          text={data.description}
          maxLine="10"
          ellipsis="..."
          trimRight
          basedOn="letters"
        />
      </div>

      <button
        className={styles.addToCartButton}
        type="button"
        onClick={() =>
          addItemToCart({
            id: data.id,
            title: data.title,
            price: data.price,
            image: data.image,
          })
        }
      >
        Add to Cart
      </button>
      <button
        className={styles.backButton}
        type="button"
        onClick={() => navigate(-1)}
      >
        Back to product page
      </button>
    </div>
  );
}

export default MenuItemPage;
