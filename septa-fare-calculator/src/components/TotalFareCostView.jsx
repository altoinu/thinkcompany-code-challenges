import styles from "./TotalFareCostView.module.css";

export default function TotalFareCostView() {
  return (
    <div className={styles.container}>
      <span className={styles.title}>Your fare will cost</span>
      <span className={styles.costDisplay}>$00.00</span>
    </div>
  );
}
