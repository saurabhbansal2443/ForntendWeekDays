import React from 'react'

// This is a example of Higher order compoennet 
const AddedProductInCart = (Component) => {
  return (props)=>{
    return (
        <div className='relative'>
        <p className="bg-black text-orange-500 absolute z-20 mt-5 ml-3 p-2 rounded-2xl text-sm font-bold"> Added to cart  </p>
        <Component {...props}></Component>
        </div>
    )
  }
}

export default AddedProductInCart
