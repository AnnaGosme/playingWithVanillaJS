const body = document.body;
body.style.background = "blue";
body.style.padding = "10px";
body.style.display = "flex";

body.style.flexDirection = "column";
body.style.overflowX = "hidden";

const searchBar = document.createElement("form");
const label = document.createElement("label");
searchBar.appendChild(label);
const input = document.createElement("input");
input.placeholder = "Search for a movie...";
searchBar.appendChild(input);
const searchButton = document.createElement("button");
searchButton.type = "button";
searchButton.innerText = "search";
searchBar.appendChild(searchButton);

const clearButton = document.createElement("button");
clearButton.type = "button";
searchBar.appendChild(clearButton);
clearButton.innerText = "Back to home page";

clearButton.addEventListener("click", clearButtonOnClick);

searchBar.addEventListener("keyup", displaySearchResults);

searchBar.style.color = "white";
searchBar.style.fontFamily = "arial";

let search = document.getElementById("search");
search.insertAdjacentElement("afterbegin", searchBar);

let searchResults = document.createElement("div");
searchResults.style.width = "auto";
searchResults.style.height = "auto";
searchResults.style.display = "grid";
searchResults.style.gridTemplateColumns = " auto auto auto auto auto";
searchBar.append(searchResults);
searchResults.style.visibility = "hidden";

const trending = document.createElement("div");
trending.innerText = "Trending";
trending.style.color = "white";
trending.style.fontFamily = "arial";

let carousel = document.getElementById("carousel");
carousel.insertAdjacentElement("beforebegin", trending);

let carouselElement = document.createElement("div");
carouselElement.classList.add("carouselElement");
carouselElement.style.color = "white";
carouselElement.style.fontFamily = "arial";
carouselElement.style.fontSize = "10px";
carouselElement.style.textAlign = "center";
carouselElement.style.display = "flex";
carouselElement.style.flexWrap = "wrap";

carousel.append(carouselElement);

const recommended = document.createElement("div");
recommended.innerText = "Recommended for you";
recommended.style.color = "white";
recommended.style.fontFamily = "arial";

const recommendedMovies = document.getElementById("recommended");
recommendedMovies.style.width = "100px";

recommendedMovies.insertAdjacentElement("beforebegin", recommended);

let recommendedElement = document.createElement("div");
recommendedElement.classList.add("recommendedElement");
recommendedElement.style.color = "white";
recommendedElement.style.fontFamily = "arial";
recommendedElement.style.fontSize = "10px";
recommendedElement.style.textAlign = "center";
recommendedElement.style.display = "grid";
recommendedElement.style.gridTemplateColumns = " auto auto auto auto auto";

recommended.append(recommendedElement);

const sideBar = document.createElement("div");
sideBar.innerText = "side bar";
body.append(sideBar);

//API fetch
const URL_recommended =
  "https://api.themoviedb.org/3/api_key=fb55081276ff4308dc10d1c41ca8ec83&language=en-US";
const API_KEY = "fb55081276ff4308dc10d1c41ca8ec83";

async function fetchTrendingMovies() {
  try {
    let response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=fb55081276ff4308dc10d1c41ca8ec83&language=en-US&page=1"
    );
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
fetchTrendingMovies();

async function renderTrendingMovies() {
  let data = await fetchTrendingMovies();
  let movies = data.results
    .slice(0, 11)
    .filter((movie) => movie.indexOf === movie.lastIndexOf);
  let html = "";

  movies.forEach((movie) => {
    let htmlSegment = `<div class="movie" style="margin: 5px; width: 150px; height: 250px; justify-content: center">
        <img src="https://image.tmdb.org/t/p/w200/${movie.poster_path}" style="border-radius: 5px; width: 150px; height: 200px;" >
        <h2>${movie.original_title}<h2>
      </div>`;
    html += htmlSegment;
  });
  carouselElement.insertAdjacentHTML("beforeend", html);
}
renderTrendingMovies();

async function fetchRecommendedMovies(movie_id) {
  try {
    let response = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=fb55081276ff4308dc10d1c41ca8ec83&language=en-US&page=1`
    );
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error, error.message);
  }
}

async function renderRecommendedMovies() {
  let data = await fetchRecommendedMovies(634649);
  let movies = data.results;
  let html = "";

  movies.forEach((movie) => {
    let htmlSegment = `<div class="movie" style="margin: 5px;">
        <img src="https://image.tmdb.org/t/p/w200/${movie.poster_path}" style="border-radius: 5px; width: 100px; height: 150px" >
        <h2>${movie.original_title}<h2>
      </div>`;
    html += htmlSegment;
  });
  recommendedElement.insertAdjacentHTML("beforeend", html);
}
renderRecommendedMovies();

async function fetchAllMovies(query) {
  try {
    let response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=fb55081276ff4308dc10d1c41ca8ec83&language=en-US&page=1&include_adult=false`
    );
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function displaySearchResults(e) {
  const query = e.target.value;
  let data = await fetchAllMovies(query);
  let movies = await data.results;
  let html;
  if (!query) return movies;
  movies.filter((movie) => {
    const movieTitle = movie.original_title.toLowerCase();
    if (movieTitle.indexOf(query) != -1) {
      let htmlSegment = `<div class="movie" style="margin: 5px;">
      <img src="https://image.tmdb.org/t/p/w200/${movie.poster_path}" style="border-radius: 5px; width: 100px; height: 150px">
      <h2>${movieTitle}<h2>
      </div>`;
      html += htmlSegment;
      carousel.style.visibility = "hidden";
      recommended.style.visibility = "hidden";
      searchResults.style.visibility = "visible";
      searchResults.insertAdjacentHTML("beforeend", html);
      searchResults.innerHTML = html;
      //const movieDiv = document.querySelector("movie");
      console.log(typeof movieDiv);
    }
  });
}

function clearButtonOnClick() {
  renderRecommendedMovies();
  renderTrendingMovies();
  input.form.reset();
  carousel.style.visibility = "visible";
  recommended.style.visibility = "visible";
  searchResults.remove();
  searchResults.style.visibility = "hidden";
}
