import styles from "./TotalFareCostView.module.css";
import PropTypes from "prop-types";

/**
 * Formats specified number to USD
 * @param {number} number
 */
function formatToUSD(number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
}

function TotalFareCostView({ cost }) {
  return (
    <div className={styles.container}>
      <span className={styles.title}>Your fare will cost</span>
      <span className={styles.costDisplay}>{formatToUSD(cost ? cost : 0)}</span>
    </div>
  );
}

// needed for ESLint rule
TotalFareCostView.propTypes = {
  cost: PropTypes.number,
};

export default TotalFareCostView;
