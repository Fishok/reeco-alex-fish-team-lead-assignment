import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  permissions: Array<string>;
};

const initialState: AuthState = {
  permissions: ['users:view', 'users:add'],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setPermissions(state, action: PayloadAction<Array<string>>) {
      state.permissions = action.payload;
    },
  },
});

export const { setPermissions } = authSlice.actions;
export default authSlice.reducer;
