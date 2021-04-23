import "regenerator-runtime/runtime";
import '../styles/main.scss';

import { Api } from "./utils/apiUtils.js";
import { BooksListUI } from "./ui/booksListUI.js";

new BooksListUI(new Api());