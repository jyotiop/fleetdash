// geofenceService.js
const turf = require('@turf/turf');

/**
 * Checks if a vehicle's coordinate is inside a restricted polygon zone.
 */
function checkGeofenceBreach(lat, lng, geofenceCoords) {
    // 1. Create a digital "dot" for the truck
    // Note: Turf.js always reads arrays as [longitude, latitude]
    const truckLocation = turf.point([lng, lat]); 

    // 2. Create the digital "fence" out of the provided coordinates
    const restrictedZone = turf.polygon([geofenceCoords]);

    // 3. Let Turf.js do the heavy math: Is the dot inside the fence?
    const isInside = turf.booleanPointInPolygon(truckLocation, restrictedZone);

    return isInside; // Returns true or false
}

module.exports = { checkGeofenceBreach };