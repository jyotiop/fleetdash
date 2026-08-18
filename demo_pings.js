// demo_pings.js
// A quick script to simulate live vehicle GPS pings for your video demo.
// It sends coordinates to the ingestion server every 2 seconds.

const sendPing = async (vehicleId, lat, lng, note) => {
  console.log(`📡 Sending coordinates for ${vehicleId}: [${lat}, ${lng}] - (${note})`);
  try {
    const response = await fetch('http://127.0.0.1:3000/api/telemetry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        vehicleId,
        timestamp: new Date().toISOString(),
        location: { lat, lng }
      })
    });
    const result = await response.json();
    console.log(`✅ Server Responded: ${result.status} (HTTP Code: ${response.status})`);
  } catch (err) {
    console.error(`❌ Failed to send ping: ${err.message}`);
  }
};

const runDemo = async () => {
  console.log("🚀 Starting FleetDash Demo Coordinates Simulator...\n");

  // Step 1: Normal route ping (Vehicle VH-2026 starts moving in Hyderabad)
  await sendPing("VH-2026", 17.3850, 78.4867, "Starting normal trip in Hyderabad");
  
  await new Promise(r => setTimeout(r, 2000));

  // Step 2: Normal route ping (Vehicle moves slightly)
  await sendPing("VH-2026", 17.3890, 78.4910, "Moving along route");

  await new Promise(r => setTimeout(r, 2000));

  // Step 3: Trigger a geofence breach alert!
  // Restricted boundary covers lat: 28.5310 to 28.5355, lng: 77.3910 to 77.3950
  // Sending exactly inside: lat: 28.5330, lng: 77.3920
  await sendPing("TRUCK-Alpha", 28.5330, 77.3920, "🚨 CRITICAL: Entering restricted warehouse zone");

  await new Promise(r => setTimeout(r, 2000));

  // Step 4: Another breach alert to show continuous tracking
  await sendPing("TRUCK-Alpha", 28.5340, 77.3930, "🚨 CRITICAL: Moving inside restricted warehouse zone");

  console.log("\n🎬 Simulator finished! Check your React browser dashboard to see the live map markers and pulsing alerts.");
};

runDemo();
