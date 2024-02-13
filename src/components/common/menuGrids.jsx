import styles from "../../styles/common/menuGrids.module.css";
import PropTypes from "prop-types";

MenuCard.propTypes = {
  title: PropTypes.string,
  price: PropTypes.string,
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
        <div className={styles.cardTitle}>{title}</div>
        <div className={styles.cardCategory}>{category}</div>
        <div className={styles.cardPrice}>{price}</div>
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardDescription}>{description}</div>
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
