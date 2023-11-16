import { useEffect, useState } from "react";
import { Button, Card, FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navbar";
import usePostData from "../components/usePostData";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userFounded, setUserFounded] = useState(true);

  const navigate = useNavigate();
  const { postData } = usePostData("http://localhost:5000/users/login");

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/books");
  }, [navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = {
      email,
      password,
    };
    try {
      const data = await postData(formData);
      const token = data.token;
      localStorage.setItem("role", data.data.user.role);
      localStorage.setItem("token", token);
      if (data.data.user.role === "customer") {
        navigate("/books");
      } else {
        navigate("/admin-page");
      }
    } catch (err) {
      setUserFounded(false);
    }
  };

  return (
    <>
      <Navigation />
      <div className="lol">
        <Card style={{ width: "300px" }} className="text-center">
          <Card.Body>
            <Form onSubmit={handleLogin}>
              {!userFounded && (
                <p className="not-found-login">User not found</p>
              )}
              <FloatingLabel
                controlId="floatingInput"
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
                controlId="floatingPassword"
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

              <Button type="submit" style={{ marginTop: "16px" }}>
                Sign In
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
export default LoginPage;
