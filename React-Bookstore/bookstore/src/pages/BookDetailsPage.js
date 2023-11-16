import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Navigation from "../components/Navbar";
import "./css/details.css";

function BookDetailsPage() {
  // const { bookId } = useParams();
  const { bookSlug } = useParams();
  const [book, setBook] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/books/${bookSlug}`)
      .then((response) => {
        setBook(response.data.data.data);
        console.log(response.data.data.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, [bookSlug]);

  const addToCart = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      axios
        .post(
          `http://localhost:5000/cart/new/${book.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((respone) => {
          Swal.fire({
            title: "Book Added!",
            icon: "success",
            confirmButtonText: "Okay",
            confirmButtonColor: "#3085d6",
          })
            .then(() => {
              window.location.reload();
            })
            .then(() => {});
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  let imageLink = "";
  if (book.imageCover) {
    imageLink = require(`../images/${book.imageCover}`);
  }
  return (
    <>
      <Navigation />
      <div className="lol">
        <Card className="text-center" style={{ width: "500px" }}>
          <Card.Title>{book.title}</Card.Title>
          <Card.Img src={imageLink} style={{}}></Card.Img>
          <Card.Body>
            <Card.Text> ISBN: {book.isbn}</Card.Text>
            <Card.Text> Author: {book.author}</Card.Text>
            <Card.Text> Description: {book.description}</Card.Text>
            <Card.Text> Price: {book.price}</Card.Text>
            <Card.Text> Rating: {book.avgRating}</Card.Text>
            <Button variant="primary" onClick={addToCart}>
              Add To Cart
            </Button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
export default BookDetailsPage;
