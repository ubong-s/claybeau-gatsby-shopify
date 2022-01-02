import React from "react"
import styled from "styled-components"
import { AdvantageCard, Container } from "."
import { advantagesData } from "../data/advantages"

export default function Advantages() {
  return (
    <AdvantagesWrap>
      <Container>
        <h2 className="univ-section-title">Our Advantages</h2>
        <AdvantagesInner>
          {advantagesData.map((a, index) => {
            return <AdvantageCard key={index} advantage={a} />
          })}
        </AdvantagesInner>
      </Container>
    </AdvantagesWrap>
  )
}

const AdvantagesWrap = styled.section`
  text-align: center;
`
const AdvantagesInner = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: 2rem;

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    padding: 0 5rem;
  }
`
