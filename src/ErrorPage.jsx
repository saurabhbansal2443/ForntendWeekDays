import React from 'react';

import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {

    let errObj = useRouteError()
    console.log(errObj)
  return (
   
       <div className='bg-white text-black h-screen'>
      <h1 className='text-3xl'> Status {errObj.status} </h1>
    <h1> {errObj.data}</h1> 
    
    </div>
  )
}

export default ErrorPage
