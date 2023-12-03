import classes from "./CheckoutTotal.module.css";

const CheckoutTotal = () => {
  //lấy dữ liệu từ localStorage
  const productItem = JSON.parse(localStorage.getItem("cartItem"));
  console.log(productItem);
  const total = JSON.parse(localStorage.getItem("totalAmount"));
  console.log(total);
  const formatPrice = (price) => {
    // Chuyển đổi số thành chuỗi
    let priceString = price.toString();
    // Sử dụng biểu thức chính quy để thêm dấu chấm ngăn cách
    priceString = priceString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return priceString;
  };

  return (
    <div className={classes.CheckoutTotal}>
      <h2>Your order</h2>
      {productItem.map((item) => (
        <div className={classes["checkout-total__subtotal"]} key={item.id}>
          <h4>{item.product}</h4>
          <p>
            {formatPrice(item.price)} VND x{item.quantity}
          </p>
        </div>
      ))}
      <div className={classes["checkout-total__all"]}>
        <h3>Total</h3>
        <p>{formatPrice(total)} VND</p>
      </div>
    </div>
  );
};
export default CheckoutTotal;
