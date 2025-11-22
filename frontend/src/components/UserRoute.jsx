import { Navigate } from "react-router-dom";

const UserRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.role === "user" ? children : <Navigate to="/admin/dashboard" />;
};

export default UserRoute;