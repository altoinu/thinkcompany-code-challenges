import styles from "./Main.module.css";
import DestinationSelection from "./components/DestinationSelection";
import NumRidesEntry from "./components/NumRidesEntry";
import PurchaseMethodSelection from "./components/PurchaseMethodSelection";
import RideDaySelection from "./components/RideDaySelection";
import TitleBar from "./components/TitleBar";
import TotalFareCostView from "./components/TotalFareCostView";
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

  return (
    <div>
      <TitleBar />
      <DestinationSelection />
      <RideDaySelection />
      <PurchaseMethodSelection />
      <NumRidesEntry />
      <TotalFareCostView />
    </div>
  );
}
