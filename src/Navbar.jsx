import { Link ,useNavigate} from "react-router-dom";
import { useContext, useEffect } from "react";
import { Theme } from "./Utility/ThemeContext";
import { useSelector } from "react-redux";
import { useGetUserQuery, useLogoutMutation } from "./Utility/authApi";

let Navbar = () => {
  let { theme, setTheme } = useContext(Theme);

  let navigate = useNavigate();

  let totalProducts = useSelector((state) => state.cart.totalProducts);
  let handleThemeChange = () => {
    setTheme(theme == "light" ? "dark" : "light");
  };

  let [logout , {isLoading , isError}] = useLogoutMutation();


  let handleLogout = async () => {
      await logout();
      
      navigate("/login");
  } 

  useEffect(() => {
    localStorage.setItem("Theme", theme);
  }, [theme]);

  let darkTheme = " navbar bg-base-100";
  let lightTheme = "navbar bg-zinc-300 text-black";
  return (
    <div className={theme == "light" ? lightTheme : darkTheme}>
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          OneStop
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 text-xl ">
          <li>
            <Link to="/cart">
              Cart
              <sup className="text-xl text-red-700 font-bold">
                {" "}
                {totalProducts}{" "}
              </sup>
            </Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li className="text-red-700 font-bold">
            <Link to="/food">Food</Link>
          </li>
          <label className="flex cursor-pointer gap-4 mt-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <input
              onClick={handleThemeChange}
              type="checkbox"
              value="synthwave"
              className="toggle theme-controller"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </label>
        </ul>
        <li className="text-xl" onClick={handleLogout}>Logout </li>
      </div>
    </div>
  );
};

export default Navbar;
