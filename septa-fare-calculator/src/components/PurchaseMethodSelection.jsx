import styles from "./PurchaseMethodSelection.module.css";

export default function PurchaseMethodSelection() {
  return (
    <div className={styles.container}>
      <span className={styles.title}>Where will you purchase the fare?</span>
      <div className={styles.radioContainer}>
        <label>
          <input type="radio" name="purchaseMethod" />
          Station Kiosk
        </label>
        <label>
          <input type="radio" name="purchaseMethod" />
          Onboard
        </label>
      </div>
    </div>
  );
}
