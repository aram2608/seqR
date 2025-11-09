import React, { useState, useCallback } from 'react';
import { Send, Loader2, CheckCircle, XCircle, Info } from 'lucide-react';
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import FileDropZone from '@/styles/FileDrop';

// I am not using tailwind so instead we can use emotion to make some CSS
// components. I personally think this is way more readable but there is a lot
// more boiler plate unfortunately

const mainContainerStyle = css({
  maxWidth: "56rem",
  margin: 0,
  padding: "2rem 1rem",
});

const deseqHeaderStyle = css({
  display: "flex",
  alignItems: "center",
  fontSize: "1.875rem",
  fontWeight: "700",
  marginBottom: "2rem",
});

const formStyles = {
  form: css({
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  }),
  inputContainer: css({
    backgroundColor: "white",
    padding: "1rem",
    borderRadius: "0.5rem",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  }),
  inputLabel: css({
    display: "block",
    fontSize: "1.125rem",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "0.5rem",
  }),
  textInput: css({
    marginTop: "0.25rem",
    display: "block",
    width: "95%",
    padding: "0.5rem 0.75rem",
    border: "1px solid #d1d5db",
    borderRadius: "0.5rem",
    fontSize: "1rem",
    transition: "all 0.2s ease",
    "&:focus": {
      borderColor: "#4f46e5",
      boxShadow: "0 0 0 3px rgba(79, 70, 229, 0.2)",
      outline: "none",
    },
    "&:disabled": {
      backgroundColor: "#f3f4f6",
      cursor: "not-allowed",
    }
  }),
  fileGrid: css({
    display: "grid",
    gap: "1.5rem",
    "@media (min-width: 768px)" : {
      gridTemplateColumns: "repeat(2, 1fr)",
    }
  }),
  submitContainer: css({
    paddingTop: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }),
  statusDisplay: css({
    minHeight: "2rem",
    display: "flex",
    alignItems: "center",
    padding: "0.5rem",
  }),
};

const paragraphStyle = css({
  fontFamily: "sans-serif",
  fontSize: "16px",
  lineHeight: "1.6",
  marginBottom: "1em",
  textAlign: "justify",
});

const submitButtonStyles = (isSubmitting: boolean, isDisabled: boolean) => css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.75rem 1.5rem",
  fontWeight: 600,
  borderRadius: "0.5rem",
  transition: "all 0.2s ease",
  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06)",
  // We test if either the button is disabled or if we are submitting and
  // copy the result into the function
  ...(isDisabled || isSubmitting
    ? {
        backgroundColor: "#9ca3af",
        color: "#f9fafb",
        cursor: "not-allowed",
      }
    : {
        backgroundColor: "#4f46e5",
        color: "white",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#4338ca",
          transform: "scale(1.01)",
        },
        "&:focus": {
          outline: "none",
          boxShadow: "0 0 0 4px rgba(79, 70, 229, 0.5)",
        },
      }),
});

// We define the type to represent the configuration data
interface DeseqConfigData {
  formula: string;
  countsFile: File | null;
  metadataFile: File | null;
}

// We make a small union type to represent submission status
type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error';

