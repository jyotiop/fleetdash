// server.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');
const { Worker } = require('worker_threads');
const { setupSocket, packCoordinates } = require('./socketHandler');
const FleetBucket = require('./FleetBucket');

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
const MONGO_URI = process.env.MONGODB_URI || 'mongodb+srv://kushwahajyoti76881_db_user:jyoti5113@jyotiscluster.xtfdirj.mongodb.net/?appName=jyotiscluster';
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

      worker.on('message', async (processedData) => {
        // Safe publish to Redis (prevents crashes if Redis is offline/closed)
        try {
          if (redisPublisher && redisPublisher.status === 'ready') {
            redisPublisher.publish('vehicle-telemetry', JSON.stringify(processedData));
          }
        } catch (redisErr) {
          console.warn('⚠️ Redis publish failed (vehicle-telemetry):', redisErr.message);
        }

        // Direct Socket emit fallback if Redis is offline
        if (!redisPublisher || redisPublisher.status !== 'ready') {
          const binaryBuffer = packCoordinates(processedData.lat, processedData.lng);
          io.emit('location-update', { vehicleId: processedData.vehicleId, location: binaryBuffer });
        }

        // Publish to geofence-alerts channel if a geofence breach was detected
        try {
          if (processedData.isBreached && redisPublisher && redisPublisher.status === 'ready') {
            const alertMessage = JSON.stringify({
              type: 'GEOFENCE_BREACH',
              vehicleId: processedData.vehicleId,
              timestamp: processedData.timestamp
            });
            redisPublisher.publish('geofence-alerts', alertMessage);
          }
        } catch (redisErr) {
          console.warn('⚠️ Redis publish failed (geofence-alerts):', redisErr.message);
        }

        // Direct Socket alert fallback if Redis is offline
        if (processedData.isBreached && (!redisPublisher || redisPublisher.status !== 'ready')) {
          io.emit('geofence-alert', {
            type: 'GEOFENCE_BREACH',
            vehicleId: processedData.vehicleId,
            timestamp: processedData.timestamp
          });
        }

        // Save telemetry data to MongoDB Atlas using the Bucket Pattern
        try {
          const date = new Date(processedData.timestamp);
          const hourTimestamp = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), 0, 0, 0));

          await FleetBucket.findOneAndUpdate(
            { 
              vehicleId: processedData.vehicleId, 
              hourTimestamp: hourTimestamp 
            },
            {
              $push: {
                measurements: {
                  lat: processedData.lat,
                  lng: processedData.lng,
                  timestamp: date
                }
              },
              $inc: { totalPoints: 1 }
            },
            { 
              upsert: true,
              returnDocument: 'after' 
            }
          );
          console.log(`💾 Telemetry saved to MongoDB Bucket for vehicle ${processedData.vehicleId}`);
        } catch (dbErr) {
          console.error("⚠️ Failed to save telemetry to MongoDB:", dbErr.message);
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

  redisSubscriber.subscribe('geofence-alerts', (err) => {
    if (!err) console.log('📡 Subscribed to geofence-alerts Redis channel!');
  });

  redisSubscriber.on('message', (channel, message) => {
    if (channel === 'vehicle-telemetry') {
      const data = JSON.parse(message);
      const binaryBuffer = packCoordinates(data.lat, data.lng);
      io.emit('location-update', { vehicleId: data.vehicleId, location: binaryBuffer });
    } else if (channel === 'geofence-alerts') {
      const alertData = JSON.parse(message);
      io.emit('geofence-alert', alertData);
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
