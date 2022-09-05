import { createSlice } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    value: {
      data: [],
      limit: 0,
      page: 0,
      total: 0
    }
  },
  reducers: {
    setUsers: (state, action) => {      
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUsers } = usersSlice.actions

export default usersSlice.reducer