export class OpenLibraryController {
    
    static #OPENLIBRARY_URL = "https://openlibrary.org";
    
    static async searchBooks(query, pageNum) {
        const url = `${this.#OPENLIBRARY_URL}/search.json?q=${query}&page=1`;

        try {
            const response = await fetch(url)
            if (response.ok) {
                const result = await response.json();
                const resp = this.responseTemplate(response.status);
                resp.body = result.docs;
                resp.foundedSum = result.numFound;
                resp.bodyStart = result.start;

                return resp;
            }

            return {
                code: response.status,
                status: `Request ${url} failed with ${response.status}`,
            }
        } catch (error) {
            return {
                code: 500,
                status: `Request ${url} failed with error: ${error}`,
            }
        }

    }

    static responseTemplate(code, status = "") {
        return {
            code: code,
            status: status,
        }
    }
}