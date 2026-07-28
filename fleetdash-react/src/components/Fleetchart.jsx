import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

const data = [
  { day: "Mon", trips: 120 },
  { day: "Tue", trips: 180 },
  { day: "Wed", trips: 150 },
  { day: "Thu", trips: 240 },
  { day: "Fri", trips: 220 },
  { day: "Sat", trips: 300 },
  { day: "Sun", trips: 280 }
];

export default function FleetChart() {
  return (
    <div className="panel">
      <h3>Weekly Trips</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid stroke="#334155" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="trips"
            stroke="#2563EB"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}