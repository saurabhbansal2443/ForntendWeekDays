import React , {useContext} from "react";
import { useSelector, useDispatch } from "react-redux";
import Cartrow from "./Cartrow";
import { clearCart } from "./Utility/CartSlice";
import CartDetail from "./CartDetail";
import { Theme } from "./Utility/ThemeContext";

const Cart = () => {
  let cartData = useSelector((state) => state.cart.items);
  // console.log(cartData);

  let dispatch = useDispatch();

  let {theme} = useContext(Theme);

  let handleClearCart = () => {
    dispatch(clearCart());
  };

  let darkTheme = "bg-zinc-300 text-black min-h-screen ";
  let lightTheme = "bg-zinc-100 text-black min-h-screen "
  return (
    <div className={theme == "light" ? lightTheme : darkTheme}>
      <div className="overflow-x-auto mx-10 text-2xl">
        <table className="table">
          <thead>
            <tr className="text-xl text-blue-900">
              <th>Product Name</th>
              <th>Category</th>
              <th> Quantity </th>
              <th>Price </th>
              <th>
                <span> 🔼 </span> Rating <span> 🔽 </span>
              </th>
              <th>
                <CartDetail></CartDetail>
              </th>
            </tr>
          </thead>
          <tbody>
            {cartData.map((item) => (
              <Cartrow cartObj={item} key={item.id}></Cartrow>
            ))}
          </tbody>
        </table>
        <div className="w-full text-center mb-5">
          <button
            className="btn bg-red-600 border-0 w-3/6  text-2xl"
            onClick={handleClearCart}
          >
            
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
