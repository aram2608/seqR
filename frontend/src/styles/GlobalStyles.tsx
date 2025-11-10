/** @jsx jsx */
import { css, jsx } from "@emotion/react"

const globalStyle = {
  logoContainer : css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "3rem",
    marginBottom: "3rem",
  }),
  logo : css({
    height: "5em",
    padding: "1em",
    willChange: "filter",
    transition: "filter 0.2s, transform 0.2s",
    filter: "none",
    "&:hover" : css({
      filter: "drop-shadow(0 0 1em rgba(59, 130, 246, 0.5))",
      transform: "scale(1.05)",
    })
  })
};

export default globalStyle;