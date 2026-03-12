import express from 'express';

const app = express();

app.get('/directory', (req, res) => {
  //Redirection First way
  // res.set({
  //   location: '/folder',
  // });

  //Muliple choice
  res.status(300).end(`<!DOCTYPE html>
  <html>
    <head>
      <title>300 Multiple Choices</title>
    </head>
    <body>
      <h1>Multiple Choices</h1>
      <ul>
        <li><a href="/resource.json">JSON Format</a></li>
        <li><a href="/resource.xml">XML Format</a></li>
        <li><a href="/resource.html">HTML Format</a></li>
      </ul>
    </body>
  </html>
  `);
  //Redirection Second way
  // res
  //   .writeHead(301, {
  //     location: '/folder',
  //   })
  //   .end();
  //Express v5
  // res.redirect(301, 'http://procodrr.com');
});

app.get('/folder', (req, res) => {
  res.json({
    name: 'images',
    files: ['Node.png', 'js.webp'],
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
