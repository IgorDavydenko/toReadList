const bookInfoDiv = info => {
    return `
        <div id=${info.id} class="search-result__book-info">
            <section class="book-info__preview">
                <p class="book-info__author">
                    Author: ${info.author_name}
                </p>
                <p class="book-info__title">
                    Book title: ${info.title}
                </p>
            </section>
            <button id="bookInfoButton" class="book-info__button" data-is-show="false"></button>
        </div>
    `;
};

const bookInfoFullDiv = info => {
    return `
        <div id=${info.id} class="search-result__book-info">
            <section class="book-info__preview">
                <p class="book-info__author">
                    Author: ${info.author_name}
                </p>
                <p class="book-info__title">
                    Book title: ${info.title}
                </p>

                <p class="book-info__title">
                    Languages: ${info.language ? `${info.language.join(",")}` : ""}
                </p>
                <p class="book-info__has-full">
                    Full text available: ${info.has_fulltext? "yes" : "no"}
                </p>
                <p class="book-info__has-full">
                    First published: ${info.first_publish_year ? info.first_publish_year: ""}
                </p>
                ${info.subtitle ? 
                    `
                    <p class="book-info__subtitle">
                        Subtitle: ${info.subtitle}
                    </p>` 
                    : ""}

            </section>
            <button id="bookInfoButton" class="book-info__button" data-is-show="true"></button>
        </div>
    `;
};
  
module.exports = { bookInfoDiv, bookInfoFullDiv };
  