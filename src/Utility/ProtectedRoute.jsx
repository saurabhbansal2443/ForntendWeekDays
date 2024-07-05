import React, { useEffect, useState } from "react";
import { useGetUserQuery } from "./authApi";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (Component) => {
  return (props) => {
    const { data, error, isLoading  , refetch} = useGetUserQuery();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{ refetch()} , [])


    useEffect(() => {
      if (!isLoading) {
        if (error || !data || data.result !== true) {
          navigate("/login");
        } else if (data.result === true) {
          setUser(data.data);
        }
      }
    }, [isLoading, error, data, navigate]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error || !data || data.result !== true) {
      navigate("/login");
      return <div>Redirecting...</div>;
    }

    return <Component {...props} user={user} />;
  };
};

export default ProtectedRoute;