import { createSlice } from '@reduxjs/toolkit';
import { AnalyticsState } from '../../types';
import { deleteUser } from './usersSlice';

const initialState: AnalyticsState = {
  totalUsers: 0,
  activeUsers: 0,
  deletedUsers: 0,
  registrationTrend: [],
  usersByStatus: {
    active: 0,
    inactive: 0,
  },
  usersByRegion: [],
  dateRange: {
    start: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
    end: new Date().toISOString(),
  },
  selectedRegion: null,
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    updateAnalytics: (state, action) => {
      const users = action.payload;
      state.totalUsers = users.length;
      state.activeUsers = users.filter(u => u.status === 'active').length;
      
      state.usersByStatus = {
        active: users.filter(u => u.status === 'active').length,
        inactive: users.filter(u => u.status === 'inactive').length,
      };

      const regionCounts = users.reduce((acc, user) => {
        acc[user.region] = (acc[user.region] || 0) + 1;
        return acc;
      }, {});

      state.usersByRegion = Object.entries(regionCounts).map(([region, count]) => ({
        region,
        count: count as number,
      }));

      // Generate registration trend
      const trend = {};
      users.forEach(user => {
        const date = user.registrationDate.split('T')[0];
        trend[date] = (trend[date] || 0) + 1;
      });

      state.registrationTrend = Object.entries(trend)
        .map(([date, count]) => ({ date, count: count as number }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    },
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
    setSelectedRegion: (state, action) => {
      state.selectedRegion = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteUser, (state) => {
      state.deletedUsers += 1;
    });
  },
});

export const { updateAnalytics, setDateRange, setSelectedRegion } = analyticsSlice.actions;
export default analyticsSlice.reducer;