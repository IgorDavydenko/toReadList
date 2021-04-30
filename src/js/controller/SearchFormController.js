

export class SearchFormController {


    constructor(api) {
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
}