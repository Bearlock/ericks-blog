import React from "react"
import { css } from "@emotion/core"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"

export default ({ data }) => {
  return (
    <Layout>
      <Helmet>
        <title>Robots Have Feelings</title>
      </Helmet>
      <div>
        <hr />
        <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <h4 css={css`color: #bbb; margin-bottom: 0;`}>{node.frontmatter.date}</h4>
            <Link to={node.fields.slug}>
              <h3 className="navlink" css={css`margin-bottom: 1/4rem;`}>{node.frontmatter.title}</h3>
            </Link>
            <p>{node.excerpt}</p>
          </div>
        ))}
      </div>
    </Layout>
  )
}
export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC } 
      filter: { frontmatter: { title: { ne: "About" }}}
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM YYYY")
          }
          fields {
            slug
          }
          excerpt(pruneLength: 300)
        }
      }
    }
  }
`
