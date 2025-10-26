import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AssignmentSliceInitState, CustomFile } from './AssignmentTypes'
import { RootState } from '../store'
import { uploadFile } from './AssignmentThunk'

const initialState: AssignmentSliceInitState = {
    files: [],
    comments: '',
    allUploaded: false,
    arePending: false,
    errors: {}
}

const AssignmentSlice = createSlice({
    name: 'AssignmentSlice',
    initialState,
    reducers: {
        clearAll: (state) => {
            state.files = []
        },
        setFiles: (state, action: PayloadAction<CustomFile[]>) => {
            state.files = action.payload
        },
        updateProgress: (state, action: PayloadAction<{ id: string, progress: number }>) => {
            const file = state.files.find(file => file.id === action.payload.id)
            if (file) {
                file.progress = action.payload.progress
            }
        },
        addCommentToSpecificFile:(state,action:PayloadAction<{id:string,comment:string}>)=>{
          const file=state.files.find(f=>f.id===action.payload.id)
          if(file)
            file.comment=action.payload.comment
        },
        changeTitleOfSpecificFile:(state,action:PayloadAction<{id:string,title:string}>)=>{
          const file=state.files.find(f=>f.id===action.payload.id)
          if(file)
            file.title=action.payload.title
        }

    },
    extraReducers: (build) => build
        .addCase(uploadFile.pending, (state, action) => {
            state.arePending = true
        })
        .addCase(uploadFile.fulfilled, (state, action) => {
            state.allUploaded = true
            state.arePending = false
        }
        )
        .addCase(uploadFile.rejected, (state, action) => {
            state.errors = action.error
        })
})
export const { clearAll, setFiles,updateProgress,addCommentToSpecificFile,changeTitleOfSpecificFile } = AssignmentSlice.actions
export default AssignmentSlice.reducer