import styles from "./NumRidesEntry.module.css";
import PropTypes from "prop-types";
import { useCallback, useState } from "react";

function NumRidesEntry({ onChange }) {
  const [numRides, setNumRides] = useState(0);

  // onChange handler to remember selection
  const handleNumChange = useCallback((e) => {
    setNumRides(e.target.value);

    // send new selection to parent
    if (onChange) {
      onChange(e.target.value);
    }
  });

  return (
    <div className={styles.container}>
      <span className={styles.title}>How many rides will you need?</span>
      <input
        type="number"
        className={styles.numberInput}
        min="1"
        step="1"
        value={numRides}
        onChange={handleNumChange}
      />
    </div>
  );
}

// needed for ESLint rule
NumRidesEntry.propTypes = {
  onChange: PropTypes.func,
};

export default NumRidesEntry;
