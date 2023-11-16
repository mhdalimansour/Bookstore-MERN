import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./css/card.css";
function BookCard(props) {
  const data = props.data;
  const isbn = data.isbn;
  const imageLink = require(`../images/${isbn}.png`);
  const link = `http://localhost:3000/books/${data.slug}`;
  return (
    <Card style={{ width: "18rem", margin: "10px" }} className="text-center">
      <Link to={link}>
        <Card.Img variant="top" src={imageLink} alt="book-image"></Card.Img>
      </Link>
      <Card.Body>
        <Card.Title>{data.title}</Card.Title>
        <Card.Subtitle>{data.author}</Card.Subtitle>
        <br />
        <Row>
          <Col>
            <Card.Text>{data.price}💲</Card.Text>
          </Col>
          <Col>
            <Card.Text>{data.avgRating}⭐</Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default BookCard;
