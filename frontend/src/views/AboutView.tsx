/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import { TextAlignJustify } from 'lucide-react';

const mainContainerStyle = css({
  maxWidth: "56rem",
  margin: 0,
  padding: "2rem 1rem",
  fontFamily: "sans-serif"
});

const aboutHeaderStyle = css({
  display: "flex",
  alignItems: "center",
  fontSize: "1.875rem",
  fontWeight: "700",
  marginBottom: "2rem",
});

const paragraphStyle = css({
  fontFamily: "sans-serif",
  fontSize: "16px",
  lineHeight: "1.6",
  marginBottom: "1em",
  textAlign: "justify",
});

export function About() {
    return (
    <div css={mainContainerStyle}>
      <h2 css={aboutHeaderStyle}> About seqR </h2>
      <p css={paragraphStyle}>A web service for performing differential gene expression using DESeq2</p>
    </div>
    );
}