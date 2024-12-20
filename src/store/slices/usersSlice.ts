import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types';

// Mock API call
const fetchUsersApi = async () => {
  const mockUsers: User[] = Array.from({ length: 20 }, (_, i) => ({
    id: `user-${i + 1}`,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    status: Math.random() > 0.3 ? 'active' : 'inactive',
    region: ['North', 'South', 'East', 'West'][Math.floor(Math.random() * 4)],
    registrationDate: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString(),
  }));
  
  return new Promise<User[]>((resolve) => {
    setTimeout(() => resolve(mockUsers), 1000);
  });
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await fetchUsersApi();
    return response;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [] as User[],
    loading: false,
    error: null as string | null,
    currentPage: 1,
    searchTerm: '',
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },
    deleteUser: (state, action) => {
      state.list = state.list.filter(user => user.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});

export const { setCurrentPage, setSearchTerm, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;