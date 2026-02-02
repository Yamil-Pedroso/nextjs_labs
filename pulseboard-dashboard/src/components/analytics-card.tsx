"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const data = [
  { name: "Mon", value: 120 },
  { name: "Tue", value: 210 },
  { name: "Wed", value: 180 },
  { name: "Thu", value: 260 },
  { name: "Fri", value: 300 },
  { name: "Sat", value: 240 },
  { name: "Sun", value: 280 },
];

export function AnalyticsCard() {
  return (
    <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-[rgb(var(--muted))]">
          Weekly Sessions
        </h3>
        <span className="text-xs text-[rgb(var(--muted))]">Last 7 days</span>
      </div>

      <div className="h-52 sm:h-60">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="sessionsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="rgb(var(--primary))"
                  stopOpacity={0.35}
                />
                <stop
                  offset="100%"
                  stopColor="rgb(var(--primary))"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="name"
              stroke="rgb(var(--muted))"
              tickLine={false}
              axisLine={false}
              fontSize={12}
            />

            <YAxis
              stroke="rgb(var(--muted))"
              tickLine={false}
              axisLine={false}
              fontSize={12}
            />

            <Tooltip
              cursor={{ stroke: "rgb(var(--primary))", strokeDasharray: "4 4" }}
              contentStyle={{
                backgroundColor: "rgb(var(--card))",
                border: "1px solid rgb(var(--border))",
                borderRadius: "0.5rem",
                color: "rgb(var(--text))",
                fontSize: "0.75rem",
              }}
              labelStyle={{ color: "rgb(var(--muted))" }}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="rgb(var(--primary))"
              strokeWidth={2.5}
              fill="url(#sessionsGradient)"
              dot={false}
              activeDot={{
                r: 5,
                fill: "rgb(var(--primary))",
                stroke: "rgb(var(--card))",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
