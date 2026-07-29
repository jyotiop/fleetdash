// 1. IMPORTS
const express = require('express');
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');
const { Worker } = require('worker_threads');
const { setupSocket, packCoordinates } = require('./socketHandler');

// Redis Client Import (Requires JuRU's redisClient.js file)
let redisPublisher, redisSubscriber;
try {
  const redis = require('./redisClient');
  redisPublisher = redis.redisPublisher;
  redisSubscriber = redis.redisSubscriber;
} catch (e) {
  console.log('⚠️ redisClient.js not found yet. Running without Redis.');
}

// 2. INITIALIZE EXPRESS & SOCKET.IO SERVER
const app = express();
const PORT = 3000;
const server = http.createServer(app);
const io = setupSocket(server); // Attaches Socket.io engine

app.use(express.json());


// 3. MONGODB CONNECTION
// Replace with your actual MongoDB connection string if required
const MONGO_URI = 'mongodb+srv://kushwahajyoti76881_db_user:<jyotiMongooseDB@jyotiscluster.xtfdirj.mongodb.net/?appName=jyotiscluster';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB successfully!'))
  .catch((err) => console.log('⚠️ MongoDB Connection Note:', err.message));

// 4. MAIN INGESTION ENDPOINT
app.post('/api/telemetry', (req, res) => {
  const telemetryData = req.body;

  
  // Offload coordinate parsing to background worker thread
  const workerPath = path.resolve(__dirname, 'telemetryWorker.js');
  const worker = new Worker(workerPath, { workerData: telemetryData });

  // Listen for processed data from worker thread
  worker.on('message', (processedData) => {
    
    // 📡 Publish to Redis channel if Redis is active
    if (redisPublisher) {
      redisPublisher.publish('vehicle-telemetry', JSON.stringify(processedData));
    }

    
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

// 5. REDIS SUBSCRIBER ➔ SOCKET.IO BROADCAST BRIDGE
if (redisSubscriber) {
  redisSubscriber.subscribe('vehicle-telemetry', (err) => {
    if (!err) console.log('📡 Subscribed to vehicle-telemetry Redis channel!');
  });

  redisSubscriber.on('message', (channel, message) => {
    if (channel === 'vehicle-telemetry') {
      const data = JSON.parse(message);

      // Pack coordinates into binary buffer for ultra-fast transport
      const binaryBuffer = packCoordinates(data.lat, data.lng);

      // Broadcast update to connected map clients
      io.emit('location-update', {
        vehicleId: data.vehicleId,
        location: binaryBuffer
      });
    }
  });
}

// 6. START SERVER (SINGLE listen command)
server.listen(PORT, () => {
  console.log(`🚀 Harshit & Jyoti's FleetDash API & Socket server running on port ${PORT}`);
});