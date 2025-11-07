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
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/hooks/use-toast'
import { SelectOption } from './blocks/SelectOption'
import { GroupSection } from './blocks/GroupsSection'

export default function AssignmentPage() {
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
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-8">
      <Card className="w-full max-w-6xl shadow-lg border border-border/60">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-semibold">📂 Assignment Management</CardTitle>
          <CardDescription>Upload assignments and assign them to student groups</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left side — Uploader */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Upload Assignments</h2>

              <Input
                type="file"
                multiple
                onChange={handleSelectFiles}
                className="cursor-pointer"
              />

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

              <ScrollArea className="h-[280px] rounded-md border p-3">
                <div className="space-y-4">
                  {files.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center">
                      No files selected
                    </p>
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
            </div>

            {/* Right side — Selection Section */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">Assign To</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Select Option</Label>
                  <SelectOption />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="GroupName">Group Name</Label>
                  <Input id="GroupName" type="text" placeholder="October" />
                </div>

                <div className="flex items-center gap-3">
                  <Checkbox id="terms" />
                  <Label htmlFor="terms">Accept terms and conditions</Label>
                </div>

                <div className="max-h-[250px] overflow-y-auto pr-2">
                  <ScrollArea className="h-72 w-full rounded-md border">
                    <GroupSection />
                  </ScrollArea>
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="text-center text-xs text-muted-foreground">
          All uploaded files and assigned groups are automatically saved.
        </CardFooter>
      </Card>
    </div>
  )
}
