import styles from "./Main.module.css";
import useFetch from "./hooks/useFetch";
import { useEffect } from "react";

export default function Main() {
  const { fetch, fetchStatus, data } = useFetch({
    method: "GET",
    url: "/data/fares.json",
  });

  useEffect(() => {
    fetch();
  }, [fetch]);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return <h1 className={styles.header}>Hello from React!</h1>;
}
