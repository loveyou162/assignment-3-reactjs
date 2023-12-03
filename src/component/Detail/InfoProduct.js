import classes from "./InfoProduct.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store.js/cartSlice";
import RelatedProduct from "./RelatedProduct";
import { useParams, useRouteLoaderData } from "react-router";
import { useEffect, useState } from "react";

function InfoProduct() {
  // Sử dụng hook useParams để lấy các tham số từ URL
  const params = useParams();
  // Lấy dữ liệu từ root sử dụng hook useRouteLoaderData
  const data = useRouteLoaderData("root");
  // Sử dụng Redux hooks để lấy và dispatch actions
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  // State để lưu trữ thông tin sản phẩm được chọn
  const [productData, setProductData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  // Effect hook để cập nhật sản phẩm khi tham số URL thay đổi hoặc dữ liệu được tải
  useEffect(() => {
    // Tìm sản phẩm dựa trên tham số từ URL
    const selectedProduct = data.find(
      (product) => product._id.$oid === params.productId
    );
    // Nếu tìm thấy sản phẩm, cập nhật state
    if (selectedProduct) {
      setProductData(selectedProduct);
    }
  }, [params.productId, data]);

  // Hàm xử lý khi nhấn nút "Add to cart"
  const addToCartHandler = () => {
    // Tính toán thông tin giỏ hàng mới
    const newTotalQuantity = cart.totalQuantity + 1;
    const updateItems = cart.items.slice();
    console.log("updateItem: ", updateItems);

    //tìm sản phẩm đã có trong giỏ hàng
    const existingItem = updateItems.find(
      (item) => item.id === productData._id.$oid
    );

    // Nếu sản phẩm đã tồn tại trong giỏ hàng
    if (existingItem) {
      const updateItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
        total: existingItem.total + productData.price,
      };
      console.log(updateItem);
      alert("Đã thêm 1 sản phẩm vào giỏ hàng!");
      const existingItemIndex = updateItems.findIndex(
        (item) => item.id === productData._id.$oid
      );

      updateItems[existingItemIndex] = updateItem;
    } else {
      // Nếu sản phẩm chưa tồn tại trong giỏ hàng
      updateItems.push({
        id: productData._id.$oid,
        image: productData.img1,
        product: productData.name,
        price: productData.price,
        quantity: 1,
        total: quantity * productData.price,
      });
      alert("Đã thêm sản phẩm mới vào giỏ hàng");
    }

    // Cập nhật state giỏ hàng và dispatch action
    const newCart = {
      totalQuantity: newTotalQuantity,
      items: updateItems,
    };
    console.log("newCart: ", newCart);
    // dispatch(cartActions.ADD_CART(newCart));
    dispatch(cartActions.updateCart(newCart));
  };
  // Nếu sản phẩm chưa được tải, hiển thị thông báo "Loading..."
  if (!productData) {
    return <p>Loading...</p>;
  }

  // Hàm định dạng giá tiền để thêm dấu chấm ngăn cách
  const formatPrice = (price) => {
    let priceString = price.toString();
    priceString = priceString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return priceString;
  };
  const increment = () => {
    // Gọi action để tăng số lượng sản phẩm
    setQuantity(quantity + 1);
  };
  const decrement = (s) => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Render các thông tin sản phẩm và giao diện
  return (
    <div className={classes.infoProduct}>
      {/* Hình ảnh chi tiết sản phẩm */}
      <ul className={classes["img-detail"]}>
        {Array.from({ length: 4 }).map((_, index) => (
          <li key={index}>
            <img src={productData[`img${index + 1}`]} alt={productData.name} />
          </li>
        ))}
      </ul>
      {/* Hình ảnh chính của sản phẩm */}
      <img
        className={classes.imgMain}
        src={productData.img1}
        alt={productData.name}
      />
      {/* Thông tin chi tiết sản phẩm */}
      <div className={classes["box-infoDetail"]}>
        <h1>{productData.name}</h1>
        <p className={classes["price-detail"]}>
          {formatPrice(productData.price)}đ
        </p>
        <p className={classes["price__detail-des"]}>{productData.short_desc}</p>
        {/* Thể loại sản phẩm */}
        <div className={classes["directory"]}>
          <h4>Catagories:</h4>
          <p>{productData.category}</p>
        </div>
        {/* Số lượng và nút thay đổi số lượng ấn nút add trước khi ấn tăng số lượng nếu ko sẽ bị lỗi*/}
        <div className={classes["quantity-addCart"]}>
          <div className={classes["custom-number-input"]}>
            <p>QUANTITY</p>
            <div className={classes["custom-quantity"]}>
              <button onClick={() => decrement(productData._id.$oid)}>
                <i className="fa-solid fa-angle-left"></i>
              </button>
              <p>{quantity}</p>
              <button onClick={() => increment(productData._id.$oid)}>
                <i className="fa-solid fa-angle-right"></i>
              </button>
            </div>
          </div>
          {/* Nút thêm vào giỏ hàng */}
          <button
            className={classes["btn-add-cart"]}
            onClick={addToCartHandler}
          >
            Add to cart
          </button>
        </div>
      </div>
      {/* Mô tả sản phẩm */}
      <div className={classes["product-description"]}>
        <div className={classes["product-des"]}>
          <button>Description</button>
          <h3>product Description</h3>
          <p>{productData.long_desc}</p>
        </div>
        {/* Sản phẩm liên quan */}
        <RelatedProduct category={productData.category} />
      </div>
    </div>
  );
}

export default InfoProduct;
