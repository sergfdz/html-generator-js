import fs from "fs";

class Show {
  constructor(id, name, image, summary) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.summary = summary;
  }
}

function generateIndex(shows) {
  let html = `
  <html>
  <head>
    <title>Shows</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <h1>Lista de Shows</h1>
    <ul>
  `;

  shows.slice(0, 50).forEach(show => {
    html += `<li><a href="show-${show.id}.html">${show.name}</a></li>`;
  });

  html += `
    </ul>
  </body>
  </html>
  `;

  fs.writeFileSync("index.html", html);
}

async function fetchShows() {
  const response = await fetch("https://api.tvmaze.com/shows");
  const data = await response.json();

  const shows = data.map(show => new Show(
    show.id,
    show.name,
    show.image?.medium,
    show.summary
  ));

  generateIndex(shows);
  generateShowPages(shows);
}

function generateShowPages(shows) {
  shows.slice(0, 50).forEach(show => {
    const html = `
    <html>
    <head>
      <title>${show.name}</title>
      <link rel="stylesheet" href="styles.css">
    </head>
    <body>
      <h1>${show.name}</h1>
      <img src="${show.image}" />
      <div>${show.summary}</div>
      <br>
      <a href="index.html">← Volver</a>
    </body>
    </html>
    `;

    fs.writeFileSync(`show-${show.id}.html`, html);
  });
}

fetchShows();