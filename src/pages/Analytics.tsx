import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types';
import { updateAnalytics, setDateRange, setSelectedRegion } from '../store/slices/analyticsSlice';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ResponsiveContainer,
} from 'recharts';
import { Users, UserCheck, UserMinus, Calendar } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function Analytics() {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.list);
  const analytics = useSelector((state: RootState) => state.analytics);

  useEffect(() => {
    dispatch(updateAnalytics(users));
  }, [dispatch, users]);

  const handleDateRangeChange = (start: string, end: string) => {
    dispatch(setDateRange({ start, end }));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-2xl font-bold">{analytics.totalUsers}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <UserCheck className="w-8 h-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Active Users</p>
              <p className="text-2xl font-bold">{analytics.activeUsers}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <UserMinus className="w-8 h-8 text-red-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Deleted Users</p>
              <p className="text-2xl font-bold">{analytics.deletedUsers}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Calendar className="w-8 h-8 text-purple-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Date Range</p>
              <input
                type="date"
                value={analytics.dateRange.start.split('T')[0]}
                onChange={(e) =>
                  handleDateRangeChange(e.target.value, analytics.dateRange.end)
                }
                className="text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Registration Trend */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">User Registration Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.registrationTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Active vs Inactive Users */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">User Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Active', value: analytics.usersByStatus.active },
                  { name: 'Inactive', value: analytics.usersByStatus.inactive },
                ]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {[0, 1].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Users by Region */}
        <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Users by Region</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.usersByRegion}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8">
                {analytics.usersByRegion.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Analytics;