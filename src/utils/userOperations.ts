import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { UserDetails, UserDetailsState } from './types';

//initial State
const initialState: UserDetailsState = {
    list: [],
    details: null,
    searchQuery: '',
    status: 'idle',
    error: null,
};

//Get user details
export const getUser = createAsyncThunk<UserDetails[]>(
    'users/getUsers',
    async () => {
        const response = await fetch('https://dummyjson.com/users');
        if (!response.ok) {
            throw new Error(`API failed, Error: ${response.status}, Please refresh the page`)
        }
        const responseData = await response.json();
        return responseData.users;
    }
)

// search user by id
export const getUserById = createAsyncThunk<UserDetails, number>(
    'users/getUserById',
    async (userId) => {
        const response = await fetch(`https://dummyjson.com/users/${userId}`);
        if (!response.ok) {
            throw new Error(`API failed, Error: ${response.status}, Please refresh the page`)
        }
        const responseData = await response.json();
        return responseData as UserDetails;
    }
)

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setSearchQuery(state, action) {
            state.searchQuery = action.payload;
        }
    },
    extraReducers: (builders) => {
        builders
            .addCase(getUser.pending, (state) => {
                state.status = 'loading';
                state.error = undefined
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.status = 'success';
                state.list = action.payload;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to get Data';
            })
            .addCase(getUserById.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.status = 'success';
                state.details = action.payload;
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to get Data';
            })
    }
})

export const { setSearchQuery } = userSlice.actions;

// defining Selectors 
export const selectUserDetail = (state: RootState) => state.users.details;
export const selectSearchQuery = (state: RootState) => state.users.searchQuery;
export const selectAllUsers = (state: RootState) => state.users.list;

export const selectFilteredUsers = (state: RootState) => {
    const query = state.users.searchQuery.toLowerCase();
    if (!query) {
        return state.users.list;
    } else {
        return state.users.list.filter((user) => (user.firstName + '' + user.lastName).toLowerCase().includes(query));
    }
}

export default userSlice.reducer