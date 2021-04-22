export class Api {
    async search(query, pageNum) {
      const url = `https://openlibrary.org/search.json?q=${query}&page=1`;
      const result = await fetch(url);
      return await result.json();
    }
  }
  