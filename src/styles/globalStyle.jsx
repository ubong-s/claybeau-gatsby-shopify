import React from "react"
import { createGlobalStyle, ThemeProvider } from "styled-components"

const theme = {
  primaryFont: `'Lora', serif`,
  secondaryFont: `'Alegreya', serif`,
  primaryColor: "#FFC75A",
  secondaryColor: "#1F1F1F",
  neutralLight: "#FAFAFA",
  themeWhite: "#FFF",
  themeDark: "#222",
  black: "#000",
  accentColor: "#F6ECE5",
  orangeGradient: "",
  transitionEase: "all 0.2s linear",
  transitionEase1: "all 0.5s ease-in-out",
  shadow: "5px 5px 20px 0 rgb(0 0 0 / 8%)",
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
      font-family: ${props => props.theme.secondaryFont};
      font-weight: 400;
      color:  ${props => props.theme.secondaryColor};
      /* background-color:  ${props => props.theme.neutralLight}; */
      max-width: 1600px;
   }
   
   main {
      min-height:100vh;
   }
   
   h1, h2, h3, h4, h5, h6 {
      font-family: ${props => props.theme.primaryFont};
      font-weight: 600;
   }

   a {
      text-decoration: none;
   }

   ul {
      list-style:none;
   }

   section {
      padding: 3rem 0;
      
      @media screen and (min-width:1024px) {
         
         padding: 4rem 0;
         
      }
   }

   .univ-container {
      width: 95%;
      margin:auto;
      
      @media screen and (min-width:1024px) {
         width: 90%;
      }
   }

   .univ-section-title {
    text-align: center;
    margin-bottom: 2.5rem;
   }

   .small-btn {
      background: none;
      outline: none;
      border: none;
      cursor: pointer;
      font-size: 1.5rem;
   }
`
const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

export { GlobalStyle, Theme }
