
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Theme } from "./Utility/ThemeContext";
import { useDispatch } from "react-redux";
import { addCart } from "./Utility/CartSlice";



let ProductCard = ({obj }) => {

  let dispatch = useDispatch();
   
  let { images, title, description, rating, category, price  , id } = obj;

  let {theme } = useContext(Theme);

  let Navigate = useNavigate();
  let handleClick= () => {
    
    Navigate(`/product/${id}`)
  }

  let handleAddCart = (event) => {
    event.stopPropagation()
    dispatch(addCart(obj))
    // console.log("Buy Now clicked ")
  }  

  let darkTheme = "card h-[40vh] w-96 bg-base-100 shadow-xl  m-4 "
  let lightTheme = "card h-[40vh] w-96 bg-zinc-300 shadow-xl m-4  text-black"
  return (
    <div className={theme == "light" ? lightTheme : darkTheme} onClick={handleClick}>
  <figure className="h-1/2"><img src={images[images.length-1]} alt="Shoes" /></figure>
  <div className="card-body h-1/2">
    <h2 className="card-title">
      {title}  
      <div className="badge badge-secondary">{rating}</div>
    <div className="badge badge-secondary text-wrap">{category}</div>
    </h2>
   
    <p className="h-1/6 overflow-scroll">{description} </p>
    <div className="card-actions justify-end">
      <p className="text-2xl text-red-500"> Rs {price }</p>
      <button className="btn btn-active btn-primary" onClick={handleAddCart}>Add to Cart </button>
    </div>
  </div>
</div>
  );
};

export default ProductCard;
