import {configureStore} from '@reduxjs/toolkit'
import AssignmentSlice from './Assignments/AssignmentSlice'
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'

export const store=configureStore({
    reducer:{
        AssignmentReducer:AssignmentSlice

    }
   })

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
