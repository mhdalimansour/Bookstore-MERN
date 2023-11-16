import axios from "axios";
import { useEffect, useState } from "react";
import Navigation from "../components/Navbar";
import Order from "../components/Order";

function OrdersAdmin() {
  const [orders, setOrders] = useState();
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("http://localhost:5000/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setOrders(response.data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const ordersList = orders
    ? orders.map((el) => {
        return (
        <>
          <Order key={el._id} data={el}></Order>;
          <br/>
        </>)
      })
    : [];
  return (
    <>
      <Navigation></Navigation>
      <div className="lol">
        {ordersList}
      </div>
    </>
  );
}
export default OrdersAdmin;
