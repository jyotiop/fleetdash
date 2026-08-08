<<<<<<< HEAD
// server.js
const express = require('express');
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');
const { Worker } = require('worker_threads');
const { setupSocket, packCoordinates } = require('./socketHandler');
const FleetBucket = require('./FleetBucket');
=======
// const express = require('express');
// const { Worker } = require('worker_threads');
// const path = require('path');

// const app = express();
// const PORT = 3000;

// app.use(express.json());


// app.post('/api/telemetry', (req, res) => {
//     const telemetryData = req.body;


//     const workerPath = path.resolve(__dirname, 'telemetryWorker.js');
//     const worker = new Worker(workerPath, { workerData: telemetryData });


//     worker.on('message', (processedData) => {

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
const FleetBucket = require('./FleetBucket'); // JuRU's schema file
>>>>>>> 51fa66d1ab2b7f3e384d8386ab445d8d06af2cc8

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
<<<<<<< HEAD
const server = http.createServer(app);
const io = setupSocket(server);
app.use(express.json());

// 3. MONGODB CONNECTION
const MONGO_URI = 'mongodb+srv://kushwahajyoti76881_db_user:jyotiMongooseDB@jyotiscluster.xtfdirj.mongodb.net/?appName=jyotiscluster';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB successfully!'))
  .catch((err) => console.log('⚠️ MongoDB Connection Note:', err.message));

// 4. MAIN INGESTION ENDPOINT
=======


app.use(express.json());

// 🔌 ASK JURU FOR THEIR MONGODB ATLAS CONNECTION STRING AND PASTE IT HERE:
const MONGO_URI = "mongodb+srv://kushwahajyoti76881_db_user:jyotiMongooseDB@jyotiscluster.xtfdirj.mongodb.net/?appName=jyotiscluster"; 

mongoose.connect(MONGO_URI)
    .then(() => console.log("Connected to FleetDash MongoDB successfully!"))
    .catch(err => console.error("MongoDB connection failed:", err));

// Main Ingestion Endpoint
>>>>>>> 51fa66d1ab2b7f3e384d8386ab445d8d06af2cc8
app.post('/api/telemetry', (req, res) => {
  try {
      const telemetryData = req.body;

<<<<<<< HEAD
      // Basic validation so the test doesn't crash if data is missing
      if (!telemetryData || !telemetryData.vehicleId) {
          return res.status(400).json({ status: "Error", message: "Invalid payload" });
      }

      const workerPath = path.resolve(__dirname, 'telemetryWorker.js');
      const worker = new Worker(workerPath, { workerData: telemetryData });

      worker.on('message', async (processedData) => {
        if (redisPublisher) {
          redisPublisher.publish('vehicle-telemetry', JSON.stringify(processedData));
        }

        // Publish to geofence-alerts channel if a geofence breach was detected
        if (processedData.isBreached && redisPublisher) {
          const alertMessage = JSON.stringify({
            type: 'GEOFENCE_BREACH',
            vehicleId: processedData.vehicleId,
            timestamp: processedData.timestamp
          });
          redisPublisher.publish('geofence-alerts', alertMessage);
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
=======
    // 1. Offload processing to isolated worker thread
    const workerPath = path.resolve(__dirname, 'telemetryWorker.js');
    const worker = new Worker(workerPath, { workerData: telemetryData });

    // 2. Capture parsed coordinates back from background thread
    worker.on('message', async (processedData) => {
        try {
            // Drop minutes/seconds to pinpoint the exact 1-hour window bucket
            const date = new Date(processedData.timestamp);
            date.setMinutes(0,0,0); 

            // 3. Update the hourly bucket document atomically inside MongoDB
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
                { upsert: true } // Generate a new document if it's the first ping of the hour
            );

            res.status(202).json({ 
                status: "Success", 
                message: "Data processed via Worker and aggregated in MongoDB Bucket!" 
            });

        } catch (dbError) {
            console.error("Database Error:", dbError);
            res.status(500).json({ error: "Failed to write to database" });
        }
    });
>>>>>>> 51fa66d1ab2b7f3e384d8386ab445d8d06af2cc8

      worker.on('error', (err) => {
        console.error("🚨 WORKER CRASH DETECTED:", err.message); // This will print EXACTLY why it failed!
        res.status(500).json({ status: "Error", message: err.message });
      });

  } catch (error) {
      res.status(500).json({ status: "Error", message: error.message });
  }
});

<<<<<<< HEAD
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
=======
app.listen(PORT, () => console.log(`FleetDash pipeline is integrated and running on port ${PORT}`));

>>>>>>> 51fa66d1ab2b7f3e384d8386ab445d8d06af2cc8
