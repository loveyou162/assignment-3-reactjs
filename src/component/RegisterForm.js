import { Link, useNavigate } from "react-router-dom";
import classes from "./AuthForm.module.css";
import { useState } from "react";

function AuthForm() {
  const navigate = useNavigate();
  //khởi tạo state
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
  });
  const [error, setError] = useState("");

  //hàm nhận giá trị khi input được nhập
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //hàm validate dữ liệu
  const validateForm = () => {
    const { fullname, email, password, phone } = formData;
    //kiểm tra xem tất cả các ô có được điền đủ hay không
    if (!fullname || !email || !password || !phone) {
      setError("Vui lòng nhập đủ thông tin");
      return false;
    } else if (password.length < 8) {
      //kiểm tra password có đủ 8 kí tự không
      setError("Password phải có ít nhất 8 kí tự");
      return false;
    }
    //kiểm tra xem email đã được sử dụng chưa
    const userArr = JSON.parse(localStorage.getItem("userArr")) || [];
    if (userArr.some((user) => user.email === email)) {
      setError("Email đã được sử dụng.");
      return false;
    }
    return true;
  };

  //hàm gửi hành động của form
  const submitHandler = (e) => {
    console.log("click");
    e.preventDefault();

    if (validateForm()) {
      const { fullname, email, password, phone } = formData;
      const newUser = { fullname, email, password, phone };

      const userArr = JSON.parse(localStorage.getItem("userArr")) || [];
      userArr.push(newUser);
      localStorage.setItem("userArr", JSON.stringify(userArr));
      //reset input
      setFormData({
        fullname: "",
        email: "",
        password: "",
        phone: "",
      });
      setError("");
      // chuyển hướng sang login page
      navigate("/login");
    }
  };
  return (
    <>
      <form onSubmit={submitHandler} className={classes.form}>
        <h1>Sign up</h1>
        <div className={classes["group-input"]}>
          <p>
            <input
              id="full-name"
              type="text"
              name="fullname"
              onChange={handleInputChange}
              value={formData.fullname}
              placeholder="Full Name"
            />
          </p>
          <p>
            <input
              id="email"
              type="email"
              name="email"
              onChange={handleInputChange}
              value={formData.email}
              placeholder="Email"
            />
          </p>
          <p>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
            />
          </p>

          <p>
            <input
              id="phone"
              type="number"
              name="phone"
              onChange={handleInputChange}
              placeholder="Phone"
              value={formData.phone}
            />
          </p>
        </div>
        {/* hiển thị lỗi */}
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <div className={classes.actions}>
          <button>Sign up</button>
          <p>
            Login? <Link to="/login">Click</Link>
          </p>
        </div>
      </form>
    </>
  );
}

export default AuthForm;
