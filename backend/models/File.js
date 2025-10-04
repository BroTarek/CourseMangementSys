import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  originalName: { type: String, required: true },
  fileUrl: { type: String, required: true },
  public_id: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const File = mongoose.model("File", fileSchema);
export default File;
