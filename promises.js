/**
 * DO NOT USE ASYNC/AWAIT
 * Using the below two functions produce the following output
 * {
 * authors: ['bob', 'sally'],
 * titles: ['Greeting the World', 'Hello World!']
 * }
 * */

const getBooks = () => {
    return new Promise((resolve) => {
        resolve([
            {
                bookId: 1,
                author: "bob"
            },
            {
                bookId: 2,
                author: "sally"
            }
        ]);
    });
};

const getTitle = (bookId) => {
    return new Promise((resolve, reject) => {
        switch (bookId) {
            case 1:
                resolve({ title: "Greeting the World" });
                break;
            case 2:
                resolve({ title: "Hello World!" });
                break;
            default:
                reject(new Error("404 - book not found"));
        }
    });
};

const getAuthorsAndTitles = () => {
    let books;
    let titles;
    let authors = [];
    let titlesByAuthors = [];

    getBooks()
    .then(res => books = res)
    .finally(() => {
        books.map(book => {
            authors.push(book.author);
        })
        books.map(book => {
            getTitle(book.bookId).then(res => titlesByAuthors.push(res.title));
        })
    });

    return new Promise((resolve) => {
        resolve(
            {
                authors: authors,
                titles: titlesByAuthors
            }
        );
    });
}

getAuthorsAndTitles().then(res => console.log(res));