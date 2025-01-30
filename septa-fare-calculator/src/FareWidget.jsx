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

  /**
   * function get data for specified zone
   * @param {string} zone
   * @returns
   */
  const getZoneData = (zone) => data.zones.find((item) => item.zone == zone);

  /**
   * function to get fare data for specified day and method in zone data
   * @param {Object} zone
   * @param {Object} day
   * @param {string} method
   * @returns
   */
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

  const selectedFareData = useMemo(() => {
    if (data && destinationZone && rideDay && purchaseMethod) {
      return getRideDayFareData(
        getZoneData(destinationZone),
        rideDay,
        purchaseMethod,
      );
    } else {
      return null;
    }
  }, [data, destinationZone, rideDay, purchaseMethod]);

  // using data from each field, calculate ride cost
  const cost = useMemo(() => {
    if (selectedFareData && numRides) {
      // number of trips for this fare
      const trips = selectedFareData.trips;

      // calculate fare = price per trips times number of rides
      return (selectedFareData.price / trips) * numRides;
    } else {
      return 0;
    }
  }, [selectedFareData, numRides]);

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
          <NumRidesEntry
            price={selectedFareData?.price}
            tripMultiple={selectedFareData?.trips}
            onChange={(value) => setNumRides(value)}
          />
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
