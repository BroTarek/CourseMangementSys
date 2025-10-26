import { createAsyncThunk } from '@reduxjs/toolkit'
import { CustomFile } from './AssignmentTypes'
import { updateProgress } from './AssignmentSlice'

export const uploadFile = createAsyncThunk(
  'AssignmentSlice/uploadFile',
  async (files: CustomFile[], { dispatch, rejectWithValue }) => {
    try {
      const response = files.map(async (file) => {
        const formData = new FormData()
        formData.append('file', file.file)

        const result = await new Promise((resolve) => {
          setTimeout(() => dispatch(updateProgress({ id: file.id, progress: 30 })), 500)
          setTimeout(() => dispatch(updateProgress({ id: file.id, progress: 50 })), 750)
          setTimeout(() => dispatch(updateProgress({ id: file.id, progress: 90 })), 1000)
          setTimeout(() => {
            dispatch(updateProgress({ id: file.id, progress: 100 }))
            resolve({
              fileUrl: 'www.google.com',
              fileName: file.title,
            })
          }, 1500)
        })
        console.log(result)
        return result
      })

      const results = await Promise.all(response)
      return results
    } catch (error) {
      return rejectWithValue('File upload failed')
    }
  }
)
