import React from "react"
import styled from "styled-components"
import { Layout, Seo, Container, Button } from "../components"
import { dimensions } from "../styles/globalStyle"

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Not found" />
    <Container>
      <Error>
        <h1>404: Not Found</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
        <Button title="Go to shop" url="/products" />
      </Error>
      <Button />
    </Container>
  </Layout>
)

export default NotFoundPage

const Error = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - ${dimensions.headerHeight.desktop});
`
