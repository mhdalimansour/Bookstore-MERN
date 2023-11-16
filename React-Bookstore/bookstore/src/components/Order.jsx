import axios from "axios";
import { Button, Card } from "react-bootstrap";

function Order(props) {
  const items = props.data.items; // array of cart items
  const orderId = props.data._id;
  const location = props.data.location;
  const phonenumber = props.data.phonenumber;
  const date = props.data.dateCompleted;
  const user = props.data.user;
  const total = props.data.total;


  const handleOrderFulfil = () => {
    axios.delete(`http://localhost:5000/orders/${orderId}`).then((res) => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  };

  const itemsList = items.map((el) => {
    return (
      <Card.Text key={el._id}>
        {el.book.title}({el.book.isbn}) x{el.quantity}
      </Card.Text>
    );
  });
  return (
    <>
      <div className="lol">
        <Card style={{ width: "400px" , height:"2000px", textAlign: "center" }}>
          <Card.Title>Order #{orderId}</Card.Title>
          <Card.Body>
          <Card.Text>User: {user}</Card.Text>
          <Card.Text>Phone Number: {phonenumber}</Card.Text>
          <Card.Text>Date: {date.slice(0, 10)}</Card.Text>
          <Card.Text>Location: {location}</Card.Text>
          <Card.Text>Total Paid: {total}</Card.Text>
          <Card.Text>Items: {itemsList}</Card.Text>

          <Button onClick={handleOrderFulfil}>Fulfil Order</Button>
          <Button onClick={handleOrderFulfil} variant="danger">Delete Order</Button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
export default Order;
