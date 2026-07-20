const mongoose = require('mongoose');

// FleetBucket Schema
// Bucket Pattern: one document = one vehicle's data for one hour
// This lets us store high-frequency GPS pings efficiently
// without creating millions of individual documents
const FleetBucketSchema = new mongoose.Schema({

    // Unique identifier for the vehicle
    vehicleId: { type: String, required: true, index: true },

    // Timestamp truncated to the hour (e.g. 12:00:00)
    // All measurements within that hour get grouped into this bucket
    hourTimestamp: { type: Date, required: true, index: true },

    // Total number of points stored in this bucket — useful for quick counts
    totalPoints: { type: Number, default: 0 },

    // Array of high-frequency coordinates
    // Each entry represents a single GPS ping
    measurements: [
        {
            lat: { type: Number, required: true },       // Latitude
            lng: { type: Number, required: true },        // Longitude
            timestamp: { type: Date, required: true }     // Exact ping time
        }
    ]

});

// Compound index on vehicleId + hourTimestamp
// Makes coordinate retrieval much faster (query performance boost)
FleetBucketSchema.index({ vehicleId: 1, hourTimestamp: -1 });

// Export model — rest of the app uses this to access the FleetBucket collection
module.exports = mongoose.model('FleetBucket', FleetBucketSchema);