import axios from "axios";
import {
  FileAudio,
  FileIcon,
  FileImage,
  FileText,
  FileVideo,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFiles,
  clearFiles,
  removeFile,
  updateProgress,
  markUploaded,
} from "@/app/redux/AssignmentSlice/AssignmentSlice"; // adjust path
import { RootState } from "../redux/store";
import {
  ActionButtonsProps,
  FileInputProps,
  FileItemProps,
  FileListProps,
  ProgressBarProps,
  FileMeta,
} from "@/app/redux/AssignmentSlice/AssignmentTypes";

export function FileUpload() {
  const dispatch = useDispatch();
  const files = useSelector((state: RootState) => state.Assignments.items);
  const uploading = useSelector((state: RootState) => state.Assignments.uploading);

  // Local map for non-serializable File objects
  const [fileMap, setFileMap] = useState<Map<string, File>>(new Map());
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileSelect(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return;

    const newFiles: FileMeta[] = [];
    const updatedMap = new Map(fileMap);

    Array.from(e.target.files).forEach((file) => {
      const id = crypto.randomUUID();
      updatedMap.set(id, file);

      newFiles.push({
        id,
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        uploaded: false,
      });
    });

    setFileMap(updatedMap);
    dispatch(addFiles(newFiles));

    if (inputRef.current) inputRef.current.value = "";
  }

  async function handleUpload() {
    for (const file of files) {
      const realFile = fileMap.get(file.id);
      if (!realFile) continue;

      const formData = new FormData();
      formData.append("file", realFile);

      try {
        await axios.post("https://httpbin.org/post", formData, {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            dispatch(updateProgress({ id: file.id, progress }));
          },
        });
        dispatch(markUploaded(file.id));
      } catch (error) {
        console.error(error);
      }
    }
  }

  function handleClear() {
    setFileMap(new Map());
    dispatch(clearFiles());
  }

  function handleRemove(id: string) {
    const updatedMap = new Map(fileMap);
    updatedMap.delete(id);
    setFileMap(updatedMap);
    dispatch(removeFile(id));
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">File Upload</h2>
      <div className="flex gap-2">
        <FileInput
          inputRef={inputRef}
          disabled={uploading}
          onFileSelect={handleFileSelect}
        />
        <ActionButtons
          disabled={files.length === 0 || uploading}
          onUpload={handleUpload}
          onClear={handleClear}
        />
      </div>
      <FileList
        files={files.map((meta) => ({
          ...meta,
          file: fileMap.get(meta.id)!
        }))}
        onRemove={handleRemove}
        uploading={uploading}
      />
    </div>
  );
}

function FileInput({ inputRef, disabled, onFileSelect }: FileInputProps) {
  return (
    <>
      <input
        type="file"
        ref={inputRef}
        onChange={onFileSelect}
        multiple
        className="hidden"
        id="file-upload"
        disabled={disabled}
      />
      <label
        htmlFor="file-upload"
        className="flex cursor-pointer items-center gap-2 rounded-md bg-gray-700 px-6 py-2 hover:opacity-90"
      >
        <Plus size={18} />
        Select Files
      </label>
    </>
  );
}

function ActionButtons({  onClear, disabled }: ActionButtonsProps) {
  return (
    <>
   
   
      <button
        onClick={onClear}
        className="flex items-center gap-2"
        disabled={disabled}
      >
        <Trash2 size={18} />
        Clear All
      </button>
    </>
  );
}

function FileList({ files, onRemove, uploading }: FileListProps) {
  if (files.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Files:</h3>
      <div className="space-y-2">
        {files.map((file) => (
          <FileItem
            key={file.id}
            file={file}
            onRemove={onRemove}
            uploading={uploading}
          />
        ))}
      </div>
    </div>
  );
}

function FileItem({ file, onRemove, uploading }: FileItemProps) {
  const Icon = getFileIcon(file.type);

  return (
    <div className="space-y-2 rounded-md bg-gray-700 p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Icon size={40} className="text-blue-500" />
          <div className="flex flex-col">
            <span className="font-medium">{file.name}</span>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>{formatFileSize(file.size)}</span>
              <span>•</span>
              <span>{file.type || "Unknown type"}</span>
            </div>
          </div>
        </div>
        {!uploading && (
          <button onClick={() => onRemove(file.id)} className="bg-none p-0">
            <X size={16} className="text-white" />
          </button>
        )}
      </div>
      <div className="text-right text-xs">
        {file.uploaded ? "Completed" : `${Math.round(file.progress)}%`}
      </div>
      <ProgressBar progress={file.progress} />
    </div>
  );
}

function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-800">
      <div
        className="h-full bg-blue-500 transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

const getFileIcon = (mimeType: string) => {
  if (mimeType.startsWith("image/")) return FileImage;
  if (mimeType.startsWith("video/")) return FileVideo;
  if (mimeType.startsWith("audio/")) return FileAudio;
  if (mimeType === "application/pdf") return FileText;
  return FileIcon;
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};
