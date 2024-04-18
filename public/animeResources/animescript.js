let animeData = [];
let apiUrlEx = "https://api.jikan.moe/v4/top/anime";

function drawCard(animeData) {
  const animeGalleryDiv = document.getElementById("container");
  animeGalleryDiv.innerHTML = "";

  for (let anime of animeData) {
    const title = anime.title || "Unknown Title";
    const imageUrl =
      anime.images && anime.images.jpg && anime.images.jpg.image_url
        ? anime.images.jpg.image_url
        : "";

    const cardHtml = `
      <div id="${animeData.indexOf(
      anime
    )}"class="card" data-title="${title}" data-image="${imageUrl}" onclick=showmodal()>
        <img src="${imageUrl}" alt="${title}">
        <div class="text-container">
          <h3>${title}</h3>
        </div>
      </div>
    `;

    animeGalleryDiv.innerHTML += cardHtml;
  }

  // Attach event listeners to each card
  const cards = animeGalleryDiv.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", () => {

      const modal = document.getElementById("modal");
      modal.classList.remove("hidden");
      modal.classList.add("modal-visible");
      const animeIndex = card.id;
      const anime = animeData[animeIndex];
      showmodal(anime); //
    });
  });
}


const modal = document.getElementById("modal");
const container = document.getElementById("container");
container.addEventListener("click", () => {
  if (!modal.classList.contains("hidden")) {
    modal.classList.add("hidden");
    modal.classList.remove("modal-visible");
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  await topAnime();
});

async function filterByGenre(genre) {
  const filteredAnime = animeData.filter(anime => {
    const genres = anime.genres || [];
    return genres.some(g => g.name === genre);
  });

  drawCard(filteredAnime);
}

function search() {
  let searchKey = document
    .querySelector("#searchKey")
    .value.trim()
    .toUpperCase();

  let results = [];

  for (let anime of animeData) {
    let searchText = anime.title.toUpperCase();

    if (!searchText.includes(searchKey)) {
      let toRemove = document.getElementById(animeData.indexOf(anime));
      if (toRemove) {
        console.log(toRemove);
        toRemove.style.display = "none";
      }
    }
  }


}

document.querySelector(".search-btn").addEventListener("click", search);

document.querySelectorAll(".genre-item").forEach((item) => {
  item.addEventListener("click", () => {
    const genre = item.textContent;
    filterByGenre(genre);
  });
});

async function filterByType(type) {
  const animeGalleryDiv = document.getElementById('container');
  animeGalleryDiv.innerHTML = '';

  const filteredAnime = animeData.filter(anime => anime.type === type);

  drawCard(filteredAnime);
}


async function fetchTopAnime() {
  try {
    const response = await fetch("https://api.jikan.moe/v4/top/anime");
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching top anime:", error);
    return [];
  }
}

async function topAnime() {
  const animeGalleryDiv = document.getElementById("container");
  animeGalleryDiv.innerHTML = "";

  try {
    const topAnimes = await fetchTopAnime();

    if (topAnimes.length > 0) {
      animeData = topAnimes;
      drawCard(topAnimes);
    } else {
      console.error("No data received from the API");
    }
  } catch (error) {
    console.error("Error fetching top anime:", error);
  }
}

document.getElementById("loadTopAnimeBtn").addEventListener("click", topAnime);

async function fetchUpcomingAnime() {
  try {
    const response = await fetch("https://api.jikan.moe/v4/seasons/upcoming");
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching top anime:", error);
    return [];
  }
}

async function upcomingAnime() {
  const animeGalleryDiv = document.getElementById("container");
  animeGalleryDiv.innerHTML = "";

  try {
    const upcomingAnimes = await fetchUpcomingAnime();

    if (upcomingAnimes.length > 0) {
      animeData = upcomingAnimes;
      drawCard(upcomingAnimes);
    } else {
      console.error("No data received from the API");
    }
  } catch (error) {
    console.error("Error fetching upcoming anime:", error);
  }
}

document
  .getElementById("loadUpcomingBtn")
  .addEventListener("click", upcomingAnime);

async function fetchcurrentAnime() {
  try {
    const response = await fetch("https://api.jikan.moe/v4/seasons/now");
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching current anime:", error);
    return [];
  }
}

async function currentAnime() {
  const animeGalleryDiv = document.getElementById("container");
  animeGalleryDiv.innerHTML = "";

  try {
    const currentAnimes = await fetchcurrentAnime();

    if (currentAnimes.length > 0) {
      animeData = currentAnimes;
      drawCard(currentAnimes);
    } else {
      console.error("No data received from the API");
    }
  } catch (error) {
    console.error("Error fetching current anime:", error);
  }
}

document
  .getElementById("loadCurrentBtn")
  .addEventListener("click", currentAnime);

function disableScrolling() {
  var x = window.scrollX;
  var y = window.scrollY;
  window.onscroll = function() {
    window.scrollTo(x, y);
  };
}

function enableScrolling() {
  window.onscroll = function() { };
}



function showmodal(anime) {
  document.getElementById("modal").style.display = "block";
  document.getElementById("modal-content").style.display = "flex";
  const modalcontent = document.getElementById('modal-content');
  modalcontent.innerHTML = " ";

  const modalHtml = `
  <div class="modal-nav">
    <button id="infoBtn">Information</button>
    <button id="synopsisBtn">Synopsis</button>
    <button id="trailerBtn">Trailer</button>
  </div>
  <div id="modal-info">
    <h2 style="text-transform: uppercase;">${anime.title_english}</h2>
    <p>${anime.title_japanese}</p>
    <p><strong>Score:</strong> ${anime.score}</p>
    <p><strong>Scored By:</strong> ${anime.scored_by}</p>
    <p><strong>Favorites:</strong> ${anime.favorites}</p>
    <p><strong>Rank:</strong> ${anime.rank}</p>
    <p><strong>Airing Date:</strong> ${anime.aired.from}</p>
    <p><strong>Airing End Date:</strong> ${anime.aired.to || "N/A"}</p>
    <p><strong>Number of Episodes:</strong> ${anime.episodes || "N/A"}</p>
    <p><strong>Status:</strong> ${anime.status}</p>
    <p><strong>Type:</strong> ${anime.type}</p>
    <p><strong>Rating:</strong> ${anime.rating}</p>
    <p><strong>Season:</strong> ${anime.season}</p>
    <p><strong>Members:</strong> ${anime.members}</p>
  </div>
  <div id="modal-synopsis" style="display: none;">
    <p><strong>Synopsis:</strong> <br> <br> ${anime.synopsis}</p>
  </div>
  <div id="modal-trailer" style="display: none;">
    <h3><strong>Trailer:</strong></h3>
    ${anime.trailer && anime.trailer.embed_url ? `<iframe width="700" height="400" src="${anime.trailer.embed_url}?autoplay=0" frameborder="0" allowfullscreen></iframe>` : ''}
  </div>
`;
  modalcontent.innerHTML = modalHtml;


  document.getElementById("infoBtn").addEventListener("click", () => {
    document.getElementById("modal-info").style.display = "block";
    document.getElementById("modal-synopsis").style.display = "none";
    document.getElementById("modal-trailer").style.display = "none";
  });

  document.getElementById("synopsisBtn").addEventListener("click", () => {
    document.getElementById("modal-info").style.display = "none";
    document.getElementById("modal-synopsis").style.display = "block";
    document.getElementById("modal-trailer").style.display = "none";
  });

  document.getElementById("trailerBtn").addEventListener("click", () => {
    document.getElementById("modal-info").style.display = "none";
    document.getElementById("modal-synopsis").style.display = "none";
    document.getElementById("modal-trailer").style.display = "block";
  });

  disableScrolling();
}


window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    enableScrolling();
  }
};
