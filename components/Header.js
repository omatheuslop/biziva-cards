import React from 'react'

const Header = ({ enableHeroText }) => (
  <header role="banner" className="mb4">
    <div className="header-content">
      <a id="link-home" href="/" aria-label="Home">
        <img src="/biziva/brand.svg" alt="" width="42" height="42" /><strong style={{marginLeft:12,fontSize:28,color:"#f8f4ef"}}>BIZIVA CARDS</strong>
      </a>
      <a href="/biziva/index.html" style={{height:"auto",marginTop:20,color:"#ff6a87"}}>Cards de campanha em SVG e PNG →</a>
      <small style={{marginTop:10}}>Editor baseado no Carbon · evolução independente Biziva</small>
      {enableHeroText ? (
        <h2 className="mt3">
          Create and share beautiful images of your source code.
          <br />
          Start typing or drop a file into the text area to get started.
        </h2>
      ) : null}
    </div>
    <style jsx>
      {`
        .header-content {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .header-content a {
          height: 64px;
          max-width: 96vw;
        }

        h2 {
          text-align: center;
        }

        @media (max-width: 768px) {
          header {
            margin-bottom: var(--x3);
          }
          h2 {
            font-size: 13px;
          }
        }
      `}
    </style>
  </header>
)

export default Header
