'use strict'

// {
//   children,
//     contextPath,
//     deployment,
//     CssLinks,
//     Fusion,
//     Libs,
//     MetaTags
// }

import React from 'react'

export default (props) => {
  return (
    <html>
      <head>
        <title>{props.metaValue('title') || 'Titulo Principal'}</title>
        <props.MetaTags />
        <props.Libs />
        <props.CssLinks />
        <link rel='icon' type='image/x-icon' href={props.deployment(`${props.contextPath}/resources/favicon.ico`)} />
        <link rel='stylesheet' href={`${props.contextPath}/resources/css/main.css`} />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
        <link href="https://fonts.googleapis.com/css?family=Lato&display=swap" rel="stylesheet"></link>
      </head>
      <body>
        <h1>Titulo Principal</h1>
        <div id='fusion-app'>
          {props.children}
        </div>
        <props.Fusion />
      </body>
    </html>
  )
}

