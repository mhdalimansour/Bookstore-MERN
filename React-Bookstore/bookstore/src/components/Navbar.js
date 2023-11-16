import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  CloseButton,
  Container,
  Image,
  Nav,
  NavDropdown,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CartItem from "./CartItem";
import "./css/navbar.css";

function Navigation() {
  const token = localStorage.getItem("token");
  const logo = require("../images/navbar-logo.png");
  const role = localStorage.getItem("role");
  const [show, setShow] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
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

  if (role === "customer") {
    return (
      <>
        <Navbar
          expand="lg"
          className="bg-body-tertiary"
          sticky="top"
          fixed="top"
        >
          <Container>
            <Navbar.Brand href="/">
              <Image
                src={logo}
                alt="Logo"
                style={{ width: "140px", height: "50px" }}
              ></Image>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/books">Books</Nav.Link>

                <NavDropdown title="Shop by Genre" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={() => window.location.reload()}>
                    Fiction
                  </NavDropdown.Item>
                  <NavDropdown.Item>Non-Fiction</NavDropdown.Item>
                </NavDropdown>
                {token && <Nav.Link href="/account">Account</Nav.Link>}
                {token && <Nav.Link onClick={handleShow}>Cart</Nav.Link>}
                {/* {token && <Nav.Link href="/cart">Cart</Nav.Link>} */}
              </Nav>
            </Navbar.Collapse>
            {!localStorage.getItem("token") && (
              <>
                <Button variant="primary" href="/login">
                  Log In
                </Button>
                <Button variant="primary" href="/signup">
                  Sign Up
                </Button>
              </>
            )}
            {token && (
              <>
                <Button
                  variant="primary"
                  onClick={() => {
                    Swal.fire({
                      title: "Are you sure you want to Log Out?",
                      icon: "question",
                      showCancelButton: true,
                      showConfirmButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        localStorage.removeItem("token");
                        window.location.href = "/login";
                      }
                    });
                  }}
                >
                  Log out
                </Button>
              </>
            )}
          </Container>
        </Navbar>
        <Offcanvas show={show} onHide={handleClose} placement="end">
          <Offcanvas.Header>
            <Offcanvas.Title>Cart</Offcanvas.Title>
            <CloseButton onClick={handleClose} />
          </Offcanvas.Header>
          <Offcanvas.Body>{items}</Offcanvas.Body>
          <p style={{ fontSize: "20px" }}>Total : {totalPrice}💲</p>
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
        </Offcanvas>
      </>
    );
  } else {
    return (
      <>
        <Navbar
          expand="lg"
          className="bg-body-tertiary"
          sticky="top"
          fixed="top"
        >
          <Container>
            <Navbar.Brand href="/">
              <Image src={logo} alt="Logo"></Image>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <Nav.Link href="/admin-page">Home</Nav.Link>
                <Nav.Link href="/books-admin">Books</Nav.Link>
                <Nav.Link href="/orders-admin">Orders</Nav.Link>

                {token && <Nav.Link href="/account">Account</Nav.Link>}
              </Nav>
            </Navbar.Collapse>
            {!localStorage.getItem("token") && (
              <>
                <Button variant="primary" href="/login">
                  Log In
                </Button>
                <Button variant="primary" href="/signup">
                  Sign Up
                </Button>
              </>
            )}
            {token && (
              <>
                <Button
                  variant="primary"
                  onClick={() => {
                    Swal.fire({
                      title: "Are you sure you want to Log Out?",
                      icon: "question",
                      showCancelButton: true,
                      showConfirmButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        localStorage.removeItem("token");
                        window.location.href = "/login";
                      }
                    });
                  }}
                >
                  Log out
                </Button>
              </>
            )}
          </Container>
        </Navbar>
      </>
    );
  }
}

export default Navigation;
