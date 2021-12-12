import React from "react"
import styled from "styled-components"
import { StaticImage } from "gatsby-plugin-image"
import { Button } from "."

export default function Hero() {
  return (
    <HeroWrap>
      <HeroInner className="univ-container">
        <HeroContent>
          <h1>Wear what suits you</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio
            debitis aspernatur sit quis, soluta quos asperiores nesciunt libero
            qui rerum minus? Numquam esse sequi quaerat earum ipsa asperiores
            dolorem minus!
          </p>
          <div className="btn-container">
            <Button title="Order Now" />
            <Button title="Explore More" />
          </div>
        </HeroContent>
        <HeroImage>{/* <StaticImage/> */}</HeroImage>
      </HeroInner>
    </HeroWrap>
  )
}

const HeroWrap = styled.section`
  padding: 0;
`
const HeroInner = styled.div``
const HeroContent = styled.div``
const HeroImage = styled.div``
