
import ProductCard from "./ProductCard";
import { useState, useContext, useEffect } from "react";
import ShimmerUI from "./ShimmerUI";
import { Theme } from "./Utility/ThemeContext"
import useGetAllProducts from "./Utility/useGetAllProducts";
import AddedProductInCart from "./Utility/AddedProductInCart";
import { useSelector } from "react-redux";


let Home = () => {
  let [allData, setAllData] = useState([])
  let [ProductArray, setProductArray] = useState([]);
  let [searchText, setSearchText] = useState("");

  let idsArray = useSelector((state)=>state.cart.ids)
 
  let arr = useGetAllProducts(); 

  useEffect(() => {
    setAllData(arr);
    setProductArray(arr)
  }, [arr])


  let filterProductData = (fn) => {
    let data = allData.filter(fn);
    
    if(data.length == 0){
      let obj = {
        id : "nodata"
      }
      data.push(obj)
    }
    setProductArray(data);
  };

  let filterToprated = (obj) => {
    return obj.rating > 4;
  };

  let filterProduct = (proCategory) => {
    let fn = (obj) => {
      return proCategory.toLowerCase() == obj.category.toLowerCase();
    };
    filterProductData(fn);
  };

  let searchProduct = () => {
    let fn = (obj) =>obj.title.toLowerCase().includes(searchText.toLowerCase());

   

    filterProductData(fn);

    setSearchText("");
  };



  if (ProductArray.length == 0) {
    return (
      <ShimmerUI></ShimmerUI>
    )
  }

  let AddedComponent = AddedProductInCart(ProductCard) // its a HOC 

  let { theme } = useContext(Theme);




  let lightTheme = " w-screen  min-h-[93.7vh] bg-white text-2xl "
  let darkTheme = " w-screen  min-h-[93.7vh] bg-gray-700 text-2xl "

  return (
    <div className={theme == "light" ? lightTheme : darkTheme}>
      <div className="utility flex  justify-center  pt-3 ">
        <div className=" flex justify-around  w-full">
          <button
            className="btn btn-xs text-2xl sm:btn-sm md:btn-md lg:btn-lg"
            onClick={() => filterProductData(filterToprated)}
          >
            Top Rated
          </button>
          <button
            className="btn btn-xs text-2xl sm:btn-sm md:btn-md lg:btn-lg"
            onClick={() => filterProduct("fragrances")}
          >
            Fragrances
          </button>

          {/* Serach button functions  */ console.log("rendering ")}
          <div className="search-box  flex ">
            <input
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs mx-3 bg-white text-black text-2xl border-2 border-black"
            />
            <button
              className="btn btn-active btn-accent text-2xl"
              onClick={searchProduct}
            >
              Search{" "}
            </button>
          </div>

          <button
            className="btn btn-xs text-2xl sm:btn-sm md:btn-md lg:btn-lg"
            onClick={() => filterProduct("furniture")}
          >
            Furniture
          </button>
          <button
            className="btn btn-xs text-2xl sm:btn-sm md:btn-md lg:btn-lg"
            onClick={() => filterProduct("groceries")}
          >
            Groceries
          </button>
        </div>
      </div>
      <div className="cards flex flex-wrap justify-around">
        {ProductArray.map((obj) => (

         obj.id == 'nodata' ? <h1> No products available </h1> :  idsArray.find((id)=>obj.id == id ) == undefined ?  <ProductCard obj={obj} key={obj.id}></ProductCard>: <AddedComponent obj={obj} key={obj.id}></AddedComponent>
         
        ))}
      </div>
    </div>
  );
};

export default Home;
