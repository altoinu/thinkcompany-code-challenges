import SEPTALogo from "../images/SEPTA.svg";
import styles from "./TitleBar.module.css";

export default function TitleBar() {
  return (
    <div className={styles.container}>
      <img src={SEPTALogo} alt="SEPTA Logo" width="65" height="56" />
      <h2 className={styles.title}>Regional Rail Fares</h2>
    </div>
  );
}
