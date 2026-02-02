import React from "react";
import { Upload, X, Trash2 } from "lucide-react";
import { Label } from "@/components/ui";

interface MultiFileUploadProps {
    files: File[];
    onChangeFiles: (files: File[]) => void;
}

export default function MultiFileUpload({
  files,
  onChangeFiles,
}: MultiFileUploadProps) {
  const [previewFile, setPreviewFile] = React.useState<{
        file: File;
        url: string;
    } | null>(null);

  /* ================== FILE CHANGE ================== */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files)
    { return; }

    const newFiles = Array.from(e.target.files);
    onChangeFiles([...files, ...newFiles]);

    // reset input (เลือกไฟล์ซ้ำได้)
    e.target.value = "";
  };

  /* ================== REMOVE FILE ================== */
  const removeFile = (index: number) => {
    onChangeFiles(files.filter((_, i) => i !== index));
  };

  /* ================== OPEN PREVIEW ================== */
  const openFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreviewFile({ file, url });
  };

  /* ================== CLOSE PREVIEW ================== */
  const closePreview = () => {
    if (previewFile) {
      URL.revokeObjectURL(previewFile.url);
      setPreviewFile(null);
    }
  };

  /* ================== FILE SIZE ================== */
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) 
    { return "0 Bytes"; }
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
  };

  return (
    <div className="w-full">
      {/* ================== UPLOAD BOX ================== */}
      <Label className="text-sm font-medium text-gray-800 py-2">  ເອກະສານ </Label>
      <Label
        htmlFor="file-upload"
        className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 transition-colors block"
      >
        <Upload className="mx-auto h-8 w-8 mb-2" />
        <span className="text-blue-600 font-medium text-sm">
                    ເລືອກໄຟລ໌
        </span>

        <input
          id="file-upload"
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
      </Label>

      {/* ================== FILE LIST ================== */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-50 border rounded p-2 cursor-pointer"
              onClick={() => openFile(file)}
            >
              <div className="min-w-0">
                <p className="text-sm truncate">{file.name}</p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(file.size)}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}>
                  <Trash2 className="  text-red-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================== PREVIEW MODAL ================== */}
      {previewFile && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <div className="bg-white w-[90vw] h-[90vh] rounded-lg flex flex-col">

            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 border-b">
              <h3 className="font-medium truncate">
                {previewFile.file.name}
              </h3>
              <button onClick={closePreview}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
              {previewFile.file.type.startsWith("image/") && (
                <img
                  src={previewFile.url}
                  className="w-full h-full object-contain"
                />
              )}

              {previewFile.file.type === "application/pdf" && (
                <iframe
                  src={`${previewFile.url}#toolbar=0`}
                  className="w-full h-full"
                  title={previewFile.file.name}
                />
              )}

              {previewFile.file.type.startsWith("video/") && (
                <video
                  src={previewFile.url}
                  controls
                  className="w-full h-full"
                />
              )}

              {previewFile.file.type.startsWith("audio/") && (
                <div className="p-6">
                  <audio src={previewFile.url} controls className="w-full" />
                </div>
              )}

              {!previewFile.file.type && (
                <div className="p-6 text-center text-gray-500">
                                    ບໍ່ສາມາດສະແດງໄຟລ໌ນີ້ໄດ້
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
