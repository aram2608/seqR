import logo from "@/logo.svg";
import reactLogo from "@/react.svg";
import globalStyle from "@/styles/GlobalStyles";

export function HomePage() {
  return (
    <div className="app">
      <div css={globalStyle.logoContainer}>
        <img src={logo} alt="Bun Logo" css={globalStyle.logo} />
        <img src={reactLogo} alt="React Logo" css={globalStyle.logo} />
      </div>
    </div>
  );
}
