import { useState, useCallback } from "react";

import formStyles from "@/styles/FormStyle";
import FileDropZone from "@/components/FileDrop";

import type { DeseqConfigData } from "@/models/DeseqConfigType";

export const FileForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<DeseqConfigData>({
    formula: "",
    countsFile: null,
    metadataFile: null,
  });

  // This function listens to files changes for both file types
  const handleFileChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      fileType: "countsFile" | "metadataFile",
    ) => {
      // We retrieve the file if there is a value
      const file = e.target.files ? e.target.files[0] : null;
      // We then create a new object by copying the previous object and overriding
      // the corresponding file prop
      setFormData((prev) => ({ ...prev, [fileType]: file }));
    },
    [],
  );
  return (
    <div css={formStyles.fileGrid}>
      {/* Counts File Upload */}
      <FileDropZone
        label="Counts Matrix (TSV/CSV)"
        file={formData.countsFile}
        onChange={(e) => handleFileChange(e, "countsFile")}
        disabled={isSubmitting}
      />

      {/* Metadata File Upload */}
      <FileDropZone
        label="Metadata File (TSV/CSV)"
        file={formData.metadataFile}
        onChange={(e) => handleFileChange(e, "metadataFile")}
        disabled={isSubmitting}
      />
    </div>
  );
};
