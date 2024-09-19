import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { setAuthenication } from '../redux/slice/login_slice';
import Page_Loading from '../common/page_loading';


const PrivateRoute = ({ children }) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            const token = Cookies.get("accessToken");
            if (token) {
                dispatch(setAuthenication(true));
            }
            setLoading(false);
        }, 50);
        
    }, [dispatch]);

    const is_login = useSelector((state) => state.authenication.isAutheniticated);

    if (loading) {
       
        return <><Page_Loading/></>;
    }

    return is_login ? children : <Navigate to="/" />;
};

export default PrivateRoute;
