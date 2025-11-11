import { css } from "@emotion/react";
import { getStatusIcon } from "@/styles/StatusIcons";
import formStyles from "@/styles/FormStyle";
import paragraphStyle from "@/styles/ParagraphStyle";
import type { SubmissionStatus } from "@/styles/StatusIcons";

interface SubmitStatusLabelProps {
    status: SubmissionStatus
    errorMessage: string
}

const submissioneErrorStyle = {
    icon: css({
    marginLeft: "0,75rem",
    color: "#ef4444"
    }),
    textWeight: css({
        fontWeight: "600"
    }),
    textSize: css({
        fontSize: "0.875.rem"
    })
};

export const SubmissionStatusLabel: React.FC<SubmitStatusLabelProps> = ({
    status,
    errorMessage
}) => {
    return (
        <div css={formStyles.statusDisplay}>
          {getStatusIcon(status)}
          {status === "success" && (
            <p css={paragraphStyle}>Configuration successfully submitted!</p>
          )}
          {status === "error" && (
            <div css={submissioneErrorStyle.icon}>
              <p css={submissioneErrorStyle.textWeight}>
                Submission Error
              </p>
              <p css={submissioneErrorStyle.textSize}>
                {errorMessage || "An unknown error occurred during submission."}
              </p>
            </div>
          )}
        </div>
    );
}