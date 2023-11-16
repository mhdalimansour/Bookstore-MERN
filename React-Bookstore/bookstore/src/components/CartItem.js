import axios from "axios";
import { useState } from "react";
import { Button, Card, CloseButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./css/cartitems.css";

function CartItem(props) {
  const itemId = props.itemId;
  const bookId = props.bookId;
  const bookTitle = props.title;
  const bookPrice = props.price;
  const bookQuantity = props.quantity;
  const bookImage = props.image;
  const [count, setCount] = useState(bookQuantity);
  const navigate = useNavigate();

  const handleUpdate = (operation) => {
    const token = localStorage.getItem("token");
    let qty = 1;
    if (!token) {
      navigate("/login");
    }
    if (operation === "add") {
      qty = count + 1;
    } else {
      qty = count - 1;
    }
    axios
      .patch(
        `http://localhost:5000/cart/update/${bookId}`,
        { qty },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteItem = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    console.log("in");
    axios
      .delete(`http://localhost:5000/cart/deleteItem/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const imageLink = require(`../images/${bookImage}`);
  return (
    <>
      <div>
        <Card>
          <CloseButton
            onClick={() => {
              deleteItem();
              window.location.reload();
            }}
          />
          <Card.Img src={imageLink}></Card.Img>
          <Card.Body>
            <Card.Title>{bookTitle}</Card.Title>
            <Card.Text>{bookPrice}💲</Card.Text>
            <Button
              variant="primary"
              onClick={() => {
                if (count > 1) {
                  setCount(count - 1);
                  handleUpdate("sub");
                  window.location.reload();
                }
              }}
              disabled={count === 1}
            >
              -
            </Button>
            <span style={{ marginRight: "5px" }}> {count} </span>
            <Button
              variant="primary"
              onClick={() => {
                setCount(count + 1);
                handleUpdate("add");
                window.location.reload();
              }}
            >
              +
            </Button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default CartItem;
