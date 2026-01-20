"use client";

import {
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
  Line,
  ResponsiveContainer
} from "recharts";

type Props = {
  data: any[];
};

export default function OHLCVChart({ data }: Props) {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="price" />
          <YAxis yAxisId="vol" orientation="right" />
          <Tooltip />
          <Line
            yAxisId="price"
            type="monotone"
            dataKey="close"
            stroke="#2563eb"
            dot={false}
          />
          <Bar
            yAxisId="vol"
            dataKey="volume"
            fill="#94a3b8"
            barSize={20}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
