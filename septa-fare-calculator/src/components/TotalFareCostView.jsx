import { formatToUSD } from "../utils/utils";
import styles from "./TotalFareCostView.module.css";
import PropTypes from "prop-types";

function TotalFareCostView({ cost = 0 }) {
  return (
    <div className={styles.container}>
      <span className={styles.title} id="label-cost_of_fare">
        Your fare will cost
      </span>
      <span className={styles.costDisplay} aria-labelledby="label-cost_of_fare">
        {formatToUSD(cost)}
      </span>
    </div>
  );
}

// needed for ESLint rule
TotalFareCostView.propTypes = {
  cost: PropTypes.number,
};

export default TotalFareCostView;
