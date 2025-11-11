import React, { useState, useCallback } from "react";
import { Info } from "lucide-react";

// Styles
import FileDropZone from "@/components/FileDrop";
import mainContainerStyle from "@/styles/ContainerStyle";
import headerStyle from "@/styles/HeaderStyle";
import formStyles from "@/styles/FormStyle";

// Interfacetes and types
import type { DeseqConfigData } from "@/models/DeseqConfigType";
import type { SubmissionStatus } from "@/styles/StatusIcons";

// HTML componenents
import { FormulaForm } from "@/components/FormulaForm";
import { DeseqConfigButton } from "@/components/DeseqSubmitButton";
import { SubmissionStatusLabel } from "@/components/SubmissionStatus";
import { css } from "@emotion/react";

// Submission form for Deseq files
export const DeseqConfig = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  // We use the useState hook to set our base formData
  // We initialize the props in a null/empty state
  // setFormData can then be used down the line to update our form
  const [formData, setFormData] = useState<DeseqConfigData>({
    formula: "",
    countsFile: null,
    metadataFile: null,
  });

  // We set the submission status using the useState hook
  // We can use setStatus down the line to change the submission status
  const [status, setStatus] = useState<SubmissionStatus>("idle");

  // We do the same as above for our error message
  const [errorMessage, setErrorMessage] = useState<string>("");

  // This function listens to input events and sets the form data for
  // the provided formula, we use the spread operator to copy all of
  // the underlying data in the previous form and override the formula
  const handleFormulaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, formula: e.target.value }));
  };

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

  // This function listens to submit events for our form
  const handleSubmit = async (e: React.FormEvent) => {
    // We need to prevent reloading
    e.preventDefault();
    // We update our status accordingly and null out the error message
    setIsSubmitting(true);
    setStatus("loading");
    setErrorMessage("");

    // If either of the params are empty we error out
    if (!formData.countsFile || !formData.metadataFile) {
      setErrorMessage("Please upload both Counts File and Metadata File.");
      setStatus("error");
      return;
    }

    // We can now prepare the FormData object for multipart/form-data submission
    const data = new FormData();
    // We append the form data for each one of our formData props
    data.append("formula", formData.formula);
    data.append("counts", formData.countsFile, formData.countsFile.name);
    data.append("metadata", formData.metadataFile, formData.metadataFile.name);

    // We define the endpoint we make a POST request to
    const apiEndpoint = "/api/deseq/data";

    // Simple Exponential Backoff for retries
    const MAX_RETRIES = 3;
    let success = false;
    let lastError = "";

    // We attempt to make a submission for each of our retries
    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        // We make a POST request using our data
        const response = await fetch(apiEndpoint, {
          method: "POST",
          // FormData is automatically set as 'multipart/form-data'
          // Don't set content type for form data
          body: data,
        });

        // We need to make sure we got an http.StatusOk from the backend
        if (!response.ok) {
          // Otherwise we throw an error
          const errorText = await response.text();
          throw new Error(
            `Server responded with status ${response.status}: ${errorText}`,
          );
        }

        // We assume success if the status is OK
        setStatus("success");
        success = true;
        break;
      } catch (error: any) {
        lastError = error.message;
        console.error(`Attempt ${attempt + 1} failed:`, error);
        // We make an expontial backoff for each retry
        if (attempt < MAX_RETRIES - 1) {
          const delay = Math.pow(2, attempt) * 1000;
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }

    // We can then check for submission success before proceeding
    if (!success) {
      setErrorMessage(
        `Submission failed after ${MAX_RETRIES} attempts. Last error: ${lastError}`,
      );
      setStatus("error");
    }
  };

  // We make a boolean value to disable the buttons given a request's status
  const isDisabled = !formData.countsFile || !formData.metadataFile;

  return (
    <div css={mainContainerStyle}>
      <h2 css={headerStyle}>
        <Info css={css({ width: "1.5rem", "&:hover": css({ backgroundColor: "#3f3cbb" }) })}/>
        DESeq2 Data Submission
      </h2>
      <form onSubmit={handleSubmit} css={formStyles.form}>
        {/* Formula Design Input */}
        <FormulaForm
          formData={formData}
          handleFormulaChange={handleFormulaChange}
          isSubmitting={isSubmitting}
        />
        {/* File Uploads */}
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
        {/* Submission Button and Status */}
        <DeseqConfigButton
          formData={formData}
          isSubmitting={isSubmitting}
          isDisabled={isDisabled}
        />
        {/* Submission Status Display */}
        <SubmissionStatusLabel 
        status={status}
        errorMessage={errorMessage}
        />
      </form>
    </div>
  );
};
