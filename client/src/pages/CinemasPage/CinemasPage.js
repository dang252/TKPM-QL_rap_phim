import React, { useEffect } from 'react'
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import { Outlet } from 'react-router-dom';

const CinemasPage = () => {
    useEffect(() => {
        document.title = "CGV Cinemas Fake | Danh sách phim";
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Breadcrumbs />
            <Outlet />
        </>
    )
}

export default CinemasPage