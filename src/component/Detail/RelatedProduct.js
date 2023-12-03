import { useRouteLoaderData } from "react-router";
import classes from "./RelatedProduct.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
function RelatedProduct(props) {
  const data = useRouteLoaderData("root");
  const [product, setProduct] = useState([]);

  const category = props.category;
  useEffect(() => {
    function loadProduct() {
      if (category) {
        setProduct(data.filter((product) => product.category === category));
      }
    }
    setProduct([]);
    loadProduct();
  }, [category, data]);
  const formatPrice = (price) => {
    // Chuyển đổi số thành chuỗi
    let priceString = price.toString();
    // Sử dụng biểu thức chính quy để thêm dấu chấm ngăn cách
    priceString = priceString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return priceString;
  };
  return (
    <div className={classes.relatedProduct}>
      <h2>Related Products</h2>
      <ul className={classes["product-list"]}>
        {/* hiển thị danh sách các sản phẩm */}
        {product.map((product) => (
          <li key={product._id.$oid}>
            <Link to={`/detail/${product._id.$oid}`}>
              <img src={product.img1} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{formatPrice(product.price)}đ</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default RelatedProduct;
