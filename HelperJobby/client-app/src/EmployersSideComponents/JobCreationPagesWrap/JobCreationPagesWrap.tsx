import {FC, useEffect} from 'react';
import './JobCreationPagesWrap.scss';
import useCurrentEmployerJob from "../../hooks/useCurrentEmployerJob";
import {JobCreationStates} from "../../enums/utilityEnums/JobCreationStates";
import {Outlet} from "react-router-dom";

interface JobCreationPagesWrapProps {}

const JobCreationPagesWrap: FC<JobCreationPagesWrapProps> = () => {
    const {setJobCreationState} = useCurrentEmployerJob();
    useEffect(() => {
        setJobCreationState(JobCreationStates.incompleteJob)
    }, []);
    
    return (
        <Outlet/>
    )
}

export default JobCreationPagesWrap;
