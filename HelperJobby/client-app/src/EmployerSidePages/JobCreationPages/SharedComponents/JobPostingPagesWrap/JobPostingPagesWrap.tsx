import React, {FC, useState} from 'react';
import './JobPostingPagesWrap.scss';
import {useEmployer} from "../../../../hooks/useEmployer";
import EmployersSidebar from "../../../../Components/EmployersSidebar/EmployersSidebar";
import EmployersPagesHeader from "../../../../EmployersSideComponents/EmployersPagesHeader/EmployersPagesHeader";
import LoadingPage from "../../../../Components/LoadingPage/LoadingPage";
import {Outlet} from "react-router-dom";
import {CurrentEmployerJobProvider} from "../../../../contexts/CurrentEmployerJobContext";

interface JobPostingPagesWrapProps {}

const JobPostingPagesWrap: FC<JobPostingPagesWrapProps> = () => {
    const {employer} = useEmployer();
    const [loading, setLoading] = useState(true);
    
    return (
        <div className={"emp-with-sidebar-layout"}>
            {loading ? <></> :
                (employer!.hasPostedFirstJob ? <EmployersSidebar/> : <></> )
            }
            <div className={"emp-main-content-layout"}>
                <EmployersPagesHeader loading={loading} setLoading={setLoading}/>
                {loading ? <LoadingPage/> : 
                    <CurrentEmployerJobProvider>
                        <Outlet/>
                    </CurrentEmployerJobProvider>
                }
            </div>
        </div>
    )
}

export default JobPostingPagesWrap;