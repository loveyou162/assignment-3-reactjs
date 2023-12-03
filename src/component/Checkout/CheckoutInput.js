import classes from "./CheckoutInput.module.css";

const CheckoutInput = () => {
  return (
    <div className={classes["CheckoutInput"]}>
      <form>
        <div className={classes["name-input"]}>
          <label>Full Name:</label>
          <input type="text" placeholder="Enter Your Full Name Here!" />
        </div>
        <div className={classes["email-input"]}>
          <label>Email:</label>
          <input type="email" placeholder="Enter Your Email Here!" />
        </div>
        <div className={classes["phone-input"]}>
          <label>phone number:</label>
          <input type="number" placeholder="Enter Your Phone Number Here!" />
        </div>
        <div className={classes["name-input"]}>
          <label>address:</label>
          <input type="address" placeholder="Enter Your Address Here!" />
        </div>
        <button>Place order</button>
      </form>
    </div>
  );
};
export default CheckoutInput;
