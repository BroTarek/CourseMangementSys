'use client'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/redux/store'
import {
  setFiles,
  clearAll,
  changeTitleOfSpecificFile,
} from '@/app/redux/Assignments/AssignmentSlice'
import { uploadFile } from '@/app/redux/Assignments/AssignmentThunk'
import type { CustomFile } from '@/app/redux/Assignments/AssignmentTypes'

export default function AssignmentUploader() {
  const dispatch = useAppDispatch()
  const { files, arePending } = useAppSelector((state) => state.AssignmentReducer)

  const [showPopup, setShowPopup] = useState(false)
  const [editingFileId, setEditingFileId] = useState<string | null>(null)
  const [tempTitle, setTempTitle] = useState('')

  const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || [])
    const newFiles: CustomFile[] = selectedFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      upload: false,
      progress: 0,
      title: file.name,
    }))
    dispatch(setFiles(newFiles))
  }

  const handleUpload = async () => {
    if (files.length === 0) return
    await dispatch(uploadFile(files))
    setShowPopup(true)
    setTimeout(() => setShowPopup(false), 2000)
  }

  const handleEdit = (file: CustomFile) => {
    setEditingFileId(file.id)
    setTempTitle(file.title)
  }

  const handleSaveTitle = (fileId: string) => {
    if (!tempTitle.trim()) return
    dispatch(changeTitleOfSpecificFile({ id: fileId, title: tempTitle }))
    setEditingFileId(null)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-lg">
        <h1 className="text-2xl font-semibold mb-4 text-center">📂 Assignment Uploader</h1>

        <input
          type="file"
          multiple
          onChange={handleSelectFiles}
          className="mb-4 w-full border p-2 rounded-lg"
        />

        <div className="flex justify-between mb-4">
          <button
            onClick={handleUpload}
            disabled={arePending || files.length === 0}
            className={`px-4 py-2 rounded-lg text-white transition ${
              arePending
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {arePending ? 'Uploading...' : 'Upload'}
          </button>

          <button
            onClick={() => dispatch(clearAll())}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            Clear All
          </button>
        </div>

        <div className="space-y-3">
          {files.map((file) => (
            <div
              key={file.id}
              className="border rounded-lg p-3 bg-gray-50 shadow-sm"
            >
              {editingFileId === file.id ? (
                <input
                  className="border p-1 rounded w-full mb-2"
                  value={tempTitle}
                  autoFocus
                  onChange={(e) => setTempTitle(e.target.value)}
                  onBlur={() => handleSaveTitle(file.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveTitle(file.id)
                  }}
                />
              ) : (
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium text-gray-800">{file.title}</p>
                  <button
                    onClick={() => handleEdit(file)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    ✏️ Edit
                  </button>
                </div>
              )}

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${file.progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {file.progress}% uploaded
              </p>
            </div>
          ))}
        </div>
      </div>

      {showPopup && (
        <div className="fixed top-10 right-10 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
          ✅ All files uploaded successfully!
        </div>
      )}
    </div>
  )
}
