import axios from "axios";
import { useState } from "react";
import { Button, Card, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navbar";

function SignupPage() {
  const [name, setName] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const requestBody = {
    name,
    phonenumber,
    email,
    password,
    passwordConfirm,
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/users/signup",
        requestBody
      );
      if (response.status === 201) {
        setSubmissionStatus("Login Successfull");
        navigate("/books");
      }
    } catch (error) {
      console.error("Error", error);
      setSubmissionStatus("Error Sign Up " + error);
    }
  };

  return (
    <>
      <Navigation />
      <div className="lol">
        <Card style={{ width: "300px" }} className="text-center">
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <FloatingLabel
                controlId="floatingInput1"
                label="Name"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput2"
                label="Phone Number"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Phone Number"
                  value={phonenumber}
                  onChange={(e) => setPhonenumber(e.target.value)}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput3"
                label="Email Address"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingPassword1"
                label="Password"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingPassword2"
                label="Password Confirm"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Password Confirm"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
              </FloatingLabel>

              <Button type="submit">Create Account</Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
export default SignupPage;
