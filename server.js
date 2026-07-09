const express = require('express');
const { Worker } = require('worker_threads');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());

// Main Ingestion Endpoint
app.post('/api/telemetry', (req, res) => {
    const telemetryData = req.body;

    // 1. Offload coordinate parsing to a background worker thread
    const workerPath = path.resolve(__dirname, 'telemetryWorker.js');
    const worker = new Worker(workerPath, { workerData: telemetryData });

    // 2. Listen for the processed data from the worker thread
    worker.on('message', (processedData) => {
        // Tomorrow, JuRU will save this 'processedData' to MongoDB
        res.status(202).json({ 
            status: "Success", 
            message: "Data parsed efficiently in background!",
            data: processedData 
        });
    });

    worker.on('error', (err) => {
        console.error("Worker Error:", err);
        res.status(500).json({ error: "Internal processing error" });
    });
});

app.listen(PORT, () => console.log(`HuRU & JuRU's FleetDash API running on port ${PORT}`));