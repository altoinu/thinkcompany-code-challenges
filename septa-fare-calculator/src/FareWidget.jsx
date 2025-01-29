import styles from "./FareWidget.module.css";
import DestinationSelection from "./components/DestinationSelection";
import NumRidesEntry from "./components/NumRidesEntry";
import PurchaseMethodSelection from "./components/PurchaseMethodSelection";
import RideDaySelection from "./components/RideDaySelection";
import TitleBar from "./components/TitleBar";
import TotalFareCostView from "./components/TotalFareCostView";
import { FareContext } from "./context/FareContext";
import useFetch, { FetchStatus } from "./hooks/useFetch";
import { useEffect, useMemo, useState } from "react";

export default function FareWidget() {
  const [destination, setDestination] = useState();
  const [rideDay, setRideDay] = useState();
  const [purchaseMethod, setPurchaseMethod] = useState();
  const [numRides, setNumRides] = useState();

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
          <DestinationSelection onChange={(value) => setDestination(value)} />
          <RideDaySelection onChange={(value) => setRideDay(value)} />
          <PurchaseMethodSelection
            onChange={(value) => setPurchaseMethod(value)}
          />
          <NumRidesEntry onChange={(value) => setNumRides(value)} />
          <div>
            <p>{destination}</p>
            <p>{rideDay}</p>
            <p>{purchaseMethod}</p>
            <p>{numRides}</p>
          </div>
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
