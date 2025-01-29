export default function PurchaseMethodSelection() {
  return (
    <div>
      <h3>Where will you purchase the fare?</h3>
      <div>
        <label>
          <input type="radio" name="purchase_method" />
          Station Kiosk
        </label>
        <label>
          <input type="radio" name="purchase_method" />
          Onboard
        </label>
      </div>
    </div>
  );
}
