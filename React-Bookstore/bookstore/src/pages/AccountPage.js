import axios from "axios";
import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navbar";

function AccountPage() {
  const [newPass, setNewPass] = useState("");
  const [newPassConfirm, setNewPassConfirm] = useState("");
  const [currentPass, setCurrentPass] = useState("");
  const navigate = useNavigate();
  const changePassowrd = () => {
    if (!(newPass === newPassConfirm)) {
      alert("Passwords do not match");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    axios.patch(
      "http://localhost:5000/users/updateMyPassword",
      {
        passwordCurrent: currentPass,
        password: newPass,
        passwordConfirm: newPassConfirm,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  return (
    <>
      <Navigation />
      <div className="lol">
        <Card style={{ width: "500px" }}>
          <Card.Body>
            <h1> Account Page</h1>
            <br />
            <h5> Change Password</h5>
            <br />
            <Form className="text-center">
              <Form.Control
                type="password"
                placeholder="Old Password"
                className="mb-3"
                onChange={(e) => setCurrentPass(e.target.value)}
              />
              <Form.Control
                type="password"
                placeholder="New Password"
                className="mb-3"
                onChange={(e) => setNewPass(e.target.value)}
              />
              <Form.Control
                type="password"
                placeholder="Confirm New Password"
                className="mb-3"
                onChange={(e) => setNewPassConfirm(e.target.value)}
              />
              <Button variant="primary" type="submit" onClick={changePassowrd}>
                Change Password
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default AccountPage;
