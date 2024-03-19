import React, {FC, useState} from 'react';
import './EmployerPagesWithSidebarWrap.scss';
import EmployersPagesHeader from "../EmployersPagesHeader/EmployersPagesHeader";
import LoadingPage from "../../Components/LoadingPage/LoadingPage";
import {Outlet} from "react-router-dom";
import EmployersSidebar from "../EmployersSidebar/EmployersSidebar";

interface EmployerPagesWithSidebarWrapProps {
}

const EmployerPagesWithSidebarWrap: FC<EmployerPagesWithSidebarWrapProps> = () => {
    const [loading, setLoading] = useState(true);


    return (
        <div className={"emp-with-sidebar-layout"}>
            <EmployersSidebar/>
            <div className={"emp-main-content-layout"}>
                <EmployersPagesHeader loading={loading} setLoading={setLoading}/>
                {loading ? <LoadingPage/> : <Outlet/>}
            </div>
        </div>
    )
}

export default EmployerPagesWithSidebarWrap;
