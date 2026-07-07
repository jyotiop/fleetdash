# fleetdash
Real-time vehicle tracking dashboard - Infotact Solutions internship project (MERN Stack)

## About the Project
FleetDash is a high-throughput, event-driven fleet tracking dashboard built as part of the MERN Stack Development internship at Infotact Solutions. It enables real-time tracking of thousands of concurrent vehicles with live map rendering and geofence breach alerts.

## Problem Statement
Logistics companies struggle with tracking thousands of concurrent vehicles in real-time. Traditional data ingestion methods block the main thread, and high-frequency coordinate updates often cause frontend applications to freeze or crash due to DOM overload.

## Use Case
A fleet manager opens FleetDash and sees a live map instantly rendering thousands of moving vehicle coordinates without any UI lag. When a delivery truck breaches a geofenced zone, the dashboard instantly flashes an alert — all processed without dropping a single data point.

## Tech Stack
- **Frontend:** React, TypeScript, Canvas API, Socket.io Client
- **Backend:** Node.js, Express, worker_threads
- **Database:** MongoDB (Bucket Pattern)
- **Real-Time:** Socket.io, Redis Pub/Sub
- **Geospatial:** Turf.js

## Key Modules
- **Ingestion Engine** (Node.js & worker_threads) - Offloads heavy coordinate parsing from the main thread
- **Database Layer** (MongoDB Bucket Pattern) - Groups high-frequency telemetry into hourly arrays
- **Message Broker** (Redis & Socket.io) - Pub/Sub layer for low-latency broadcasting
- **Live Map UI** (React & Canvas API) - Batches spatial points using requestAnimationFrame
- **Geospatial Rules** (Turf.js) - Real-time boundary intersection checks for geofence breaches

## Team
- **Team Leader:** Jyoti (Frontend - React, Canvas API, Socket.io client)
- [Add other team members' names and roles here]

## Branch Structure
- `main` — stable, production-ready code
- `feature/socket-client` — Socket.io client integration
- `feature/canvas-ui` — Canvas-based live map rendering
- `feature/backend-api` — Express backend & MongoDB setup

## Setup Instructions

### Backend
\`\`\`bash
cd backend
npm install
npm run dev
\`\`\`

### Frontend
\`\`\`bash
cd frontend
npm install
npm start
\`\`\`

## Development Timeline
4-week Agile development cycle:
- **Week 1:** Core setup (backend server, UI scaffolding)
- **Week 2:** Caching & live connection (Redis, Socket.io)
- **Mid-Project Review:** Load validation & architecture check
- **Week 3:** Geospatial logic & Canvas optimization
- **Week 4:** Testing, deployment & final polish
- **Final Project Review:** Full working dashboard demo

## License
Internal project - Infotact Solutions internship program.
