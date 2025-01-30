import { formatToUSD } from "../utils/utils";
import styles from "./NumRidesEntry.module.css";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";

function NumRidesEntry({ price, tripMultiple, onChange }) {
  const [previousTripMultiple, setpreviousTripMultiple] =
    useState(tripMultiple);
  const [numRides, setNumRides] = useState(0);

  const updateNumRides = (newValue) => {
    setNumRides(newValue);

    // send new selection to parent
    if (onChange) {
      onChange(newValue);
    }
  };

  // onChange handler to remember selection
  const handleNumChange = useCallback((e) => updateNumRides(e.target.value));

  useEffect(() => {
    if (tripMultiple != previousTripMultiple) {
      // tripMultiple updated, reset input
      updateNumRides(0);

      // and remember this value
      setpreviousTripMultiple(tripMultiple);
    }
  }, [tripMultiple]);

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        {price && tripMultiple > 1 && (
          <span className={styles.specialPriceLabel}>
            * Special pricing: {formatToUSD(price)} / {tripMultiple} ticktes
          </span>
        )}
        <label className={styles.title} htmlFor="numRides">
          How many rides will you need?
        </label>
      </div>
      <input
        type="number"
        id="numRides"
        name="numRides"
        className={styles.numberInput}
        min="0"
        step={tripMultiple}
        value={numRides}
        onChange={handleNumChange}
      />
    </div>
  );
}

// needed for ESLint rule
NumRidesEntry.propTypes = {
  price: PropTypes.number,
  tripMultiple: PropTypes.number,
  onChange: PropTypes.func,
};

export default NumRidesEntry;
