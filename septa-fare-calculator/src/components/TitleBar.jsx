import SEPTALogo from "../images/SEPTA.svg";

export default function TitleBar() {
  return (
    <div>
      <img src={SEPTALogo} alt="SEPTA Logo" />
      <h2>Regional Rail Fares</h2>
    </div>
  );
}
