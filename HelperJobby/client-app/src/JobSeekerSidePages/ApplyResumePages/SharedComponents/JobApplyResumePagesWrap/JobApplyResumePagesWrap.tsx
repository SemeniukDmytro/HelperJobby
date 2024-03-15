import React, {FC, useEffect} from 'react';
import './JobApplyResumePagesWrap.scss';
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {CurrentJobApplicationProvider} from "../../../../contexts/CurrentJobApplicationContext";
import {ResumeContextProvider} from "../../../../contexts/ResumeContext";

interface JobApplyResumePagesWrapProps {
}

const JobApplyResumePagesWrap: FC<JobApplyResumePagesWrapProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname == "/apply-resume"){
      navigate("/apply-resume/education")
    }
  }, []);

  return(
    <ResumeContextProvider>
        <Outlet/>
    </ResumeContextProvider>
  )
}

export default JobApplyResumePagesWrap;
