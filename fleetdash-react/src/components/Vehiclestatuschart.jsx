import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { name: "Online", value: 987 },
  { name: "Offline", value: 180 },
  { name: "Idle", value: 117 }
];

const COLORS = ["#22C55E", "#EF4444", "#F59E0B"];

export default function VehicleStatusChart() {
  return (
    <div className="panel">
      <h3>Vehicle Status Distribution</h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}