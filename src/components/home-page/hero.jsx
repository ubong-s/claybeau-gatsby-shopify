import React from "react"
import styled from "styled-components"
import { StaticImage } from "gatsby-plugin-image"
import { Button } from ".."
import { theme, breakpoints, dimensions } from "../../styles/globalStyle"
import heroImg from "../../images/hero-img.png"

export default function Hero() {
  return (
    <HeroWrap>
      <HeroInner>
        <HeroContent>
          <h1>Admire Stylish Dresses {"&"} Looks</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio
            debitis aspernatur sit quis, soluta quos asperiores nesciunt libero
            qui rerum minus? Numquam esse sequi quaerat earum ipsa asperiores
            dolorem minus!
          </p>

          <Button
            title="Shop Now"
            url="/products"
            buttonType="outline"
            buttonColor={theme.colors.white}
          />
        </HeroContent>
        <HeroImage>
          <StaticImage
            src="../../images/hero-photo.png"
            quality={95}
            layout="fullWidth"
            formats={["auto", "webp", "avif"]}
            alt="Watch"
          />
        </HeroImage>
      </HeroInner>
    </HeroWrap>
  )
}

const HeroWrap = styled.section`
  position: relative;
  padding: 0 0 1rem 0;
  text-align: center;

  @media screen and (min-width: ${breakpoints.desktop}px) {
    display: flex;
    align-items: center;
    padding: 0;
    text-align: unset;
    height: calc(100vh - ${dimensions.headerHeight.desktop});
    background-image: url(${heroImg});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }
`
const HeroInner = styled.div`
  display: flex;
  flex-direction: column-reverse;

  @media screen and (min-width: ${breakpoints.desktop}px) {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    width: ${dimensions.containerWidth.desktop}%;
    margin: auto;
  }
`

const HeroContent = styled.div`
  position: relative;
  background: ${theme.colors.white};
  margin: -10rem 1rem 0;
  padding: 3rem 1rem;
  z-index: 2;

  p {
    margin-bottom: 2rem;
  }

  @media screen and (min-width: ${breakpoints.desktop}px) {
    padding: unset;
    margin: unset;
    background: unset;
    color: ${theme.colors.white};

    h1 {
      font-size: 3rem;
      color: ${theme.colors.white};
    }
  }
`
const HeroImage = styled.div`
  @media screen and (min-width: ${breakpoints.desktop}px) {
    display: none;
    height: calc(100vh - 100px);
    overflow: hidden;

    img {
      object-fit: cover;
    }
  }
`
