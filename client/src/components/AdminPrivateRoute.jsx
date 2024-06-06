import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const AdminPrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);

  // "Navigate" to redirect the user to the desired page when not using "useNavigate" hook
  // does the same thing but it's a React Component
  return currentUser && currentUser.isAdmin ? <Outlet /> : <Navigate to="/signin" />;
};

export default AdminPrivateRoute;
