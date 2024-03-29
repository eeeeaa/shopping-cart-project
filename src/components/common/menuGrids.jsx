import styles from "../../styles/common/menuGrids.module.css";
import PropTypes from "prop-types";
import LinesEllipsis from "react-lines-ellipsis";
import { formatPrice } from "../../utils/priceFormatter";
import { useNavigate } from "react-router-dom";

MenuCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  price: PropTypes.number,
  category: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  addItemToCart: PropTypes.func,
};

MenuGrids.propTypes = {
  menuList: PropTypes.arrayOf(PropTypes.object),
  addItemToCart: PropTypes.func,
};

function MenuCard({
  id,
  title,
  price,
  category,
  description,
  imageUrl,
  addItemToCart,
}) {
  const navigate = useNavigate();
  return (
    <div className={styles.cardContainer} data-testid="menu-item">
      <img src={imageUrl} alt={title} className={styles.cardImage} />
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>
          <LinesEllipsis
            text={title}
            maxLine="1"
            ellipsis="..."
            trimRight
            basedOn="letters"
          />
        </div>

        <div className={styles.cardPrice}>
          <LinesEllipsis
            text={formatPrice(price)}
            maxLine="1"
            ellipsis="..."
            trimRight
            basedOn="letters"
          />
        </div>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardDescription}>
          <LinesEllipsis
            text={description}
            maxLine="3"
            ellipsis="..."
            trimRight
            basedOn="letters"
          />
        </div>
        <div className={styles.cardCategory}>
          <LinesEllipsis
            text={category}
            maxLine="1"
            ellipsis="..."
            trimRight
            basedOn="letters"
          />
        </div>
        <div className={styles.cardButtons}>
          <button
            className={styles.cartButton}
            type="button"
            data-testid="add-to-cart-button"
            onClick={() =>
              addItemToCart({
                id: id,
                title: title,
                price: price,
                image: imageUrl,
              })
            }
          >
            Add to Cart
          </button>
          <button
            className={styles.cartButton}
            type="button"
            data-testid="see-details-button"
            onClick={() => navigate(`/search/${id}`)}
          >
            See details
          </button>
        </div>
      </div>
    </div>
  );
}

function NoItemContent() {
  return (
    <div className={styles.errorContainer}>
      <styles className={styles.errorTitle}>Sorry, No search result...</styles>
      <styles className={styles.errorSubtitle}>please try again</styles>
    </div>
  );
}

function MenuGrids({ menuList, addItemToCart }) {
  return (
    <div className={styles.menuGrids}>
      {menuList.length > 0 ? (
        menuList.map((menu) => {
          return (
            <MenuCard
              key={menu.id}
              id={menu.id}
              title={menu.title}
              price={menu.price}
              category={menu.category}
              description={menu.description}
              imageUrl={menu.image}
              addItemToCart={addItemToCart}
            />
          );
        })
      ) : (
        <NoItemContent />
      )}
    </div>
  );
}

export default MenuGrids;
