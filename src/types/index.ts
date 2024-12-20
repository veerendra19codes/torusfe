export interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  region: string;
  registrationDate: string;
}

export interface AnalyticsState {
  totalUsers: number;
  activeUsers: number;
  deletedUsers: number;
  registrationTrend: {
    date: string;
    count: number;
  }[];
  usersByStatus: {
    active: number;
    inactive: number;
  };
  usersByRegion: {
    region: string;
    count: number;
  }[];
  dateRange: {
    start: string;
    end: string;
  };
  selectedRegion: string | null;
}

export interface RootState {
  users: {
    list: User[];
    loading: boolean;
    error: string | null;
    currentPage: number;
    searchTerm: string;
  };
  analytics: AnalyticsState;
}