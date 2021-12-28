import React from "react"
import { createGlobalStyle, ThemeProvider } from "styled-components"

const theme = {
  fonts: {
    primary: `'Playfair Display', serif`,
    secondary: `'Muli', serif`,
  },
  weights: {
    normal: 400,
    semiBold: 600,
    bold: 700,
  },
  colors: {
    primary: "#EDA3B5",
    secondary: "#1B2437",
    neutral: "#F6F6F6",
    white: "#FFF",
    gray1: "#F6F6F6",
    gray2: "#EFEFF4",
    gray3: "#E5E5EA",
    gray4: "#D1D1D6",
    gray5: "#C7C7CC",
    gray6: "#8E8E93",
    gray7: "#48484A",
    black: "#000",
  },
  sizes: {
    xsmall: "12px",
    small: "14px",
    normal: "16px",
    medium: "18px",
    large: "20px",
    xlarge: "24px",
  },
  headings: {
    xsmall: "16px",
    small: "18px",
    normal: "20px",
    medium: "24px",
    large: "30px",
    xlarge: "48px",
  },
  roundings: {
    small: "2px",
    medium: "8px",
    large: "16px",
  },
  misc: {
    spacing: "2px",
    transitionEase: "all 0.2s linear",
    transitionEase1: "all 0.5s ease-in-out",
    shadow: "5px 5px 20px 0 rgb(0 0 0 / 6%)",
  },
}

const breakpoints = {
  mobile: 400,
  phablet: 550,
  tablet: 768,
  desktop: 1024,
  hd: 1280,
}

const dimensions = {
  headerHeight: {
    mobile: "75px",
    desktop: "80px",
  },
  containerWidth: {
    mobile: 95,
    desktop: 85,
  },
  cartWidthDesktop: "400px",
  maxWidth: "1600px",
}

const GlobalStyle = createGlobalStyle`
   *, ::before, ::after {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
   }

   html {
      position: relative;
   }

   body {
      font-family: ${theme.fonts.secondary};
      font-weight: ${theme.weights.normal};
      color:  ${theme.colors.gray6};
      max-width: ${dimensions.maxWidth};
      background: ${theme.colors.gray1};
      line-height: 1.6;
   }
   
   main {
      min-height:calc(100vh - ${dimensions.headerHeight.desktop});
   }

   img {
     width: 100%;
   }
   
   h1, h2, h3, h4, h5, h6 {
      font-family: ${theme.fonts.primary};
      font-weight: ${theme.weights.semiBold};
      margin-bottom: ${theme.sizes.normal};
      color: ${theme.colors.secondary};
   }
   
   p {
      margin-bottom: ${theme.sizes.normal};
   }

   a {
      text-decoration: none;
   }

   ul {
      list-style:none;
   }

   section {
      padding: 3rem 0;
      
      @media screen and (min-width:${breakpoints.desktop}px) {
         padding: 4rem 0;
      }
   }

   .generic-button {
     cursor: pointer;
     font-family: ${theme.fonts.secondary};
      font-weight: ${theme.weights.bold};
      background: ${theme.colors.primary};
      color: ${theme.colors.secondary};
      border-radius: ${theme.roundings.small};
      border: none;
      outline: none;
      transition: ${theme.misc.transitionEase};
      
      
   }

   .small-btn {
      background: none;
      outline: none;
      border: none;
      cursor: pointer;
      font-size: 2rem;
      color: ${theme.colors.secondary};
   }
`
const ThemeContext = ({ children }) => (
  <ThemeProvider theme={theme}>{children} </ThemeProvider>
)

export { GlobalStyle, ThemeContext, theme, breakpoints, dimensions }
