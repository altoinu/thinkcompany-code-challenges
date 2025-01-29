import styles from "./FareWidget.module.css";
import DestinationSelection from "./components/DestinationSelection";
import NumRidesEntry from "./components/NumRidesEntry";
import PurchaseMethodSelection from "./components/PurchaseMethodSelection";
import RideDaySelection from "./components/RideDaySelection";
import TitleBar from "./components/TitleBar";
import TotalFareCostView from "./components/TotalFareCostView";
import { FareContext } from "./context/FareContext";
import useFetch, { FetchStatus } from "./hooks/useFetch";
import { useEffect, useMemo } from "react";

export default function FareWidget() {
  const { fetch, fetchStatus, data } = useFetch({
    method: "GET",
    url: "/data/fares.json",
  });

  // load fare data at mount
  useEffect(() => {
    fetch();
  }, [fetch]);

  // when data is loaded, store in context
  const fareData = useMemo(
    () => ({
      data,
    }),
    [data],
  );

  return (
    <FareContext value={fareData}>
      <div className={styles.container}>
        <div className={styles.widget}>
          <TitleBar />
          <DestinationSelection />
          <RideDaySelection />
          <PurchaseMethodSelection />
          <NumRidesEntry />
          <TotalFareCostView />
        </div>
        <div
          className={styles.loaderContainer}
          style={fetchStatus !== FetchStatus.Pending ? { display: "none" } : {}}
        >
          <div className={styles.loader} />
        </div>
      </div>
    </FareContext>
  );
}
