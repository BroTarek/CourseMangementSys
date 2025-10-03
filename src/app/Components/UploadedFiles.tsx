import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { FileMeta } from "../redux/AssignmentSlice/AssignmentTypes";
import { RootState } from "../redux/store";

export default function UploadedFiles() {
  const files = useSelector((state: RootState) => state.Assignments.items);
  const router = useRouter();

  return (
    <div>
      {files.map((file: FileMeta) => (
        <div key={file.id}>
          <span>{file.name}</span>
          {file.uploaded && file.fileUrl && (
            <button onClick={() => router.push(file.fileUrl||'')}>Show</button>
          )}
        </div>
      ))}
    </div>
  );
}
