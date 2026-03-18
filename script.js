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
}

fetchShows();