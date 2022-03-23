import { Route, Routes } from "react-router-dom";
import { LoginScreen } from "../Components/auth/LoginScreen";
import { RegisterScreen } from "../Components/auth/RegisterScreen";

export const AuthRouter = () => {
  return (
    <div className="auth__main">
      <div className="auth__box-container">
        <Routes>
          <Route path={"/auth/login"} element={<LoginScreen />} />
          <Route path={"/auth/register"} element={<RegisterScreen />} />

          {/* <Redirect to={"/auth/login"} /> */}
        </Routes>
      </div>
    </div>
  );
};
