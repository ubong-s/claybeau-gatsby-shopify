import React from "react"
import styled from "styled-components"

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
  background: ${props => props.theme.secondaryColor};
  color: ${props => props.theme.themeWhite};
  padding: 1.25rem;
  border-radius: 20px;

  .icon {
    font-size: 2rem;
    color: ${props => props.theme.primaryColor};
  }

  h3 {
    font-size: 1rem;
    margin: 0.35rem 0;
  }

  &:nth-of-type(even) {
    background: ${props => props.theme.primaryColor};
    color: ${props => props.theme.secondaryColor};

    .icon {
      color: ${props => props.theme.secondaryColor};
    }
  }
  /* background: ${props => props.theme.primaryColor}; */
`
