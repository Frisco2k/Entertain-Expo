let data; // Declare data outside the fetchDataAndDisplay function

async function fetchDataAndDisplay() {
    const url = 'https://all-books-api.p.rapidapi.com/getBooks';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'c7e5b3a6d8mshb6d51aa18982e9ep148f76jsn0e59ee95c0b2',
            'X-RapidAPI-Host': 'all-books-api.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        data = await response.json(); 
        if (Array.isArray(data)) {
            displayBooks(data);
           
            document.getElementById('search-bar').addEventListener('input', (event) => {
                const searchTerm = event.target.value.trim();
                const filteredBooks = searchBooks(data, searchTerm);
                displayBooks(filteredBooks);
            });

            document.getElementById('sort-by-rank').addEventListener('click', () => {
                const sortedBooks = sortBooksByRank(data);
                displayBooks(sortedBooks);
            });

            document.getElementById('sort-by-isbn').addEventListener('click', () => {
                const sortedBooks = sortBooksByISBN(data);
                displayBooks(sortedBooks);
            });

            document.getElementById('sort-by-author').addEventListener('click', () => {
                const sortedBooks = sortBooksByAuthor(data);
                displayBooks(sortedBooks);
            });

            document.getElementById('sort-by-title').addEventListener('click', () => {
                const sortedBooks = sortBooksByTitle(data);
                displayBooks(sortedBooks);
            });

        } else {
            console.error('Data is not in expected format.');
        }
    } catch (error) {
        console.error(error);
    }
}

      function displayBooks(books) {
          const galleryContainer = document.getElementById('gallery-container');
          galleryContainer.innerHTML = ''; 

          books.forEach(book => {
              const card = document.createElement('div');
              card.classList.add('card');

            const frontFace = document.createElement('div');
            frontFace.classList.add('card-front');

            
            const image = document.createElement('img');
            image.src = book.bookImage;
            frontFace.appendChild(image);

            const title = document.createElement('h2');
            title.textContent = book.bookTitle;
            
              frontFace.appendChild(title);
              

              
            const backFace = document.createElement('div');
            backFace.classList.add('card-back');

            const description = document.createElement('p');
            description.textContent =  book.bookDescription;

            const author = document.createElement('p');
            author.textContent = 'Author: ' + book.bookAuthor;

            const publisher = document.createElement('p');
            publisher.textContent = 'Publisher: ' + book.bookPublisher;

            const amazonLink = document.createElement('a');
            amazonLink.textContent = 'Amazon Link';
            amazonLink.href = book.amazonBookUrl;
            amazonLink.target = '_blank';

            const isbn = document.createElement('p');
            isbn.textContent = 'ISBN: ' + book.bookIsbn;

            const bookRank = document.createElement('p');
            bookRank.textContent = 'Book Rank: ' + book.bookRank;

           
            backFace.appendChild(description);
            backFace.appendChild(author);
            backFace.appendChild(publisher);
            backFace.appendChild(amazonLink);
            backFace.appendChild(isbn);
            backFace.appendChild(bookRank);
             

             
              const cardInner = document.createElement('div');
              cardInner.classList.add('card-inner');
              cardInner.appendChild(frontFace);
              cardInner.appendChild(backFace);

              card.appendChild(cardInner);

              galleryContainer.appendChild(card);

              
              card.addEventListener('click', function() {
                  card.classList.toggle('flipped');
              });
          });
      }


function searchBooks(books, searchTerm) {
    if (Array.isArray(books)) {
        return books.filter(book =>
            book.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.bookDescription.toLowerCase().includes(searchTerm.toLowerCase())
        );
    } else {
        console.error('Books array is not available for searching.');
        return [];
    }
}

function sortBooksByRank(books) {
    if (Array.isArray(books)) {
        return books.slice().sort((a, b) => a.bookRank - b.bookRank);
    } else {
        console.error('Books array is not available for sorting.');
        return [];
    }
}

function sortBooksByISBN(books) {
    if (Array.isArray(books)) {
        return books.sort((a, b) => a.bookIsbn.localeCompare(b.bookIsbn));
    } else {
        console.error('Books array is not available for sorting.');
        return [];
    }
}

function sortBooksByAuthor(books) {
    if (Array.isArray(books)) {
        return books.sort((a, b) => a.bookAuthor.localeCompare(b.bookAuthor));
    } else {
        console.error('Books array is not available for sorting.');
        return [];
    }
}

function sortBooksByTitle(books) {
    if (Array.isArray(books)) {
        return books.sort((a, b) => a.bookTitle.localeCompare(b.bookTitle));
    } else {
        console.error('Books array is not available for sorting.');
        return [];
    }
}

fetchDataAndDisplay();

