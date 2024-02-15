import styles from "../styles/app.module.css";
import Homepage from "./routes/homepage";
import SearchListing from "./routes/searchListing";
import ErrorPage from "./common/errorPage";
import Navbar from "./common/navbar";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";
import MenuItemPage from "./routes/menuItemPage";

Root.propTypes = {
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.func,
  itemsInCart: PropTypes.arrayOf(PropTypes.object),
  setItemsInCart: PropTypes.func,
};

function Root({ searchQuery, setSearchQuery, itemsInCart, setItemsInCart }) {
  return (
    <div className={styles.container}>
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        itemsInCart={itemsInCart}
        setItemsInCart={setItemsInCart}
      />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsInCart, setItemsInCart] = useState([]);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Root
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          itemsInCart={itemsInCart}
          setItemsInCart={setItemsInCart}
        />
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Homepage />,
        },
        {
          path: "/search",
          element: (
            <SearchListing
              searchQuery={searchQuery}
              itemsInCart={itemsInCart}
              setItemsInCart={setItemsInCart}
            />
          ),
        },
        {
          path: "/search/:productId",
          element: (
            <MenuItemPage
              itemsInCart={itemsInCart}
              setItemsInCart={setItemsInCart}
            />
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
