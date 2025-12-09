import { Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar bg-primary text-primary-content sticky top-0 z-50 shadow-lg">
      <div className="flex justify-between items-center w-full px-4">

        <div className="flex gap-4">
          <Link to="/" className="btn btn-ghost">Головна</Link>

          {user && (
            <>
              <Link to="/vertical" className="btn btn-ghost">Вертикальний</Link>
              <Link to="/horizontal" className="btn btn-ghost">Горизонтальний</Link>
            </>
          )}
        </div>

        <div className="flex gap-2">
          {!user && (
            <>
              <Link to="/login" className="btn btn-sm">Увійти</Link>
              <Link to="/register" className="btn btn-sm">Реєстрація</Link>
            </>
          )}

          {user && (
            <button onClick={logout} className="btn btn-sm">
              Вийти
            </button>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Header;
