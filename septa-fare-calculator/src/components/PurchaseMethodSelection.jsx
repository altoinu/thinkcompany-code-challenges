import styles from "./PurchaseMethodSelection.module.css";
import PropTypes from "prop-types";
import { useCallback, useState } from "react";

function PurchaseMethodSelection({ onChange }) {
  const [selectedValue, setSelectedValue] = useState("");

  // onChange handler to remember selection
  const handleSelectChange = useCallback((e) => {
    setSelectedValue(e.target.value);

    // send new selection to parent
    if (onChange) {
      onChange(e.target.value);
    }
  });

  return (
    <div className={styles.container}>
      <span className={styles.title}>Where will you purchase the fare?</span>
      <div className={styles.radioContainer}>
        <label>
          <input
            type="radio"
            name="purchaseMethod"
            value="kiosk"
            checked={selectedValue === "kiosk"}
            onChange={handleSelectChange}
          />
          Station Kiosk
        </label>
        <label>
          <input
            type="radio"
            name="purchaseMethod"
            value="onboard"
            checked={selectedValue === "onboard"}
            onChange={handleSelectChange}
          />
          Onboard
        </label>
      </div>
    </div>
  );
}

// needed for ESLint rule
PurchaseMethodSelection.propTypes = {
  onChange: PropTypes.func,
};

export default PurchaseMethodSelection;
