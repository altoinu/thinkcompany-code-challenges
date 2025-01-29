import styles from "./NumRidesEntry.module.css";

export default function NumRidesEntry() {
  return (
    <div className={styles.container}>
      <span className={styles.title}>How many rides will you need?</span>
      <input
        type="number"
        className={styles.numberInput}
        min="1"
        step="1"
        defaultValue="0"
      />
    </div>
  );
}
