import axios from "axios";
import { useState } from "react";
import { Button, Card, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import Navigation from "../components/Navbar";

function BookAdmin() {
  const [deleted, setDeleted] = useState(true);
  const [bookIsbn, setBookIsbn] = useState();
  const [book, SetBook] = useState({
    isbn: "",
    title: "",
    author: "",
    price: 0,
    quantity: 0,
  });

  const [updateBook, setUpdateBook] = useState({});

  const navigate = useNavigate();

  const handleAddBook = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role === "customer") navigate("/login");

    axios
      .post("http://localhost:5000/books", book, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        swal
          .fire({
            title: "Book Added Successfully!",
            icon: "success",
          })
          .then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getBook = () => {
    axios
      .get(`http://localhost:5000/books/${bookIsbn}`)
      .then((res) => {
        setUpdateBook(res.data.data.data);
      })
      .catch((err) => {
        swal.fire({
          title: "Book Not Found!",
          icon: "error",
          confirmButtonText: "Okay",
        });
      });
  };

  const handleUpdateBook = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role === "customer") navigate("/login");
    console.log("updating");

    axios
      .patch(`http://localhost:5000/books/${updateBook._id}`, updateBook, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        swal
          .fire({
            title: "Book Updated Successfully!",
            icon: "success",
          })
          .then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteBook = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role === "customer") navigate("login");
    console.log("deleting");
    axios
      .delete(`http://localhost:5000/books/${updateBook._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {})
      .catch((err) => {
        setDeleted(false);
        console.log(err);
      });
  };
  return (
    <>
      <Navigation></Navigation>
      <div className="lol">
        <Row>
          <Card style={{ width: "300px" }}>
            <br />
            <Card.Title>Add Book</Card.Title>
            <Form.Control
              type="text"
              placeholder="Book ISBN"
              value={book.isbn}
              onChange={(e) => SetBook({ ...book, isbn: e.target.value })}
            ></Form.Control>
            <br />
            <Form.Control
              type="text"
              placeholder="Book Title"
              value={book.title}
              onChange={(e) => SetBook({ ...book, title: e.target.value })}
            ></Form.Control>
            <br />
            <Form.Control
              type="text"
              placeholder="Book Author"
              value={book.author}
              onChange={(e) => SetBook({ ...book, author: e.target.value })}
            ></Form.Control>
            <br />

            <Form.Control
              type="text"
              placeholder="Book Price"
              value={book.price}
              onChange={(e) => SetBook({ ...book, price: e.target.value })}
            ></Form.Control>
            <br />
            <Form.Control
              type="text"
              placeholder="Book Quantity"
              value={book.quantity}
              onChange={(e) => SetBook({ ...book, quantity: e.target.value })}
            ></Form.Control>
            <br />
            <Button
              onClick={() => {
                handleAddBook();
              }}
            >
              Add Book
            </Button>
            <br />
          </Card>
          <Card style={{ width: "300px" }}>
            <br />
            <Card.Title>Update/Delete Book</Card.Title>
            <br />
            <Form.Control
              type="text"
              placeholder="ISBN"
              value={bookIsbn}
              onChange={(e) => setBookIsbn(e.target.value)}
            ></Form.Control>
            <br />
            <Button onClick={getBook}>Check Book</Button>
          </Card>

          <Card style={{ width: "300px" }}>
            <br />
            <Form.Control
              type="text"
              placeholder=" New ISBN"
              value={updateBook.isbn}
              onChange={(e) =>
                setUpdateBook({ ...updateBook, isbn: e.target.value })
              }
            ></Form.Control>
            <br />
            <Form.Control
              type="text"
              placeholder=" New Title"
              value={updateBook.title}
              onChange={(e) =>
                setUpdateBook({ ...updateBook, title: e.target.value })
              }
            ></Form.Control>
            <br />
            <Form.Control
              type="text"
              placeholder=" New Author"
              value={updateBook.author}
              onChange={(e) =>
                setUpdateBook({ ...updateBook, author: e.target.value })
              }
            ></Form.Control>
            <br />
            <Form.Control
              type="text"
              placeholder=" New Price"
              value={updateBook.price}
              onChange={(e) =>
                setUpdateBook({ ...updateBook, price: e.target.value })
              }
            ></Form.Control>
            <br />
            <Form.Control
              type="text"
              placeholder=" New Quantity"
              value={updateBook.quantity}
              onChange={(e) =>
                setUpdateBook({ ...updateBook, quantity: e.target.value })
              }
            ></Form.Control>
            <br />
            <Button
              disabled={Object.keys(updateBook).length < 5}
              onClick={() => {
                handleUpdateBook();
              }}
            >
              Update Book
            </Button>
            <br />
            <Button
              disabled={Object.keys(updateBook).length < 5}
              onClick={() => {
                swal
                  .fire({
                    title: "Are you sure you want to delete this Book?",
                    icon: "warning",
                    showCancelButton: true,
                    showConfirmButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!",
                  })
                  .then((result) => {
                    if (result.isConfirmed) {
                      handleDeleteBook();
                      if (deleted) {
                        swal
                          .fire(
                            "Deleted!",
                            "Your file has been deleted.",
                            "success"
                          )
                          .then((result) => {
                            if (result.isConfirmed) {
                              window.location.reload();
                            }
                          });
                      }
                    }
                  });
              }}
            >
              Delete Book
            </Button>
            <br />
          </Card>
        </Row>
      </div>
    </>
  );
}
export default BookAdmin;
