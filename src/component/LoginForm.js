import { Link, useNavigate } from "react-router-dom";
import classes from "./AuthForm.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authAction } from "../store.js/auth-slice";
function AuthForm() {
  const dispatch = useDispatch();
  //dùng navigate để tạo chức năng điều hướng
  const navigate = useNavigate();
  const [formLoginData, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormLogin((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //hàm kiểm tra dữ liệu
  const validateForm = () => {
    const { email, password } = formLoginData;
    //kiểm tra xem tất cả các ô có được điền đủ hay không
    if (!email || !password) {
      setError("Vui lòng nhập đủ thông tin");
      return false;
    }

    return true;
  };
  const submitHandler = (e) => {
    e.preventDefault();

    const { email, password } = formLoginData;
    if (validateForm()) {
      const userArr = JSON.parse(localStorage.getItem("userArr")) || [];
      console.log(userArr[0].email);
      const loggedInUser = userArr.find(
        (user) => user.email === email && user.password === password
      );
      if (loggedInUser) {
        console.log(loggedInUser);
        localStorage.setItem("curentName", loggedInUser.fullname);
        localStorage.setItem("curentUser", true);
        dispatch(authAction.ON_LOGIN());
        navigate("/");
      } else {
        alert("Sai email hoặc mật khẩu");
        setFormLogin((prevData) => ({
          ...prevData,
          password: "",
        }));
      }
    }
  };

  return (
    <>
      <form className={classes.form}>
        <h1>Sign in</h1>
        <div className={classes["group-input"]}>
          <p>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
            />
          </p>
          <p>
            <input
              id="password"
              type="password"
              name="password"
              onChange={handleInputChange}
              value={formLoginData.password}
              placeholder="Password"
            />
          </p>
        </div>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <div className={classes.actions}>
          <button onClick={submitHandler}>Log in</button>
          <p>
            Create an account? <Link to="/register">Click</Link>
          </p>
        </div>
      </form>
    </>
  );
}

export default AuthForm;
