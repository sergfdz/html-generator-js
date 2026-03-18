class Show {
  constructor(id, name, image, summary) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.summary = summary;
  }
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

  console.log(shows.slice(0, 5));
}

fetchShows();