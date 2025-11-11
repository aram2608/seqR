import { FileUp } from "lucide-react";
import { css, jsx } from "@emotion/react";

import {
  fileDropZoneStyles,
  dropZoneDynamicStyles,
  iconDynamicStyles,
  fileSelectedTextStyles,
} from "@/styles/FileDropStyles";

// We make a data type to store all the props
type FileDropProps = {
  label: string;
  file: File | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
};

// We make a custom function compoent to help style the file landing zone
const FileDropZone: React.FC<FileDropProps> = ({
  label,
  file,
  onChange,
  disabled,
}) => {
  const fileInputId = label.replace(/\s/g, "-").toLowerCase();

  return (
    <div css={fileDropZoneStyles.container}>
      <label css={fileDropZoneStyles.mainLabel}>{label}</label>
      <label htmlFor={fileInputId} css={dropZoneDynamicStyles(file, disabled)}>
        <div css={fileDropZoneStyles.contentWrapper}>
          <FileUp css={iconDynamicStyles(file)} />
          <p css={fileDropZoneStyles.textBase}>
            {file ? (
              <span css={fileSelectedTextStyles}>
                File Selected: {file.name}
              </span>
            ) : (
              <>
                <span
                  css={css`
                    font-weight: 600;
                  `}
                >
                  Click to upload
                </span>{" "}
                or drag and drop
              </>
            )}
          </p>
          <p css={fileDropZoneStyles.subtext}>(TSV or CSV)</p>
        </div>
        <input
          id={fileInputId}
          type="file"
          css={fileDropZoneStyles.hiddenInput}
          onChange={onChange}
          accept=".csv,.tsv,text/csv,text/tab-separated-values"
          disabled={disabled}
          required
        />
      </label>
    </div>
  );
};

export default FileDropZone;
