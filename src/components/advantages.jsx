import React from "react"
import styled from "styled-components"
import { AdvantageCard } from "."
import { advantagesData } from "../data/advantages"

export default function Advantages() {
  return (
    <AdvantagesWrap className="univ-container">
      <h2 className="univ-section-title">Our Advantages</h2>
      <AdvantagesInner>
        {advantagesData.map((a, index) => {
          return <AdvantageCard key={index} advantage={a} />
        })}
      </AdvantagesInner>
    </AdvantagesWrap>
  )
}

const AdvantagesWrap = styled.section`
  text-align: center;
`
const AdvantagesInner = styled.div`
  display: grid;
  gap: 1rem;

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`
