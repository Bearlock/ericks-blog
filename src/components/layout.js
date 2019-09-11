import React from "react";
import { css, Global } from "@emotion/core";
import { Link } from "gatsby";
import { FaTwitter, FaGithub, FaLinkedin, FaRss} from "react-icons/fa";

const ListLink = props => (
  <li css={css`display: inline-block; margin-right: 1rem;`}>
    <h4><Link to={props.to} className="navlink">{props.children}</Link></h4>
  </li>
);

const ExternalListLink = props => (
  <li css={css` display: inline-block; margin-right: 1rem;` }>
    <h4><a href={props.to} className="navlink">{props.children}</a></h4>
  </li>
);

export default ({ children, data }) => (
  <div css={css`margin: 3rem auto 1rem auto; max-width: 960px; padding: 0 1rem;`}>
    <Global styles={css`
      p code {
        font-size: 90%;
        padding: 2px 4px;
        margin: 0 2px;
        background-color: #f8f8f8;
        color: firebrick;
      }

      .navlink {
        color: firebrick;
      }

      .navlink:hover {
        color: cadetblue;
        text-decoration: none;
      }

      a:hover {
        text-decoration: none;
      }
      
      .gatsby-highlight {
        background-color: #2d2d2d;
        border-radius: 0.3em;
        margin: 0.5em 0;
        padding: 1em;
        overflow: auto;
      }

      .gatsby-highlight pre[class*="language-"].line-numbers {
        padding: 0;
        padding-left: 2.8em;
        overflow: initial;
      }

      img {
        margin-bottom: 0;
      }

      .headerlink:hover {
        color:firebrick
      }

      img + em {
        font-size: 14px;
        display: block;
      }

      h2 {
        color: firebrick;
      }

      blockquote {
        border-left: 0.39rem solid hsla(360, 69%, 41%, 0.62);
      }
    `}
    />
    <header css={css`margin-bottom: 1.5rem;`}>
      <h2 css={css`display: inline; color: firebrick;`}>
        <Link to="/" className="headerlink navlink" css={css`text-shadow: none; background-image: none;`}>
          Robots Have Feelings
        </Link>
      </h2>
      <ul css={css`list-style: none; float: right;`}>
        <ListLink to="/about/">About</ListLink>
        <ExternalListLink to="https://twitter.com/Bearlock_ed"><FaTwitter /></ExternalListLink>
        <ExternalListLink to="https://www.github.com/Bearlock/"><FaGithub /></ExternalListLink>
        <ExternalListLink to="https://linkedin.com/in/bearlock"><FaLinkedin /></ExternalListLink>
        <ExternalListLink to="/rss.xml"><FaRss /></ExternalListLink>
      </ul>
    </header>
    {children}
    <footer css={css`text-align: center;`}>
     <h3 css={css`margin-bottom: 0; padding: 20px; font-size: 32px;`}>
      <Link css={css`font-weight: 600;`} className="navlink" to="/">¯\_(ツ)_/¯</Link>
    </h3>
    </footer>
  </div>
);
