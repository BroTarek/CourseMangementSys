import { configureStore } from '@reduxjs/toolkit';

// Example: import your reducers here
import tutorReducer from '@/app/redux/TutorSlice/TutorSlice';

export const store = configureStore({
    reducer: {
        tutor: tutorReducer,
        
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;