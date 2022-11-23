import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { profile } from 'api/member';
import { GetProfileParams } from 'models/member';

export interface MemberInitialState extends InitialState<Nullable<GetProfileParams>> { }

export const fetchProfile = createAsyncThunk('member/profile', async () => {
    try {
        const response = await profile.getProfile();
        return response.data;
    } catch (error) {
        return error;
    }
});

const memberInitialState: MemberInitialState = {
    loading: false,
    data: null,
    error: {},
};

export const memberSlice = createSlice({
    name: 'member',
    initialState: memberInitialState,
    reducers: {
        reset: () => {
            return memberInitialState;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProfile.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
    },
});

export const { reset } = memberSlice.actions;

export default memberSlice;
