import { NavLink, useNavigate } from "react-router-dom";
import classes from "./Navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../store.js/auth-slice";
import { useEffect, useState } from "react";
function Navbar() {
  const dispatch = useDispatch();
  const isLogout = useSelector((state) => state.auth.islogin);

  console.log(isLogout);
  const [isLogouted, setIsLogouted] = useState(null);
  const [isName, setIsName] = useState("");
  //dùng useEffect để thực hiện lấy giá trị từ currentUser để lưu trạng thái login và logout khi isLogout thay đổi
  useEffect(() => {
    setIsLogouted(JSON.parse(localStorage.getItem("curentUser")));
    setIsName(localStorage.getItem("curentName"));
  }, [isLogout]);
  console.log(isLogouted);
  console.log(isName);
  const navigate = useNavigate();
  //dùng navigate để chuyển hướng gán cho button
  const cartHanler = () => {
    navigate("/cart");
  };
  //dùng navigate để chuyển hướng gán cho button
  const loginHanler = () => {
    navigate("/login");
  };
  //hàm thực hiện hành động logout
  const logoutHanler = () => {
    localStorage.setItem("curentUser", false);
    localStorage.removeItem("curentName");
    dispatch(authAction.logout());
    navigate("/login");
  };
  return (
    <div className={classes.navbar}>
      <ul className={classes["navbar-left"]}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/shop/all"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Shop
          </NavLink>
        </li>
      </ul>
      {/* logo */}
      <i className={classes.logo}>boutique</i>

      {/* cụm cart và login */}
      <div className={classes["navbar-right"]}>
        <button onClick={cartHanler}>
          <i className="fa-solid fa-cart-shopping"></i>
          <p>Cart</p>
        </button>
        <div className={classes["navbar__group-account"]}>
          {!isLogouted && (
            <button onClick={loginHanler}>
              <i className="fa-solid fa-user"></i>
              <p>Login</p>
            </button>
          )}
          {isLogouted && (
            <div className={classes["box-account"]}>
              <p>
                <i className="fa-solid fa-user"></i>
                {isName}
                <i className="fa-solid fa-angle-down"></i>
              </p>
              <button onClick={logoutHanler}>
                <p>{"(Logout)"}</p>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Navbar;
