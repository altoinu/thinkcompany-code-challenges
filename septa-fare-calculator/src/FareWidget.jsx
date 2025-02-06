import styles from "./FareWidget.module.css";
import DestinationSelection from "./components/DestinationSelection";
import NumRidesEntry from "./components/NumRidesEntry";
import PurchaseMethodSelection from "./components/PurchaseMethodSelection";
import RideDaySelection from "./components/RideDaySelection";
import TitleBar from "./components/TitleBar";
import TotalFareCostView from "./components/TotalFareCostView";
import { FareContext } from "./context/FareContext";
import useFetch, { FetchStatus } from "./hooks/useFetch";
import { getRideDayFareData } from "./utils/fareUtils";
import { useEffect, useMemo, useState } from "react";

export default function FareWidget() {
  const [zone, setZone] = useState();
  const [rideDay, setRideDay] = useState();
  const [purchase, setPurchase] = useState();
  const [numTrips, setNumTrips] = useState();

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

  const selectedFareData = useMemo(() => {
    if (data && zone && rideDay && purchase) {
      return getRideDayFareData(data, zone, rideDay.type, purchase);
    } else {
      return null;
    }
  }, [data, zone, rideDay, purchase]);

  return (
    <div className={styles.container}>
      <FareContext value={fareData}>
        <div className={styles.widget}>
          <TitleBar />
          <DestinationSelection onChange={(value) => setZone(value)} />
          <RideDaySelection onChange={(value) => setRideDay(value)} />
          <PurchaseMethodSelection onChange={(value) => setPurchase(value)} />
          <NumRidesEntry
            price={selectedFareData?.price}
            tripMultiple={selectedFareData?.trips}
            onChange={(value) => setNumTrips(value)}
          />
          <TotalFareCostView fareData={selectedFareData} numTrips={numTrips} />
        </div>
      </FareContext>
      <div
        className={styles.loaderContainer}
        style={fetchStatus !== FetchStatus.Pending ? { display: "none" } : {}}
      >
        <div className={styles.loader} />
      </div>
    </div>
  );
}
