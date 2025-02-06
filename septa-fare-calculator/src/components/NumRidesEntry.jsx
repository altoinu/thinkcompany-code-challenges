import { formatToUSD } from "../utils/utils";
import styles from "./NumRidesEntry.module.css";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";

function NumRidesEntry({ price, tripMultiple, onChange }) {
  const [previousTripMultiple, setPreviousTripMultiple] =
    useState(tripMultiple);
  const [value, setValue] = useState();

  const updateValue = (newValue) => {
    setValue(newValue);

    // send new value to parent
    if (onChange) {
      onChange(newValue);
    }
  };

  useEffect(() => {
    if (tripMultiple != previousTripMultiple) {
      // tripMultiple updated, reset input
      updateValue(0);

      // and remember this value
      setPreviousTripMultiple(tripMultiple);
    }
  }, [tripMultiple]);

  // onChange handler to remember selection
  const handleNumChange = useCallback((e) => updateValue(e.target.value));

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        {price && tripMultiple > 1 && (
          <span className={styles.specialPriceLabel}>
            * Special pricing: {formatToUSD(price)} / {tripMultiple} tickets
          </span>
        )}
        <label className={styles.title} htmlFor="numTrips">
          How many rides will you need?
        </label>
      </div>
      <input
        type="number"
        id="numTrips"
        name="numTrips"
        className={styles.numberInput}
        min="0"
        step={tripMultiple}
        value={value}
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
