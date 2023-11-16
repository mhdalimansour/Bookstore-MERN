import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CartItem from "./CartItem";
import Navigation from "./Navbar";
import "./css/cartitems.css";

function Cart() {
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      axios
        .get("http://localhost:5000/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((respone) => {
          setCart(respone.data.data.cart);
          setCartId(respone.data.data.id);
          setTotalPrice(respone.data.data.totalPrice);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [navigate]);

  const items = cart.map((el) => {
    return (
      <>
        <CartItem
          key={el._id}
          itemId={el._id}
          bookId={el.book._id}
          title={el.book.title}
          image={el.book.imageCover}
          price={el.book.price}
          quantity={el.quantity}
        ></CartItem>
        <br />
      </>
    );
  });

  const ConfirmOrder = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    axios
      .post(
        "http://localhost:5000/orders/confirm-order",
        {
          cart: cartId,
          items: cart,
          total: totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        ClearCart();
        Swal.fire({
          title: "Order Confirmed",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ClearCart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    axios
      .delete(`http://localhost:5000/cart/clear-cart/${cartId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Navigation />
      <div className="grid-container">
        {items}
        <p style={{ fontSize: "25px" }}>Total : {totalPrice}💲</p>
        <Button
          disabled={items.length === 0}
          onClick={() => {
            Swal.fire({
              title: "Are you sure you want to confirm this order?",
              icon: "question",
              showCancelButton: true,
              confirmButtonText: "Yes",
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
            }).then((result) => {
              if (result.isConfirmed) {
                ConfirmOrder();
              }
            });
          }}
        >
          Confirm Order
        </Button>
      </div>
    </>
  );
}
export default Cart;
