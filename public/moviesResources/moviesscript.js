const baseUrl = 'https://tvshow.p.rapidapi.com/Movie/Discover';
      const apiKey = '5e8dc5d04amshdd8fd9dfc75aaa1p12faa9jsndf09abed5686';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'tvshow.p.rapidapi.com'
        }
      };

      const galleryContainer = document.getElementById('gallery-container');
      const searchBar = document.getElementById('search-bar');
      const sortByPopularityButton = document.getElementById('sort-by-popularity');
      const sortByTitleButton = document.getElementById('sort-by-title');

      let allMovies = [];

      async function fetchDataAndDisplay() {
        try {
          
          const firstPageUrl = `${baseUrl}?Page=1&Language=en-US&Adult=true`;
          const firstPageResponse = await fetch(firstPageUrl, options);
          const firstPageData = await firstPageResponse.json();

         
          const secondPageUrl = `${baseUrl}?Page=2&Language=en-US&Adult=true`;
          const secondPageResponse = await fetch(secondPageUrl, options);
          const secondPageData = await secondPageResponse.json();

         
          const thirdPageUrl = `${baseUrl}?Page=3&Language=en-US&Adult=true`;
          const thirdPageResponse = await fetch(thirdPageUrl, options);
          const thirdPageData = await thirdPageResponse.json();

          
          allMovies = [...firstPageData, ...secondPageData, ...thirdPageData];

          
          displayMovies(allMovies);
        } catch (error) {
          console.error(error);
        }
      }

      function displayMovies(movies) {
        const galleryContainer = document.getElementById('gallery-container');
        galleryContainer.innerHTML = '';

        movies.forEach(movie => {
          const card = document.createElement('div');
          card.classList.add('card');

         
          const frontFace = document.createElement('div');
          frontFace.classList.add('card-front');

          
          const image = document.createElement('img');
          image.src = movie.image;
          frontFace.appendChild(image);

          const title = document.createElement('h2');
          title.textContent = movie.title;
          frontFace.appendChild(title);
          

          
          const backFace = document.createElement('div');
          backFace.classList.add('card-back');

          const overview = document.createElement('p');
          overview.textContent = movie.overview;

          const genres = document.createElement('p');
          genres.textContent = 'Genres: ' + movie.genres.join(', ');

         
          backFace.appendChild(overview);
          backFace.appendChild(genres);


         
          const cardInner = document.createElement('div');
          cardInner.classList.add('card-inner');
          cardInner.appendChild(frontFace);
          cardInner.appendChild(backFace);

          card.appendChild(cardInner);

          galleryContainer.appendChild(card);

          card.addEventListener('click', function () {
            cardInner.classList.toggle('flipped');
          });
        });
      }

      function sortByPopularity() {
        const sortedMovies = allMovies.slice().sort((a, b) => b.popularity - a.popularity);
        displayMovies(sortedMovies);
      }

      function sortByTitle() {
        const sortedMovies = allMovies.slice().sort((a, b) => a.title.localeCompare(b.title));
        displayMovies(sortedMovies);
      }

      sortByPopularityButton.addEventListener('click', sortByPopularity);
      sortByTitleButton.addEventListener('click', sortByTitle);

      searchBar.addEventListener('input', () => {
        const searchTerm = searchBar.value.toLowerCase();
        const filteredMovies = allMovies.filter(movie => movie.title.toLowerCase().includes(searchTerm));
        displayMovies(filteredMovies);
      });

      fetchDataAndDisplay();