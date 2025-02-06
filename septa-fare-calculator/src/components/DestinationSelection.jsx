import { FareContext } from "../context/FareContext";
import styles from "./DestinationSelection.module.css";
import PropTypes from "prop-types";
import { use, useCallback, useMemo, useState } from "react";

function DestinationSelection({ onChange }) {
  const [selectedOption, setSelectedOption] = useState("");

  // load data from context
  const { data } = use(FareContext);

  // parse through data for destination data
  const zoneData = useMemo(() => {
    if (data && data.zones) {
      return data.zones;
    } else {
      return null;
    }
  }, [data]);

  // onChange handler to remember selection
  const handleSelectChange = useCallback((e) => {
    setSelectedOption(e.target.value);

    // send new selection to parent
    if (onChange) {
      onChange(e.target.value);
    }
  });

  return (
    <div className={styles.container}>
      <span className={styles.title}>Where are you going?</span>
      <select
        className={styles.selection}
        value={selectedOption}
        onChange={handleSelectChange}
      >
        <option value="" disabled defaultValue="">
          Select...
        </option>
        {zoneData?.map((item, index) => (
          <option key={index} value={item.zone}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}

// needed for ESLint rule
DestinationSelection.propTypes = {
  onChange: PropTypes.func,
};

export default DestinationSelection;
