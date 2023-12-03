import { useDispatch, useSelector } from "react-redux";
import classes from "./CartProduct.module.css";
import { Link, useNavigate } from "react-router-dom";
import { cartActions } from "../../store.js/cartSlice";
import { useEffect } from "react";
const CartProduct = () => {
  const navigate = useNavigate();
  const previousPage = () => {
    navigate(-1);
  };
  const cartItemData = useSelector((state) => state.cart.items);

  const dispatch = useDispatch();
  useEffect(() => {
    // Lấy dữ liệu từ localStorage khi component được mount
    const localStorageData = JSON.parse(localStorage.getItem("cartItem"));
    console.log(localStorageData);
    if (localStorageData) {
      dispatch(
        cartActions.updateCart({
          totalQuantity: localStorageData.length,
          items: localStorageData,
        })
      );
    }
  }, [dispatch]);
  const increment = (itemId) => {
    dispatch(cartActions.addCart(itemId));
  };
  const decrement = (itemId) => {
    dispatch(cartActions.decrement(itemId));
  };
  const remove = (itemId) => {
    dispatch(cartActions.remove_cart(itemId));
  };

  //hàm thêm dấu chấm vào giá tiền
  const formatPrice = (price) => {
    // Chuyển đổi số thành chuỗi
    let priceString = price.toString();
    // Sử dụng biểu thức chính quy để thêm dấu chấm ngăn cách
    priceString = priceString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return priceString;
  };
  return (
    <div className={classes.cartProduct}>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>product</th>
            <th>price</th>
            <th>quantity</th>
            <th>total</th>
            <th>remove</th>
          </tr>
        </thead>
        <tbody>
          {cartItemData.map((item) => (
            <tr className={classes["cart-component"]} key={item.id}>
              <td className={classes["cart__img-product"]}>
                <img src={item.image} alt="" />
              </td>
              <td className={classes["cart__price-product"]}>
                <p>{item.product}</p>
              </td>
              <td>{formatPrice(item.price)} VND</td>
              <td>
                <div className={classes["cart-page-number"]}>
                  <div className={classes["page-number"]}>
                    <button onClick={() => decrement(item.id)}>
                      <ion-icon name="caret-back-outline"></ion-icon>
                    </button>
                    <p>{item.quantity}</p>
                    <button onClick={() => increment(item.id)}>
                      <ion-icon name="caret-forward-outline"></ion-icon>
                    </button>
                  </div>
                </div>
              </td>
              <td>
                <p>{formatPrice(item.quantity * item.price)} VND</p>
              </td>
              <td className={classes["cart-btn-trash"]}>
                {/* nút xóa sản phẩm */}
                <button onClick={() => remove(item.id)}>
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={classes["cart-control"]}>
        <button onClick={previousPage}>
          <i className="fa-solid fa-arrow-left"></i> Continue shopping
        </button>
        <Link to="/checkout">
          Proceed to checkout
          <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
};
export default CartProduct;
