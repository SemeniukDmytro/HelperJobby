import React, {FC, useState} from 'react';
import './PagesWithoutSidebarWrap.scss';
import EmployersPagesHeader from "../EmployersPagesHeader/EmployersPagesHeader";
import LoadingPage from "../../Components/LoadingPage/LoadingPage";
import {Outlet} from "react-router-dom";

interface PagesWithoutSidebarWrapProps {}

const PagesWithoutSidebarWrap: FC<PagesWithoutSidebarWrapProps> = () => {
    const [loading, setLoading] = useState(true);
    
    
    return (
        <>
            <EmployersPagesHeader loading={loading} setLoading={setLoading}/>
            {loading ? <LoadingPage/> : <Outlet/>}
        </>
    )
}

export default PagesWithoutSidebarWrap;
