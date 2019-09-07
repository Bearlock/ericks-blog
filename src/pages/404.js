import React from "react"
import { css } from "@emotion/core"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import { Link } from "gatsby"

export default ({ data }) => {
  return (
    <Layout>
      <Helmet>
        <title>Out of Focus</title>
      </Helmet>
      <div css={css`position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%)`}>
        <h1
          css={css`
            color: rebeccapurple;
            text-align: center;
          `}
        >
          Whoa.
        </h1>
        <h4 css={css`text-align: center;`}>
          You wanna
          <Link to="/">
            {" "} go back?
          </Link>
        </h4>
      </div>
    </Layout>
  )
}
