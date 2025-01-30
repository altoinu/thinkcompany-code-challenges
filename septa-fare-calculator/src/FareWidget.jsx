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
  const [destinationZone, setDestinationZone] = useState();
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

  // function get data for specified zone
  const getZoneData = (zone) => data.zones.find((item) => item.zone == zone);

  // function to get fare data for specified day and method in zone
  const getRideDayFareData = (zone, day, method) =>
    zone.fares.find((item) => {
      // find matching fare for type
      // and if type != anytime then also matching purchase
      // (only one price provided for "anytime" type in fares.json)
      return (
        item.type == day.type &&
        (day.type == "anytime" || item.purchase == method)
      );
    });

  // using data from each field, calculate ride cost
  const cost = useMemo(() => {
    if (data && destinationZone && rideDay && purchaseMethod && numRides) {
      console.log(destinationZone, rideDay, purchaseMethod, numRides);

      const zoneData = getZoneData(destinationZone);
      const rideDayFareData = getRideDayFareData(
        zoneData,
        rideDay,
        purchaseMethod,
      );
      console.log("===", rideDayFareData);

      // number of trips for this fare
      const trips = rideDayFareData.trips;

      // calculate fare = price per trips times number of rides
      return (rideDayFareData.price / trips) * numRides;
    } else {
      return 0;
    }
  }, [data, destinationZone, rideDay, purchaseMethod, numRides]);

  return (
    <FareContext value={fareData}>
      <div className={styles.container}>
        <div className={styles.widget}>
          <TitleBar />
          <DestinationSelection
            onChange={(value) => setDestinationZone(value)}
          />
          <RideDaySelection onChange={(value) => setRideDay(value)} />
          <PurchaseMethodSelection
            onChange={(value) => setPurchaseMethod(value)}
          />
          <NumRidesEntry onChange={(value) => setNumRides(value)} />
          <div>
            <p>{destinationZone}</p>
            <p>{rideDay && rideDay.type}</p>
            <p>{purchaseMethod}</p>
            <p>{numRides ? numRides : 0}</p>
          </div>
          <TotalFareCostView cost={cost} />
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
