import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const RevenueChart = ({ data }) => {

  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-5 rounded-xl shadow">
        <h3 className="mb-4 font-semibold">Revenue Overview</h3>
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  const xKey = data.length > 0 && data[0].month ? "month" : "day";

  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h3 className="mb-4 font-semibold text-gray-700">
        Revenue Overview
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey={xKey} />
          <YAxis tickFormatter={(value) => `₹${value}`} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip formatter={(value) => `₹${value}`} />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#4f46e5"
            strokeWidth={3}
            dot={{ r: 4 }}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;