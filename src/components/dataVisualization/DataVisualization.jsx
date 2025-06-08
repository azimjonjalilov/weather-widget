import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DataVisualization = ({ data, unit }) => {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <h3>5 kunlik harorat grafigi</h3>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis unit={unit === "metric" ? "°C" : "°F"} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="avgTemp"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DataVisualization;
