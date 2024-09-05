const accessKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";

const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreButtonEl = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

// Hide the 'Show More' button initially
showMoreButtonEl.style.display = "none";

async function searchImages() {
  inputData = searchInputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  if (page === 1) {
    searchResultsEl.innerHTML = ""; // Clear previous search results on a new search
  }

  const results = data.results;

  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResultsEl.appendChild(imageWrapper);
  });

  // Only show the 'Show More' button if more pages are available
  if (data.total_pages > page) {
    showMoreButtonEl.style.display = "block";
  } else {
    showMoreButtonEl.style.display = "none"; // Hide if there are no more pages
  }

  page++;
}

// Event listener for the search form submission
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1; // Reset page number for new search
  searchImages(); // Perform the search
});

// Event listener for the 'Show More' button
showMoreButtonEl.addEventListener("click", () => {
  searchImages(); // Fetch more results on button click
});
