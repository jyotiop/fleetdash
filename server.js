// const express = require('express');
// const { Worker } = require('worker_threads');
// const path = require('path');

// const app = express();
// const PORT = 3000;

// app.use(express.json());

// // Main Ingestion Endpoint
// app.post('/api/telemetry', (req, res) => {
//     const telemetryData = req.body;

//     // 1. Offload coordinate parsing to a background worker thread
//     const workerPath = path.resolve(__dirname, 'telemetryWorker.js');
//     const worker = new Worker(workerPath, { workerData: telemetryData });

//     // 2. Listen for the processed data from the worker thread
//     worker.on('message', (processedData) => {
//         // Tomorrow, JuRU will save this 'processedData' to MongoDB
//         res.status(202).json({ 
//             status: "Success", 
//             message: "Data parsed efficiently in background!",
//             data: processedData 
//         });
//     });

//     worker.on('error', (err) => {
//         console.error("Worker Error:", err);
//         res.status(500).json({ error: "Internal processing error" });
//     });
// });

// app.listen(PORT, () => console.log(`Harshit & Jyoti's FleetDash API running on port ${PORT}`));


const express = require('express');
const mongoose = require('mongoose');
const { Worker } = require('worker_threads');
const path = require('path');
const FleetBucket = require('./FleetBucket'); 

const app = express();
const PORT = 3000;

app.use(express.json());

// 🔌 Ask JuRU for the MongoDB Atlas connection string line to insert here:
const MONGO_URI = "YOUR_MONGODB_ATLAS_CONNECTION_STRING_HERE"; 

mongoose.connect(MONGO_URI)
    .then(() => console.log("Connected to FleetDash MongoDB successfully!"))
    .catch(err => console.error("MongoDB connection failed:", err));

app.post('/api/telemetry', (req, res) => {
    const telemetryData = req.body;

    const workerPath = path.resolve(__dirname, 'telemetryWorker.js');
    const worker = new Worker(workerPath, { workerData: telemetryData });

    worker.on('message', async (processedData) => {
        try {
            // Drop minutes/seconds to locate the exact 1-hour window bucket
            const date = new Date(processedData.timestamp);
            date.setMinutes(0, 0, 0); 

            // Update the hourly bucket document atomically using Mongoose
            await FleetBucket.updateOne(
                { 
                    vehicleId: processedData.vehicleId, 
                    hourTimestamp: date 
                },
                {
                    $inc: { totalPoints: 1 }, 
                    $push: { 
                        measurements: { 
                            lat: processedData.lat, 
                            lng: processedData.lng, 
                            timestamp: processedData.timestamp 
                        } 
                    }
                },
                { upsert: true } 
            );

            res.status(202).json({ 
                status: "Success", 
                message: "Data parsed via Worker and bucketed in MongoDB!" 
            });

        } catch (dbError) {
            console.error("Database Error:", dbError);
            res.status(500).json({ error: "Failed to write to database" });
        }
    });

    worker.on('error', (err) => {
        console.error("Worker Error:", err);
        res.status(500).json({ error: "Internal processing error" });
    });
});

app.listen(PORT, () => console.log(`FleetDash pipeline is integrated and running on port ${PORT}`));