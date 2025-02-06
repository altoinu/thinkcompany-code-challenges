import { formatToUSD } from "../utils/utils";
import styles from "./TotalFareCostView.module.css";
import PropTypes from "prop-types";
import { useMemo } from "react";

function TotalFareCostView({ fareData, numTrips = 0 }) {
  // using data from each field, calculate ride cost
  const cost = useMemo(() => {
    if (fareData && numTrips) {
      // calculate fare = price per trips times number of rides
      return (fareData.price / fareData.trips) * numTrips;
    } else {
      return 0;
    }
  }, [fareData, numTrips]);

  return (
    <div className={styles.container}>
      <span className={styles.title} id="label-cost_of_fare">
        Your fare will cost
      </span>
      <span className={styles.costDisplay} aria-labelledby="label-cost_of_fare">
        {formatToUSD(cost)}
      </span>
    </div>
  );
}

// needed for ESLint rule
TotalFareCostView.propTypes = {
  fareData: PropTypes.object,
  numTrips: PropTypes.number,
};

export default TotalFareCostView;
