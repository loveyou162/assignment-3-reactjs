import { NavLink, useNavigate } from "react-router-dom";
import classes from "./Navbar.module.css";
import { useSelector } from "react-redux";
// import { authAction } from "../store.js/auth-slice";
import { useEffect, useState } from "react";
// import { Cookies } from "react-cookie";
import axios from "axios";
function Navbar() {
  const isLogout = useSelector((state) => state.auth.islogin);
  const [isLogouted, setIsLogouted] = useState(null);
  const [isName, setIsName] = useState("");
  //dùng useEffect để thực hiện lấy giá trị từ currentUser để lưu trạng thái login và logout khi isLogout thay đổi
  useEffect(() => {
    setIsLogouted(localStorage.getItem("currenUser"));
    setIsName(JSON.parse(localStorage.getItem("currentName")));
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
  const logoutHanler = async () => {
    localStorage.setItem("currenUser", false);
    localStorage.removeItem("currentName");
    localStorage.removeItem("roomId");
    try {
      axios
        .get("http://localhost:5000/shop/logout", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("Error logging in:", error);
        });
    } catch (err) {
      console.log(err);
    }
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
                {isName.fullname}
                <i className="fa-solid fa-angle-down"></i>
              </p>
              <button onClick={logoutHanler}>
                <p>Logout</p>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Navbar;
