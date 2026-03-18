async function fetchShows() {
  const response = await fetch("https://api.tvmaze.com/shows");
  const data = await response.json();

  console.log(data.slice(0, 5));
}

fetchShows();