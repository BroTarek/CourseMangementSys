import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TutorState {
    tutors: Tutor[];
    loading: boolean;
    error: string | null;
}

interface Tutor {
    id: string;
    name: string;
    subject: string;
}

const initialState: TutorState = {
    tutors: [],
    loading: false,
    error: null,
};

const tutorSlice = createSlice({
    name: 'tutor',
    initialState,
    reducers: {
        fetchTutorsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchTutorsSuccess(state, action: PayloadAction<Tutor[]>) {
            state.tutors = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchTutorsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        addTutor(state, action: PayloadAction<Tutor>) {
            state.tutors.push(action.payload);
        },
        removeTutor(state, action: PayloadAction<string>) {
            state.tutors = state.tutors.filter(tutor => tutor.id !== action.payload);
        },
    },
});

export const {
    fetchTutorsStart,
    fetchTutorsSuccess,
    fetchTutorsFailure,
    addTutor,
    removeTutor,
} = tutorSlice.actions;

export default tutorSlice.reducer;