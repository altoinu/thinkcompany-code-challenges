/**
 * function get data for specified zone
 * @param {JSON} data
 * @param {string} zone
 * @returns
 */
const getZoneData = (data, zone) =>
  data.zones.find((item) => item.zone == zone);

/**
 * function to get fare data for specified day and purchase method in zone data
 * @param {Object} zone
 * @param {string} type
 * @param {string} purchase
 * @returns
 */
export function getRideDayFareData(data, zone, type, purchase) {
  const zoneData = getZoneData(data, zone);

  // find matching fare for type
  // and if type != anytime then also matching purchase
  // (only one price provided for "anytime" type in fares.json)
  return zoneData.fares.find(
    (item) =>
      item.type == type && (type == "anytime" || item.purchase == purchase),
  );
}
