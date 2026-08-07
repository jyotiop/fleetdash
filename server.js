// server.js
const express = require('express');
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');
const { Worker } = require('worker_threads');
const { setupSocket, packCoordinates } = require('./socketHandler');

// 1. REDIS CLIENT IMPORT
let redisPublisher, redisSubscriber;
try {
  const redis = require('./redisClient');
  redisPublisher = redis.redisPublisher;
  redisSubscriber = redis.redisSubscriber;
} catch (e) {
  console.log('⚠️ redisClient.js not found yet. Running without Redis.');
}

// 2. INITIALIZE SERVER
const app = express();
const PORT = 3000;
const server = http.createServer(app);
const io = setupSocket(server);
app.use(express.json());

// 3. MONGODB CONNECTION
const MONGO_URI = 'mongodb+srv://kushwahajyoti76881_db_user:jyotiMongooseDB@jyotiscluster.xtfdirj.mongodb.net/?appName=jyotiscluster';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB successfully!'))
  .catch((err) => console.log('⚠️ MongoDB Connection Note:', err.message));

// 4. MAIN INGESTION ENDPOINT
app.post('/api/telemetry', (req, res) => {
  try {
      const telemetryData = req.body;

      // Basic validation so the test doesn't crash if data is missing
      if (!telemetryData || !telemetryData.vehicleId) {
          return res.status(400).json({ status: "Error", message: "Invalid payload" });
      }

      const workerPath = path.resolve(__dirname, 'telemetryWorker.js');
      const worker = new Worker(workerPath, { workerData: telemetryData });

      worker.on('message', (processedData) => {
        if (redisPublisher) {
          redisPublisher.publish('vehicle-telemetry', JSON.stringify(processedData));
        }
        // Jest expects a "202 Success" with this exact format
        res.status(202).json({
          status: "Success",
          data: processedData
        });
      });

      worker.on('error', (err) => {
        console.error("🚨 WORKER CRASH DETECTED:", err.message); // This will print EXACTLY why it failed!
        res.status(500).json({ status: "Error", message: err.message });
      });

  } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
  }
});

// 5. REDIS BRIDGE
if (redisSubscriber) {
  redisSubscriber.subscribe('vehicle-telemetry', (err) => {
    if (!err) console.log('📡 Subscribed to vehicle-telemetry Redis channel!');
  });

  redisSubscriber.on('message', (channel, message) => {
    if (channel === 'vehicle-telemetry') {
      const data = JSON.parse(message);
      const binaryBuffer = packCoordinates(data.lat, data.lng);
      io.emit('location-update', { vehicleId: data.vehicleId, location: binaryBuffer });
    }
  });
}

// 6. SAFE SERVER START (Protects Jest Port Conflicts!)
// Jest automatically sets NODE_ENV to 'test'. This ensures the port isn't blocked!
if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, () => {
    console.log(`🚀 Harshit & Jyoti's FleetDash API & Socket server running on port ${PORT}`);
  });
}

module.exports = { app, server };