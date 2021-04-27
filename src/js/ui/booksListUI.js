import { bookInfoDiv, bookInfoFullDiv } from "../components/searchResult";

export class BooksListUI {
    searchResultHolder;
    currentPage = [];
    selectedBook;
    showedFullInfoBook;
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
            const bookInfoElement = event.target.closest("div");
            const id = bookInfoElement.id;

            if (event.target.classList.contains("book-info__button")) {
                this.processBookInfoButton(event.target);
            }

            const selectedBook = this.currentPage.find((item) => item.id === id);
            if (!selectedBook) {
                return;
            }

            if (this.selectedBook) {
                const selectedBook = this.searchResultHolder.querySelector(`#${this.selectedBook.id}`);
                selectedBook.classList.remove("book_selected");
            }
            
            this.selectedBook = selectedBook;
            bookInfoElement.classList.add("book_selected");

        })
    }

    sendSearchRequest = (api) => {
        this.currentPage = [];
        this.selectedBook = null;
        this.showedFullInfoBook = null;

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

        this.currentPage = result.docs;
        if (this.currentPage.length == 0) {
            return;
        }

        const booksListHTML = result.docs.reduce((accumulator, currentValue) => {
            return accumulator + bookInfoDiv(currentValue);
        }, "");

        this.searchResultHolder.innerHTML = booksListHTML;
    }

    processBookInfoButton(targetButton) {
//  no one element selected -> display current clicked as full
        if (this.showedFullInfoBook) {
            console.log(`showedFullInfoBook: ${this.showedFullInfoBook.innerHTML}`);
        }

        const bookInfoElement = targetButton.closest(".search-result__book-info");
        const id = bookInfoElement.id;
        
        if (targetButton.dataset.isShow == "false") {
            const showMoreDiv = this.currentPage.find(item => item.id == id);
            bookInfoElement.outerHTML = bookInfoFullDiv(showMoreDiv);
        }

        this.showedFullInfoBook = bookInfoElement;

    }
    
}