// 1. Imports
const express = require('express');
const http = require('http');
const path = require('path');
const { Worker } = require('worker_threads');
const { setupSocket, packCoordinates } = require('./socketHandler');
// (Once JuRU gives you redisClient.js, uncomment the line below)
// const { redisPublisher, redisSubscriber } = require('./redisClient');

// 2. Initialize Express & HTTP Server
const app = express();
const PORT = 3000;
const server = http.createServer(app);
const io = setupSocket(server); // Attaches Socket.io to server

app.use(express.json());

// 3. Main Ingestion Endpoint (Your exact existing code!)
app.post('/api/telemetry', (req, res) => {
  const telemetryData = req.body;

  // Offload coordinate parsing to background worker thread
  const workerPath = path.resolve(__dirname, 'telemetryWorker.js');
  const worker = new Worker(workerPath, { workerData: telemetryData });

  // Listen for processed data from worker thread
  worker.on('message', (processedData) => {
    
    // 📡 WEEK 2 ADDITION: Publish to Redis (JuRU's part)
    // redisPublisher.publish('vehicle-telemetry', JSON.stringify(processedData));

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

// 4. WEEK 2 ADDITION: Listen to Redis & Stream over Socket.io (HuRU's part)
/*
redisSubscriber.subscribe('vehicle-telemetry');
redisSubscriber.on('message', (channel, message) => {
  if (channel === 'vehicle-telemetry') {
    const data = JSON.parse(message);
    const binaryBuffer = packCoordinates(data.lat, data.lng);

    io.emit('location-update', {
      vehicleId: data.vehicleId,
      location: binaryBuffer
    });
  }
});
*/

// 5. Start Server (SINGLE listen command at the very bottom)
server.listen(PORT, () => {
  console.log(`🚀 Harshit & Jyoti's FleetDash API & Socket server running on port ${PORT}`);
});

// At the top of server.js:
const http = require('http');
const { setupSocket } = require('./socketHandler');

// Near the bottom where your app starts listening:
const server = http.createServer(app);
const io = setupSocket(server);

// Replace app.listen(3000) with server.listen(3000):
server.listen(3000, () => {
  console.log('🚀 FleetDash API & Socket server running on port 3000');
});


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

app.listen(PORT, () => console.log(`Harshit & Jyoti's FleetDash API running on port ${PORT}`));