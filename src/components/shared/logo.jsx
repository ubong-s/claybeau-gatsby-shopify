import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

export default function Logo() {
  return (
    <LogoLink to="/">
      <svg width="30px" height="30px" viewBox="-14 -14 50 50">
        <desc>Created with Lunacy</desc>
        <path
          id="logo"
          fill="#1B2437"
          d="M36.077,12.24h0.03v-26.348H11C-2.866-14.107-14.107-2.866-14.107,11S-2.866,36.107,11,36.107
            C24.449,36.107,35.43,25.531,36.077,12.24z M-9.923,11C-9.923-0.555-0.555-9.923,11-9.923h20.922V8.056H8.908v23.763
            C-1.665,30.77-9.923,21.848-9.923,11z M31.887,12.24c-0.6,10.281-8.628,18.571-18.796,19.578V12.24H31.887z"
        />
      </svg>
    </LogoLink>
  )
}

const LogoLink = styled(Link)`
  line-height: 0;
`
