import styles from "../../styles/common/menuGrids.module.css";
import PropTypes from "prop-types";
import LinesEllipsis from "react-lines-ellipsis";
import { formatPrice } from "../../utils/priceFormatter";

MenuCard.propTypes = {
  title: PropTypes.string,
  price: PropTypes.number,
  category: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
};

MenuGrids.propTypes = {
  menuList: PropTypes.arrayOf(PropTypes.object),
};

function MenuCard({ title, price, category, description, imageUrl }) {
  return (
    <div className={styles.cardContainer}>
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
      </div>
    </div>
  );
}

function MenuGrids({ menuList }) {
  return (
    <div className={styles.menuGrids}>
      {menuList.map((menu) => {
        return (
          <MenuCard
            key={menu.id}
            title={menu.title}
            price={menu.price}
            category={menu.category}
            description={menu.description}
            imageUrl={menu.image}
          />
        );
      })}
    </div>
  );
}

export default MenuGrids;
