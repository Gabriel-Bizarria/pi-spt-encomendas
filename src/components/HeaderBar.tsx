import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/slices/authSlice";

function HeaderBar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="header-bar flex justify-between items-center h-full px-8">
      <h1>Logo Space</h1>
      <button
        onClick={handleLogout}
        className="text-neutral-50 hover:text-neutral-200 transition-colors"
      >
        Logout
      </button>
    </div>
  );
}

export default HeaderBar;
