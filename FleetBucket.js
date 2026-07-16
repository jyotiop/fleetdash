const mongoose = require('mongoose');

const FleetBucketSchema = new mongoose.Schema({
    vehicleId: { type: String, required: true, index: true },
    hourTimestamp: { type: Date, required: true, index: true }, // Truncated to the exact hour (e.g., 12:00:00)
    totalPoints: { type: Number, default: 0 },

    // The bucket holding high-frequency coordinates
    measurements: [
        {
            lat: { type: Number, required: true },
            lng: { type: Number, required: true },
            timestamp: { type: Date, required: true }
        }
    ]
});

// Compound index to make coordinate retrieval lightning fast
FleetBucketSchema.index({ vehicleId: 1, hourTimestamp: -1 });

module.exports = mongoose.model('FleetBucket', FleetBucketSchema);