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

// ✅ shadcn UI imports
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useToast } from '@/hooks/use-toast'

export default function AssignmentUploader() {
  const dispatch = useAppDispatch()
  const { files, arePending } = useAppSelector((state) => state.AssignmentReducer)

  const [editingFileId, setEditingFileId] = useState<string | null>(null)
  const [tempTitle, setTempTitle] = useState('')

  const { toast } = useToast()

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
    toast({
      title: '✅ Upload Complete',
      description: 'All files uploaded successfully!',
      variant: 'default',
    })
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
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-6">
      <Card className="w-full max-w-lg shadow-lg border border-border/60">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-semibold">📂 Assignment Uploader</CardTitle>
          <CardDescription>Upload and manage your assignment files</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* File input */}
          <Input
            type="file"
            multiple
            onChange={handleSelectFiles}
            className="cursor-pointer"
          />

          {/* Buttons */}
          <div className="flex justify-between gap-3">
            <Button
              onClick={handleUpload}
              disabled={arePending || files.length === 0}
              variant={arePending ? 'secondary' : 'default'}
            >
              {arePending ? 'Uploading...' : 'Upload'}
            </Button>

            <Button
              onClick={() => dispatch(clearAll())}
              variant="destructive"
            >
              Clear All
            </Button>
          </div>

          {/* File List */}
          <ScrollArea className="h-[280px] rounded-md border p-3">
            <div className="space-y-4">
              {files.length === 0 && (
                <p className="text-sm text-muted-foreground text-center">No files selected</p>
              )}

              {files.map((file) => (
                <div
                  key={file.id}
                  className="border rounded-lg p-3 bg-muted/50 hover:bg-muted/70 transition"
                >
                  {editingFileId === file.id ? (
                    <Input
                      className="mb-2"
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
                      <p className="font-medium truncate max-w-[70%]">{file.title}</p>
                      <Button
                        variant="link"
                        className="text-blue-600 p-0 h-auto text-sm"
                        onClick={() => handleEdit(file)}
                      >
                        ✏️ Edit
                      </Button>
                    </div>
                  )}

                  <Progress value={file.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {file.progress}% uploaded
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>

        <CardFooter className="text-center text-xs text-muted-foreground">
          Uploads are automatically saved to your account.
        </CardFooter>
      </Card>
    </div>
  )
}
