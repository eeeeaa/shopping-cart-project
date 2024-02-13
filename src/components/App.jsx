import styles from "../styles/app.module.css";
import Homepage from "./routes/homepage";
import SearchListing from "./routes/searchListing";
import ErrorPage from "./common/errorPage";
import Navbar from "./common/navbar";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";

Root.propTypes = {
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.func,
};

function Root({ searchQuery, setSearchQuery }) {
  return (
    <div className={styles.container}>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Root searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Homepage />,
        },
        {
          path: "/search",
          element: <SearchListing searchQuery={searchQuery} />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
