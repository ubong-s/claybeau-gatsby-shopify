import React from "react"
import styled from "styled-components"
import { theme } from "../styles/globalStyle"

export default function AdvantageCard({ advantage }) {
  return (
    <CardWrap>
      {advantage.icon}
      <h3>{advantage.title}</h3>
      <p>{advantage.description}</p>
    </CardWrap>
  )
}

const CardWrap = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.roundings.small};
  padding: 1.25rem;

  .icon {
    font-size: 2rem;
    color: ${theme.colors.secondary};
  }

  h3 {
    font-size: 1rem;
    margin: 0.35rem 0;
  }

  p {
    margin-bottom: 0;
  }

  @media screen and (min-width: 1024px) {
    padding: 1.75rem;
  }
`
