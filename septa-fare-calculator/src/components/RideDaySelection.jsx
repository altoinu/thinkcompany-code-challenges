import { FareContext } from "../context/FareContext";
import styles from "./RideDaySelection.module.css";
import PropTypes from "prop-types";
import { use, useCallback, useMemo, useState } from "react";

export const RideDayNames = {
  anytime: "Anytime",
  weekday: "Weekdays",
  evening_weekend: "Weekend Evenings",
};

function RideDaySelection({ onChange }) {
  const [selectedOption, setSelectedOption] = useState("");

  // load data from context
  const { data } = use(FareContext);

  // parse through data and extract ride day info
  const rideDayData = useMemo(() => {
    if (data && data.info) {
      const d = [];

      for (let type in data.info) {
        if (RideDayNames[type])
          d.push({
            type: type,
            name: RideDayNames[type],
            helperText: data.info[type],
          });
      }

      return d;
    } else {
      return null;
    }
  }, [data]);

  // function to return helperText for selected selection type
  const getHelperText = useCallback(
    (type) => {
      const data = rideDayData.find((item) => item.type === type);

      return data ? data.helperText : "";
    },
    [rideDayData],
  );

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
        {rideDayData &&
          rideDayData.map((day, index) => (
            <option key={index} value={day.type}>
              {day.name}
            </option>
          ))}
      </select>
      {rideDayData && selectedOption && (
        <span className={styles.helperText}>
          {getHelperText(selectedOption)}
        </span>
      )}
    </div>
  );
}

// needed for ESLint rule
RideDaySelection.propTypes = {
  onChange: PropTypes.func,
};

export default RideDaySelection;
