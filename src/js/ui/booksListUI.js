export class BooksListUI {
    searchResultHolder;
    bookInfoHolder;
    currentPage = [];
    api;
  
    constructor(api) {
        this.searchResultHolder =  document.getElementById("searchResultHolder");

        const searchInput = document.getElementById("searchInput");
        const searchButton = document.getElementById("searchGoButton");

        searchButton.addEventListener("click", () => this.sendSearchRequest(api));
        searchInput.addEventListener("keypress", keyPressed => {
            const keyEnter = 13;
            if (keyPressed.which == keyEnter) {
                this.sendSearchRequest(api);
            }
        });
        this.searchResultHolder.addEventListener("click", (event) => {
            const targetDiv = event.target;
            const id = targetDiv.id;

            const selectedBook = this.currentPage.find((item) => item.id === id);
            if (!selectedBook) {
                return;
            }
            if (this.selectedBook) {
                const selectedBook = this.searchResultHolder.querySelector(`#${this.selectedBook.id}`);
                selectedBook.classList.remove("book_selected");
            }
            
            this.selectedBook = selectedBook;
            targetDiv.classList.add("book_selected");

            // this.searchResultHolder.querySelector(`#${event.target.id}`);
        })
    }

    sendSearchRequest = (api) => {
        const query = searchInput.value;
            if(!query) {
                return;
            }

            api.search(query).then((response) => {
                this.processSearchResult(response);
            })
    }

    

    processSearchResult(result) {
        result.docs.forEach(item => {
            item.id = item.key.split("/").pop();
        });

        // console.log(result.docs);

        this.currentPage = result.docs;

        const booksListHTML = result.docs.reduce((accumulator, currentValue) => {
            return (
                accumulator + `
                    <div id=${currentValue.id} class="book-info">
                        ${currentValue.title}
                    </div>
                `
            );
        }, "");

        this.searchResultHolder.innerHTML = booksListHTML;
    }
    
}