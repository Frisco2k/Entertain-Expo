let gamesArr = [];


async function renderGames(gamesArr) {
  let container = document.querySelector('#container');
  container.innerHTML = '';

  gamesArr.forEach(game => {
    let card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">
          <p>${game.title}</p>
          <p><img src="${game.thumbnail}" alt="Thumbnail"></p>
        </div>
        <div class="card-back">
          <p>${game.short_description}</p>
          <p>Genre: ${game.genre}</p>
          <p>Platform: ${game.platform}</p>
          <p>Publisher: ${game.publisher}</p>
          <p>Developer: ${game.developer}</p>
          <p>Release Date: ${game.release_date}</p>
          <p>Game Url: <a href="${game.game_url}">${game.game_url}</a></p>
        </div>
      </div>
    `;

    card.addEventListener('click', function() {
      card.classList.toggle('flipped');
    });

    container.appendChild(card);
  });
}


async function getData(url) {
  const response = await fetch(url);
  const result = await response.json();
  gamesArr = result;
  renderGames(gamesArr);
}

getData("https://weblabs.web.app/api/games.json");

async function filterByGenre(genre) {
  let filtered = [];
  for (let rec of gamesArr) {
    if (rec.genre === genre)
      filtered.push(rec);
  }
  renderGames(filtered);
}

async function filterByPlatform(platform) {
  let filtered = [];
  for (let rec of gamesArr) {
    if (rec.platform.includes(platform))
      filtered.push(rec);
  }
  renderGames(filtered);
}

async function search() {
  let searchKey = document.querySelector('#searchGame').value;
  let results = [];
  for (let rec of gamesArr) {
    let searchText = rec.title.toUpperCase();
    searchKey = searchKey.toUpperCase();
    if (searchText.includes(searchKey)) {
      results.push(rec);
    }
  }
  renderGames(results);
}

function sortByReleaseDate(order) {
  if (order === 'asc') {
    // Sort the games array based on release_date (in ascending order)
    gamesArr.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
  } else if (order === 'desc') {
    // Sort the games array based on release_date (in descending order)
    gamesArr.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
  }
  renderGames(gamesArr);
}


const searchIcon = document.getElementById('searchIcon');
searchIcon.addEventListener('click', search);