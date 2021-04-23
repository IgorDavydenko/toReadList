export class BooksListUI {
    searchResultHolder;
    // bookInfoHolder;
    // currentPage = [];
    // api;
  
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

        console.log(result.docs);
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