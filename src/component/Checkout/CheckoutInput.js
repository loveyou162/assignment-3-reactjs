import { useState } from "react";
import classes from "./CheckoutInput.module.css";
import axios from "axios";
import { useNavigate } from "react-router";
const CheckoutInput = () => {
  const navigate = useNavigate();
  const [formCheckOut, setFormCheckOut] = useState({
    fullname: 0,
    email: "",
    phone: "",
    address: "",
  });
  const totalPrice = localStorage.getItem("totalAmount");
  console.log(parseInt(totalPrice));
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormCheckOut((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  console.log(formCheckOut);
  const validationForm = () => {
    const { fullname, email, phone, address } = formCheckOut;
    if (!fullname.trim()) {
      alert("Please enter your fullname!");
      return false;
    }
    if (!email.trim()) {
      alert("Please enter your email!");
      return false;
    }
    if (!phone.trim()) {
      alert("Please enter your phone!");
      return false;
    }
    if (!address.trim()) {
      alert("Please enter your address!");
      return false;
    }
    return true;
  };
  const orderHandler = (e) => {
    e.preventDefault();
    if (!validationForm()) return;
    axios
      .post(
        "http://localhost:5000/shop/order",
        {
          ...formCheckOut,
          totalPrice: parseInt(totalPrice),
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response.data);
        alert(response.data.message);
        if (!response.data.isOrder) {
          navigate("/checkout");
        }
        navigate("/order");
      })
      .then(() => {});
  };
  const viewOrderHandler = (req, res, next) => {
    navigate("/order");
  };
  return (
    <div className={classes["CheckoutInput"]}>
      <form method="post" onSubmit={orderHandler}>
        <div className={classes["name-input"]}>
          <label>Full Name:</label>
          <input
            type="text"
            placeholder="Enter Your Full Name Here!"
            name="fullname"
            onChange={inputChangeHandler}
          />
        </div>
        <div className={classes["email-input"]}>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter Your Email Here!"
            name="email"
            onChange={inputChangeHandler}
          />
        </div>
        <div className={classes["phone-input"]}>
          <label>phone number:</label>
          <input
            type="number"
            placeholder="Enter Your Phone Number Here!"
            name="phone"
            onChange={inputChangeHandler}
          />
        </div>
        <div className={classes["name-input"]}>
          <label>address:</label>
          <input
            type="address"
            placeholder="Enter Your Address Here!"
            name="address"
            onChange={inputChangeHandler}
          />
        </div>
        <button>Place order</button>
      </form>
      <button onClick={viewOrderHandler} className={classes["btn__view-order"]}>
        View Order
      </button>
    </div>
  );
};
export default CheckoutInput;
