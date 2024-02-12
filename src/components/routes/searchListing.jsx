import styles from "../../styles/routes/searchListing.module.css";
import React from "react";
import { useLocation } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function SearchListing() {
  let query = useQuery();
  return (
    <div className={styles.title}>Search listing: {query.get("searchkey")}</div>
  );
}

export default SearchListing;
