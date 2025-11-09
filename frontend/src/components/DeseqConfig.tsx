import React, { useState, useCallback } from 'react';
import { FileUp, Send, Loader2, CheckCircle, XCircle, Info } from 'lucide-react';

// We define the data structure for better safety
interface DeseqConfigData {
  formula: string;
  countsFile: File | null;
  metadataFile: File | null;
}

type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error';

// Submission form for Deseq files
export const DeseqConfig = () => {
  const [formData, setFormData] = useState<DeseqConfigData>({
    formula: '',
    countsFile: null,
    metadataFile: null,
  });
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Handle changes for text input
  const handleFormulaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, formula: e.target.value }));
  };

  // Handle file selection for input type="file"
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, fileType: 'countsFile' | 'metadataFile') => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData(prev => ({ ...prev, [fileType]: file }));
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    if (!formData.countsFile || !formData.metadataFile) {
      setErrorMessage('Please upload both Counts File and Metadata File.');
      setStatus('error');
      return;
    }

    // Prepare FormData object for multipart/form-data submission (required for files)
    const data = new FormData();
    data.append('formula', formData.formula);
    data.append('counts', formData.countsFile, formData.countsFile.name);
    data.append('metadata', formData.metadataFile, formData.metadataFile.name);

    // Define the API endpoint
    const apiEndpoint = '/api/deseq/submit'; 
    
    // Simple Exponential Backoff for retries
    const MAX_RETRIES = 3;
    let success = false;
    let lastError = '';

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                // FormData is automatically set as 'multipart/form-data'
                // Don't set content type for form data
                body: data,
            });

            if (!response.ok) {
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
            if (attempt < MAX_RETRIES - 1) {
                const delay = Math.pow(2, attempt) * 1000;
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    
    if (!success) {
      setErrorMessage(`Submission failed after ${MAX_RETRIES} attempts. Last error: ${lastError}`);
      setStatus('error');
    }
  };

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

  const isSubmitting = status === 'loading';

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-50 shadow-xl rounded-2xl">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 border-b pb-2 flex items-center">
        <Info className="w-6 h-6 mr-2 text-indigo-600" />
        DESeq2 Configuration Submission
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Formula Design Input */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-indigo-100">
          <label htmlFor="formula" className="block text-lg font-semibold text-gray-700 mb-2">
            DESeq Formula Design
          </label>
          <input
            type="text"
            id="formula"
            name="formula"
            value={formData.formula}
            onChange={handleFormulaChange}
            placeholder="e.g., ~ strain + time"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-800 transition duration-150"
            required
            disabled={isSubmitting}
          />
        </div>

        {/* File Uploads */}
        <div className="grid md:grid-cols-2 gap-6">
          
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
        <div className="pt-4 flex flex-col items-center">
          <button
            type="submit"
            disabled={isSubmitting || !formData.countsFile || !formData.metadataFile}
            className={`flex items-center justify-center w-full md:w-1/2 px-6 py-3 border border-transparent text-lg font-medium rounded-xl shadow-lg transition duration-300 transform ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Submit Configuration
              </>
            )}
          </button>
        </div>
        
        {/* Submission Status Display */}
        <div className="min-h-[3rem] mt-4 flex items-center justify-center">
          {getStatusIcon()}
          {status === 'success' && (
            <p className="ml-3 text-lg font-medium text-green-700">Configuration successfully submitted!</p>
          )}
          {status === 'error' && (
            <div className="ml-3 text-red-700 p-3 bg-red-100 rounded-lg border-l-4 border-red-500">
                <p className="font-semibold">Submission Error</p>
                <p className="text-sm">{errorMessage || 'An unknown error occurred during submission.'}</p>
            </div>
          )}
        </div>

      </form>
    </div>
  );
};

// Helper component for the file upload drop zone styling
const FileDropZone: React.FC<{
  label: string;
  file: File | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}> = ({ label, file, onChange, disabled }) => {
  const fileInputId = label.replace(/\s/g, '-').toLowerCase();
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <label className="block text-lg font-semibold text-gray-700 mb-3">{label}</label>
      <label 
        htmlFor={fileInputId}
        className={`flex flex-col items-center justify-center w-full h-32 border-2 ${
          file ? 'border-green-400 bg-green-50' : 'border-dashed border-gray-300 hover:border-indigo-500 bg-gray-50 hover:bg-indigo-50'
        } rounded-xl cursor-pointer transition duration-300 ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <FileUp className={`w-8 h-8 mb-2 ${file ? 'text-green-600' : 'text-gray-400'}`} />
          <p className="mb-2 text-sm text-gray-500">
            {file ? (
              <span className="font-semibold text-green-600">File Selected: {file.name}</span>
            ) : (
              <>
                <span className="font-semibold">Click to upload</span> or drag and drop
              </>
            )}
          </p>
          <p className="text-xs text-gray-500">(TSV or CSV)</p>
        </div>
        <input 
          id={fileInputId} 
          type="file" 
          className="hidden" 
          onChange={onChange}
          accept=".csv,.tsv,text/csv,text/tab-separated-values"
          disabled={disabled}
          required
        />
      </label>
    </div>
  );
};