import styles from "./RideDaySelection.module.css";

export default function RideDaySelection() {
  return (
    <div className={styles.container}>
      <span className={styles.title}>When are you riding?</span>
      <select className={styles.selection}>
        <option value="" disabled defaultValue="">
          Select...
        </option>
      </select>
      <span className={styles.helperText}>
        Helper text that explains the options above.
      </span>
    </div>
  );
}
