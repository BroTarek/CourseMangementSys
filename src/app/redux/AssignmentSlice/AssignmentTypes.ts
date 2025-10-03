import { ChangeEvent } from "react"

export type HW={
    fileWithProress:FileWithProgress
    title:string
}
export type AssignedHW={
    hw:HW
    disclaimer:string
    dateOfAssigning:Date
    dueDate:Date
}
export type SubmittedHW={
    hw:HW
    dateOfHWSubmission:Date
}

// Serializable metadata for Redux
// Serializable metadata for Redux
export type FileMeta = {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  uploaded: boolean;
  fileUrl?: string;   // ✅ add file URL
};

// Local map for keeping the actual File objects
export type FileWithBlob = {
  id: string;
  file: File;
};

export type FileWithProgress = {
  id: string;
  file: File;
  progress: number;
  uploaded: boolean;
};

export type FileInputProps = {
  inputRef: React.RefObject<HTMLInputElement|null>;
  disabled: boolean;
  onFileSelect: (e: ChangeEvent<HTMLInputElement>) => void;
};

export type ActionButtonsProps = {
  disabled: boolean;
  onUpload: () => void;
  onClear: () => void;
};

export type ProgressBarProps = {
  progress: number;
};

export type FileListProps = {
  files: FileMeta[];
  onRemove: (id: string) => void;
  uploading: boolean;
};
export type FileItemProps = {
  file: FileMeta;
  onRemove: (id: string) => void;
  uploading: boolean;
};
