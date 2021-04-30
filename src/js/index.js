import "regenerator-runtime/runtime";
import '../styles/main.scss';

import { SearchFormController } from "./controller/SearchFormController";
import { OpenLibraryController } from "./controller/OpenLibraryController";

// import { Api } from "./utils/apiUtils.js";
// import { BooksListUI } from "./ui/booksListUI.js";

// new BooksListUI(new Api());

// const serachForm = new SearchFormController();
// const openLibraryController = new OpenLibraryController();

const searchInput = '';

const { result } = await OpenLibraryController.searchBooks("remarque")
console.log(result)