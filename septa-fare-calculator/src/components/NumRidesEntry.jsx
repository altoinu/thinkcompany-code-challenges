export default function NumRidesEntry() {
  return (
    <div>
      <h3>How many rides will you need?</h3>
      <input type="number" min="1" step="1" defaultValue="0" />
    </div>
  );
}
