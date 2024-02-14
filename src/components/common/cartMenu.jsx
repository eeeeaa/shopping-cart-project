import styles from "../../styles/common/cartMenu.module.css";
import LinesEllipsis from "react-lines-ellipsis";
import { formatPrice } from "../../utils/priceFormatter";
import PropTypes from "prop-types";

CartDropdown.propTypes = {
  itemsInCart: PropTypes.arrayOf(PropTypes.object),
  setItemsInCart: PropTypes.func,
};

CartItem.propTypes = {
  item: PropTypes.object,
  handleDecreaseQuantity: PropTypes.func,
  handleIncreaseQuantity: PropTypes.func,
};

function CartItem({ item, handleIncreaseQuantity, handleDecreaseQuantity }) {
  if (item == null) return null;
  return (
    <li>
      <div className={styles.cartItemContainer}>
        <img className={styles.cartItemImg} src={item.image} alt={item.title} />
        <div className={styles.cartItemTitle}>
          <LinesEllipsis
            text={item.title}
            maxLine="3"
            ellipsis="..."
            trimRight
            basedOn="letters"
          />
        </div>
        <div className={styles.cartItemPrice}>
          <LinesEllipsis
            text={formatPrice(item.price)}
            maxLine="1"
            ellipsis="..."
            trimRight
            basedOn="letters"
          />
        </div>
        <div className={styles.cartItemQty}>
          <button
            type="button"
            className={styles.minus}
            onClick={() => handleDecreaseQuantity(item)}
          >
            -
          </button>
          <LinesEllipsis
            text={item.qty}
            maxLine="1"
            ellipsis="..."
            trimRight
            basedOn="letters"
          />
          <button
            type="button"
            className={styles.plus}
            onClick={() => handleIncreaseQuantity(item)}
          >
            +
          </button>
        </div>
      </div>
    </li>
  );
}

function EmptyCart() {
  return (
    <li>
      <div className={styles.emptyCartText}>Cart is empty...</div>
    </li>
  );
}

function CartDropdown({ itemsInCart, setItemsInCart }) {
  const handleIncreaseQuantity = (itemToEdit) => {
    let foundIndex = -1;
    const foundItem = itemsInCart.find((item, index) => {
      const res = item.title === itemToEdit.title;
      if (res) {
        foundIndex = index;
      }
      return res;
    });
    if (foundItem != null) {
      let clone = [...itemsInCart];
      if (foundIndex > -1) {
        clone[foundIndex] = { ...itemToEdit, qty: foundItem.qty + 1 };
        setItemsInCart(clone);
      }
    }
  };

  const handleDecreaseQuantity = (itemToEdit) => {
    let foundIndex = -1;
    const foundItem = itemsInCart.find((item, index) => {
      const res = item.title === itemToEdit.title;
      if (res) {
        foundIndex = index;
      }
      return res;
    });
    if (foundItem != null && foundItem.qty > 1) {
      let clone = [...itemsInCart];
      if (foundIndex > -1) {
        clone[foundIndex] = { ...itemToEdit, qty: foundItem.qty - 1 };
        setItemsInCart(clone);
      }
    } else {
      let filtered = itemsInCart.filter(
        (item) => item.title != itemToEdit.title
      );
      setItemsInCart([...filtered]);
    }
  };
  return (
    <>
      <input id={styles.menuToggle} type="checkbox" />
      <label className={styles.menuButtonContainer} htmlFor={styles.menuToggle}>
        <div className={styles.menuButton}></div>
      </label>
      <ul className={styles.menu}>
        {itemsInCart.length > 0 ? (
          itemsInCart.map((item) => {
            return (
              <CartItem
                key={item.id}
                item={item}
                handleIncreaseQuantity={handleIncreaseQuantity}
                handleDecreaseQuantity={handleDecreaseQuantity}
              />
            );
          })
        ) : (
          <EmptyCart />
        )}
      </ul>
    </>
  );
}

export default CartDropdown;
