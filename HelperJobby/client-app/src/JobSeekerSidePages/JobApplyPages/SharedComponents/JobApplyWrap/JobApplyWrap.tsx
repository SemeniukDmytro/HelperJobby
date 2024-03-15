import {FC, useEffect} from 'react';
import './JobApplyWrap.scss';
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {CurrentJobApplicationProvider} from "../../../../contexts/CurrentJobApplicationContext";
import PageWrapWithHeader from "../../../../Components/Header/PageWrapWithHeader/PageWrapWithHeader";

interface JobApplyWrapProps {}

const JobApplyWrap: FC<JobApplyWrapProps> = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const segments = location.pathname.split('/').filter(Boolean);
        if (segments.length == 2) {
            navigate(`${location.pathname}/contact-info`);
        } else if (segments.length < 2) {   
            navigate("/");
        }
    }, [location.pathname]);
    
    return (
        <PageWrapWithHeader>
            <Outlet/>
        </PageWrapWithHeader>
    )
    
}

export default JobApplyWrap;
