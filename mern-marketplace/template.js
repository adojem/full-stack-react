export default ({ markup, css }) => `
   <!DOCTYPE html>
   <html lang="en">
   <head>
      <meta charset="UTF-8"/>
      <title>MERN Marketplace</title>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <style>a {text-decoration: none;}</style>
   </head>
   <body>
      <div id="root">${markup}</div>
      <style id="jss-server-side">${css}</style>
      <script id="stripe-js" src="https://js.stripe.com/v3/" async></script>
      <script src="/dist/bundle.js"></script>
   </body>
   </html>
`;
