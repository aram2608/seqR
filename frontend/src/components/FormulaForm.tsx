import { type ChangeEventHandler } from "react";
import formStyles from "@/styles/FormStyle";

// Types
import type { DeseqConfigData } from "@/models/DeseqConfigType";

interface FormulaFormProps {
  formData: DeseqConfigData;
  handleFormulaChange: ChangeEventHandler;
  isSubmitting: boolean;
}

export const FormulaForm: React.FC<FormulaFormProps> = ({
  formData,
  handleFormulaChange,
  isSubmitting,
}) => {
  return (
    <div css={formStyles.inputContainer}>
      <label htmlFor="formula" css={formStyles.inputLabel}>
        DESeq Formula Design
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
  );
};
