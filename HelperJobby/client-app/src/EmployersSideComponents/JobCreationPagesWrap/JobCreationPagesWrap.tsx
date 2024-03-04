import {FC, useEffect} from 'react';
import './JobCreationPagesWrap.scss';
import {JobCreationStates} from "../../enums/utilityEnums/JobCreationStates";
import {Outlet} from "react-router-dom";
import useCurrentEmployerJob from "../../hooks/contextHooks/useCurrentEmployerJob";

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
