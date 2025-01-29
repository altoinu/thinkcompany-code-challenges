import styles from "./RideDaySelection.module.css";
import PropTypes from "prop-types";
import { useCallback, useState } from "react";

export const RideDayData = [
  {
    type: "weekday",
    name: "Weekdays",
  },
  {
    type: "evening_weekend",
    name: "Weekend Evenings",
  },
  {
    type: "anytime",
    name: "Anytime",
  },
];

function RideDaySelection({ onChange }) {
  const [selectedOption, setSelectedOption] = useState("");

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
      <span className={styles.title}>When are you riding?</span>
      <select
        className={styles.selection}
        value={selectedOption}
        onChange={handleSelectChange}
      >
        <option value="" disabled defaultValue="">
          Select...
        </option>
        {RideDayData.map((day, index) => (
          <option key={index} value={day.type}>
            {day.name}
          </option>
        ))}
      </select>
      <span className={styles.helperText}>
        Helper text that explains the options above.
      </span>
    </div>
  );
}

// needed for ESLint rule
RideDaySelection.propTypes = {
  onChange: PropTypes.func,
};

export default RideDaySelection;
