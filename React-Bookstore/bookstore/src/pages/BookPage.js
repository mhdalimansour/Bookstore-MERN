import axios from "axios";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import BookCard from "../components/BookCard";
import Navigation from "../components/Navbar";

function BookPage() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/books")
      .then((response) => {
        setBooks(response.data.data.data);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, []);

  let filteredBookList = [];
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    if (book.title.toLowerCase().includes(query.toLowerCase())) {
      filteredBookList.push(book);
    } else if (book.author.toLowerCase().includes(query.toLowerCase())) {
      filteredBookList.push(book);
    }
  }
  const booksList = filteredBookList.map((el) => {
    return <BookCard key={el.toString()} data={el}></BookCard>;
  });

  return (
    <>
      <Navigation />
      <div className="search-container">
        <Form.Control
          type="text"
          placeholder="Search Books"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></Form.Control>
      </div>
      <div className="lol">{booksList}</div>
    </>
  );
}
export default BookPage;
