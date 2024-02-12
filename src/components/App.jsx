import styles from "../styles/app.module.css";
import Homepage from "./routes/homepage";
import SearchListing from "./routes/searchListing";
import ErrorPage from "./common/errorPage";
import Navbar from "./common/navbar";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/search",
        element: <SearchListing />,
      },
    ],
  },
]);

function Root() {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
