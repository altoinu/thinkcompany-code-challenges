/**
 * Formats specified number to USD
 * @param {number} number
 */
export function formatToUSD(number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
}
