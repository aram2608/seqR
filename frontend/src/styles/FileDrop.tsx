/** @jsx jsx */
/** @jsxFrag */
import { css, jsx } from '@emotion/react';
import { FileUp } from 'lucide-react'

const fileDropZoneStyles = {
  container: css({
    backgroundColor: "white",
    padding: "1.5rem",
    borderRadius: "0.75rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06)",
    border: "1px solid #e5e7eb",
  }),
  mainLabel: css({
    display: "block",
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "0.75rem",
  }),
  contentWrapper: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "1.25rem",
    paddingBottom: "1.5rem",
  }),
  textBase: css({
    marginBottom: "0.5rem",
    fontSize: "0.875rem",
    color: "#6b7280",
  }),
  subtext: css`
    font-size: 0.75rem;
    color: #6b7280;
  `,
  hiddenInput: css({
    display: "none",
  }),
};

// Dynamic drop zone styles
const dropZoneDynamicStyles = (file: File | null, disabled: boolean) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 8rem; /* h-32 */
  border-width: 2px; /* border-2 */
  border-radius: 0.75rem; /* rounded-xl */
  cursor: pointer;
  transition: all 300ms ease; /* transition duration-300 */
  
  // Disabled state
  ${disabled && css`
    opacity: 0.6;
    cursor: not-allowed;
  `}
  
  // File not selected state (default and hover)
  ${!file && css`
    border-style: dashed; /* border-dashed */
    border-color: #d1d5db; /* border-gray-300 */
    background-color: #f9fafb; /* bg-gray-50 */
    
    &:hover {
      border-color: #4f46e5; /* hover:border-indigo-500 */
      background-color: #eef2ff; /* hover:bg-indigo-50 */
    }
  `}

  // File selected state
  ${file && css`
    border-color: #4ade80; /* border-green-400 */
    background-color: #f0fdf4; /* bg-green-50 */
  `}
`;

const iconDynamicStyles = (file: File | null) => css`
  width: 2rem; /* w-8 */
  height: 2rem; /* h-8 */
  margin-bottom: 0.5rem; /* mb-2 */
  color: ${file ? '#16a34a' : '#9ca3af'}; /* text-green-600 or text-gray-400 */
`;

const fileSelectedTextStyles = css`
  font-weight: 600; /* font-semibold */
  color: #16a34a; /* text-green-600 */
`;

const FileDropZone: React.FC<{
  label: string;
  file: File | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}> = ({ label, file, onChange, disabled }) => {
  const fileInputId = label.replace(/\s/g, '-').toLowerCase();
  
  return (
    <div css={fileDropZoneStyles.container}>
      <label css={fileDropZoneStyles.mainLabel}>{label}</label>
      <label 
        htmlFor={fileInputId}
        css={dropZoneDynamicStyles(file, disabled)}
      >
        <div css={fileDropZoneStyles.contentWrapper}>
          <FileUp css={iconDynamicStyles(file)} />
          <p css={fileDropZoneStyles.textBase}>
            {file ? (
              <span css={fileSelectedTextStyles}>File Selected: {file.name}</span>
            ) : (
              <>
                <span css={css`font-weight: 600;`}>Click to upload</span> or drag and drop
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