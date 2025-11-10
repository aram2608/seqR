import mainContainerStyle from "@/styles/ContainerStyle";
import headerStyle from "@/styles/HeaderStyle";
import paragraphStyle from "@/styles/ParagraphStyle";

export function About() {
  return (
    <div css={mainContainerStyle}>
      <h2 css={headerStyle}> About seqR </h2>
      <p css={paragraphStyle}>
        A web service for performing differential gene expression using DESeq2
      </p>
    </div>
  );
}