// Submission form for Deseq files
export const DeseqConfig = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // We use the useState cook to set our base formData
  // We initialize the props in a null/empty state
  // setFormData can then be used down the line to update our form
  const [formData, setFormData] = useState<DeseqConfigData>({
    formula: '',
    countsFile: null,
    metadataFile: null,
  });

  // We set the submission status using the useState hook
  // We can use setStatus down the line to change the submission status
  const [status, setStatus] = useState<SubmissionStatus>('idle');

  // We do the same as above for our error message
  const [errorMessage, setErrorMessage] = useState<string>('');

  // This function listens to input events and sets the form data for
  // the provided formula, we use the spread operator to copy all of
  // the underlying data in the previous form and override the formula
  const handleFormulaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, formula: e.target.value }));
  };

  // This function listens to files changes for both file types
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, fileType: 'countsFile' | 'metadataFile') => {
    // We retrieve the file if there is a value
    const file = e.target.files ? e.target.files[0] : null;
    // We then create a new object by copying the previous object and overriding
    // the corresponding file prop
    setFormData(prev => ({ ...prev, [fileType]: file }));
  }, []);

  // This function listens to submit events for our form
  const handleSubmit = async (e: React.FormEvent) => {
    // We need to prevent reloading
    e.preventDefault();
    // We update our status accordingly and null out the error message
    setIsSubmitting(true);
    setStatus('loading');
    setErrorMessage('');

    // If either of the params are empty we error out
    if (!formData.countsFile || !formData.metadataFile) {
      setErrorMessage('Please upload both Counts File and Metadata File.');
      setStatus('error');
      return;
    }

    // We can now prepare the FormData object for multipart/form-data submission
    const data = new FormData();
    // We append the form data for each one of our formData props
    data.append('formula', formData.formula);
    data.append('counts', formData.countsFile, formData.countsFile.name);
    data.append('metadata', formData.metadataFile, formData.metadataFile.name);

    // We define the endpoint we make a POST request to
    const apiEndpoint = '/api/deseq/data'; 
    
    // Simple Exponential Backoff for retries
    const MAX_RETRIES = 3;
    let success= false;
    let lastError = '';

    // We attempt to make a submission for each of our retries
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        try {
            // We make a POST request using our data
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                // FormData is automatically set as 'multipart/form-data'
                // Don't set content type for form data
                body: data,
            });

            // We need to make sure we got an http.StatusOk from the backend
            if (!response.ok) {
                // Otherwise we throw an error
                const errorText = await response.text();
                throw new Error(`Server responded with status ${response.status}: ${errorText}`);
            }

            // We assume success if the status is OK
            setStatus('success');
            success = true;
            break; 

        } catch (error: any) {
            lastError = error.message;
            console.error(`Attempt ${attempt + 1} failed:`, error);
            // We make an expontial backoff for each retry
            if (attempt < MAX_RETRIES - 1) {
                const delay = Math.pow(2, attempt) * 1000;
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    
    // We can then check for submission success before proceeding
    if (!success) {
      setErrorMessage(`Submission failed after ${MAX_RETRIES} attempts. Last error: ${lastError}`);
      setStatus('error');
    }
  };

  // This function updates the UI given the status of our request
  const getStatusIcon = () => {
    switch (status) {
      case 'loading':
        return <Loader2 className="h-6 w-6 animate-spin text-indigo-500" />;
      case 'success':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'error':
        return <XCircle className="h-6 w-6 text-red-500" />;
      default:
        return null;
    }
  };

  // We make a boolean value to disable the buttons given a request's status
  const isDisabled = !formData.countsFile || !formData.metadataFile;

  return (
    <div css={mainContainerStyle}>
      <h2 css={deseqHeaderStyle}>
        <Info className="w-6" />
        DESeq2 Configuration Submission
      </h2>

      <form onSubmit={handleSubmit} css={formStyles.form}>
        {/* Formula Design Input */}
        <div css={formStyles.inputContainer}>
          <label 
          htmlFor="formula" 
          css={formStyles.inputLabel}>DESeq Formula Design
          </label>
          <input
            type="text"
            id="formula"
            name="formula"
            value={formData.formula}
            onChange={handleFormulaChange}
            placeholder="e.g., ~ strain + time"
            css={formStyles.textInput}
            required
            disabled={isSubmitting}
          />
        </div>

        {/* File Uploads */}
        <div css={formStyles.fileGrid}>
          
          {/* Counts File Upload */}
          <FileDropZone 
            label="Counts Matrix (TSV/CSV)"
            file={formData.countsFile}
            onChange={(e) => handleFileChange(e, 'countsFile')}
            disabled={isSubmitting}
          />

          {/* Metadata File Upload */}
          <FileDropZone 
            label="Metadata File (TSV/CSV)"
            file={formData.metadataFile}
            onChange={(e) => handleFileChange(e, 'metadataFile')}
            disabled={isSubmitting}
          />
        </div>
        
        {/* Submission Button and Status */}
        <div css={formStyles.submitContainer}>
          <button
            type="submit"
            disabled={isSubmitting || !formData.countsFile || !formData.metadataFile}
            css={submitButtonStyles(isSubmitting, isDisabled)}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2" />
                Processing...
              </>
            ) : (
              <>
                <Send className="mr-2" />
                Submit Configuration
              </>
            )}
          </button>
        </div>
        
        {/* Submission Status Display */}
        <div css={formStyles.statusDisplay}>
          {getStatusIcon()}
          {status === 'success' && (
            <p css={paragraphStyle}>Configuration successfully submitted!</p>
          )}
          {status === 'error' && (
            <div css={css`margin-left: 0.75rem; color: #ef4444;`}>
                <p css={css`font-weight: 600;`}>Submission Error</p>
                <p css={css`font-size: 0.875rem;`}>{errorMessage || 'An unknown error occurred during submission.'}</p>
            </div>
          )}
        </div>

      </form>
    </div>
  );
};