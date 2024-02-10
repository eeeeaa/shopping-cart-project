import styles from "../styles/app.module.css";
import Homepage from "./routes/homepage";
import Navbar from "./common/navbar";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
    ],
  },
]);

function Root() {
  return (
    <>
      <Navbar />
      <div className={styles.content}>
        <Outlet />
      </div>
    </>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
