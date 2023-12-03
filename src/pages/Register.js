import classes from "./Login.module.css";
import RegisterForm from "../component/RegisterForm";

function LoginPage() {
  return (
    <div className={classes.loginPage}>
      <RegisterForm />
    </div>
  );
}
export default LoginPage;
