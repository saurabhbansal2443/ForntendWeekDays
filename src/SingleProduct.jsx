import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Theme } from "./Utility/ThemeContext";
import useGetSingleProduct from "./Utility/useGetSingleProduct";
import { addCart } from "./Utility/CartSlice";
import ReviewComp from "./ReviewComp";

const SingleProduct = () => {
    let { theme } = useContext(Theme);

    let { id } = useParams();

    let dispatch = useDispatch();

    let obj = useGetSingleProduct(id);

    let idsArray = useSelector((state) => state.cart.ids);

    let [showIndex, setShowIndex] = useState(null);

    // console.log(showIndex)

    if (obj == null) {
        return <h1> ... loading </h1>;
    }

    let handleAddBtn = () => {
        dispatch(addCart(obj));
    };

    let {
        title,
        description,
        category,
        price,
        rating,
        brand,
        images,
        reviews,
    } = obj;
    let darkTheme =
        "w-2/3 h-3/6  card card-side bg-base-100 shadow-xl rounded-2xl border-4 border-base-100 ";
    let lightTheme =
        "w-2/3 h-3/6  card card-side bg-zinc-300 text-black shadow-xl rounded-2xl  border-4 border-zinc-300 ";
    return (
        <div className="w-screen h-[90vh] bg-slate-200 flex flex-col justify-center items-center">
            <div className={theme == "light" ? lightTheme : darkTheme}>
                {idsArray.find((cartId) => cartId == id) != undefined ? (
                    <p className="bg-black text-orange-500 absolute z-20 mt-5 ml-3 p-2 rounded-2xl text-sm font-bold">
                        {" "}
                        Added to cart{" "}
                    </p>
                ) : (
                    <></>
                )}

                <figure className="w-2/3 bg-white">
                    <div className="carousel ">
                        {
                            images.map((url) => {
                                return (
                                    
                                    <div className="carousel-item w-full  rounded-2xl " >
                                        <img src={url} className="w-full rounded-2xl "  />
                                    </div>
                                 
                                )
                            })
                        }

                    </div>
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    <p>{description}</p>
                    <p>{category}</p> <p>{price}</p> <p>{rating}</p>
                    <p>{brand}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={handleAddBtn}>
                            Add
                        </button>
                    </div>
                </div>
            </div>

            <div className="reviewBox h-1/3 w-4/5 bg-zinc-400 mt-9 flex flex-col items-center justify-center rounded-2xl shadow-2xl">
                {reviews.map((obj, idx) => (
                    <ReviewComp
                        obj={obj}
                        showIndex={showIndex}
                        setShowIndex={setShowIndex}
                        idx={idx}
                    ></ReviewComp>
                ))}
            </div>
        </div>
    );
};

export default SingleProduct;
