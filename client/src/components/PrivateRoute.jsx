import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);

  // "Navigate" to redirect the user to the desired page when not using "useNavigate" hook
  // does the same thing but it's a React Component
  return currentUser ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
