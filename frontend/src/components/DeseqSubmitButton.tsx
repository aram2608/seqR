// Styles
import { css } from "@emotion/react";
import submitButtonStyle from "@/styles/SubmitButtonStyle";
import formStyles from "@/styles/FormStyle";

// Types
import type { DeseqConfigData } from "@/models/DeseqConfigType";
import { Loader2, Send } from "lucide-react";

interface ConfigButtonProps {
  formData: DeseqConfigData;
  isSubmitting: boolean;
  isDisabled: boolean;
}

export const DeseqConfigButton: React.FC<ConfigButtonProps> = ({
  formData,
  isSubmitting,
  isDisabled,
}) => {
  return (
    <div css={formStyles.submitContainer}>
      <button
        type="submit"
        disabled={
          isSubmitting || !formData.countsFile || !formData.metadataFile
        }
        css={submitButtonStyle(isSubmitting, isDisabled)}
      >
        {isSubmitting ? (
          <>
            <Loader2
              css={css`
                margin-right: 0.5rem;
              `}
            />
            Processing...
          </>
        ) : (
          <>
            <Send
              css={css`
                margin-right: 0.5rem;
              `}
            />
            Submit Configuration
          </>
        )}
      </button>
    </div>
  );
};
