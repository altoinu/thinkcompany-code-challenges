import styles from "./DestinationSelection.module.css";

export default function DestinationSelection() {
  return (
    <div className={styles.container}>
      <span className={styles.title}>Where are you going?</span>
      <select className={styles.selection}>
        <option value="" disabled defaultValue="">
          Select...
        </option>
      </select>
    </div>
  );
}
